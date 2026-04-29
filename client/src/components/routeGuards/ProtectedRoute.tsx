import { Navigate } from 'react-router-dom';
import type { PropsWithChildren } from 'react';
import { useUserContext } from '../../contexts/UserContext';

/**
 * ProtectedRoute - Guards routes that require authentication
 * Redirects unauthenticated users to login page
 */
export default function ProtectedRoute({ children }: PropsWithChildren) {
    const { isAuthenticated } = useUserContext();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Render the protected component if authenticated
    return children;
}
