import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useToc } from '../contexts/TocContext'
import './TableOfContent.scss'

export default function TableOfContent() {
  const { items } = useToc()
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!items.length) return

    const findActiveSection = () => {
      const targetOffset = window.innerHeight * 0.15
      let activeId = ''
      let minDistance = Infinity

      items.forEach(item => {
        const element = item.ref.current
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const distance = Math.abs(rect.top - targetOffset)
            const adjustedDistance = rect.top < targetOffset ? distance - 1000 : distance

            if (adjustedDistance < minDistance) {
              minDistance = adjustedDistance
              activeId = item.id
            }
          }
        }
      })

      if (activeId) {
        setActiveId(activeId)
      }
    }

    findActiveSection()
    window.addEventListener('scroll', findActiveSection, { passive: true })
    window.addEventListener('resize', findActiveSection, { passive: true })

    return () => {
      window.removeEventListener('scroll', findActiveSection)
      window.removeEventListener('resize', findActiveSection)
    }
  }, [items])

  if (!items.length) return null

  return (
    <nav className="table-of-content" aria-label="Table of Contents">
      <ul>
        {items.map(item => (
          <li key={item.id} className={classNames({ 'is-active': activeId === item.id })}>
            <a className="text-small" href={`#${item.id}`}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
