import { useState, useContext } from 'react'
import GuessNumbers from '../GuessNumbers'
import "../../styles/playerDashboard.css"
import { BiSolidPencil } from 'react-icons/bi'
import TicketList from '../TicketList'
import { AppContext } from '../../context/appContext'
import TicketNumbers from '../TicketNumbers'


const PlayerDashboard = () => {

  const [playerName, setPlayerName] = useState<undefined | string>(localStorage.getItem("playername") === "" ? "Guest" : localStorage.getItem("playername") as string)
  const [nameInput, setNameInput] = useState<string>("")
  const [inputShowing, setInputShowing] = useState(playerName ? false : true)


  const { winningNumbers, drawn, playerWinnings, playerTickets, setPlayername: setNameInContext } = useContext(AppContext)



  function changePlayerName(name: string) {
    const newName = name !== "" ? name : "Guest"
    setPlayerName(newName)
    setNameInContext(newName)
    setNameInput('')
    setInputShowing(!inputShowing)
    localStorage.setItem("playername", newName)
  }




  return (
    <div className='player-dashboard'>
      <div className='player-name'>
        <div className='player-dashboard-name'>
          <h1>Welcome {playerName} </h1>
          {inputShowing && <div>
            <input name='name-input' onKeyDown={e => e.key === 'Enter' ? changePlayerName(nameInput) : ""} className='namechange' type='text' placeholder="Enter your new name..." onChange={e => setNameInput(e.target?.value as string)} value={nameInput} maxLength={10} />
          </div>}
          <button onClick={() => setInputShowing(!inputShowing)}><BiSolidPencil /></button>
        </div>
      </div>
      <GuessNumbers />
      <h2 className='winning-numbers'>Winning numbers: {winningNumbers.length > 0 ? <TicketNumbers numbers={winningNumbers} winningNumbers={winningNumbers} /> : "Yet to be drawn"} </h2>
      <h2>Winnings: {winningNumbers.length > 0 ? playerWinnings + "$" : "Yet to be drawn"} </h2>
      <TicketList tickets={playerTickets} winningNumbers={winningNumbers} drawn={drawn} currentUser='player' />
    </div>
  )
}

export default PlayerDashboard