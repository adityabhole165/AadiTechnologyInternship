import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ScreenAccess {
    Screen_Id: string;
}

interface ProtectedRouteProps {
    screenId: string;
    component: FC;
    fallbackPath?: string;
}

// Helper to check screen access
export const hasScreenAccess = (screenId: string): boolean => {
    if (screenId === '0') return true;
    try {
        const allowedScreens = sessionStorage.getItem('AllowedScreens');
        if (!allowedScreens) return false;

        const parsedScreens: ScreenAccess[] = JSON.parse(allowedScreens);
        return Array.isArray(parsedScreens) &&
            parsedScreens.some(screen => screen.Screen_Id === screenId);
    } catch (error) {
        console.error('Error checking screen access:', error);
        return false;
    }
};
// Protected Route Component
export const ProtectedRoute: FC<ProtectedRouteProps> = ({
    screenId,
    component: Component,
    fallbackPath = '/RITeSchool/landing/landing'
}) => {
    const location = useLocation();
    if (!hasScreenAccess(screenId)) {
        toast.error('Access Restricted. Your account does not have the required permissions to access this page.');
        return <Navigate to={fallbackPath} state={{ from: location }} replace />;
    }
    return <Component />;
};