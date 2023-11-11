
import { ReactNode, createContext, useState } from "react"

export const AppContext = createContext<{
    currentUser: "admin" | "player",
    changeCurrentUser: () => void
    
}>({
    currentUser: "player",
    changeCurrentUser: () => {}
})

export function AppContextProvider({children}: {children: ReactNode}) {

const [currentUser, setCurrentUser] = useState<"admin" | "player">("player")

function changeCurrentUser() {
    setCurrentUser(currentUser === "admin" ? "player" : "admin")
}

    

    return <AppContext.Provider value={{
        currentUser,
        changeCurrentUser
    }}>{children}</AppContext.Provider>
}