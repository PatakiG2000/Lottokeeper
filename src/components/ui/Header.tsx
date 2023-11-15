import { useContext } from 'react'
import Money from '../Money'
import { AppContext } from '../../context/appContext'
import { User } from '../../types/types'

import '../../styles/header.css'

type Props = {
  currentUser: User
  changeUser: (user: User) => void
}

const Header = (props: Props) => {

  const { currentUser, changeCurrentUser, playername } = useContext(AppContext)

  return (
    <div className='header'>
      <div>
        <div className='header-switch'>
          <button onClick={() => changeCurrentUser("player")} className={currentUser === "player" ? `currentuser` : "passive"}>{!playername ? "Guest" : playername}</button>
          <button onClick={() => changeCurrentUser("admin")} className={currentUser === "player" ? `passive` : "currentuser"}>Admin</button>
        </div>
      </div>
      <Money currentUser={currentUser} />
    </div>
  )
}

export default Header