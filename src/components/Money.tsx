import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'




type Props = {
  currentUser: "player" | "admin"
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