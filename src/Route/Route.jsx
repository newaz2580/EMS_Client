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
import PrivateRoutes from "../pages/Routes/PrivateRoutes";
import HrRoutes from "../pages/Routes/HrRoutes";
import AdminRoutes from "../pages/Routes/AdminRoutes";
import About from "../pages/About/About";
import Profile from "../Component/Shared/Profile";
import Overview from "../Component/Dashboard/Overview";

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
     },
     {
      path:'about',
      element:<About/>
     }
     ]
    },
    {
      path:'dashboard',
      element:<DashboardLayout/>,
      children:[
         {
          index:true,
          element:<PrivateRoutes><Overview></Overview></PrivateRoutes>
         },
         {
            path:'workSheet',
            element:<PrivateRoutes><WorkSheet/></PrivateRoutes>
         },
         {
            path:'paymentHistory',
            element:<PrivateRoutes><PaymentHistory/></PrivateRoutes>,
         },
         {
            path:'employeeList',
            element:<PrivateRoutes>
               <HrRoutes><EmployeeList/></HrRoutes>
            </PrivateRoutes>
         },
         {
            path:'employeeDetails/:email',
            element:<PrivateRoutes>
               <HrRoutes><EmployeeDetails/></HrRoutes>
               </PrivateRoutes>
         },
         {
            path:'progress',
            element:<PrivateRoutes>
              <HrRoutes> <Progress/></HrRoutes>
               </PrivateRoutes>
         },
         {
            path:'allEmployeeList',
            element:<PrivateRoutes>
            <AdminRoutes><AllEmployeeList/></AdminRoutes>
            </PrivateRoutes>
         },
         {
            path:'payroll',
            element:<PrivateRoutes>
               <AdminRoutes><Payroll/></AdminRoutes>
               </PrivateRoutes>
         },
         {
            path:'feedback',
            element:<PrivateRoutes>
            <AdminRoutes><UserFeedBack/></AdminRoutes>
            </PrivateRoutes>
         },
         {
            path:'profile',
            element:<PrivateRoutes>
               <Profile/>
            </PrivateRoutes>
         },
         // {
         //    path:'overview',
         //    element:<Overview/>
         // }
      ]
    }
])