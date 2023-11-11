import React from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

type Props = {}

const Money = (props: Props) => {
    const [userMoney, setUserMoney] = useLocalStorage("usermoney", "5000$");
    const [adminMoney, setAdminMoney] = useLocalStorage("adminmoney", "0$");
  return (
    <>
    <div>{!userMoney ? "5000$" : userMoney}</div>
    <div>{!adminMoney ? "0" : adminMoney}</div>
    {/* testing */}
    <button onClick={() => {setUserMoney("2700$")}}></button>    
    <button onClick={() => {setAdminMoney("6700$")}}></button>    
    </>

  )
}

export default Money