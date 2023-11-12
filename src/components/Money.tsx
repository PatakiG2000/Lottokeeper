import React from 'react'




type Props = {
  balance: {playerBalance: number,
    adminBalance: number},
  currentUser: "player" | "admin"
}

/* Propsba kapja meg a usert meg az összeget ? */

const Money = ({balance, currentUser}: Props) => {

  return (
    <>
    {balance[`${currentUser}Balance`]}  
    </>

  )
}

export default Money