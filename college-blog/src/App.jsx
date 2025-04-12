import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import StudentLogin from './pages/student/StudentLogin';
import StudentRegister from './pages/student/StudentRegister';
import ClubLogin from './pages/club/ClubLogin';
import ClubRegister from './pages/club/ClubRegister';
import StudentHome from './pages/student/StudentHome';
import ClubHome from './pages/club/ClubHome';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';


import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
axios.defaults.withCredentials = true;

export default function App() {


 
 
  return (
    
    <Router>
         <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Landing/Home Page */}
        <Route path="/" element={<Home />} />

        {/* Student Auth */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />

        {/* Club Auth */}
        <Route path="/club/login" element={<ClubLogin />} />
        <Route path="/club/register" element={<ClubRegister />} />

        {/* Redirect based on role */}
        <Route
          path="/student/home"
          element={
            <StudentHome /> 
          }
        />

        <Route
          path="/club/home"
          element={
            <ClubHome /> 
          }
        />

        <Route
          path="/admin"
          element={
            <AdminDashboard /> 
          }
        />
  

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
