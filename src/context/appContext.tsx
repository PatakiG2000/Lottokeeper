
import { ReactNode, createContext, useState } from "react"
import { Ticket } from "../types/types"
import { useEffect } from "react"
import { Statistics } from "../types/types"
import { User } from "../types/types"
import { prizeControl } from "../utils/prizeControl"


export const AppContext = createContext<{
  changeCurrentUser: (user: User) => void,
  reset: () => void,
  addTickets: (newTickets: Ticket[]) => void,
  changeAdminBalance: (amount: number) => void,
  buyTicket: () => void,
  newRound: () => void,
  draw: (winningNumbers: number[]) => void,
  setPlayername: (name: string) => void,
  currentUser: User,
  balance: {
    playerBalance: number,
    adminBalance: number
  },
  tickets: Ticket[],
  playerTickets: Ticket[],
  drawn: boolean,
  statistics: Statistics,
  winningNumbers: number[],
  playerWinnings: number,
  playername: string


}>({
  changeCurrentUser: () => { },
  addTickets: () => { },
  changeAdminBalance: () => { },
  buyTicket: () => { },
  newRound: () => { },
  reset: () => { },
  draw: () => { },
  setPlayername: () => { },
  currentUser: "player",
  balance: {
    playerBalance: 0,
    adminBalance: 0
  },
  tickets: [],
  playerTickets: [],
  drawn: false,
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
  },
  winningNumbers: [],
  playerWinnings: 0,
  playername: "",

})

