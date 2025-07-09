import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DashboardLayout from "../Layout/DashboardLayout";
import WorkSheet from "../Component/Dashboard/Employee/Work-sheet";
import PaymentHistory from "../Component/Dashboard/Employee/PaymentHistory";

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
    },
    {
      path:'dashboard',
      element:<DashboardLayout/>,
      children:[
         {
            index:true,
            element:<WorkSheet/>
         },
         {
            path:'paymentHistory',
            element:PaymentHistory,
         }
      ]
    }
])