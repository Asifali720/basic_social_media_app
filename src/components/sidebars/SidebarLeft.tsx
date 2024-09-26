import React, { useEffect, useState, useRef, useContext } from "react";
import natureImage from "../../assets/images/nature.jpg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import locationIcon from "../../assets/images/location.png";
import jobBagIcon from "../../assets/images/job.png";
import facebookIcon from "../../assets/images/facebook.png";
import twitterIcon from "../../assets/images/twitter.png";
import laptop from "../../assets/images/laptop.jpg";
import media from "../../assets/images/media.jpg";
import apps from "../../assets/images/apps.jpg";
import tik from "../../assets/images/tik.jpg";
import { AuthContext, AuthContextType } from "../app_context/AppContext";
import placeholderImage from "../../assets/user_place.jpg"



interface ImagesListArray {
    id: number;
    image: string;
  }

const SidebarLeft = () => {
  const [data, setData] = useState<ImagesListArray | null>(null);;
  const count = useRef(0);

  const {user} = useContext(AuthContext) as AuthContextType;

  const handleRandom = (arr: ImagesListArray[]) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    setData(arr[randomIndex]);
  };

  useEffect(() => {
    const imagesList = [
      {
        id: 1,
        image: laptop,
      },
      {
        id: 2,
        image: media,
      },
      {
        id: 3,
        image: apps,
      },
      {
        id: 4,
        image: tik,
      },
    ];
    handleRandom(imagesList)
    let countAds = 0
    const startAds = setInterval(()=>{
        countAds++;
        handleRandom(imagesList);
        count.current = countAds;
        if(countAds === 5){
          clearInterval(startAds)
        }
    }, 2000)
    return ()=>{
        clearInterval(startAds)
    }
  }, [count]);

  const handleProgressBar = () => {
     switch (count.current) {
      case 1:
        return 20;
      case 2:
        return 40;
      case 3:
        return 60;
      case 4:
        return 80;
      case 5:
        return 100;  
      default:
       return 0;
     }
  };

  return (
    <div className="w-full h-full overflow-y-auto scrobar_width">
      <div className="w-full relative py-16 rounded-md overflow-hidden">
        <img
          src={natureImage}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-fill"
        />
      </div>
      <div className="w-full flex items-center justify-center -mt-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex flex-col items-center">
              <Avatar className="rounded-md w-16 h-16">
                <AvatarImage src={user?.photoURL ? user?.photoURL : placeholderImage} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-base font-roboto font-medium text-center">
                { user?.email && user?.email}
              </p>
            </TooltipTrigger>
            <TooltipContent className="bg-gray-600">
              <p className="text-white font-roboto">profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <p className="text-sm font-roboto text-gray-600 text-nowrap text-center">
        Access exclusive tools & insight
      </p>
      <p className="text-sm font-roboto text-gray-600 text-nowrap text-center">
        Try premiere for free
      </p>
      <div className="flex items-center gap-1 px-2 mb-2 mt-5">
        <img src={locationIcon} alt="location" className="w-10 h-10" />
        <p className="font-bold text-lg">California</p>
      </div>
      <div className="flex items-center gap-1 px-2">
        <img src={jobBagIcon} alt="location" className="w-10 h-10" />
        <p className="font-bold text-lg">React Developer</p>
      </div>
      <ul className="flex items-center justify-center gap-2">
        <li className="font-roboto text-blue-500 font-bold">Events</li>
        <li className="font-roboto text-blue-500 font-bold">Groups</li>
        <li className="font-roboto text-blue-500 font-bold">Follow</li>
        <li className="font-roboto text-blue-500 font-bold">More</li>
      </ul>
      <h3 className="text-xl font-bold font-roboto my-2 mx-2">
        Social Profiles
      </h3>
      <ul className="mx-2">
        <li className="flex items-center gap-1 mb-2">
          <img src={facebookIcon} alt="fb_icon" className="w-10 h-10" />
          <p className="font-roboto font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
            Social Network
          </p>
        </li>
        <li className="flex items-center gap-1">
          <img src={twitterIcon} alt="fb_icon" className="w-10 h-10" />
          <p className="font-roboto font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
            Social Network
          </p>
        </li>
      </ul>
      <div>
      <h3 className="text-center text-lg font-roboto font-bold mt-10 mb-2">
        Random Ads
      </h3>
      <div className="h-2 bg-blue-600 rounded-full mb-5 transition-all ease-in-out" style={{width: `${handleProgressBar()}%`}}></div>
      {data ? <img src={data.image} alt={`image-${data.id}`}  className="w-[250px] rounded-lg mx-auto mb-20"/> : 'No image selected'}
      </div>
    </div>
  );
};

export default SidebarLeft;
