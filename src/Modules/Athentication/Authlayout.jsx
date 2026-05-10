import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import logo from '../../assets/logo.png'

export default function Authlayout() {
  if(localStorage.getItem('token')) return <Navigate to={'/dashboard'}/>
  return (
    <>
    <div className="auth-bg">
      <div className="overlay z-1"></div>
      <div className="bg-light rounded-4 p-5 z-2 max-vh-100 overflow-auto hide-scrollbar">
        <div className='text-center my-4 bg-light position-sticky top-0 z-3'>
          <img className='w-75' src={logo} alt="logo"/>
        </div>
            <Outlet/>
      </div>
    </div>
    </>
  )
}
