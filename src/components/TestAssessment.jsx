import { useState } from 'react'
import TechnicalAssessment from './assessments/TechnicalAssessment'
import BehavioralAssessment from './assessments/BehavioralAssessment'
import CommunicationAssessment from './assessments/CommunicationAssessment'
import './TestAssessment.css'

function TestAssessment({ onClose }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState([])
  const [sectionResults, setSectionResults] = useState({})
  const [showFinalResults, setShowFinalResults] = useState(false)

  const sections = [
    {
      id: 'technical',
      title: 'Technical Assessment',
      duration: '45 min',
      component: TechnicalAssessment
    },
    {
      id: 'behavioral',
      title: 'Behavioral & Cognitive',
      duration: '40 min',
      component: BehavioralAssessment
    },
    {
      id: 'communication',
      title: 'Communication Assessment',
      duration: '30 min',
      component: CommunicationAssessment
    }
  ]

  const completeSection = (result) => {
    const completedIndex = currentSection
    const sectionId = sections[completedIndex].id
    
    setCompletedSections([...completedSections, sectionId])
    
    // Save section result
    if (result) {
      setSectionResults({
        ...sectionResults,
        [sectionId]: result
      })
    }
    
    // Check if this was the last section
    if (currentSection === sections.length - 1) {
      // Show final results
      setTimeout(() => {
        setShowFinalResults(true)
      }, 1000)
    } else {
      // Auto-navigate to next section
      setTimeout(() => {
        setCurrentSection(currentSection + 1)
      }, 1000)
    }
  }

  const CurrentComponent = sections[currentSection].component

  if (showFinalResults) {
    const technicalResult = sectionResults.technical || {}
    const behavioralResult = sectionResults.behavioral || {}
    const communicationResult = sectionResults.communication || {}
    
    const totalScore = (technicalResult.score || 0) + (communicationResult.score || 0)
    const totalQuestions = (technicalResult.total || 0) + (communicationResult.total || 0)
    const overallPercentage = totalQuestions > 0 ? ((totalScore / totalQuestions) * 100).toFixed(1) : 0

    return (
      <div className="test-container">
        <div className="results-overlay">
          <div className="results-modal">
            <div className="results-modal-header">
              <h1>🎉 Test Complete!</h1>
              <button className="close-btn" onClick={onClose}>✕</button>
            </div>

            <div className="overall-score">
              <div className="score-circle">
                <div className="score-value">{overallPercentage}%</div>
                <div className="score-label">Overall Score</div>
              </div>
            </div>

            <div className="section-results">
              <h2>Section-wise Performance</h2>
              
              <div className="result-card">
                <div className="result-header">
                  <div className="result-icon">📝</div>
                  <div className="result-info">
                    <h3>Technical Assessment</h3>
                    <p>45 MCQ Questions</p>
                  </div>
                </div>
                <div className="result-score">
                  <div className="score-fraction">
                    {technicalResult.score || 0} / {technicalResult.total || 45}
                  </div>
                  <div className="score-percentage">
                    {technicalResult.percentage || 0}%
                  </div>
                  <div className={`status-badge ${parseFloat(technicalResult.percentage || 0) >= 60 ? 'passed' : 'failed'}`}>
                    {parseFloat(technicalResult.percentage || 0) >= 60 ? '✓ Passed' : '✗ Not Passed'}
                  </div>
                </div>
              </div>

              <div className="result-card">
                <div className="result-header">
                  <div className="result-icon">🧠</div>
                  <div className="result-info">
                    <h3>Behavioral & Cognitive</h3>
                    <p>40 Personality Questions</p>
                  </div>
                </div>
                <div className="result-score">
                  <div className="score-fraction">
                    {behavioralResult.answered || 0} / {behavioralResult.total || 40}
                  </div>
                  <div className="score-percentage">
                    {behavioralResult.completion || 0}% Complete
                  </div>
                  <div className="status-badge completed">
                    ✓ Submitted
                  </div>
                </div>
              </div>

              <div className="result-card">
                <div className="result-header">
                  <div className="result-icon">💬</div>
                  <div className="result-info">
                    <h3>Communication Assessment</h3>
                    <p>30 Grammar & Speaking Questions</p>
                  </div>
                </div>
                <div className="result-score">
                  <div className="score-fraction">
                    {communicationResult.score || 0} / {communicationResult.total || 30}
                  </div>
                  <div className="score-percentage">
                    {communicationResult.percentage || 0}%
                  </div>
                  <div className={`status-badge ${parseFloat(communicationResult.percentage || 0) >= 60 ? 'passed' : 'failed'}`}>
                    {parseFloat(communicationResult.percentage || 0) >= 60 ? '✓ Passed' : '✗ Not Passed'}
                  </div>
                </div>
              </div>
            </div>

            <div className="results-summary">
              <p>Your test has been submitted successfully. Results will be reviewed and you will be notified within 5-10 business days.</p>
            </div>

            <div className="results-actions">
              <button className="btn-primary" onClick={onClose}>
                Close Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="test-container">
      {/* Sidebar */}
      <div className="test-sidebar">
        <div className="sidebar-header">
          <h2>Accenture Test</h2>
          <button className="close-icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="progress-info">
          <div className="progress-text">
            Section {currentSection + 1} of {sections.length}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="sections-list">
          {sections.map((section, index) => {
            const isActive = index === currentSection
            const isCompleted = completedSections.includes(section.id)

            return (
              <div
                key={section.id}
                className={`section-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => setCurrentSection(index)}
              >
                <div className="section-number">
                  {isCompleted ? (
                    <span className="check-icon">✓</span>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="section-info">
                  <div className="section-name">{section.title}</div>
                  <div className="section-duration">{section.duration}</div>
                </div>
                {isActive && <div className="active-indicator" />}
              </div>
            )
          })}
        </div>

        <div className="sidebar-footer">
          <div className="completion-status">
            <strong>{completedSections.length}</strong> of {sections.length} completed
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="test-main">
        <CurrentComponent 
          onComplete={completeSection}
          isLastSection={currentSection === sections.length - 1}
        />
      </div>
    </div>
  )
}

export default TestAssessment
