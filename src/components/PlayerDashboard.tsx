import React, {useState} from 'react'
import GuessNumbers from './GuessNumbers'


type Props = {}

const PlayerDashboard = (props: Props) => {

  const [playerName, setPlayerName] = useState<undefined | string>(localStorage.getItem("playername") ?? undefined)
  const [nameInput, setNameInput] = useState<string>("")


  function changePlayerName(name: string) {
    setPlayerName(name)
    localStorage.setItem("playername", name)
  }


  return (
    <>
    Welcome back {playerName}
    {playerName === "" && <input type='text' placeholder={playerName} onChange={e => setNameInput(e.target?.value as any)} />}
    <button onClick={() => changePlayerName(nameInput)}>Change Name</button>
   <GuessNumbers ></GuessNumbers>
    <div>PlayerDashboard</div>
    </>
  )
}

export default PlayerDashboard