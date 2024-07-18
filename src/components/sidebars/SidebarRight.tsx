import React, { useContext, useState } from 'react'
import waterSlidImage from '../../assets/images/waterslide.jpg'
import { AuthContext, AuthContextType } from '../app_context/AppContext'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import placeholderImage from '../../assets/user_place.jpg'
import remove from '../../assets/images/remove.png'
import { Link } from 'react-router-dom'
import { arrayRemove, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../firebase/config'


const SidebarRight = () => {
    const [inputValue, setInputValue] = useState('')
    const {user, userData} = useContext(AuthContext) as AuthContextType
    const friendList = userData?.friends

    const searchFriends = (data: Array<any>)=>{
        return data.filter((item: any)=> item['name'].toLowerCase().includes(inputValue.toLowerCase()))
    }

    const removeFriend = async(id: string, name: string, image: string)=>{
          const q = query(collection(db, "users"), where("uid", "==", user.uid));
          const getdoc = await getDocs(q);
          const docId = getdoc.docs[0].id
        await updateDoc(doc(db, "users", docId), {
          friends: arrayRemove({
            id: id, 
            name: name, 
            image: image,
          })
        })
    }

  return (
    <>
    <div className='w-full px-3 flex flex-col items-center pt-5 pb-2'>
      <img src={waterSlidImage} alt="water-slid" className='w-full h-40 rounded-lg mb-5'/>
      <p className='text-sm font-roboto'>Through photography, the beauty of Mother Nature can be frozen in time.
        This category celebrates the magic of our planet and beyond — from the
        immensity of the great outdoors, to miraculous moments in your own
        backyard.</p>
     <div className='w-full mt-5'>
     <h3 className='text-base font-roboto font-semibold text-left'>Friends:</h3>
     <input type="text" name="" id="" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder='search' className='w-full p-2 border border-blue-500 rounded-lg focus:outline-none focus:border-2'/>
     </div>
    </div>
        {
          friendList?.length > 0 ? <div>
            {
              searchFriends(friendList).map((item: any)=>{
                return <div className='w-full flex items-center justify-between'>
                    <Link to ={`/profile/${item?.id}`} className='w-full flex items-center gap-2 ml-3'>
                         <Avatar className="rounded-full w-10 h-10">
                    <AvatarImage src={item?.image ? item?.image: placeholderImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className='text-base font-roboto font-medium'>{item['name'].charAt(0).toUpperCase() + item['name'].slice(1)}</p>
                </Link>
                <img onClick={()=>removeFriend(item?.id, item?.name, item?.image)} src={remove} alt="remove" className='w-7 h-7 cursor-pointer' />
                </div>
              
              })
            }
          </div> : <p className='text-sm font-roboto mt-10 width-full text-center'>No friends yet</p>
        }
      </>

  )
}

export default SidebarRight