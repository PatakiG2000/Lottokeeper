import { Ticket } from '../types/types'
import "../styles/lottoTicket.css"
import TicketNumbers from './TicketNumbers'
import { User } from '../types/types'


interface Props extends Ticket {
  drawn: boolean
  currentUser?: User
  winningNumbers: number[]
}


const LottoTicket = ({ numbers, owner, luckyHit, wonAmount, drawn, currentUser, winningNumbers }: Props) => {

  return (
    <div className='ticket'>
      <div className='ticket-number-container'>
        <TicketNumbers numbers={numbers} winningNumbers={winningNumbers} />
      </div>
      {drawn && <div>
        luckyHits: <i>{!luckyHit ? "0" : luckyHit}</i> | won: <i>{wonAmount} </i>$
      </div>}
      {currentUser === "admin" && <div>
        {owner === "admin" && "AdminTicket"}
        {owner === "player" && "PlayerTicket"}
      </div>}
    </div>
  )
}

export default LottoTicket