import React, { useContext } from 'react';
import Money from './components/Money';
import { AppContext } from './context/appContext';
import PlayerDashboard from './components/PlayerDashboard';
import AdminDashboard from './components/AdminDashboard';

import './App.css';

function App() {

  const { currentUser, changeCurrentUser, balance, changeBalance, reset } = useContext(AppContext)


  return (
    <div className="App">
   <Money balance={balance} currentUser={currentUser}/>
   <button onClick={() => changeCurrentUser()}>SwitchTryout</button>
   <button onClick={() => reset()}>Reset</button>
   {currentUser === "player" && <PlayerDashboard />}
   {currentUser === "admin" && <AdminDashboard />}
    </div>
  );
}

export default App;
