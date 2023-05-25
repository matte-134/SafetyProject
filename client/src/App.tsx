import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login';
import { AuthContext, AuthContextType } from './context/AuthContext';
import { Users } from './components/Users';
import { IdContext, IdContextType } from './context/IdContext';
import { Dashboard } from './components/Dashboard';
import { Register } from './components/Register';



function App() {

const [isLoggedIn, setIsLoggedIn] = React.useState(false);
const [userId, setUserId] = React.useState("")  

const authContextValue: AuthContextType = {
    isLoggedIn,
    setIsLoggedIn,
  }
const idContextValue: IdContextType = {
    userId,
    setUserId,
}
  return (
    <AuthContext.Provider value={authContextValue}>
      <IdContext.Provider value={idContextValue}>
    <div className="App">
      <Register />
      {!isLoggedIn ? <Login /> : null}
      {isLoggedIn ?
      <> 
      {/* <Users /> */}
      <Dashboard /> 
      </>
      : null}
    </div>
    </IdContext.Provider>
    </AuthContext.Provider>
    
  );
}

export default App;
