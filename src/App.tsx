import React, { useContext } from 'react';
import GuessNumbers from './components/GuessNumbers';
import Money from './components/Money';
import { AppContext } from './context/appContext';

import './App.css';

function App() {

  const { currentUser, changeCurrentUser } = useContext(AppContext)


  return (
    <div className="App">
      {currentUser}
   App <Money />
   <GuessNumbers />
   <button onClick={() => changeCurrentUser()}>SwitchTryout</button>
    </div>
  );
}

export default App;
