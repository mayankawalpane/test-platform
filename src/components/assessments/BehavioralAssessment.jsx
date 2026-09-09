import { useState, useEffect } from 'react'
import CognitiveGames from './CognitiveGames'
import './BehavioralAssessment.css'

const behavioralQuestions = [
  // Section 1: Work Style & Preferences (Q1-Q8)
  { id: 1, question: "I prefer to work on multiple tasks simultaneously rather than focusing on one task at a time.", section: "Work Style & Preferences" },
  { id: 2, question: "I feel more productive when I have clear instructions and structured guidelines.", section: "Work Style & Preferences" },
  { id: 3, question: "I enjoy taking on new challenges even if I don't have all the required skills.", section: "Work Style & Preferences" },
  { id: 4, question: "I prefer working independently rather than in a team.", section: "Work Style & Preferences" },
  { id: 5, question: "I often double-check my work to ensure there are no errors.", section: "Work Style & Preferences" },
  { id: 6, question: "I enjoy routine and predictable work rather than dynamic tasks.", section: "Work Style & Preferences" },
  { id: 7, question: "I can easily adapt to sudden changes in plans or priorities.", section: "Work Style & Preferences" },
  { id: 8, question: "I prefer to make decisions quickly rather than analyzing all options.", section: "Work Style & Preferences" },
  
  // Section 2: Interpersonal Skills (Q9-Q16)
  { id: 9, question: "I find it easy to build relationships with new people.", section: "Interpersonal Skills" },
  { id: 10, question: "I prefer to avoid conflicts even if it means compromising on quality.", section: "Interpersonal Skills" },
  { id: 11, question: "I am comfortable giving constructive feedback to colleagues.", section: "Interpersonal Skills" },
  { id: 12, question: "I feel anxious when I have to present my ideas to a large group.", section: "Interpersonal Skills" },
  { id: 13, question: "I enjoy helping others even if it delays my own work.", section: "Interpersonal Skills" },
  { id: 14, question: "I can easily sense when someone is upset or frustrated.", section: "Interpersonal Skills" },
  { id: 15, question: "I prefer to work in a competitive environment rather than collaborative.", section: "Interpersonal Skills" },
  { id: 16, question: "I value others' opinions even when they differ from mine.", section: "Interpersonal Skills" },
  
  // Section 3: Problem Solving & Decision Making (Q17-Q24)
  { id: 17, question: "When faced with a problem, I prefer to find a solution on my own rather than asking for help.", section: "Problem Solving & Decision Making" },
  { id: 18, question: "I often think of creative and out-of-the-box solutions.", section: "Problem Solving & Decision Making" },
  { id: 19, question: "I get stressed when I don't have all the information to make a decision.", section: "Problem Solving & Decision Making" },
  { id: 20, question: "I prefer to analyze data thoroughly before making any decision.", section: "Problem Solving & Decision Making" },
  { id: 21, question: "I am comfortable taking risks if the potential reward is high.", section: "Problem Solving & Decision Making" },
  { id: 22, question: "I think logically and systematically when solving problems.", section: "Problem Solving & Decision Making" },
  { id: 23, question: "I often come up with multiple solutions to a single problem.", section: "Problem Solving & Decision Making" },
  { id: 24, question: "I can stay calm and focused in high-pressure situations.", section: "Problem Solving & Decision Making" },
  
  // Section 4: Leadership & Responsibility (Q25-Q32)
  { id: 25, question: "I naturally take charge in group situations.", section: "Leadership & Responsibility" },
  { id: 26, question: "I feel responsible for the success or failure of my team.", section: "Leadership & Responsibility" },
  { id: 27, question: "I am comfortable delegating tasks to others.", section: "Leadership & Responsibility" },
  { id: 28, question: "I often take initiative without being asked.", section: "Leadership & Responsibility" },
  { id: 29, question: "I can handle criticism without getting defensive.", section: "Leadership & Responsibility" },
  { id: 30, question: "I am comfortable making decisions that affect the entire team.", section: "Leadership & Responsibility" },
  { id: 31, question: "I take ownership of my mistakes and learn from them.", section: "Leadership & Responsibility" },
  { id: 32, question: "I prefer to follow rather than lead in group settings.", section: "Leadership & Responsibility" },
  
  // Section 5: Motivation & Work Environment (Q33-Q40)
  { id: 33, question: "I prefer a fast-paced and challenging work environment.", section: "Motivation & Work Environment" },
  { id: 34, question: "Recognition and appreciation from my manager motivates me the most.", section: "Motivation & Work Environment" },
  { id: 35, question: "I am motivated by opportunities to learn new skills and grow.", section: "Motivation & Work Environment" },
  { id: 36, question: "I am comfortable with ambiguity and uncertain situations.", section: "Motivation & Work Environment" },
  { id: 37, question: "I often go beyond my job responsibilities to achieve better results.", section: "Motivation & Work Environment" },
  { id: 38, question: "I can work effectively under pressure and tight deadlines.", section: "Motivation & Work Environment" },
  { id: 39, question: "I prioritize important tasks over urgent but less important ones.", section: "Motivation & Work Environment" },
  { id: 40, question: "I enjoy learning about new technologies and industry trends.", section: "Motivation & Work Environment" }
]

