import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState, useSelector } from 'src/store';

interface MenuItem {
    link: string;
}
// Helper to check if the user has access to the current path
interface ProtectedRouteProps {
    component: FC;
    fallbackPath?: string;
}

// Helper to normalize and check URL path access
const hasPathAccess = (path: string): boolean => {
    try {
        let menuArray: MenuItem[] = useSelector((state: RootState) => state.SchoolList.MenuList);
        const accessGranted = menuArray.some(menu => menu.link === path);
        return accessGranted;
    } catch (error) {
        console.error('Error while checking path access:', error);
        return false;
    }
};

// Protected Route Component
export const ProtectedRoute: FC<ProtectedRouteProps> = ({
    component: Component,
    fallbackPath = '/RITeSchool/landing/landing',
}) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const fromInternal = location.state?.fromInternal;

    if (!hasPathAccess(currentPath)) {
        if (fromInternal) {
            return <Component />;
        } else {
            toast.error('Access Restricted. Please use the proper navigation links.');
            return <Navigate to={fallbackPath} state={{ from: location }} replace />;
        }
    }

    return <Component />;
};