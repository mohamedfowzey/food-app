import React from 'react'

export default function MainButton({children}) {
  return (
        <button  className={`btn w-100 bg-accent text-white `}>{children}</button>
  )
}
