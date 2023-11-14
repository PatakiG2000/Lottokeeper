import { useContext } from 'react'
import { AppContext } from '../context/appContext'
import { User } from '../types/types'



type Props = {
  currentUser: User
}

const Money = ({ currentUser }: Props) => {
  const { balance } = useContext(AppContext)

  return (
    <>
      {balance[`${currentUser}Balance`]} Akcse
    </>

  )
}

export default Money