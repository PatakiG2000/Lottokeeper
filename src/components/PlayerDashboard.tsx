import React, {useState} from 'react'
import GuessNumbers from './GuessNumbers'
import PlayerTicketList from './PlayerTicketList'
import "../styles/playerDashboard.css"
import { BiSolidPencil } from 'react-icons/bi'



type Props = {}

const PlayerDashboard = (props: Props) => {

  const [playerName, setPlayerName] = useState<undefined | string>(localStorage.getItem("playername") === "" ? "Guest" : localStorage.getItem("playername") as string)
  const [nameInput, setNameInput] = useState<string>("")
  const [inputShowing, setInputShowing] = useState(playerName ? false : true)



  function changePlayerName(name: string) {
    setPlayerName(name)
    setNameInput('')
    setInputShowing(!inputShowing)
    localStorage.setItem("playername", name)
  }

  /* Sorsolás eredményét még hozzáadni! */


  return (
    <div className='player-dashboard'>
    <div className='player-name'> 
    <div className='player-dashboard-name'>
    <h1>Welcome {playerName} </h1>
    {inputShowing && <input type='text' placeholder="Write your name here..." onChange={e => setNameInput(e.target?.value as any)} value={nameInput} />}
    <button onClick={() => changePlayerName(nameInput)}><BiSolidPencil/></button>
    </div>
    </div>
   <GuessNumbers />
    <PlayerTicketList />
    </div>
  )
}

export default PlayerDashboard