const agreementLevels = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" }
]

function BehavioralAssessment({ onComplete, isLastSection }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(40 * 60) // 40 minutes
  const [showResults, setShowResults] = useState(false)
  const [showCognitiveGames, setShowCognitiveGames] = useState(false)
  const [cognitiveCompleted, setCognitiveCompleted] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSliderChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: parseInt(value)
    })
  }

  const handleSubmit = () => {
    // After behavioral questions, show cognitive games
    setShowCognitiveGames(true)
  }

  const handleCognitiveComplete = () => {
    setCognitiveCompleted(true)
    setShowResults(true)
  }

  if (showCognitiveGames && !cognitiveCompleted) {
    return (
      <div className="assessment-container">
        <div className="assessment-header">
          <h2>Cognitive Assessment - Games & Puzzles</h2>
          <div className="header-info">
            <span className="timer">⏱ {formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="assessment-content">
          <CognitiveGames onComplete={handleCognitiveComplete} />
        </div>
      </div>
    )
  }

  if (showResults) {
    const answeredCount = Object.keys(answers).length
    const completion = ((answeredCount / behavioralQuestions.length) * 100).toFixed(0)

    // Pass results to parent
    setTimeout(() => {
      onComplete({
        answered: answeredCount,
        total: behavioralQuestions.length,
        completion: completion
      })
    }, 100)

    return (
      <div className="assessment-container">
        <div className="assessment-header">
          <h2>Behavioral Assessment - Complete</h2>
        </div>
        <div className="results-container">
          <div className="results-card passed">
            <h1>✓ Assessment Submitted</h1>
            <div className="score-display">
              <span className="score-large">{answeredCount}/{behavioralQuestions.length}</span>
              <span className="percentage">{completion}% Complete</span>
            </div>
            <p className="result-message">
              Your behavioral and cognitive assessment has been submitted successfully. Your responses will be analyzed to understand your work style, personality traits, problem-solving abilities, and fit for Accenture's culture.
            </p>
            <button className="continue-btn" onClick={onComplete}>
              {isLastSection ? 'Complete Test' : 'Continue to Next Assessment'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = behavioralQuestions[currentQuestion]
  const currentAnswer = answers[question.id] // No default value, undefined if not answered

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <h2>Behavioral & Cognitive Assessment</h2>
        <div className="header-info">
          <span className="timer">⏱ {formatTime(timeLeft)}</span>
          <span className="question-counter">{currentQuestion + 1} / {behavioralQuestions.length}</span>
        </div>
      </div>

      <div className="assessment-content">
        <div className="behavioral-card">
          <div className="question-header">
            <span className="category-badge">{question.section}</span>
            <span className="question-number">Question {currentQuestion + 1}</span>
          </div>
          
          <h3 className="question-text">{question.question}</h3>

          <div className="slider-section">
            <div className="slider-labels">
              <span className="label-left">Strongly Disagree</span>
              <span className="label-right">Strongly Agree</span>
            </div>
            
            <div className="slider-wrapper">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={currentAnswer || 3}
                onChange={(e) => handleSliderChange(question.id, e.target.value)}
                className="agreement-slider"
                style={{
                  background: `linear-gradient(to right, #d1d5db 0%, #d1d5db 100%)`
                }}
              />
              <div className="slider-ticks">
                {[1, 2, 3, 4, 5].map((tick) => (
                  <div key={tick} className={`tick ${currentAnswer === tick ? 'active' : ''}`} />
                ))}
              </div>
            </div>

            {currentAnswer && (
              <div className="slider-value">
                <span className="value-display">{agreementLevels[currentAnswer - 1]?.label}</span>
              </div>
            )}

            {!currentAnswer && (
              <div className="slider-value">
                <span className="value-display-placeholder">Move slider to select your answer</span>
              </div>
            )}

            <div className="scale-markers">
              <div className="marker">
                <div className="marker-tick" />
                <span>Strongly Disagree</span>
              </div>
              <div className="marker">
                <div className="marker-tick" />
                <span>Disagree</span>
              </div>
              <div className="marker">
                <div className="marker-tick" />
                <span>Neutral</span>
              </div>
              <div className="marker">
                <div className="marker-tick" />
                <span>Agree</span>
              </div>
              <div className="marker">
                <div className="marker-tick" />
                <span>Strongly Agree</span>
              </div>
            </div>
          </div>
        </div>

        <div className="navigation-buttons">
          <button
            className="nav-btn"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>
          
          {currentQuestion < behavioralQuestions.length - 1 ? (
            <button
              className="nav-btn primary"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              Next →
            </button>
          ) : (
            <button className="nav-btn submit" onClick={handleSubmit}>
              Submit Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BehavioralAssessment
