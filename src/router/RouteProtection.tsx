import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

interface MenuItem {
    id: string;
    title?: string;
    link: string;
    screenId: number;
}

const menuList: MenuItem[] = JSON.parse(sessionStorage.getItem('sideList') || '[]');

interface ProtectedRouteProps {
    component: FC;
    fallbackPath?: string;
}

// Helper to check URL path access
const hasPathAccess = (path: string): boolean => {
    try {
        return menuList.some(menu => menu.link === path);
    } catch (error) {
        console.error('Error checking path access:', error);
        return false;
    }
};

// Protected Route Component
export const ProtectedRoute: FC<ProtectedRouteProps> = ({
    component: Component,
    fallbackPath = '/RITeSchool/landing/landing'
}) => {
    const location = useLocation();
    const currentPath = location.pathname; // Get the current path
    const fromInternal = location.state?.fromInternal; // Check if navigation is internal
    console.log('currentPath', currentPath);
    console.log('fromInternal', fromInternal);

    // Check if the current path is allowed based on access control
    if (!hasPathAccess(currentPath)) {
        // If it's an internal navigation (through button or link), allow access
        if (fromInternal) {
            return <Component />;
        } else {
            // Show restricted access message for external navigation (URL typed manually)
            toast.error('Access Restricted. Please use the proper navigation links.');
            return <Navigate to={fallbackPath} state={{ from: location }} replace />;
        }
    }

    return <Component />;
};
