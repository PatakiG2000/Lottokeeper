import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'


type Props = {

    
}

const StatisticsModule = (props: Props) => {

   /*  Statisztikát kapja meg a contextből!!! */
  /*  A rewardokkal együtt! */

  const { statistics, tickets } = useContext(AppContext)

  return (
    <>
    <div>Összes szelvény: {tickets.length} </div>
    <div>Összes bevétel: {tickets.length * 500} Akcse</div>
    <div>5 hit: {statistics?.fiveHits} Nyeremény szelvényenként: {statistics?.fiveHitsVictory}</div>
    <div>4 hit: {statistics?.fourHits}  Nyeremény szelvényenként: {statistics?.fourHitsVictory}</div>
    <div>3 hit: {statistics?.threeHits} Nyeremény szelvényenként: {statistics?.threeHitsVictory}</div>
    <div>2 hit: {statistics?.twoHits}  Nyeremény szelvényenként: {statistics?.twoHitsVictory}</div>
    <div>No hit: {statistics?.noHit} </div>
    <div>Összes kifizetendő nyeremény: {statistics?.amountNeedToBePaid} Akcse</div>
    <div>Összes nyereség: {tickets.length * 500 - statistics?.amountNeedToBePaid} </div>
    </>
  )
}

export default StatisticsModule