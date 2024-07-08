import React, { useContext, useEffect, useReducer } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import likeBtn from "../../../assets/images/like.png";
import commentBtn from "../../../assets/images/comment.png";
import deleteBtn from "../../../assets/images/delete.png";
import { AuthContext, AuthContextType } from "../../app_context/AppContext";
import {
  PostReducer,
  postActions,
  postStates,
} from "../../app_context/PostReducer";
import { db } from "../../../firebase/config";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import addFriendLogo from '../../../assets/images/add-friend.png'

const PostCard = ({
  uid,
  email,
  logo,
  name,
  text,
  timeStamp,
  image,
  id,
}: {
  uid: string;
  email: string;
  logo: string;
  name: string;
  text: string;
  timeStamp: any;
  image: string;
  id: string;
}) => {
  console.log("🚀 ~ id:", id)
  const { user } = useContext(AuthContext) as AuthContextType;
  const [state, dispatch] = useReducer(PostReducer, postStates);
  const { HANDLE_ERROR, ADD_LIKES } = postActions;

  const likesRef = doc(collection(db, "posts", id, "likes"));
  const likesCollection = collection(db, "posts", id, "likes");

  const addUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const doc = await getDocs(q);
      const docRef = doc.docs[0].ref;
      await updateDoc(docRef, {
        friends: arrayUnion({
          id: uid,
          image: logo,
          name: name,
        }),
      });
    } catch (err: any | string) {
      console.log(err.message);
    }
  };

  const handleLikes = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const q = query(likesCollection, where("id", "==", user.uid));
    const querySnapShot = await getDocs(q);
    const likesdocId = querySnapShot?.docs[0]?.id;
    try {
      if (likesdocId !== undefined) {
        const deleteId = doc(db, "posts", id, "likes", likesdocId);
        await deleteDoc(deleteId);
      } else {
        await setDoc(likesRef, {
          id: user?.uid,
        });
        // addUser()
      }
    } catch (err: any | string) {
      dispatch({ type: HANDLE_ERROR });
      console.log(err.message);
    }
  };

  // const handleLikes = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   const q = query(likesCollection, where("id", "==", user.uid));
  //   const querySnapShot = await getDocs(q);
  
  //   let likesdocId;
  //   if (!querySnapShot.empty) {
  //     likesdocId = querySnapShot.docs[0].id;
  //   }
  
  //   try {
  //     if (likesdocId !== undefined) {
  //       const deleteId = doc(db, "posts", id, "likes", likesdocId);
  //       await deleteDoc(deleteId);
  //     } else {
  //       await setDoc(likesRef, {
  //         id: user.uid,
  //       });
  //       // addUser()
  //     }
  //   } catch (err: any | string) {
  //     dispatch({ type: HANDLE_ERROR });
  //     console.log(err.message);
  //   }
  // };
  


  useEffect(() => {
    const getLikes = async () => {
      try {
        const q = query(
          collection(db, "posts", id, "likes"),
          where("id", "==", user.uid)
        );
        await onSnapshot(q, (doc) => {
          dispatch({
            type: ADD_LIKES,
            likes: doc.docs.map((item) => item.data()),
          });
        });
      } catch (err: any | string) {
        dispatch({ type: HANDLE_ERROR });
        console.log(err.message);
      }
    };
   getLikes();
  }, [ADD_LIKES, id, HANDLE_ERROR]);

  return (
    <div className="w-full rounded-lg shadow-lg bg-white p-3 my-5">
    <div className="flex items-center justify-between">
         <div className="flex items-center gap-2">
        <Avatar className="">
          <AvatarImage src={logo} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-roboto font-medium">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </p>
          <p className="text-xs font-roboto font-medium">
            {new Date(timeStamp?.seconds * 1000).toDateString() +
              " " +
              new Date(timeStamp?.seconds * 1000).toLocaleTimeString()}
          </p>
        </div>
      </div>
     { 
      user.uid !== uid && (
        <button onClick={addUser} className="p-2 rounded-full hover:bg-sky-100">
        <img src={addFriendLogo} alt="" />
      </button>
      )
     }
    </div>
     
      <p className="font-roboto text-sm font-medium my-4">{text}</p>

      {image && (
        <img
          src={image}
          alt="preview"
          className="w-full h-[420px]  rounded-lg  my-4"
        />
      )}

      <div className="flex items-center justify-around gap-5">
        <button className="transition-all ease-in-out duration-300 hover:scale-110 flex items-center gap-1" onClick={(e)=>handleLikes(e)}>
          <img src={likeBtn} alt="" />
          <p>{state.likes.length > 0 && state.likes.length}</p> 
        </button>
        <button className="transition-all ease-in-out duration-300 hover:scale-110">
          <img src={commentBtn} alt="" />
        </button>
        <button className="transition-all ease-in-out duration-300 hover:scale-110">
          <img src={deleteBtn} alt="" />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
