import { useState, useContext } from 'react'
import { AppContext } from '../context/appContext'
import { nanoid } from "nanoid"
import "../styles/guessNumbers.css"


const GuessNumbers = () => {

    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
    const { addTickets, buyTicket, newRound, balance, drawn } = useContext(AppContext)

    function lotteryButtonAction(num: number) {
        if (selectedNumbers.includes(num)) {
            const filteredNumbers = selectedNumbers.filter(n => n !== num)
            setSelectedNumbers(filteredNumbers)
            return
        }
        if (selectedNumbers.length !== 5) {
            setSelectedNumbers([...selectedNumbers, num])
        } else {
            alert("You got all your numbers selected for this ticket, if you want to change a number double click to an already selected one")
        }
    }

    const arrayOfNumbers = []

    for (let i = 1; i <= 39; i++) {
        arrayOfNumbers.push(<button disabled={drawn} className={selectedNumbers.includes(i) ? "guess-button chosen" : "guess-button"} key={i} onClick={() => lotteryButtonAction(i)}  ><p>{i}</p></button>)
    }

    function generateTicket() {
        if (selectedNumbers.length !== 5) return
        if (balance.playerBalance < 500) {
            alert("Please deposit more money")
            setSelectedNumbers([])
            return
        }
        addTickets([{ numbers: selectedNumbers, owner: "player", id: nanoid() }])
        buyTicket()
        setSelectedNumbers([])
    }

    return (
        <div className='guess-component'>
            <h2 className=''>Choose numbers for your next ticket!</h2>
            <div className='number-container'>
                {arrayOfNumbers}
            </div>
            <h2>
                {drawn && "Start a new round to select numbers"}
                {selectedNumbers.length !== 5 && !drawn ? `Please select ${Math.abs(selectedNumbers.length - 5)} more!` : !drawn && "All numbers are selected for this ticket"}
            </h2>
            {!drawn && <button onClick={generateTicket} disabled={selectedNumbers.length !== 5} className={`submit-button ${selectedNumbers.length !== 5 ? "disabled" : ""}`}>Submit</button>}
            {drawn && <button onClick={newRound} className={`submit-button ${selectedNumbers.length !== 5 ? "disabled" : ""}`}>New Round</button>}
        </div>
    )
}

export default GuessNumbers