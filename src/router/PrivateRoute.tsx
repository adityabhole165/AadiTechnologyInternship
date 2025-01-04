import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
    return Boolean(localStorage.getItem("auth"));
};



const PrivateRoute = () => {
    const [authStatus, setAuthStatus] = useState(isAuthenticated());

    useEffect(() => {
        let timeoutId;

        const resetInactivityTimeout = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                localStorage.removeItem("auth");
                sessionStorage.clear();
                setAuthStatus(false);
            }, 60 * 60 * 1000); // Timeout after 5 minutes of inactivity
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

    if (!authStatus) {
        return <Navigate to="/Sessionlogout?reason=session_expired" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
