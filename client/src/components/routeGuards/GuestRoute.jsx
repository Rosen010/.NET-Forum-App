import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

/**
 * GuestRoute - Guards routes that should only be accessible to guests
 * Redirects authenticated users to home page
 */
export default function GuestRoute({ children }) {
    const { isAuthenticated } = useUserContext();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Render the guest component if not authenticated
    return children;
}