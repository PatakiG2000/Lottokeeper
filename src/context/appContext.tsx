
import { ReactNode, createContext, useState } from "react"
import { Ticket } from "../types/types"
import { useEffect } from "react"


/* Tárolja a ticketeket is legyen külön ticket komponens */

export const AppContext = createContext<{
    currentUser: "admin" | "player",
    changeCurrentUser: () => void,
    balance: {playerBalance: number,
    adminBalance: number},
    reset: () => void,
    tickets: {
        numbers: number[],
        owner: "player" | "admin",
        luckyHit?: number
    }[],
    addTickets: (newTickets: Ticket[]) => void,
    checkWinningTickets: (numbers: number[]) => void,
    changePlayerBalance: (amount: number) => void
    changeAdminBalance: (amount: number) => void,
    buyTicket: () => void,
    newRound: () => void,

    
}>({
    currentUser: "player",
    changeCurrentUser: () => {},
    balance: {playerBalance: 0,
        adminBalance: 0},
    reset: () => {},
    tickets: [],
    addTickets: () => {},
    checkWinningTickets: () => {},
    changeAdminBalance: () => {},
    changePlayerBalance: () => {},
    buyTicket: () => {},
    newRound: () => {},
})

export function AppContextProvider({children}: {children: ReactNode}) {

const [currentUser, setCurrentUser] = useState<"admin" | "player">("player")

const [balance, setBalance]= useState<{playerBalance: number,
adminBalance: number}>({
    playerBalance: JSON.parse(localStorage.getItem("playermoney") as string),
    adminBalance:  JSON.parse(localStorage.getItem("adminmoney") as string),
})

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
      [`${"admin"}Balance`]: amount,
    }
  console.log(updatedBalance)
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
      
      console.log(updatedBalance)
      return updatedBalance;
    });
  }

console.log(balance)


function reset() {
    setCurrentUser("player")
    changeAdminBalance(0)
    changePlayerBalance(10000)
    setTickets([])
}

function newRound(){
    setCurrentUser("player")
    setTickets([])
}


const [tickets, setTickets] = useState<Ticket[]>([])

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
      
      console.log(updatedBalance)
      return updatedBalance;
    });
}

function checkWinningTickets(winningNumbers: number[]){
   const TicketsWithHits = tickets.map(ticket => {
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
   setTickets([...TicketsWithHits])
}
console.log(tickets)
    

    return <AppContext.Provider value={{
        currentUser,
        changeCurrentUser,
        balance,
        reset,
        tickets,
        addTickets,
        checkWinningTickets,
        changeAdminBalance,
        changePlayerBalance,
        buyTicket,
        newRound

    }}>{children}</AppContext.Provider>
}