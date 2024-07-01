import React, { useContext, useRef, useState, useReducer, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Button } from '../../ui/button'
import uploadIcon from '../../../assets/images/add-image.png'
import smileIcon from '../../../assets/images/smile.png'
import liveIcon from '../../../assets/images/live.png'
import { AuthContext, AuthContextType } from '../../app_context/AppContext'
import placeholderImage from '../../../assets/user_place.jpg'
import { db } from '../../../firebase/config'
import { collection, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { postActions, postStates, PostReducer } from '../../app_context/PostReducer'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, UploadMetadata } from "firebase/storage";

const CreateNewPostSection = () => {
 const uploadRef = useRef<HTMLInputElement | null>(null);
 const {user, userData} = useContext(AuthContext) as AuthContextType
 const text = useRef<HTMLInputElement | null>(null)
 const [image, setImage] = useState('')
 const [file, setFile] = useState<File | null>(null)
 const [state, dispatch] = useReducer(PostReducer, postStates)
 const [progressBar, setProgressBar] = useState(0)
 const {SUBMIT_POST, HANDLE_ERROR} = postActions
 const scrollRef = useRef<HTMLDivElement | null>(null);
 const handleUpload=()=>{
    const uploadElement = uploadRef.current;

    if (uploadElement) {
        uploadElement.click();
    } else {
        console.error('uploadRef is null');
    }
 }

 const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => { 
     setFile(e.target.files![0])
 }


 const storage = getStorage();

 const metadata = {
  contentType: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml']
};
 
 const collectionRef = collection(db, "posts");
const posts = doc(collectionRef)
const document = posts.id
 const handleSubmitPost= async(e: React.FormEvent)=>{
     e.preventDefault();
     if (text.current?.value !== '') {
        try{
          await setDoc(posts, {
            document: document,
            uid: user?.uid || userData?.uid,
            email: user?.email || userData?.email,
            logo: user?.photoURL || userData?.photoUrl,
            name: user?.displayName || userData?.displayName,
            text: text.current?.value,
            image: image,
            timeStamp: serverTimestamp(),
          })
          if (text.current) {
              text.current.value = '';
          }
          setImage('')
        }catch(err: any | string){
            dispatch({type: HANDLE_ERROR, payload: true})
            console.log(err.message)
        }
     }else{
        dispatch({type: HANDLE_ERROR})
     }
 }

 const handleSubmitImage = async()=>{
   const fileTypes = file && metadata.contentType.includes(file['type'])
   if(!file) return;
   if(fileTypes){
    try {
      const storageRef = ref(storage, `images/${file?.name}`);
      const uploadMetadata: UploadMetadata = {
        contentType: file.type,
      };
      const uploadTask = uploadBytesResumable(storageRef, file, uploadMetadata);
      await uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressBar(progress)
      },
      (error)=>{
        alert(error)  
      },
      async()=>{
        await  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL)
        });
      } 

    )
    } catch (err: any | string) {
      dispatch({type: HANDLE_ERROR})
      console.log(err.message)
      alert(err.message)
    }
   }
 }

 const fetchData = async()=>{
  const q = query(collectionRef, orderBy("timeStamp", "asc"))
  const querySnapshot = await getDocs(q)
  const postData = querySnapshot?.docs.map((doc)=> doc.data())
  return postData
 }

 useEffect(()=>{
    const fetchDataAndSetState = async()=>{
      try {
        const postData = await fetchData()
        dispatch({type: SUBMIT_POST, posts: postData})
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        setImage('')
        setFile(null)
        setProgressBar(0)
      } catch (err: any | string) {
        dispatch({type: HANDLE_ERROR})
        console.log(err.message)
        alert(err.message)
      }
    }
    fetchDataAndSetState()
 }, [SUBMIT_POST])


  return (
    <div className='border border-gray-200 shadow-xl rounded-xl w-full'>
        <form onSubmit={handleSubmitPost}>
        <div className='flex items-center justify-between p-2 border-b border-b-gray-300 w-full'>
          <div className='flex items-center gap-2 w-full'>
          <Avatar className=''>
                    <AvatarImage src={user?.photoURL ? user?.photoURL : placeholderImage} />
                    <AvatarFallback>{user?.displayName ? user?.displayName.charAt(0).toUpperCase() : userData?.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
             <input type="text" name="" id="" ref={text} className='p-2 w-full font-roboto outline-none' placeholder={`whats on your mind user ${user?.displayName && user?.displayName.charAt(0).toUpperCase() + user?.displayName.split(' ')[0].slice(1) || userData?.displayName.charAt(0) + userData?.displayName.slice(1)}`}/>     
          </div>
          {
            image && <img src={image} alt="preview" className='h-20'/>
          }
          <Button variant='ghost' type='submit' className='text-sky-600 hover:text-sky-600 hover:bg-sky-100 uppercase'>share</Button>
       </div>
      <div className='bg-sky-500 py-1' style={{width: `${progressBar}%`}}></div>
       <div className='p-2 flex items-center justify-around'>
        <div className='flex items-center gap-2'>
        <div onClick={handleUpload} className=''>
            <img src={uploadIcon} alt='upload' className='w-10 h-10'/>
            <input ref={uploadRef} type="file" name='' onChange={handleFileUpload} id='addImage' className='hidden'/>
        </div>
        {
          file && <Button type='button' variant={'secondary'} onClick={handleSubmitImage}>upload</Button>
        }
        </div>
        <div className='flex items-center gap-2'>
            <img src={liveIcon} alt='live' className='w-10 h-10'/>
            <p className='text-base font-roboto'>Live</p>
        </div>
        <div className='flex items-center gap-2'>
            <img src={smileIcon} alt='live' className='w-10 h-10'/>
            <p className='text-base font-roboto'>Feeling</p>
        </div>
       </div>

        </form>
      <div ref={scrollRef}></div>
    </div>
  )
}

export default CreateNewPostSection;