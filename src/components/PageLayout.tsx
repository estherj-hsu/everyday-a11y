import { Link, useLocation } from 'react-router-dom'
import './PageLayout.scss'

interface PageLayoutProps {
  children: React.ReactNode
  showNav?: boolean
}

export default function PageLayout({ children, showNav = true }: PageLayoutProps) {
  const location = useLocation()
  const currentPath = location.pathname

  const navItems = [
    { path: '/', label: `Everyday Accessibility`, className: 'logo', isHome: true },
    { path: '/patterns', label: 'Patterns' },
    { path: '/foundations', label: 'Foundations' },
    { path: '/check-fix', label: 'Check & Fix' },
  ]

  return (
    <div className="container">
      {showNav && (
        <nav className="nav" aria-label="Main Navigation">
          <ul>
            {navItems.map(item => {
              const isActive = currentPath === item.path
              let className = item.isHome ? 'nav-item nav-item--home' : 'nav-item nav-item--link'
              if (isActive) {
                className += ' nav-item--active'
              }

              return (
                <li key={item.path} className={className}>
                  {isActive ? (
                    <span className={item.className} aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link to={item.path} className={item.className}>
                      {item.className === 'logo' ? (
                        <>
                          Everyday <span>A</span>ccessibility
                        </>
                      ) : (
                        item.label
                      )}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      )}
      <main className="content">{children}</main>
    </div>
  )
}
