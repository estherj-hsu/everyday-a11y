import type { ReactNode } from 'react'
import './Callout.scss'

interface CalloutProps {
  children: ReactNode
  variant?: 'info' | 'warning'
  id?: string
}

export default function Callout({ children, variant = 'info', id }: CalloutProps) {
  return (
    <div className={`callout callout--${variant}`} id={id}>
      <span className="callout-icon" aria-hidden="true" />
      <div className="callout-content">{children}</div>
    </div>
  )
}
