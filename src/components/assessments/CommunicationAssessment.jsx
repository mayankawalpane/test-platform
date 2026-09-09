import { useState, useEffect, useRef } from 'react'
import './CommunicationAssessment.css'

const communicationQuestions = [
  // Section 1: Subject-Verb Agreement
  {
    id: 1,
    type: 'mcq',
    section: 'Grammar',
    question: "Neither the manager nor the employees ________ aware of the changes in the policy.",
    options: ["was", "were", "is", "has been"],
    correct: 1
  },
  {
    id: 2,
    type: 'mcq',
    section: 'Grammar',
    question: "Bread and butter ________ his default breakfast choice every morning.",
    options: ["are", "is", "were", "have been"],
    correct: 1
  },
  {
    id: 3,
    type: 'mcq',
    section: 'Grammar',
    question: "The committee ________ divided in their opinions regarding the new proposal.",
    options: ["is", "was", "were", "has"],
    correct: 2
  },
  {
    id: 4,
    type: 'mcq',
    section: 'Grammar',
    question: "Each of the participants ________ given a certificate of completion yesterday.",
    options: ["was", "were", "are", "have been"],
    correct: 0
  },
  
  // Section 2: Tenses & Verb Forms
  {
    id: 5,
    type: 'mcq',
    section: 'Tenses',
    question: "By the time we reach the station, the train ________.",
    options: ["will leave", "left", "had left", "will have left"],
    correct: 3
  },
  {
    id: 6,
    type: 'mcq',
    section: 'Tenses',
    question: "She ________ in this town since 2015.",
    options: ["is living", "lives", "has been living", "lived"],
    correct: 2
  },
  {
    id: 7,
    type: 'mcq',
    section: 'Tenses',
    question: "If I ________ rich, I would travel around the world.",
    options: ["am", "was", "were", "have been"],
    correct: 2
  },
  {
    id: 8,
    type: 'mcq',
    section: 'Tenses',
    question: "Hard working as he was, he ________ pass the final exam.",
    options: ["couldn't", "can't", "shouldn't", "won't"],
    correct: 0
  },
  
  // Section 3: Prepositions & Phrasal Verbs
  {
    id: 9,
    type: 'mcq',
    section: 'Prepositions',
    question: "She is good ________ learning new foreign languages quickly.",
    options: ["in", "at", "with", "for"],
    correct: 1
  },
  {
    id: 10,
    type: 'mcq',
    section: 'Prepositions',
    question: "The event was called ________ due to heavy rain.",
    options: ["off", "out", "away", "down"],
    correct: 0
  },
  {
    id: 11,
    type: 'mcq',
    section: 'Prepositions',
    question: "He insisted ________ paying the bill for everyone at the table.",
    options: ["for", "to", "on", "about"],
    correct: 2
  },
  {
    id: 12,
    type: 'mcq',
    section: 'Prepositions',
    question: "We discussed ________ the main issues during the meeting.",
    options: ["about", "on", "regarding", "No preposition needed"],
    correct: 3
  },
  
  // Section 4: Articles & Determiners
  {
    id: 13,
    type: 'mcq',
    section: 'Articles',
    question: "Honest people speak ________ truth regardless of the situation.",
    options: ["a", "an", "the", "No article"],
    correct: 2
  },
  {
    id: 14,
    type: 'mcq',
    section: 'Articles',
    question: "He is ________ European scholar who specializes in ancient history.",
    options: ["a", "an", "the", "No article"],
    correct: 0
  },
  {
    id: 15,
    type: 'mcq',
    section: 'Determiners',
    question: "There is ________ water left in the pitcher, so we need to fetch more.",
    options: ["little", "a little", "few", "a few"],
    correct: 0
  },
  
  // Section 5: Direct & Indirect Speech / Active & Passive Voice
  {
    id: 16,
    type: 'mcq',
    section: 'Indirect Speech',
    question: 'Change to Indirect Speech:\nHe said, "I have been waiting here for two hours."',
    options: [
      "He said that he has been waiting there for two hours.",
      "He said that he had been waiting there for two hours.",
      "He said that I was waiting here for two hours.",
      "He told that he had been waiting here for two hours."
    ],
    correct: 1
  },
  {
    id: 17,
    type: 'mcq',
    section: 'Passive Voice',
    question: 'Change to Passive Voice:\nThey are building a new bridge over the river.',
    options: [
      "A new bridge is built over the river.",
      "A new bridge was being built over the river.",
      "A new bridge is being built over the river.",
      "A new bridge has been built over the river."
    ],
    correct: 2
  },
  
  // Section 6: Sentence Correction & Error Spotting
  {
    id: 18,
    type: 'mcq',
    section: 'Error Spotting',
    question: 'Find the part with an error:\n"One of my friends (A) / are going to London (B) / for higher studies. (C) / No error (D)"',
    options: ["Part A", "Part B", "Part C", "No error"],
    correct: 1
  },
  {
    id: 19,
    type: 'mcq',
    section: 'Error Spotting',
    question: 'Find the part with an error:\n"He is superior (A) / than me (B) / in terms of qualification. (C) / No error (D)"',
    options: ["Part A", "Part B", "Part C", "No error"],
    correct: 1
  },
  {
    id: 20,
    type: 'mcq',
    section: 'Error Spotting',
    question: 'Find the part with an error:\n"Unless you do not work hard, (A) / you will not succeed (B) / in your endeavors. (C) / No error (D)"',
    options: ["Part A", "Part B", "Part C", "No error"],
    correct: 0
  },
  {
    id: 21,
    type: 'mcq',
    section: 'Error Spotting',
    question: 'Find the part with an error:\n"She described about (A) / the beauty of the landscape (B) / in great detail. (C) / No error (D)"',
    options: ["Part A", "Part B", "Part C", "No error"],
    correct: 0
  },
  
  // Section 7: Conditional Sentences & Conjunctions
  {
    id: 22,
    type: 'mcq',
    section: 'Conjunctions',
    question: "Scarcely had she entered the room ________ the lights went out.",
    options: ["than", "then", "when", "so"],
    correct: 2
  },
  {
    id: 23,
    type: 'mcq',
    section: 'Conditionals',
    question: "Had I known about your arrival, I ________ you at the airport.",
    options: ["would meet", "would have met", "had met", "met"],
    correct: 1
  },
  {
    id: 24,
    type: 'mcq',
    section: 'Conjunctions',
    question: "She works hard ________ she may clear the competitive exam.",
    options: ["so that", "lest", "because", "although"],
    correct: 0
  },
  {
    id: 25,
    type: 'mcq',
    section: 'Conjunctions',
    question: "Walk carefully lest you ________ fall into the ditch.",
    options: ["should", "would", "must", "can"],
    correct: 0
  },
  
  // Section 8: Adjectives, Adverbs & Pronouns
  {
    id: 26,
    type: 'mcq',
    section: 'Adjectives',
    question: "This book is preferable ________ that one because of its clarity.",
    options: ["than", "over", "to", "from"],
    correct: 2
  },
  {
    id: 27,
    type: 'mcq',
    section: 'Pronouns',
    question: "Between you and ________, the final decision was entirely unfair.",
    options: ["I", "me", "myself", "mine"],
    correct: 1
  },
  {
    id: 28,
    type: 'mcq',
    section: 'Adjectives',
    question: 'Identify the correct sentence structure:\n"She is the most intelligent girl of the two sisters."',
    options: [
      "She is the most intelligent of the two sisters.",
      "She is more intelligent of the two sisters.",
      "She is the more intelligent of the two sisters.",
      "She is intelligent than the two sisters."
    ],
    correct: 2
  },
  {
    id: 29,
    type: 'mcq',
    section: 'Adverbs',
    question: "He drove ________ through the heavy traffic to reach on time.",
    options: ["cautious", "cautiously", "caution", "with cautious"],
    correct: 1
  },
  {
    id: 30,
    type: 'mcq',
    section: 'Adjectives',
    question: "The weather today is much ________ than it was yesterday.",
    options: ["bad", "worse", "worst", "badly"],
    correct: 1
  }
]

