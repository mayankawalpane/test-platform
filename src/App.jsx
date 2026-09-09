import { useState } from 'react'
import TestRedirectPage from './components/TestRedirectPage'
import './App.css'

// Payment platform URL
const PAYMENT_PLATFORM_URL = import.meta.env.VITE_PAYMENT_PLATFORM_URL || 'https://aspire-nexus.vercel.app/login'

function App() {
  // Use demo email for testing - no login required
  const sessionEmail = 'demo@aspirenexus.com'

  const handleBackToCourses = () => {
    window.location.href = PAYMENT_PLATFORM_URL
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
