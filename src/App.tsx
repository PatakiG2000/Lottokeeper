import React, { useContext } from 'react';
import Money from './components/Money';
import { AppContext } from './context/appContext';
import PlayerDashboard from './components/PlayerDashboard';
import AdminDashboard from './components/AdminDashboard';


import './App.css';

function App() {

  const { currentUser, changeCurrentUser, reset, newRound } = useContext(AppContext)


  return (
    <div className="App">
   <Money currentUser={currentUser}/>
   <button onClick={() => changeCurrentUser()}>Switch</button>

   {currentUser === "admin" && <button onClick={() => reset()}>New Game</button>}
   {currentUser === "admin" &&  <button onClick={() => newRound()}>New Round</button>}
   {currentUser === "player" && <PlayerDashboard />}
   {currentUser === "admin" && <AdminDashboard />}
    </div>
  );
}

export default App;
