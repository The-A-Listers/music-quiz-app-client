import React, { useContext } from 'react';
// import Nav from './nav';

import { UserProfileContext } from "../userProfile/useUserProfile";

const Header: React.FC = () => {
    const { userProfile, } = useContext(UserProfileContext);

    return <header className="mainHeader">
        <div className='userInfo'></div >
        <h1>🎵🎶Tangled Tunes🎵🎶</h1>
        <div className='userInfo'>
            {userProfile?.picture && userProfile?.picture != "" && <img src={userProfile.picture} alt="user image" />}
            <div className="userText">
                {userProfile?.name && <div>Name:<br></br> {userProfile.name}</div>}
                {userProfile?.email && <div>Email:<br /> {userProfile.email}</div>}
            </div>
        </div>
    </header >;
}
export default Header;