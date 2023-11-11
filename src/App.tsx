import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Router from './components/router/router'
import { UserProfile, UserProfileContext, NULL_USER } from './components/userProfile/useUserProfile';
import { useState } from 'react';

document.title = 'Tangled Tunes';

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(NULL_USER);

  return (
    <>
      <BrowserRouter>
        <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
          <Router />
        </UserProfileContext.Provider >
      </BrowserRouter>
    </>
  )
}

export default App
