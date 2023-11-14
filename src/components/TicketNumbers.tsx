import "../styles/lottoTicket.css"
import { nanoid } from "nanoid"

type Props = {
  winningNumbers: number[]
  numbers: number[]
}

const TicketNumbers = ({ winningNumbers, numbers }: Props) => {

  const bettingNumbers = numbers?.map((number) => <div key={nanoid()} className={`lottery-ticket-number ${winningNumbers?.includes(number) ? "won-number" : ""}`}><p>{number}</p></div>)

  return (
    <div className='betted-number-container'>
      {bettingNumbers}
    </div>
  )
}

export default TicketNumbers