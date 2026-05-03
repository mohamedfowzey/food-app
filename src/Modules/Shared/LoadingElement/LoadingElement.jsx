import React from 'react'

export default function LoadingElement({color = 'text-accent'}) {
  return (
    <p className={`mb-0 ${color} spinner-border spinner-border-sm`} role='status'>
      <span className='visually-hidden'>Loading...</span>
    </p>
  )
}
