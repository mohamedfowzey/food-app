import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../../assets/logo.png'

export default function Authlayout() {
  return (
    <>
    <div className="auth-bg">
      <div className="overlay z-1"></div>
      <div className="bg-light rounded-4 p-5 z-2">
        <div className='text-center my-4'>
          <img className='w-75' src={logo} alt="logo"/>
        </div>
            <Outlet/>
      </div>
    </div>
    </>
  )
}
