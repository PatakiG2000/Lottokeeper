import { useContext } from 'react'
import { AppContext } from '../context/appContext'
import { useState } from 'react'
import LottoTicket from './LottoTicket'
import "../styles/playerticket.css"

type Props = {}

const PlayerTicketList = (props: Props) => {

    const { playerTickets } = useContext(AppContext)
    const [orderedTickets, setOrderedTickets] = useState([...playerTickets])


  function sortPlayerTickets(direction: string) {
    const ticketDisplay = [...playerTickets]
    if(direction === 'ascending') {
      ticketDisplay.sort((a, b) => a.luckyHit! - b.luckyHit!)
      setOrderedTickets(ticketDisplay)
    } else if(direction === 'descending') {
      ticketDisplay.sort((a, b) => b.luckyHit! - a.luckyHit!)
      setOrderedTickets(ticketDisplay)
    } else return

  }

  /*  TODO fix ticket sorting */

  const handleSelectionChange = (e: any) => {
    const selectedValue = e.target.value;
    sortPlayerTickets(selectedValue)
    console.log(selectedValue)
  };


  return (
    <div className='player-ticket-component'>
      <div className='playerticket-header'>
      <h2>My tickets: </h2>
      <select name="sorting"  onChange={handleSelectionChange}>
      <option value="default">Rendezés</option>
       <option value="ascending">Találat növekvő</option>
       <option value="descending">Találat csökkenő</option>
    </select>
      </div>
    <ul className='playerticket-list'>
    {orderedTickets.map(ticket => <li key={ticket.id}><LottoTicket numbers={ticket.numbers} luckyHit={ticket.luckyHit} owner={ticket.owner} wonAmount={ticket.wonAmount} /></li>)}
    </ul>
    </div>
  )
}

export default PlayerTicketList