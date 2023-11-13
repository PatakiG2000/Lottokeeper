import { useContext } from 'react'
import { AppContext } from '../context/appContext'
import { useState } from 'react'

type Props = {}

const PlayerTicketList = (props: Props) => {

    const { playerTickets } = useContext(AppContext)
    const [orderedTickets, setOrderedTickets] = useState(playerTickets)


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

  const handleSelectionChange = (e: any) => {
    const selectedValue = e.target.value;
    sortPlayerTickets(selectedValue)
    console.log(selectedValue)
  };


  return (
    <>
    <select name="sorting"  onChange={handleSelectionChange}>
        <option value="default">Rendezés</option>
       <option value="ascending">Találat növekvő</option>
       <option value="descending">Találat csökkenő</option>
    </select>
    <div>PlayerTicketList</div>
    {orderedTickets.map(ticket => <div>  {ticket.numbers}Hit: {ticket.luckyHit} Nyeremény: {ticket.wonAmount}</div>)}
    </>
  )
}

export default PlayerTicketList