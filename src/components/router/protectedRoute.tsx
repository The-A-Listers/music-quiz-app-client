import { useContext } from 'react';
import { UserProfileContext } from "../userProfile/useUserProfile";
// import { Navigate } from 'react-router';
import { Navigate, useNavigate } from 'react-router-dom';
import Home from '../home/Home';

interface ProtectedRoute {
    children?: React.ReactNode;
}

export const useRequireUserProfile = () => {
    const { userProfile } = useContext(UserProfileContext);
    const navigate = useNavigate();
    const isUserProfileContextAvailable = userProfile !== null && userProfile.id !== "";

    console.log({ userProfile });

    if (!isUserProfileContextAvailable) {

    }
}

const ProtectedRoute: React.FC<ProtectedRoute> = ({ children }) => {
    const { userProfile } = useContext(UserProfileContext);
    const navigate = useNavigate();
    const isUserProfileContextAvailable = userProfile !== null && userProfile.id !== "";

    console.log({ userProfile });

    if (!isUserProfileContextAvailable) {
        return <Navigate to="/" />;
    }


    return children;
};

export default ProtectedRoute;