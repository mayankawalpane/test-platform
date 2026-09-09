import { useState } from 'react'
import { getAttempts, saveUserRating, getUserRating } from '../lib/auth'
import './TestIntroPage.css'

function TestIntroPage({ course, sessionEmail, onStartTest, onBack }) {
  const attempts = getAttempts(sessionEmail)
  const [userRating, setUserRating] = useState(getUserRating(sessionEmail, course.id))
  const [hoveredStar, setHoveredStar] = useState(0)
  const [review, setReview] = useState('')
  const [showReviewForm, setShowReviewForm] = useState(!userRating)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleStarClick = (rating) => {
    setUserRating(rating)
    if (!showReviewForm) {
      setShowReviewForm(true)
    }
  }

  const handleSubmitReview = () => {
    if (userRating > 0) {
      saveUserRating(sessionEmail, course.id, {
        rating: userRating,
        review: review.trim(),
        date: new Date().toISOString()
      })
      setSubmitMessage('Thank you for your feedback!')
      setShowReviewForm(false)
      setTimeout(() => setSubmitMessage(''), 3000)
    }
  }

  return (
    <div className="test-intro-page">
      <div className="intro-container">
        <button className="back-button" onClick={onBack}>
          ← Back to Courses
        </button>

        <div className="course-header">
          <img src={course.image} alt={course.title} className="course-image" />
          <div className="course-info">
            <p className="course-provider">{course.provider}</p>
            <h1 className="course-title">{course.title}</h1>
            <div className="course-rating">
              <span className="rating-value">{course.rating}</span>
              <span className="stars">★★★★★</span>
              <span className="reviews">({course.reviews} reviews)</span>
            </div>
            <div className="course-meta">
              <span className="meta-badge">✓ Purchased</span>
              <span className="meta-badge">📊 {attempts} Attempts</span>
              <span className="meta-badge">⏱️ {course.duration}</span>
            </div>
            <button className="start-test-button-top" onClick={onStartTest}>
              Start Test Now →
            </button>
          </div>
        </div>

        <div className="test-details">
          <h2>About This Test</h2>
          <p className="test-description">{course.description}</p>

          <div className="test-sections">
            <h3>Test Sections</h3>
            <div className="sections-grid">
              <div className="section-card">
                <div className="section-icon">💻</div>
                <h4>Technical Assessment</h4>
                <p>45 minutes</p>
                <ul>
                  <li>Programming concepts</li>
                  <li>Data structures</li>
                  <li>Algorithms</li>
                </ul>
              </div>
              <div className="section-card">
                <div className="section-icon">🧠</div>
                <h4>Behavioral & Cognitive</h4>
                <p>40 minutes</p>
                <ul>
                  <li>Logical reasoning</li>
                  <li>Pattern recognition</li>
                  <li>Problem solving</li>
                </ul>
              </div>
              <div className="section-card">
                <div className="section-icon">💬</div>
                <h4>Communication Assessment</h4>
                <p>30 minutes</p>
                <ul>
                  <li>Verbal ability</li>
                  <li>Grammar</li>
                  <li>Comprehension</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="test-guidelines">
            <h3>Important Guidelines</h3>
            <div className="guidelines-list">
              <div className="guideline-item">
                <span className="guideline-icon">✓</span>
                <p>Answer every question — there is no negative marking</p>
              </div>
              <div className="guideline-item">
                <span className="guideline-icon">⏱️</span>
                <p>Each section is timed — manage your time wisely</p>
              </div>
              <div className="guideline-item">
                <span className="guideline-icon">🔒</span>
                <p>You cannot return to a section once it is submitted</p>
              </div>
              <div className="guideline-item">
                <span className="guideline-icon">📊</span>
                <p>Results and feedback are shown at the end of the test</p>
              </div>
              <div className="guideline-item">
                <span className="guideline-icon">🔄</span>
                <p>Take the test unlimited times to improve your score</p>
              </div>
            </div>
          </div>

          <div className="skills-section">
            <h3>Skills Covered</h3>
            <div className="skills-tags">
              {course.skills.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="start-test-section">
          <div className="test-duration-info">
            <p className="duration-text">⏱️ Total Duration: ~2 hours</p>
            <p className="duration-subtext">Make sure you have uninterrupted time before starting</p>
          </div>
          <button className="start-test-button" onClick={onStartTest}>
            Start Test Now →
          </button>
          {attempts > 0 && (
            <p className="attempts-info">
              You've attempted this test {attempts} time{attempts > 1 ? 's' : ''}. Keep practicing to improve!
            </p>
          )}
        </div>

        <div className="rating-section">
          <h3>Rate This Course</h3>
          <p className="rating-subtitle">Share your experience to help other students</p>
          
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star-button ${star <= (hoveredStar || userRating) ? 'active' : ''}`}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
              >
                ★
              </button>
            ))}
            {userRating > 0 && (
              <span className="rating-text">{userRating} out of 5 stars</span>
            )}
          </div>

          {showReviewForm && userRating > 0 && (
            <div className="review-form">
              <textarea
                className="review-textarea"
                placeholder="Write your review (optional)..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="4"
              />
              <button className="submit-review-btn" onClick={handleSubmitReview}>
                Submit Review
              </button>
            </div>
          )}

          {submitMessage && (
            <p className="submit-message">{submitMessage}</p>
          )}

          {!showReviewForm && userRating > 0 && (
            <div className="user-review-display">
              <p className="review-status">✓ You rated this course {userRating} stars</p>
              <button 
                className="edit-rating-btn" 
                onClick={() => setShowReviewForm(true)}
              >
                Edit Rating
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TestIntroPage
