import { useState, useEffect } from 'react'
import LottoTicket from './LottoTicket'
import "../styles/playerticket.css"
import { Ticket } from '../types/types'
import { User } from '../types/types'



type Props = {
  tickets: Ticket[]
  winningNumbers: number[],
  drawn: boolean,
  currentUser: User
}

const TicketList = ({ tickets, winningNumbers, drawn, currentUser }: Props) => {

  const [orderedTickets, setOrderedTickets] = useState<Ticket[]>([])

  useEffect(() => {
    setOrderedTickets([...tickets])
  }, [tickets])


  function sortTickets(direction: string) {
    const ticketDisplay = [...tickets]
    if (direction === 'ascending') {
      ticketDisplay.sort((a, b) => a.luckyHit! - b.luckyHit!)
      setOrderedTickets(ticketDisplay)
    } else if (direction === 'descending') {
      ticketDisplay.sort((a, b) => b.luckyHit! - a.luckyHit!)
      setOrderedTickets(ticketDisplay)
    } else return

  }

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    sortTickets(selectedValue)
  };

  const ticketList = orderedTickets.map(ticket => <li key={ticket.id}><LottoTicket winningNumbers={winningNumbers} currentUser={currentUser} numbers={ticket.numbers} luckyHit={ticket.luckyHit} owner={ticket.owner} wonAmount={ticket.wonAmount} drawn={drawn} /></li>)

  const sorting = <select name="sorting" onChange={handleSelectionChange} className='player-ticket-selecting'>
    <option value="default">Sort by: </option>
    <option value="ascending">Hits: low to high</option>
    <option value="descending">Hits: hight to low</option>
  </select>

  return (
    <div className='player-ticket-component'>
      <div className='playerticket-header'>
        <h2> My tickets: </h2>
        {drawn && sorting}
      </div>
      <ul className='playerticket-list'>
        {ticketList}
      </ul>
    </div>
  )
}

export default TicketList