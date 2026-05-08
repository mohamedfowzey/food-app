import React, { useContext } from 'react'
import { ContextFounder } from '../../../contexts/UserConrtrxt';

export default function OnlyUsers({children}) {
    const {user} = useContext(ContextFounder);
    if(user?.userGroup === "SystemUser"){
  return (
    children
  )} else {
    return ''
  }
}
