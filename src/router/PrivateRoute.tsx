import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
    return Boolean(localStorage.getItem("auth"));
};



const PrivateRoute = () => {
    const [authStatus, setAuthStatus] = useState(isAuthenticated());

    useEffect(() => {
        let timeoutId;

        const resetInactivityTimeout = () => {
            // Clear the existing timeout
            clearTimeout(timeoutId);
            // Set a new timeout for 2 minutes
            timeoutId = setTimeout(() => {
                localStorage.removeItem("auth"); // Remove auth token
                sessionStorage.clear();
                setAuthStatus(false); // Update the state
            }, 30 * 1000); // 2 minutes
        };

        
        const activityEvents = ["mousemove", "keydown", "click"];

        
        activityEvents.forEach((event) =>
            window.addEventListener(event, resetInactivityTimeout)
        );

      
        resetInactivityTimeout();

     
        return () => {
            activityEvents.forEach((event) =>
                window.removeEventListener(event, resetInactivityTimeout)
            );
            clearTimeout(timeoutId);
        };
    }, []);

    return authStatus ? <Outlet /> : <Navigate to="/Sessionlogout" replace />;


    
};

export default PrivateRoute;