function CommunicationAssessment({ onComplete, isLastSection }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(30 * 60)
  const [showResults, setShowResults] = useState(false)
  const [audioPlayed, setAudioPlayed] = useState({})
  const [isRecording, setIsRecording] = useState(false)
  const [recordingBlob, setRecordingBlob] = useState(null)
  const [thinkTimeLeft, setThinkTimeLeft] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

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

  useEffect(() => {
    if (thinkTimeLeft !== null && thinkTimeLeft > 0) {
      const thinkTimer = setTimeout(() => {
        setThinkTimeLeft(thinkTimeLeft - 1)
      }, 1000)
      return () => clearTimeout(thinkTimer)
    }
  }, [thinkTimeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 1.0
      window.speechSynthesis.speak(utterance)
    }
  }

  const playAudio = (questionId, audioText) => {
    if (!audioPlayed[questionId]) {
      speakText(audioText)
      setAudioPlayed({ ...audioPlayed, [questionId]: true })
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        setRecordingBlob(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      alert('Microphone access denied. Please allow microphone permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    })
  }

  const saveRecording = () => {
    if (recordingBlob) {
      setAnswers({
        ...answers,
        [question.id]: { type: 'audio', blob: recordingBlob }
      })
      setRecordingBlob(null)
    }
  }

  const startThinkTime = () => {
    setThinkTimeLeft(question.thinkTime || 0)
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  if (showResults) {
    const mcqQuestions = communicationQuestions.filter(q => q.type === 'mcq' || q.type === 'audio-mcq')
    let correct = 0
    mcqQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++
      }
    })
    const percentage = ((correct / mcqQuestions.length) * 100).toFixed(1)

    // Pass results to parent
    setTimeout(() => {
      onComplete({
        score: correct,
        total: mcqQuestions.length,
        percentage: percentage
      })
    }, 100)

    return (
      <div className="assessment-container">
        <div className="assessment-header">
          <h2>Communication Assessment - Complete</h2>
        </div>
        <div className="results-container">
          <div className="results-card passed">
            <h1>✓ Assessment Submitted</h1>
            <div className="score-display">
              <span className="score-large">{correct}/{mcqQuestions.length}</span>
              <span className="percentage">{percentage}% (Written & Listening)</span>
            </div>
            <p className="result-message">
              Your communication assessment has been submitted. Your written, listening, and speaking responses will be evaluated for grammar, vocabulary, pronunciation, fluency, and articulation.
            </p>
            <button className="continue-btn" onClick={onComplete}>
              {isLastSection ? 'Complete Test' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = communicationQuestions[currentQuestion]

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <h2>Communication Assessment</h2>
        <div className="header-info">
          <span className="timer">⏱ {formatTime(timeLeft)}</span>
          <span className="question-counter">{currentQuestion + 1} / {communicationQuestions.length}</span>
        </div>
      </div>

      <div className="assessment-content">
        <div className="question-card">
          <div className="question-header">
            <span className="category-badge">{question.section}</span>
            <span className="question-number">Question {currentQuestion + 1}</span>
          </div>
          
          <h3 className="question-text">{question.question}</h3>

          {question.type === 'mcq' && (
            <div className="options-list">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`option-item ${answers[question.id] === index ? 'selected' : ''}`}
                  onClick={() => handleAnswer(question.id, index)}
                >
                  <div className="option-radio">
                    {answers[question.id] === index && <div className="radio-dot" />}
                  </div>
                  <span className="option-text">{option}</span>
                </div>
              ))}
            </div>
          )}

          {question.type === 'audio-mcq' && (
            <div>
              <div className="audio-section">
                <button
                  className="audio-play-btn"
                  onClick={() => playAudio(question.id, question.audioText)}
                  disabled={audioPlayed[question.id]}
                >
                  {audioPlayed[question.id] ? '✓ Audio Played (1x only)' : '🔊 Play Audio (Listen Once)'}
                </button>
              </div>
              <div className="options-list">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`option-item ${answers[question.id] === index ? 'selected' : ''}`}
                    onClick={() => handleAnswer(question.id, index)}
                  >
                    <div className="option-radio">
                      {answers[question.id] === index && <div className="radio-dot" />}
                    </div>
                    <span className="option-text">{option}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {question.type === 'recording' && (
            <div className="recording-section">
              {question.passage && (
                <div className="passage-box">
                  <p>{question.passage}</p>
                </div>
              )}

              {question.thinkTime && thinkTimeLeft === null && (
                <button className="think-btn" onClick={startThinkTime}>
                  Start Think Time ({question.thinkTime}s)
                </button>
              )}

              {thinkTimeLeft !== null && thinkTimeLeft > 0 && (
                <div className="think-timer">
                  Think Time Remaining: {thinkTimeLeft}s
                </div>
              )}

              {(thinkTimeLeft === 0 || (thinkTimeLeft === null && !question.thinkTime)) && (
                <div className="recording-controls">
                  {!isRecording && !recordingBlob && (
                    <button className="record-btn" onClick={startRecording}>
                      🎤 Start Recording
                    </button>
                  )}

                  {isRecording && (
                    <button className="stop-btn" onClick={stopRecording}>
                      ⏹ Stop Recording
                    </button>
                  )}

                  {recordingBlob && (
                    <div className="recording-actions">
                      <p className="success-text">✓ Recording captured</p>
                      <button className="save-recording-btn" onClick={saveRecording}>
                        Save & Continue
                      </button>
                      <button className="retry-btn" onClick={() => setRecordingBlob(null)}>
                        Re-record
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="navigation-buttons">
          <button
            className="nav-btn"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>
          
          {currentQuestion < communicationQuestions.length - 1 ? (
            <button
              className="nav-btn primary"
              onClick={() => {
                setCurrentQuestion(currentQuestion + 1)
                setThinkTimeLeft(null)
                setRecordingBlob(null)
              }}
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

export default CommunicationAssessment
