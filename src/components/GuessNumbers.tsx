import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'
import { nanoid } from "nanoid"
import "../styles/guessNumbers.css"



type Props = {}

const GuessNumbers = (props: Props) => {

    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
    const { addTickets, buyTicket, balance } = useContext(AppContext)

    function lotteryButtonAction(num: number){
        if(selectedNumbers.includes(num)) {
            const filteredNumbers = selectedNumbers.filter(n => n !== num)
            setSelectedNumbers(filteredNumbers)
            return
        }
        if(selectedNumbers.length !== 5) {
            setSelectedNumbers([...selectedNumbers, num])
        } else {
            alert("You got all your numbers selected for this ticket, if you want to change a number double click to an already selected one")
        }
    }

    const arrayOfNumbers = []

    for (let i = 1; i <= 39; i++) {
        arrayOfNumbers.push(<button className='guess-button' key={i} onClick={() => lotteryButtonAction(i)} style={{backgroundColor: selectedNumbers.includes(i) ? "red" : "green"}} ><p>{i}</p></button>)
    }

    function generateTicket() {
        if(balance.playerBalance < 500) {
            alert("Please deposit more money")
            setSelectedNumbers([])
            return
        }
            addTickets([{numbers: selectedNumbers, owner: "player", id: nanoid()}])
            buyTicket()
            setSelectedNumbers([])
    }

  return (
    <div className='guess-component'>
        <h2 className=''>Choose the numbers for your next ticket!</h2>
        <div className='number-container'>
        {arrayOfNumbers}
        </div>
        <h2>
        {selectedNumbers.length !== 5 ? `Please select ${Math.abs(selectedNumbers.length - 5)} more!` : "All numbers are selected for this ticket"}
        </h2>
        <button onClick={generateTicket} disabled={selectedNumbers.length !== 5} className='submit-button'>Submit</button>
    </div>
  )
}

export default GuessNumbers