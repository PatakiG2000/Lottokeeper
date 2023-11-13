import React from 'react'
import { Ticket } from '../types/types'



const LottoTicket = ({numbers, owner, luckyHit, wonAmount}: Ticket) => {
  return (
    <div style={{display: "flex", gap: "2px"}}>
    <div>Ticket</div>
    {numbers.map((number) => number)}
    luckyHit: {luckyHit}
    {owner === "admin" && "generated"}
    {owner === "player" && "byPlayer"}
    </div>
  )
}

export default LottoTicket