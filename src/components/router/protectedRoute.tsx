import { useContext } from 'react';
import { UserProfileContext } from "../userProfile/useUserProfile";
import { Navigate } from 'react-router-dom';

interface ProtectedRoute {
    children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRoute> = ({ children }) => {
    const { userProfile } = useContext(UserProfileContext);
    const isUserProfileContextAvailable = userProfile !== null && userProfile.id !== "";

    console.log({ userProfile });

    if (!isUserProfileContextAvailable) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;