import PlayerDashboard from './components/ui/PlayerDashboard';
import AdminDashboard from './components/ui/AdminDashboard';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/ui/Header';
import { AppContext } from './context/appContext';
import { useContext } from 'react'


import './App.css';

function App() {

  const { currentUser, changeCurrentUser } = useContext(AppContext)

  const variants = {
    hidden: { opacity: 0, x: currentUser === 'player' ? -100 : -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (

    <div className="App">
      <div className='lottery-container'>
        <Header currentUser={currentUser} changeUser={changeCurrentUser} />
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
