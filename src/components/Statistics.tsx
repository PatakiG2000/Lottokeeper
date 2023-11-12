import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'
import { Statistics } from '../types/types'

type Props = {}

const StatisticsModule = (props: Props) => {

    const { tickets } = useContext(AppContext)
    const [statistics, setStatistics] = useState<Statistics>({
        fiveHits: 0,
        fourHits: 0,
        threeHits: 0,
        twoHits: 0,
        noHit: 0,
    })

    function calculateStatistics() {
        const stats: Statistics = {
            fiveHits: 0,
            fourHits: 0,
            threeHits: 0,
            twoHits: 0,
            noHit: 0,
        }
        tickets.forEach(ticket => {
            if(ticket.luckyHit === 5){
                stats.fiveHits++
            } else if(ticket.luckyHit === 4) {
                stats.fourHits++
            } else if(ticket.luckyHit === 3)  {
                stats.threeHits++
            } else if(ticket.luckyHit === 2) {
                stats.twoHits++
            } else if (ticket.luckyHit === 1 || ticket.luckyHit === 0) {
                stats.noHit++
        }
    })

    setStatistics(stats)
}

useEffect(() => {
    calculateStatistics()
}, [tickets])



  return (
    <>
    <div>Összes szelvény: {tickets.length} </div>
    <div>Összes bevétel: {tickets.length * 500} Akcse</div>
    <div>5 hit: {statistics.fiveHits} Nyeremény szelvényenként: </div>
    <div>4 hit: {statistics.fourHits}  Nyeremény szelvényenként: </div>
    <div>3 hit: {statistics.threeHits} Nyeremény szelvényenként: </div>
    <div>2 hit: {statistics.twoHits}  Nyeremény szelvényenként: </div>
    <div>No hit: {statistics.noHit} </div>
    <div>Összes kifizetendő nyeremény: </div>
    <div>Összes bevétel: {tickets.length * 500} </div>
    </>
  )
}

export default StatisticsModule