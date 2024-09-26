import { useEffect,  useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Navbar from '../components/navbar/Navbar'
import SidebarLeft from '../components/sidebars/SidebarLeft'
import SidebarRight from '../components/sidebars/SidebarRight'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase/config'
import bannerPic from '../assets/images/profilePic.jpg'
import placeholderImage from '../assets/user_place.jpg'
import CreateNewPostSection from '../components/main/create_new_post_section/CreateNewPostSection'


const FriendProfile = () => {
  const [profile , setProfile] = useState<any>(null)
  const {id} = useParams()  
  // const [state, dispatch] = useReducer(PostReducer, postStates);
  // console.log("🚀 ~ FriendProfile ~ state:", state.posts)
  
  

  useEffect(() => {
    const getUserProfile = async()=>{
        const q = query(collection(db, "users"), where("uid", "==", id));
        await onSnapshot(q, (doc) => {
            setProfile(doc?.docs[0]?.data())
        })
    }
    getUserProfile()
  }, [id, setProfile])

  // useEffect(() => {
  //     const getUserPosts = async()=>{
  //         const q = query(collection(db, "posts"), where("uid", "==", id));
  //         await onSnapshot(q, (doc) => {
  //             setPostData(doc?.docs[0]?.data())
  //         })
  //     }

  //    getUserPosts() 
  // },[id, setPostData])

  
  return (
    <Layout>
    <Navbar />
    <div className="flex">
      <div className="w-[20%] h-screen border-r border-r-gray-200/90 shadow-xl fixed top-16 left-0 bottom-0">
        <SidebarLeft />
      </div>
      <div className="w-[75%] mt-16 mx-[25%]">
      <div className='relative max-h-[300px] w-full overflow-hidden'>
      <img src={bannerPic} alt="banner" className='w-full' />
      <div className='absolute left-10 bottom-6 flex items-center justify-center'>
      <img src={profile?.image ? profile?.image : placeholderImage} alt="placeholder" className=' w-24 h-24 rounded-full'/>
      <div>
      <p className='text-white font-roboto font-semibold ml-5 text-3xl'>{profile?.name}</p>
      <Link to={`mailto:${profile?.email}`} className='text-white font-roboto font-semibold ml-5 text-sm hover:underline'>{profile?.email}</Link>
      </div>
    
      </div>
      
      </div>
      <div className='mt-10'>
      <CreateNewPostSection/>
      </div>      
      </div>
      <div className="w-[20%] h-screen border-r border-r-gray-200/90 shadow-xl fixed top-16 right-0 bottom-0">
        <SidebarRight />
      </div>
    </div>
  </Layout>
  )
}

export default FriendProfile