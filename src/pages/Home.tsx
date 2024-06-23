import React from "react";
import Navbar from "../components/navbar/Navbar";
import Layout from "../components/layout/Layout";
import SidebarLeft from "../components/sidebars/SidebarLeft";
import SidebarRight from "../components/sidebars/SidebarRight";
import ReelSection from "../components/main/reels_section/ReelSection";
import CreateNewPostSection from "../components/main/create_new_post_section/CreateNewPostSection";

const Home = () => {
  return (
    <Layout>
      <Navbar />
      <div className="flex">
        <div className="w-[20%] h-screen border-r border-r-gray-200/90 shadow-xl fixed top-16 left-0 bottom-0">
          <SidebarLeft />
        </div>
        <div className="w-[75%] mt-16 mx-[25%]">
         <ReelSection/>
         <CreateNewPostSection/>
        </div>
        <div className="w-[20%] h-screen border-r border-r-gray-200/90 shadow-xl fixed top-16 right-0 bottom-0">
          <SidebarRight />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
