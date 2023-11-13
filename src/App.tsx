import React, { useContext } from 'react';
import Money from './components/Money';
import { AppContext } from './context/appContext';
import PlayerDashboard from './components/PlayerDashboard';
import AdminDashboard from './components/AdminDashboard';
import { motion, AnimatePresence } from 'framer-motion';




import './App.css';

function App() {

  const { currentUser, changeCurrentUser, reset, newRound } = useContext(AppContext)
  const variants = {
    hidden: { opacity: 0, x: currentUser === 'player' ? -100 : -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (

    <div className="App">
      <div className='lottery-container'>
        <div className='header'>
      <div>
      <button>Guest</button>
      <button>Admin</button>
      </div>
      <Money currentUser={currentUser}/>
        </div>

   <button onClick={() => changeCurrentUser()}>Switch</button>
   {currentUser === "admin" && <button onClick={() => reset()}>New Game</button>}
   {currentUser === "admin" &&  <button onClick={() => newRound()}>New Round</button>}
   <AnimatePresence mode="wait">
   {currentUser === 'player' && (
            <motion.div
              key="player"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.3,
              }}
            >
              <PlayerDashboard />
            </motion.div>
          )}
     {currentUser === 'admin' && (
            <motion.div
              key="admin"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.3,
              }}
            >
              <AdminDashboard />
            </motion.div>
          )}
           </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
