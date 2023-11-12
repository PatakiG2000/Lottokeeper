import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'

type Props = {}

const PlayerTicketList = (props: Props) => {

    const { playerTickets } = useContext(AppContext)

  return (
    <>
    <select name="sorting" id="sorting">
       <option value="hitUp">Találat növekvő</option>
       <option value="hitDown">Találat csökkenő</option>
    </select>
    <div>PlayerTicketList</div>
    {playerTickets.map((ticket) => <div key={ticket.id}>{ticket.numbers} {ticket?.luckyHit} Hit</div>)}
    Összes nyeremény:
    </>
  )
}

export default PlayerTicketList