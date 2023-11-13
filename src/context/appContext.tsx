
import { ReactNode, createContext, useState } from "react"
import { Ticket } from "../types/types"
import { useEffect } from "react"
import { Statistics } from "../types/types"


/* Tárolja a ticketeket is legyen külön ticket komponens */
/* Húzást meg a nyeremények kiosztását a balnce állítás legyen egy nagy functionbe több kis functionnel */

export const AppContext = createContext<{
    currentUser: "admin" | "player",
    changeCurrentUser: () => void,
    balance: {playerBalance: number,
    adminBalance: number},
    reset: () => void,
    tickets: Ticket[],
    addTickets: (newTickets: Ticket[]) => void,
    changeAdminBalance: (amount: number) => void,
    buyTicket: () => void,
    newRound: () => void,
    playerTickets: Ticket[],
    drawn: boolean,
    draw: (winningNumbers: number[]) => void,
    statistics: Statistics

    
}>({
  changeCurrentUser: () => {},
  addTickets: () => {},
  changeAdminBalance: () => {},
  buyTicket: () => {},
  newRound: () => {},
  reset: () => {},
    currentUser: "player",
    balance: {playerBalance: 0,
        adminBalance: 0},
    tickets: [],
    playerTickets: [],
    drawn: false,
    draw: () => {},
    statistics: {
      fiveHits: 0,
      fiveHitsVictory: 0,
      fourHits: 0,
      fourHitsVictory: 0,
      threeHits: 0,
      threeHitsVictory: 0,
      twoHits: 0,
      twoHitsVictory: 0,
      noHit: 0,
      amountNeedToBePaid: 0,
    }
})

export function AppContextProvider({children}: {children: ReactNode}) {


const [currentUser, setCurrentUser] = useState<"admin" | "player">("player")

const [playerTickets, setPlayerTickets] = useState<Ticket[]>([])
const [tickets, setTickets] = useState<Ticket[]>([])

const [drawn, setDrawn] = useState<boolean>(false)

const [balance, setBalance]= useState<{playerBalance: number,
adminBalance: number}>({
    playerBalance: JSON.parse(localStorage.getItem("playermoney") as string),
    adminBalance:  JSON.parse(localStorage.getItem("adminmoney") as string),
})

const [statistics, setStatistics] = useState<any>()

useEffect(() => {
    localStorage.setItem("playermoney", JSON.stringify(balance.playerBalance));
    localStorage.setItem("adminmoney", JSON.stringify(balance.adminBalance));
}, [balance]);

function changeCurrentUser() {
    setCurrentUser(currentUser === "admin" ? "player" : "admin")
}

function changeAdminBalance( amount: number) {
    const updatedBalance = {
      ...balance,
      adminBalance : amount,
    }
    localStorage.setItem(`${"admin"}money`, JSON.stringify(updatedBalance[`${"admin"}Balance`]))
    setBalance(updatedBalance)
  }


  function changePlayerBalance(amount: number) {
    setBalance((prevBalance) => {
      const updatedBalance = {
        ...prevBalance,
        playerBalance: amount,
      };
  
      localStorage.setItem("playermoney", JSON.stringify(updatedBalance.playerBalance));
      
      return updatedBalance;
    });
  }

function addTickets(newTickets: Ticket[]){
    setTickets([...tickets, ...newTickets])
}

function buyTicket(){
      setBalance((prevBalance) => {
      const updatedBalance = {
        ...prevBalance,
        playerBalance: prevBalance?.playerBalance - 500,
        adminBalance: prevBalance?.adminBalance + 500,
      };
  
      localStorage.setItem("playermoney", JSON.stringify(updatedBalance.playerBalance));
      
      return updatedBalance;
    });
}


useEffect(() => {
  const filteredTickets = tickets.filter(ticket => ticket.owner !== "admin").reverse()
  setPlayerTickets(filteredTickets)
}, [tickets])

function checkingWinningTickets(winningNumbers: number[]): Ticket[]{
  if(winningNumbers.length > 0) {
    setDrawn(true)
  }
   const ticketsWithHits = tickets.map(ticket => {
    let hitCount = 0;
    const numbers = ticket.numbers
    numbers.forEach((number) => {
        if(winningNumbers.includes(number)) {   
            hitCount++
        } 
    })
    ticket.luckyHit = hitCount
    return ticket
   })

   return ticketsWithHits
}

function calculateRewards(){
  const HOUSE_PROFIT_PERCENTAGE = 0.2;
  const ACE_HIT_PERCENTAGE = 0.47;
  const FOUR_HIT_PERCENTAGE = 0.20;
  const THREE_HIT_PERCENTAGE = 0.08;
  const TWO_HIT_PERCENTAGE = 0.05;

  const houseProfit = balance.adminBalance * HOUSE_PROFIT_PERCENTAGE;
  const prizePool = balance.adminBalance - houseProfit;


  function calculateVictoryByTicket(hitTickets: Ticket[], hitPoolPercentage: number) {
    const hitNumber = hitTickets.length;
    return Math.floor(hitNumber > 0 ? prizePool * hitPoolPercentage / hitNumber : 0);
  }

  const twoHitTickets = tickets.filter(ticket => ticket.luckyHit === 2);
  const threeHitTickets = tickets.filter(ticket => ticket.luckyHit === 3);
  const fourHitTickets = tickets.filter(ticket => ticket.luckyHit === 4);
  const aceHitTickets = tickets.filter(ticket => ticket.luckyHit === 5);

  const twoHittersVictoryByTicket = calculateVictoryByTicket(twoHitTickets, TWO_HIT_PERCENTAGE);
  const threeHittersVictoryByTicket = calculateVictoryByTicket(threeHitTickets, THREE_HIT_PERCENTAGE);
  const fourHittersVictoryByTicket = calculateVictoryByTicket(fourHitTickets, FOUR_HIT_PERCENTAGE);
  const aceHittersVictoryByTicket = calculateVictoryByTicket(aceHitTickets, ACE_HIT_PERCENTAGE);

  return {twoHittersVictoryByTicket, threeHittersVictoryByTicket, fourHittersVictoryByTicket, aceHittersVictoryByTicket}
}

function assignWonAmountToTicket(ticketsWithHits: Ticket[] , twoHittersVictoryByTicket : number, threeHittersVictoryByTicket : number, fourHittersVictoryByTicket : number, aceHittersVictoryByTicket: number) {

  let overallWonAmount = 0

  const ticketsWithRewardAmount = ticketsWithHits.map((ticket) => {
    if(ticket.luckyHit === 2){
      ticket.wonAmount = twoHittersVictoryByTicket
      overallWonAmount += twoHittersVictoryByTicket
      return ticket
    } else if (ticket.luckyHit === 3){
      ticket.wonAmount = threeHittersVictoryByTicket
      overallWonAmount += threeHittersVictoryByTicket
      return ticket
    } else if (ticket.luckyHit === 4){
      ticket.wonAmount = fourHittersVictoryByTicket
      overallWonAmount += fourHittersVictoryByTicket
      return ticket
    } else if (ticket.luckyHit === 5){
      ticket.wonAmount = aceHittersVictoryByTicket
      overallWonAmount += aceHittersVictoryByTicket
      return ticket
    } else {
      ticket.wonAmount = 0
      return ticket
    }
   })

   return {ticketsWithRewardAmount, overallWonAmount}
}

function calculateStatistics(twoHittersVictoryByTicket : number, threeHittersVictoryByTicket : number, fourHittersVictoryByTicket : number, aceHittersVictoryByTicket: number) {
  const stats: Statistics = {
    fiveHits: 0,
    fiveHitsVictory: aceHittersVictoryByTicket,
    fourHits: 0,
    fourHitsVictory: fourHittersVictoryByTicket,
    threeHits: 0,
    threeHitsVictory: threeHittersVictoryByTicket,
    twoHits: 0,
    twoHitsVictory: twoHittersVictoryByTicket,
    noHit: 0,
    amountNeedToBePaid: 0,
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
}})

