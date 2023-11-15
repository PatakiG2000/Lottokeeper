import { useContext, useState } from 'react'
import { AppContext } from '../context/appContext'
import { Ticket } from '../types/types'
import { nanoid } from 'nanoid'

import "../styles/adminDashboard.css"

const GameControl = () => {

  const { reset, newRound, addTickets, changeAdminBalance, draw, drawn, balance, tickets } = useContext(AppContext)
  const [numberOfGames, setNumberOfGames] = useState<number>(0)

  function generateFiveRandomNumbers(): number[] {
    const numbers: number[] = [];

    while (numbers.length < 5) {
      let randomNumber = Math.floor(Math.random() * 39 + 1);
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }

    return numbers;
  }

  function generateTickets(amount: number) {
    if (amount === 0) {
      return
    }
    if (amount >= 3000) {
      return
    }

    const generatedTickets: Ticket[] = []
    for (let i = 0; i < amount; i++) {
      const ticket = generateFiveRandomNumbers()
      generatedTickets.push({ numbers: ticket, owner: "admin", id: nanoid() })
    }
    addTickets(generatedTickets)
    changeAdminBalance(balance.adminBalance + amount * 500)
  }


  function generateWinningNumbers() {
    if (tickets.length < 1) {
      alert("Please generate tickets first either as an admin or player")
      return
    }
    if (!drawn) {
      const winningNumbers = generateFiveRandomNumbers()
      draw(winningNumbers)
      return winningNumbers
    }
  }


  return (
    <>
      <div>
        <button className="admin-reset-btn" onClick={() => reset()}>New Game</button>
      </div>
      <input className="admin-input" type="number" disabled={drawn} onChange={(e) => setNumberOfGames(Number(e.target.value))} max={3000} placeholder="0 - 2999" />
      <button className={`admin-reset-btn ${drawn ? "disabled" : ""}`} onClick={() => generateTickets(numberOfGames)} disabled={drawn}>Generate {numberOfGames} tickets</button>
      <div>
        {!drawn ? <button className={`admin-reset-btn ${drawn ? "disabled" : ""}`} onClick={() => generateWinningNumbers()} disabled={drawn}>Draw</button> : <button className="admin-reset-btn" onClick={() => newRound()}>New Round</button>}
      </div>
    </>
  )
}

export default GameControl