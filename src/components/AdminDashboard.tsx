
import { useContext, useState } from "react"
import { AppContext } from "../context/appContext"
import React from 'react'
import { Ticket } from "../types/types"
import LottoTicket from "./LottoTicket"
import Statistics from "./Statistics"
import { nanoid } from "nanoid"

type Props = {}

const AdminDashboard = (props: Props) => {

  const { changeAdminBalance, balance, addTickets, tickets, checkWinningTickets } = useContext(AppContext)

  function generateFiveRandomNumbers(): number[] {
    const numbers = []
    for (let i = 0; i < 5; i++ ) {
      numbers.push(Math.floor(Math.random() * 39.99))
    }
    console.log(numbers)
    return numbers
  }

  const [winningNumbers, setWinningNumbers] = useState<null | number[]>(null)

  function generateWinningNumbers() {
    const winningNumbers = generateFiveRandomNumbers()
    setWinningNumbers(winningNumbers)
    checkWinningTickets(winningNumbers!)
    return winningNumbers
  }

  const [numberOfGames, setNumberOfGames] = useState<number>(0)

  function generateTickets(amount: number) {
    if(amount === 0) {
      return
    }
    if(amount >= 7500) {
      return
    }

    const generatedTickets: Ticket[] = []
    for (let i = 0; i < amount; i++) {
      const ticket = generateFiveRandomNumbers()
      generatedTickets.push({numbers: ticket, owner: "admin", id: nanoid()})
    }
    addTickets(generatedTickets)
    changeAdminBalance(balance.adminBalance + amount * 500)
  }

  const orderedTickets: Ticket[] = tickets.sort((a, b) => {
    if (a.owner === 'player' && b.owner === 'admin') {
      return -1; 
    } else if (a.owner === 'admin' && b.owner === 'player') {
      return 1; 
    } else {
      return 0; 
    }
  });


  return (
    <>
    <input type="number" onChange={(e) => setNumberOfGames(Number(e.target.value))} max={7500} placeholder="0 - 7499"/>
    <button onClick={() => generateTickets(numberOfGames)} disabled={numberOfGames < 1}>Generate {numberOfGames} tickets</button>
    <div>AdminDashboard</div>
    <button onClick={() => generateWinningNumbers()}>Sorsolás</button>
    <Statistics/>
    {winningNumbers}
    {orderedTickets.map((ticket) => (<LottoTicket numbers={ticket.numbers} owner={ticket.owner} luckyHit={ticket?.luckyHit} key={ticket.id}/>))}

    </>
    
  )
}

export default AdminDashboard