const calculateAmountNeedToBePaid = (stats: Statistics): number => {
  const twoHitsAmount = stats.twoHits * stats.twoHitsVictory;
  const threeHitsAmount = stats.threeHits * stats.threeHitsVictory;
  const fourHitsAmount = stats.fourHits * stats.fourHitsVictory;
  const fiveHitsAmount = stats.fiveHits * stats.fiveHitsVictory;

  const totalAmount = twoHitsAmount + threeHitsAmount + fourHitsAmount + fiveHitsAmount;

  return totalAmount;
};

stats.amountNeedToBePaid = calculateAmountNeedToBePaid(stats);

return stats
}

function draw(winningNumbers: number[]) {
  
  const ticketsWithHits = checkingWinningTickets(winningNumbers)
  const {twoHittersVictoryByTicket, threeHittersVictoryByTicket, fourHittersVictoryByTicket, aceHittersVictoryByTicket} = calculateRewards()
  const {ticketsWithRewardAmount, overallWonAmount} = assignWonAmountToTicket(ticketsWithHits ,twoHittersVictoryByTicket, threeHittersVictoryByTicket, fourHittersVictoryByTicket, aceHittersVictoryByTicket)
  const stats  = calculateStatistics(twoHittersVictoryByTicket, threeHittersVictoryByTicket, fourHittersVictoryByTicket, aceHittersVictoryByTicket)
 
  const playerTickets = ticketsWithRewardAmount.filter(ticket => ticket.owner === "player")
  
  let payAmountForPlayer = 0;
  
  playerTickets.forEach((ticket) => {
    payAmountForPlayer += ticket?.wonAmount!
  })
  
  setStatistics(stats)
  setPlayerTickets([...playerTickets])
  changeAdminBalance(balance.adminBalance - overallWonAmount)
  changePlayerBalance(balance.playerBalance + payAmountForPlayer)
}
    
function reset() {
  setDrawn(false);
  setCurrentUser("player")
  changeAdminBalance(0)
  changePlayerBalance(10000)
  setStatistics({})
  setTickets([])
}

function newRound(){
  setDrawn(false);
  setCurrentUser("player")
  setStatistics({})
  setTickets([])
}

    return <AppContext.Provider value={{
      addTickets,
      changeAdminBalance,
      buyTicket,
      newRound,
      changeCurrentUser,
      reset,
      draw,
        currentUser,
        balance,
        tickets,
        playerTickets,
        drawn,
        statistics

    }}>{children}</AppContext.Provider>
}