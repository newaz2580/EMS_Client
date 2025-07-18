# 💼 Employee Management System

An advanced **Employee Management Platform** that provides full control over employee records, salary disbursements, HR and Admin access, authentication, and insightful dashboard summaries.

🔗 **Live Website**: [https://employee-management-app-e3a87.web.app]  
🔑 **Admin Login**  
- **Email**: admin@gmail.com  
- **Password**: 123456Aa@

## 🚀 Features

✅ **Secure Firebase Authentication**  
- Login via Email/Password and Google  
- Cookie-based JWT auth system for secure access  

✅ **Role-Based Dashboard Routing**  
- Dynamic redirects based on user role (Admin / HR / Employee)  
- Unauthorized access protection with route guards  

✅ **HR Dashboard Functionalities**  
- Filter employee work records by name and month  
- View total work hours and payroll summary  
- Approve salary payments with Stripe integration  
- Prevent duplicate salary disbursements for the same month

✅ **Admin Panel Capabilities**  
- View and manage all registered users  
- Promote regular users to HR  
- Fire (block) users and revoke access  
- Update employee salary (increment only)  
- Toggle between Table and Card view of employees  

✅ **Employee Panel**  
- View personal salary and work records  
- Check payment status (Paid / Unpaid)  
- Submit availability and request updates  

✅ **Stripe Payment Integration**  
- HRs can approve and issue salaries via Stripe  
- Secure and reliable transaction handling  
- Automatic record logging in MongoDB  

✅ **Responsive UI with Tailwind CSS + DaisyUI**  
- Clean, modern, and mobile-friendly design  
- Light/Dark mode support  

✅ **Dashboard Overview**  
- Real-time stats for Admin, HR, and Employees  
- Total employees, pending payments, and more  

✅ **Secure Backend with Express & MongoDB**  
- All APIs are protected with JWT verification  
- Role-based access and actions on the server side  

✅ **Full Stack Architecture**  
- Frontend: React, TanStack Query, Tailwind CSS  
- Backend: Express.js, MongoDB, Firebase Admin SDK  
- Auth: Firebase Auth with JWT Cookies  
- Payment: Stripe API

---

## 🛠️ Technologies Used

- JavaScript 
- React.js   
- Headless,Flowbite,Material tailwind others 
- Tailwind CSS  
- React Router DOM  
- Firebase Authentication  
- Express.js + MongoDB  
- Axios + React Query  
- Stripe Payment API  
- JWT (HTTP-only Cookie-based auth)  
- Vercel (Client) & Render (Server) Deployment




