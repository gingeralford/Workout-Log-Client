import React, { useEffect, useState } from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';

function App() {
  const [sessionToken, setSessionToken] = useState('');
  //using useState Hook to create a new state variable, sessionToken, will be empty, then have value, then emptied again

  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])
  //only runs on initial component load, because dependency is set to nothing. Just sets token to the localStorage token, if it exists

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }
  //this takes a token (from API call) and sets it in both localStorage and in the variable.

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken} /> : <Auth updateToken={updateToken} /> )
  }

  return (
    <div>
      <Sitebar clickLogout={clearToken} />
      {/* <Auth updateToken={updateToken} /> */}
      {protectedViews()}
    </div>
  );
}

export default App;
