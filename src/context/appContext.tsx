
import { ReactNode, createContext, useState } from "react"


/* Tárolja a ticketeket is legyen külön ticket komponens */

export const AppContext = createContext<{
    currentUser: "admin" | "player",
    changeCurrentUser: () => void,
    changeBalance: (user: "admin" | "player", amount: number) => void,
    balance: {playerBalance: number,
    adminBalance: number},
    reset: () => void

    
}>({
    currentUser: "player",
    changeCurrentUser: () => {},
    balance: {playerBalance: JSON.parse(localStorage.getItem("playermoney") as string),
        adminBalance: JSON.parse(localStorage.getItem("adminmoney") as string)},
    changeBalance: () => {},
    reset: () => {},
})

export function AppContextProvider({children}: {children: ReactNode}) {

const [currentUser, setCurrentUser] = useState<"admin" | "player">("player")

const [balance, setBalance]= useState<{playerBalance: number,
adminBalance: number}>({
    playerBalance: JSON.parse(localStorage.getItem("playermoney") as string),
    adminBalance:  JSON.parse(localStorage.getItem("adminmoney") as string),
})



function changeCurrentUser() {
    setCurrentUser(currentUser === "admin" ? "player" : "admin")
}

function changeBalance(user: "admin" | "player", amount: number){
   setBalance({
    ...balance,
    [`${user}Balance`]: amount
   })
   localStorage.setItem(`${user}money`, JSON.stringify(amount));
}

function reset() {
    setCurrentUser("player")
    changeBalance("player", 10000)
    changeBalance("admin", 0)
}

    

    return <AppContext.Provider value={{
        currentUser,
        changeCurrentUser,
        balance,
        changeBalance,
        reset,
    }}>{children}</AppContext.Provider>
}