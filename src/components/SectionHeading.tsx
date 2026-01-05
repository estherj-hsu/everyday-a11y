import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { useToc } from '../contexts/TocContext'
import './SectionHeading.scss'

interface Props {
  id: string
  children: string
}

export default function SectionHeading({ id, children }: Props) {
  const { register } = useToc()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const prevRef = useRef<{ id: string; text: string } | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const current = { id, text: children }
    if (!prevRef.current || prevRef.current.id !== id || prevRef.current.text !== children) {
      if (headingRef.current) {
        register({ id, text: children, ref: headingRef })
      }
      prevRef.current = current
    }
  }, [id, children, register])

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.slice(1)
      setIsActive(hash === id)
    }

    checkHash()

    window.addEventListener('hashchange', checkHash)

    return () => {
      window.removeEventListener('hashchange', checkHash)
    }
  }, [id])

  return (
    <h2 ref={headingRef} id={id} className={classNames('h3', 'section-heading', { 'is-active': isActive })}>
      {children}
    </h2>
  )
}
