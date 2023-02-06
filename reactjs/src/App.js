import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import AuthService from './services/auth.service';

import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Series from './pages/Series';
import List from './pages/List';

function App() {

  // build a service to grab token when user signs in
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    // const user = false;
    if (user) {
      setCurrentUser(user);
    }
  }, [])  // only mount / unmount current component

  const logOut = () => {
    AuthService.logout();
  }
  return (
    <div>
      <h1>Logging in</h1>
      {/* create a view for login */}
      <div>
        {
          // currentUser ? <Dashboard /> : <Home />
          // currentUser === false
          currentUser ? <h2>Logged In</h2> : <h2>You are Logged Out</h2>
        }
      </div>
      <Header />
      <Routes>
        <Route path="/series/:id" exact element={<Series />} />
        <Route path="/list" exact element={<List />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
