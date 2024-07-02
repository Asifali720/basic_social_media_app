import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import likeBtn from "../../../assets/images/like.png";
import commentBtn from "../../../assets/images/comment.png";
import deleteBtn from "../../../assets/images/delete.png";

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
  console.log("🚀 ~ image:", image)

  return (
    <div className="w-full rounded-lg shadow-lg bg-white p-3 my-5">
      <div className="flex items-center gap-2">
        <Avatar className="">
          <AvatarImage
            src={logo}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
        <p className="font-roboto font-medium">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
        <p className="text-xs font-roboto font-medium">{new Date(timeStamp?.seconds * 1000).toDateString() + ' ' + new Date(timeStamp?.seconds * 1000).toLocaleTimeString()}</p>
        </div>
      </div>
     <p className="font-roboto text-sm font-medium my-4">{text}</p>

    {
      image && <img src={image} alt="preview" className="w-full h-80  rounded-lg object-cover my-4"/>
    }

    <div className="flex items-center justify-around gap-5">
      <button>
        <img src={likeBtn} alt="" />
      </button>
      <button>
      <img src={commentBtn} alt="" />
      </button>
      <button>
      <img src={deleteBtn} alt="" />
      </button>
    </div>
    </div>
  );
};

export default PostCard;
