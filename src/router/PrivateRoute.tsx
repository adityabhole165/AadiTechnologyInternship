import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const isAuthenticated = () => {
    return Boolean(localStorage.getItem('auth')); 
};


const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/schoolList" replace />;
};

export default PrivateRoute;
