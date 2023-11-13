import { Ticket } from '../types/types'
import "../styles/lottoTicket.css"




const LottoTicket = ({numbers, owner, luckyHit, wonAmount}: Ticket) => {

  const bettingNumbers =  numbers.map((number) => <p>{number}</p>)

  return (
    <div className='ticket'>
      <div className='betted-number-container'>
     {bettingNumbers}
      </div>
      luckyHit: {!luckyHit ? "0" : luckyHit}
      {owner === "admin" && "generated"}
      {owner === "player" && "byPlayer"}
    </div>
  )
}

export default LottoTicket