import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

const Comment = ({
  name,
  comments,
  logo
}: {
  name: string;
  comments: string;
  logo: string;
}) => {
  return <div className="w-fit">
    <div className="flex items-center gap-2">
    <Avatar className="rounded-full h-10 w-10 overflow-hidden">
                <AvatarImage src={logo} />
                <AvatarFallback>{name.split('')[0].toUpperCase()}</AvatarFallback>
              </Avatar>

    <div className="p-2 rounded-2xl shadow-lg bg-gray-200 mt-5">
      <p className="font-roboto text-sm font-bold tracking-tighter">{name.split('')[0].toUpperCase() + name.slice(1)}</p>
      <p className="text-base font-roboto text-black">{comments}</p>
    </div>
    </div>
  </div>;
};

export default Comment;
