
import { useContext, useState, useEffect } from "react"
import { AppContext } from "../../context/appContext"
import { Ticket } from "../../types/types"
import Statistics from "../Statistics"
import TicketNumbers from "../TicketNumbers"
import GameControl from "../GameControl"
import TicketList from "../TicketList"

import '../../styles/adminDashboard.css'

type Props = {}

const AdminDashboard = (props: Props) => {


  const { tickets, drawn, winningNumbers: storedWinningNumbers } = useContext(AppContext)



  const orderedTickets: Ticket[] = tickets.sort((a, b) => {
    if (a.owner === 'player' && b.owner === 'admin') {
      return -1;
    } else if (a.owner === 'admin' && b.owner === 'player') {
      return 1;
    } else {
      return 0;
    }
  });

  const [orderedByAdminTickets, setOrderedByAdminTickets] = useState<Ticket[]>([])

  useEffect(() => {
    setOrderedByAdminTickets([...orderedTickets])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets])



  return (
    <>
      <div>
        <h1>AdminDashboard</h1>
        <GameControl />
      </div>
      <Statistics />
      <div className="winning-numbers-admin">Winning numbers: {drawn ? <TicketNumbers numbers={storedWinningNumbers} winningNumbers={storedWinningNumbers} /> : "It hasn't been drawn yet"} </div>
      <div className="tickets">
        <TicketList tickets={orderedByAdminTickets} winningNumbers={storedWinningNumbers} drawn={drawn} currentUser="admin" />
      </div>
    </>

  )
}

export default AdminDashboard