import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

export const router=createBrowserRouter([
    {
     path:'/',
     Component:MainLayout,
     children:[
     {
        path:'/',
        Component:Home,
     },
     {
        path:'/login',
        Component:Login
     },
     {
      path:'/signup',
      Component:SignUp
     }
     ]
    }
])