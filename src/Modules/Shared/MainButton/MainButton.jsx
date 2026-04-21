import React from 'react'

export default function MainButton({children}) {
  return (
        <button  className={`btn w-100 mb-3 bg-accent text-white `}>{children}</button>
  )
}
