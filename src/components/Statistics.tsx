import { useContext } from 'react'
import { AppContext } from '../context/appContext'

import '../styles/statistics.css'


type Props = {


}

const StatisticsModule = (props: Props) => {

  const { statistics, tickets, drawn } = useContext(AppContext)

  return (
    <>
      {!drawn && <p>The statistics will be available after the draw</p>}
      {drawn && <h2>Statistics: </h2>}
      {drawn && <div className='statistics'>
        <div>All tickets: <i>{tickets.length}</i> </div>
        <div>Total revenue: <i>{tickets.length * 500} Akcse</i></div>
        <div>5 hits: <i>{statistics?.fiveHits}</i>  | Prize per ticket: <i>{statistics?.fiveHitsVictory} $</i></div>
        <div>4 hits: <i>{statistics?.fourHits} </i>  | Prize per ticket: <i> {statistics?.fourHitsVictory} $</i></div>
        <div>3 hits: <i>{statistics?.threeHits}</i>  | Prize per ticket: <i> {statistics?.threeHitsVictory} $</i></div>
        <div>2 hits: <i>{statistics?.twoHits} </i>  | Prize per ticket: <i>{statistics?.twoHitsVictory} $</i></div>
        <div>No hit:  <i>{statistics?.noHit}</i> </div>
        <div>Total prizes to be paid: <i>{statistics?.amountNeedToBePaid}</i> Akcse</div>
        <div>Total profit: <i>{tickets.length * 500 - statistics?.amountNeedToBePaid}</i> </div>
      </div>}
    </>
  )
}

export default StatisticsModule