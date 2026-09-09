import { useState, useEffect } from 'react'
import TestRedirectPage from './components/TestRedirectPage'
import { getSession, isEmailPaid } from './lib/auth'
import './App.css'

// Payment platform URL
const PAYMENT_PLATFORM_URL = import.meta.env.VITE_PAYMENT_PLATFORM_URL || 'https://aspire-nexus.vercel.app/login'

function App() {
  const [sessionEmail, setSessionEmail] = useState(() => getSession())
  const [hasAccess, setHasAccess] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check if user has session and payment in localStorage
    const email = getSession()
    
    if (!email) {
      setChecking(false)
      return
    }
    
    // Check if user has paid for any course
    const hasPaid = isEmailPaid(email, 1) || isEmailPaid(email, 2)
    
    setSessionEmail(email)
    setHasAccess(hasPaid)
    setChecking(false)
  }, [])

  const handleBackToCourses = () => {
    window.location.href = PAYMENT_PLATFORM_URL
  }

  if (checking) {
    return (
      <div className="app">
        <main className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Checking access...</h2>
          </div>
        </main>
      </div>
    )
  }

  // Show unauthorized message if no access
  if (!sessionEmail || !hasAccess) {
    return (
      <div className="app">
        <main className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div style={{ textAlign: 'center', maxWidth: '500px', padding: '40px' }}>
            <h2 style={{ color: '#ef4444', marginBottom: '16px' }}>Access Denied</h2>
            <p style={{ marginBottom: '24px', color: '#6b7280' }}>
              No payment found. Please complete payment on the same browser to access tests.
            </p>
            <a 
              href={PAYMENT_PLATFORM_URL}
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                background: '#667eea',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600'
              }}
            >
              Go to Payment Platform
            </a>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">Aspire Nexus - Test Platform</div>
          <nav className="navbar-nav">
            <a
              className="nav-link"
              onClick={handleBackToCourses}
              style={{ cursor: 'pointer' }}
            >
              Back to Courses
            </a>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <TestRedirectPage 
          sessionEmail={sessionEmail} 
          onBackToCourses={handleBackToCourses} 
        />
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p>© 2026 Aspire Nexus Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
