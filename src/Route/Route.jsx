import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DashboardLayout from "../Layout/DashboardLayout";
import WorkSheet from "../Component/Dashboard/Employee/Work-sheet";
import PaymentHistory from "../Component/Dashboard/Employee/PaymentHistory";
import ErrorPage from "../Component/ErrorPage/ErrorPage";
import EmployeeList from "../Component/Dashboard/HumanResource/EmployeeList";
import EmployeeDetails from "../Component/Dashboard/HumanResource/EmployeeDetails";
import Progress from "../Component/Dashboard/HumanResource/Progress";
import AllEmployeeList from "../Component/Dashboard/Admin/AllEmployeeList";
import Payroll from "../Component/Dashboard/Admin/Payroll";
import ContactUS from "../pages/Contact/ContactUS";
import UserFeedBack from "../Component/Dashboard/Admin/UserFeedBack";

export const router=createBrowserRouter([
    {
     path:'/',
     Component:MainLayout,
     errorElement:<ErrorPage/>,
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
     },
     {
      path:'contact',
      element:<ContactUS></ContactUS>
     }
     ]
    },
    {
      path:'dashboard',
      element:<DashboardLayout/>,
      children:[
         {
            path:'workSheet',
            element:<WorkSheet/>
         },
         {
            path:'paymentHistory',
            element:<PaymentHistory/>,
         },
         {
            path:'employeeList',
            element:<EmployeeList/>
         },
         {
            path:'employeeDetails/:email',
            element:<EmployeeDetails/>
         },
         {
            path:'progress',
            element:<Progress/>
         },
         {
            path:'allEmployeeList',
            element:<AllEmployeeList/>
         },
         {
            path:'payroll',
            element:<Payroll/>
         },
         {
            path:'feedback',
            element:<UserFeedBack/>
         }
      ]
    }
])