import React, { useContext } from 'react'
import { ContextFounder } from '../../../contexts/UserConrtrxt';

export default function OnlyAdmins({children}) {
    const {user} = useContext(ContextFounder);
    if(user?.userGroup === "SuperAdmin"){
  return (
    children
  )} else {
    return ''
  }
}
