import { Link, useLocation } from 'react-router-dom'
import './PageLayout.scss'

interface PageLayoutProps {
  children: React.ReactNode
  showNav?: boolean
}

export default function PageLayout({ children, showNav = true }: PageLayoutProps) {
  const location = useLocation()
  const currentPath = location.pathname
  const hasParent = currentPath.startsWith('/patterns/')

  const navItems = [
    { path: '/', label: `Everyday Accessibility`, className: 'logo', isHome: true },
    { path: '/patterns', label: 'Patterns' },
    { path: '/foundations', label: 'Foundations' },
    { path: '/check-fix', label: 'Check & Fix' },
  ]

  return (
    <div className="container">
      {showNav && (
        <header>
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
                          <span aria-label="Everyday Accessibility">
                            <span aria-hidden>
                              <span>Everyday</span>
                              <span>
                                <span className="logo-a">A</span>ccessibility
                              </span>
                            </span>
                          </span>
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
        </header>
      )}
      <main className="content">
        {hasParent && (
          <Link to={currentPath.split('/').slice(0, -1).join('/')} className="back-link">
            Back to Patterns
          </Link>
        )}
        {children}
        {hasParent && (
          <Link to={currentPath.split('/').slice(0, -1).join('/')} className="back-link">
            Back to Patterns
          </Link>
        )}
      </main>
      <footer>
        <p className="text-small">
          Built with <span title="Accessible by default. Fancy by choice.">semantics, not vibes</span>, by <a href="https://github.com/estherj-hsu">Esther</a>
        </p>
      </footer>
    </div>
  )
}
