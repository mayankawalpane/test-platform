import { useState } from 'react'
import TestAssessment from './TestAssessment'
import { recordAttempt, getAttempts } from '../lib/auth'
import './TestRedirectPage.css'

function TestRedirectPage({ sessionEmail, onBackToCourses }) {
  const [showTest, setShowTest] = useState(false)
  const attempts = getAttempts(sessionEmail)

  const startTest = () => {
    recordAttempt(sessionEmail)
    setShowTest(true)
  }

  if (showTest) {
    return <TestAssessment onClose={() => setShowTest(false)} />
  }

  return (
    <div className="redirect-page">
      <div className="redirect-card">
        <div className="redirect-success-badge">✓</div>

        <h1>Welcome to Your Test!</h1>
        <p className="redirect-sub">
          Your Accenture Mock Practice Test is unlocked. You can take it as many times as you like.
        </p>

        <div className="redirect-intro">
          <p>
            This assessment is designed to simulate the real Accenture
            placement test and help you identify your strengths and the areas
            you need to improve before the actual exam.
          </p>
          <p>
            The test consists of three timed sections —{' '}
            <strong>Technical Assessment (45 min)</strong>,{' '}
            <strong>Behavioral &amp; Cognitive (40 min)</strong> and{' '}
            <strong>Communication Assessment (30 min)</strong>. Once you start,
            each section must be completed before moving to the next, so make
            sure you have around two hours of uninterrupted time before you
            begin.
          </p>
        </div>

        <ul className="redirect-guidelines">
          <li>Answer every question — there is no negative marking.</li>
          <li>You cannot return to a section once it is submitted.</li>
          <li>Your results and section-wise feedback are shown at the end.</li>
          <li>Attempts completed: {attempts}</li>
        </ul>

        <button className="redirect-start-btn" onClick={startTest}>
          Start Test
        </button>

        <button className="redirect-back" onClick={onBackToCourses}>
          ← Back to Courses
        </button>
      </div>
    </div>
  )
}

export default TestRedirectPage
