import React from 'react'
import hraderGirl from "../../../assets/header-grirl.png"
import { ContextFounder } from '../../../contexts/UserConrtrxt';

export default function Header() {
  const {user} = React.useContext(ContextFounder);
  return (
    <div className='bg-header my-3 rounded-4 container'>
      <div className="row">
        <div className="col-md-7 align-self-center" >
          <h2>Welcome, {user?.userName}</h2>
        </div>
        <div className="col-md-5"><img className='img-fluid' src={hraderGirl} alt="" /></div>
      </div>
    </div>
  )
}
