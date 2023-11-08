import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Router from './components/router/router'
import { UserProfile, UserProfileContext } from './components/userProfile/useUserProfile';
import { useState } from 'react';

document.title = 'SwapSounds from The A-Listers';

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

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
