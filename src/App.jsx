import { useState, useEffect } from 'react'
import TestRedirectPage from './components/TestRedirectPage'
import { getSession, markEmailPaid, isEmailPaid } from './lib/auth'
import './App.css'

// TODO: Replace with your payment platform URL
const PAYMENT_PLATFORM_URL = process.env.VITE_PAYMENT_PLATFORM_URL || 'https://aspire-nexus.vercel.app'

function App() {
  const [sessionEmail, setSessionEmail] = useState(() => getSession())
  const [loading, setLoading] = useState(true)

  // Handle redirect from Razorpay payment
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const email = params.get('email')
    const courseId = params.get('course')
    
    if (email && courseId) {
      // User just completed payment and was redirected here
      console.log('Payment redirect detected:', email, courseId)
      
      // Save session
      localStorage.setItem('aspire_session', email)
      setSessionEmail(email)
      
      // Mark as paid (coming from Razorpay means payment succeeded)
      markEmailPaid(email, parseInt(courseId), {
        paymentId: 'razorpay_' + Date.now(),
        amount: 2000,
        currency: 'INR',
        timestamp: new Date().toISOString()
      })
      
      // Clean URL (remove query params)
      window.history.replaceState({}, '', window.location.pathname)
      setLoading(false)
      return
    }
    
    // Check existing session
    if (sessionEmail) {
      // Verify user has paid for any course
      const hasPaid = isEmailPaid(sessionEmail, 1) || isEmailPaid(sessionEmail, 2)
      
      if (!hasPaid) {
        // No payment found, redirect back to payment platform
        console.log('No payment found, redirecting...')
        window.location.href = PAYMENT_PLATFORM_URL
        return
      }
      setLoading(false)
    } else {
      // No session, redirect to payment platform
      console.log('No session found, redirecting...')
      window.location.href = PAYMENT_PLATFORM_URL
    }
  }, [sessionEmail])

  const handleBackToCourses = () => {
    window.location.href = PAYMENT_PLATFORM_URL
  }

  if (loading) {
    return (
      <div className="app">
        <main className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Loading your test...</h2>
            <p>Please wait...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!sessionEmail) {
    return null // Will redirect
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
