import React from 'react'

export default function LoadingElement({color = 'text-accent'}) {
  return (
    <div className="d-flex justify-content-center">
      <p className={`mb-0 mx-auto ${color} spinner-border spinner-border-sm`} role='status'>
      <span className='visually-hidden'>Loading...</span>
    </p>
    </div>
  )
}