export function AppContextProvider({ children }: { children: ReactNode }) {


  const [currentUser, setCurrentUser] = useState<User>("player")
  const [playername, setPlayername] = useState<string>(localStorage.getItem("playername") === "" ? "Guest" : localStorage.getItem("playername") as string)

  const [playerTickets, setPlayerTickets] = useState<Ticket[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])

  const [winningNumbers, setWinningNumbers] = useState<number[]>([])
  const [drawn, setDrawn] = useState<boolean>(false)

  const [balance, setBalance] = useState<{
    playerBalance: number,
    adminBalance: number
  }>({
    playerBalance: JSON.parse(localStorage.getItem("playermoney") as string ?? 10000),
    adminBalance: JSON.parse(localStorage.getItem("adminmoney") as string ?? 0),
  })

  const [playerWinnings, setPlayerWinnings] = useState<number>(0)

  const [statistics, setStatistics] = useState<any>()

  useEffect(() => {
    localStorage.setItem("playermoney", JSON.stringify(balance.playerBalance));
    localStorage.setItem("adminmoney", JSON.stringify(balance.adminBalance));
  }, [balance]);

  function changeCurrentUser(user: User = "player") {
    setCurrentUser(user)
  }

  function changeAdminBalance(amount: number) {
    const updatedBalance = {
      ...balance,
      adminBalance: amount,
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

  function addTickets(newTickets: Ticket[]) {
    setTickets([...tickets, ...newTickets])
  }

  function buyTicket() {
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

  function checkingWinningTickets(winningNumbers: number[]): Ticket[] {
    if (winningNumbers.length > 0) {
      setDrawn(true)
    }
    const ticketsWithHits = tickets.map(ticket => {
      let hitCount = 0;
      const numbers = ticket.numbers
      numbers.forEach((number) => {
        if (winningNumbers.includes(number)) {
          hitCount++
        }
      })
      ticket.luckyHit = hitCount
      return ticket
    })

    return ticketsWithHits
  }

  function calculateRewards() {

    const houseProfit = balance.adminBalance * prizeControl.HOUSE_PROFIT_PERCENTAGE;
    const prizePool = balance.adminBalance - houseProfit;

    function calculateVictoryByTicket(hitTickets: Ticket[], hitPoolPercentage: number) {
      const hitNumber = hitTickets.length;
      return Math.floor(hitNumber > 0 ? prizePool * hitPoolPercentage / hitNumber : 0);
    }

    const twoHitTickets = tickets.filter(ticket => ticket.luckyHit === 2);
    const threeHitTickets = tickets.filter(ticket => ticket.luckyHit === 3);
    const fourHitTickets = tickets.filter(ticket => ticket.luckyHit === 4);
    const aceHitTickets = tickets.filter(ticket => ticket.luckyHit === 5);

    const twoHittersVictoryByTicket = calculateVictoryByTicket(twoHitTickets, prizeControl.TWO_HIT_PERCENTAGE);
    const threeHittersVictoryByTicket = calculateVictoryByTicket(threeHitTickets, prizeControl.THREE_HIT_PERCENTAGE);
    const fourHittersVictoryByTicket = calculateVictoryByTicket(fourHitTickets, prizeControl.FOUR_HIT_PERCENTAGE);
    const aceHittersVictoryByTicket = calculateVictoryByTicket(aceHitTickets, prizeControl.ACE_HIT_PERCENTAGE);

    return { twoHittersVictoryByTicket, threeHittersVictoryByTicket, fourHittersVictoryByTicket, aceHittersVictoryByTicket }
  }

  function assignWonAmountToTicket(ticketsWithHits: Ticket[], twoHittersVictoryByTicket: number, threeHittersVictoryByTicket: number, fourHittersVictoryByTicket: number, aceHittersVictoryByTicket: number) {

    let overallWonAmount = 0

    const ticketsWithRewardAmount = ticketsWithHits.map((ticket) => {
      if (ticket.luckyHit === 2) {
        ticket.wonAmount = twoHittersVictoryByTicket
        overallWonAmount += twoHittersVictoryByTicket
        return ticket
      } else if (ticket.luckyHit === 3) {
        ticket.wonAmount = threeHittersVictoryByTicket
        overallWonAmount += threeHittersVictoryByTicket
        return ticket
      } else if (ticket.luckyHit === 4) {
        ticket.wonAmount = fourHittersVictoryByTicket
        overallWonAmount += fourHittersVictoryByTicket
        return ticket
      } else if (ticket.luckyHit === 5) {
        ticket.wonAmount = aceHittersVictoryByTicket
        overallWonAmount += aceHittersVictoryByTicket
        return ticket
      } else {
        ticket.wonAmount = 0
        return ticket
      }
    })

    return { ticketsWithRewardAmount, overallWonAmount }
  }

  function calculateStatistics(twoHittersVictoryByTicket: number, threeHittersVictoryByTicket: number, fourHittersVictoryByTicket: number, aceHittersVictoryByTicket: number) {
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
      if (ticket.luckyHit === 5) {
        stats.fiveHits++
      } else if (ticket.luckyHit === 4) {
        stats.fourHits++
      } else if (ticket.luckyHit === 3) {
        stats.threeHits++
      } else if (ticket.luckyHit === 2) {
        stats.twoHits++
      } else if (ticket.luckyHit === 1 || ticket.luckyHit === 0) {
        stats.noHit++
      }
    })

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

    setWinningNumbers(winningNumbers)
    const ticketsWithHits = checkingWinningTickets(winningNumbers)
    const { twoHittersVictoryByTicket, threeHittersVictoryByTicket, fourHittersVictoryByTicket, aceHittersVictoryByTicket } = calculateRewards()
    const { ticketsWithRewardAmount, overallWonAmount } = assignWonAmountToTicket(ticketsWithHits, twoHittersVictoryByTicket, threeHittersVictoryByTicket, fourHittersVictoryByTicket, aceHittersVictoryByTicket)
    const stats = calculateStatistics(twoHittersVictoryByTicket, threeHittersVictoryByTicket, fourHittersVictoryByTicket, aceHittersVictoryByTicket)

    const playerTickets = ticketsWithRewardAmount.filter(ticket => ticket.owner === "player")

    let payAmountForPlayer = 0;

    playerTickets.forEach((ticket) => {
      payAmountForPlayer += ticket?.wonAmount!
    })

    setStatistics(stats)
    setPlayerTickets([...playerTickets])
    changeAdminBalance(balance.adminBalance - overallWonAmount)
    changePlayerBalance(balance.playerBalance + payAmountForPlayer)
    setPlayerWinnings(payAmountForPlayer)
  }

  function reset() {
    setDrawn(false);
    setCurrentUser("player")
    changeAdminBalance(0)
    changePlayerBalance(10000)
    setStatistics({})
    setTickets([])
    setWinningNumbers([])
  }

  function newRound() {
    setDrawn(false);
    setCurrentUser("player")
    setStatistics({})
    setTickets([])
    setWinningNumbers([])
  }

  return <AppContext.Provider value={{
    addTickets,
    changeAdminBalance,
    buyTicket,
    newRound,
    changeCurrentUser,
    setPlayername,
    reset,
    draw,
    currentUser,
    balance,
    tickets,
    playerTickets,
    drawn,
    statistics,
    winningNumbers,
    playerWinnings,
    playername

  }}>{children}</AppContext.Provider>
}