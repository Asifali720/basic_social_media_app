import React, { useContext, useEffect, useReducer, useRef } from 'react'
import { AuthContext, AuthContextType } from '../../app_context/AppContext'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import placeholderImage from '../../../assets/user_place.jpg'
import sendIcon from '../../../assets/images/send-icon.png'
import { PostReducer, postActions,  postStates} from '../../app_context/PostReducer'
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import Comment from '../comment/Comment'

const CommentSection = ({
  commentId
}:{
  commentId: string
}) => {
 
  const {user} = useContext(AuthContext) as AuthContextType
  const text = useRef<HTMLInputElement | null>(null)
  const [state, dispatch] = useReducer(PostReducer, postStates)
  const {HANDLE_ERROR, ADD_COMMENT} = postActions


  const commentRef = doc(collection(db, "posts", commentId, "comments"));


  const addComments = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
       if(text.current?.value !== ''){
         try {
           await setDoc(commentRef, {
             logo: user?.photoURL ? user?.photoURL : placeholderImage,
             name: user?.displayName.split('')[0].charAt(0).toUpperCase() + user?.displayName.slice(1), 
             comments: text.current?.value,
             timeStamp: serverTimestamp()     
            })
            if(text.current?.value){
              text.current.value = ''
            }  
         } catch (err: string | any) {
           console.log(err.message);
           dispatch({type: HANDLE_ERROR})
         }
       }
  }

  useEffect(() => {
     const getComments = async()=>{
      try{
        const collectionOfComments = collection(db, `posts/${commentId}/comments`);
        const q = query(collectionOfComments, orderBy("timeStamp", "desc"));
        await onSnapshot(q, (doc) => {
          dispatch({type: ADD_COMMENT, comments: doc.docs.map((item: any)=> item.data())})
        })
      }
       catch(err: string | any){
         console.log(err.message);
         dispatch({type: HANDLE_ERROR})
      }
     }

     getComments()
  }, [ADD_COMMENT, HANDLE_ERROR, commentId])

  return (
    <>
     <div key={commentId} className='w-full rounded-full border border-gray-300 bg-gray-100 p-1 mt-5 flex items-center'>
        <Avatar className="rounded-full w-8 h-8 ">
                <AvatarImage src={user?.photoURL ? user?.photoURL : placeholderImage} />
                <AvatarFallback>{user?.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <form className='w-full flex items-center py-1 px-2' onSubmit={addComments}>
              <input type="text" name="" id="" ref={text} placeholder="Write a comment...!" className='w-full !border-none outline-none focus:!outline-none focus:!border-none focus:ring-offset-0 active:border-none bg-gray-100'/>

             <button type='submit'><img src={sendIcon} alt="send" className='w-7 h-7'/></button>

              </form>
    </div>
   {
    state.comments && state.comments.map((items: any)=>{
      return <Comment {...items}/>
    })
   }
    </>
   
  )
}

export default CommentSection