import React, { useState } from 'react'


type Props = {}

const GuessNumbers = (props: Props) => {

    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])

    console.log(selectedNumbers)
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
        arrayOfNumbers.push(<button key={i} onClick={() => lotteryButtonAction(i)} style={{backgroundColor: selectedNumbers.includes(i) ? "red" : "green"}}>{i}</button>)
    }

  return (
    <div>
        GuessNumbers
        {arrayOfNumbers}
        {selectedNumbers.length !== 5 ? `Please select ${Math.abs(selectedNumbers.length - 5)} more!` : "All numbers are selected for this ticket"}
        <button onClick={() => console.log(selectedNumbers)} disabled={selectedNumbers.length !== 5}>Submit</button>
    </div>
  )
}

export default GuessNumbers