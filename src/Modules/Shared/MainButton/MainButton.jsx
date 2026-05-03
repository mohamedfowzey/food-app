import React from 'react'

export default function MainButton({children,width=undefined}) {
  return (
        <button  className={`btn w-${width?width:'100'} bg-accent text-white `}> {children} </button>
  )
}
