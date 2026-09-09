import { useState, useEffect } from 'react'
import './TechnicalAssessment.css'

const codingQuestions = [
  {
    id: 1,
    question: "What is the output of the following SQL query?\nSELECT COUNT(*) FROM employees WHERE salary > 50000;",
    options: [
      "Returns the sum of salaries greater than 50000",
      "Returns the number of employees with salary greater than 50000",
      "Returns all employee records",
      "Returns an error"
    ],
    correct: 1,
    category: "SQL"
  },
  {
    id: 2,
    question: "Which SQL JOIN returns all records from the left table and matched records from the right table?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    correct: 1,
    category: "SQL"
  },
  {
    id: 3,
    question: "In SQL, which clause is used to filter grouped data?",
    options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
    correct: 1,
    category: "SQL"
  },
  {
    id: 4,
    question: "What is the correct way to create a component in React?",
    options: [
      "function MyComponent() { return <div>Hello</div> }",
      "class MyComponent() { return <div>Hello</div> }",
      "component MyComponent() { return <div>Hello</div> }",
      "create MyComponent() { return <div>Hello</div> }"
    ],
    correct: 0,
    category: "React"
  },
  {
    id: 5,
    question: "Which React Hook is used to manage state in functional components?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correct: 1,
    category: "React"
  },
  {
    id: 6,
    question: "What does the useEffect Hook do in React?",
    options: [
      "Manages component state",
      "Handles side effects and lifecycle events",
      "Creates context",
      "Defines routes"
    ],
    correct: 1,
    category: "React"
  },
  {
    id: 7,
    question: "In React, props are:",
    options: [
      "Mutable and can be changed",
      "Immutable and read-only",
      "Only used in class components",
      "Not passed to child components"
    ],
    correct: 1,
    category: "React"
  },
  {
    id: 8,
    question: "What is the time complexity of Binary Search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
    category: "DSA"
  },
  {
    id: 9,
    question: "Which data structure is best for implementing a Queue?",
    options: ["Array", "Linked List", "Stack", "Tree"],
    correct: 1,
    category: "DSA"
  },
  {
    id: 10,
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 3,
    category: "DSA"
  },
  {
    id: 11,
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
    correct: 2,
    category: "DSA"
  },
  {
    id: 12,
    question: "In a stack, which operation adds an element?",
    options: ["Push", "Pop", "Peek", "Enqueue"],
    correct: 0,
    category: "DSA"
  },
  {
    id: 13,
    question: "What is a foreign key in a database?",
    options: [
      "A key from another country",
      "A primary key in another table",
      "A unique identifier in the current table",
      "A key that references a primary key in another table"
    ],
    correct: 3,
    category: "SQL"
  },
  {
    id: 14,
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<css>", "<script>", "<link>"],
    correct: 0,
    category: "Web Development"
  },
  {
    id: 15,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets"
    ],
    correct: 1,
    category: "Web Development"
  },
  {
    id: 16,
    question: "Which method is used to convert JSON to JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
    correct: 0,
    category: "JavaScript"
  },
  {
    id: 17,
    question: "What is the difference between '==' and '===' in JavaScript?",
    options: [
      "No difference",
      "== checks value only, === checks value and type",
      "=== checks value only, == checks value and type",
      "Both are syntax errors"
    ],
    correct: 1,
    category: "JavaScript"
  },
  {
    id: 18,
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    correct: 1,
    category: "React"
  },
  {
    id: 19,
    question: "What is the purpose of the 'key' prop in React lists?",
    options: [
      "To style elements",
      "To help React identify which items have changed",
      "To encrypt data",
      "To define component state"
    ],
    correct: 1,
    category: "React"
  },
  {
    id: 20,
    question: "What will be the output: console.log(typeof null)?",
    options: ["null", "undefined", "object", "number"],
    correct: 2,
    category: "JavaScript"
  }
]

function CodingAssessment({ onComplete, isLastSection }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minutes
  const [showResults, setShowResults] = useState(false)

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

  const handleAnswer = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    })
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    codingQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        correct++
      }
    })
    return correct
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = ((score / codingQuestions.length) * 100).toFixed(1)
    const passed = percentage >= 60

    return (
      <div className="assessment-container">
        <div className="assessment-header">
          <h2>Coding Assessment - Results</h2>
        </div>
        <div className="results-container">
          <div className={`results-card ${passed ? 'passed' : 'failed'}`}>
            <h1>{passed ? '✓ Passed' : '✗ Not Passed'}</h1>
            <div className="score-display">
              <span className="score-large">{score}/{codingQuestions.length}</span>
              <span className="percentage">{percentage}%</span>
            </div>
            <p className="result-message">
              {passed 
                ? 'Great job! You have passed the coding assessment. Please proceed to the next section.'
                : 'Unfortunately, you did not pass this assessment. You need at least 60% to proceed.'}
            </p>
            {passed && (
              <button className="continue-btn" onClick={onComplete}>
                {isLastSection ? 'Complete Test' : 'Continue to Next Assessment'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  const question = codingQuestions[currentQuestion]

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <h2>Coding Assessment - MCQ</h2>
        <div className="header-info">
          <span className="timer">⏱ {formatTime(timeLeft)}</span>
          <span className="question-counter">{currentQuestion + 1} / {codingQuestions.length}</span>
        </div>
      </div>

      <div className="assessment-content">
        <div className="question-card">
          <div className="question-header">
            <span className="category-badge">{question.category}</span>
            <span className="question-number">Question {currentQuestion + 1}</span>
          </div>
          
          <h3 className="question-text">{question.question}</h3>

          <div className="options-list">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`option-item ${selectedAnswers[question.id] === index ? 'selected' : ''}`}
                onClick={() => handleAnswer(question.id, index)}
              >
                <div className="option-radio">
                  {selectedAnswers[question.id] === index && <div className="radio-dot" />}
                </div>
                <span className="option-text">{option}</span>
              </div>
            ))}
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
          
          {currentQuestion < codingQuestions.length - 1 ? (
            <button
              className="nav-btn primary"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              Next →
            </button>
          ) : (
            <button className="nav-btn submit" onClick={handleSubmit}>
              Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CodingAssessment
