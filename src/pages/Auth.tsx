import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Login from "../components/auth_components/Login";
import Register from "../components/auth_components/Register";

const Auth = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-sky-50">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="w-full bg-gray-200">
          <TabsTrigger value="login" className="w-2/4">Login</TabsTrigger>
          <TabsTrigger value="register" className="w-2/4">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login/>
        </TabsContent>
        <TabsContent value="register"><Register/></TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
