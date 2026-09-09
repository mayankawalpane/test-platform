// Client-side auth and payment tracking using localStorage
// All user data persists locally without backend
const USERS_KEY = 'aspire-nexus-users'
const SESSION_KEY = 'aspire-nexus-session'
const PAID_EMAILS_KEY = 'aspire-nexus-paid-emails'
const ATTEMPTS_KEY = 'aspire-nexus-attempts'

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email))
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || fallback)
  } catch {
    return JSON.parse(fallback)
  }
}

async function hashPassword(password) {
  const bytes = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`aspire-nexus:${password}`)
  )
  return [...new Uint8Array(bytes)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function getSession() {
  return localStorage.getItem(SESSION_KEY)
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export async function register(email, password) {
  const normalized = normalizeEmail(email)
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.')
  }
  
  const users = readJson(USERS_KEY, '{}')
  if (users[normalized]) {
    throw new Error('An account with this email already exists. Please log in.')
  }
  
  users[normalized] = {
    passwordHash: await hashPassword(password),
    registeredAt: new Date().toISOString(),
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  localStorage.setItem(SESSION_KEY, normalized)
  return normalized
}

export async function login(email, password) {
  const normalized = normalizeEmail(email)
  const users = readJson(USERS_KEY, '{}')
  const user = users[normalized]
  
  if (!user) {
    throw new Error('No account found for this email. Please register first.')
  }
  if (user.passwordHash !== (await hashPassword(password))) {
    throw new Error('Incorrect password. Please try again.')
  }
  
  localStorage.setItem(SESSION_KEY, normalized)
  return normalized
}

// Check if an email has paid for a specific course
export function isEmailPaid(email, courseId = 1) {
  const normalized = normalizeEmail(email)
  if (!normalized) return false
  
  const paidEmails = readJson(PAID_EMAILS_KEY, '{}')
  const hasPaid = paidEmails[normalized]?.courses?.includes(courseId) || false
  console.log('Payment check for', normalized, 'course', courseId, ':', hasPaid)
  return hasPaid
}

// Clear all payment data (for testing purposes)
export function clearAllPayments() {
  localStorage.removeItem(PAID_EMAILS_KEY)
  console.log('All payment data cleared')
}

// Clear payment for specific email and course
export function clearPayment(email, courseId = 1) {
  const normalized = normalizeEmail(email)
  if (!normalized) return
  
  const paidEmails = readJson(PAID_EMAILS_KEY, '{}')
  if (paidEmails[normalized]) {
    paidEmails[normalized].courses = (paidEmails[normalized].courses || []).filter(id => id !== courseId)
    paidEmails[normalized].payments = (paidEmails[normalized].payments || []).filter(p => p.courseId !== courseId)
    
    if (paidEmails[normalized].courses.length === 0) {
      delete paidEmails[normalized]
    }
    
    localStorage.setItem(PAID_EMAILS_KEY, JSON.stringify(paidEmails))
    console.log('Payment cleared for', normalized, 'course', courseId)
  }
}

// Mark an email as paid for a specific course
export function markEmailPaid(email, courseId = 1, paymentDetails = {}) {
  const normalized = normalizeEmail(email)
  if (!normalized) return
  
  const paidEmails = readJson(PAID_EMAILS_KEY, '{}')
  
  if (!paidEmails[normalized]) {
    paidEmails[normalized] = {
      courses: [],
      payments: []
    }
  }
  
  if (!paidEmails[normalized].courses.includes(courseId)) {
    paidEmails[normalized].courses.push(courseId)
    paidEmails[normalized].payments.push({
      courseId,
      paidAt: new Date().toISOString(),
      ...paymentDetails
    })
    localStorage.setItem(PAID_EMAILS_KEY, JSON.stringify(paidEmails))
  }
}

// Simulate Razorpay payment locally
export function processLocalPayment(email, courseId = 1) {
  const mockPaymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  markEmailPaid(email, courseId, {
    paymentId: mockPaymentId,
    amount: 20,
    currency: 'INR',
    method: 'local_simulation'
  })
  
  return {
    success: true,
    paymentId: mockPaymentId
  }
}

// Attempt history, keyed by the logged-in email
export function getAttempts(email) {
  const attempts = readJson(ATTEMPTS_KEY, '{}')
  return attempts[normalizeEmail(email)]?.count ?? 0
}

export function recordAttempt(email) {
  const normalized = normalizeEmail(email)
  if (!normalized) return 0
  
  const attempts = readJson(ATTEMPTS_KEY, '{}')
  const entry = attempts[normalized] || { count: 0 }
  entry.count += 1
  entry.lastAttemptAt = new Date().toISOString()
  attempts[normalized] = entry
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts))
  return entry.count
}

// User ratings for courses
const RATINGS_KEY = 'aspire-nexus-ratings'

// Dummy reviews to populate courses (38 for TCS, 38 for Accenture)
const DUMMY_REVIEWS = {
  1: [ // TCS
    { rating: 5, review: 'Excellent preparation material!', date: '2026-08-15T10:00:00.000Z' },
    { rating: 5, review: 'Very helpful for TCS NQT', date: '2026-08-16T11:30:00.000Z' },
    { rating: 4, review: 'Good coverage of topics', date: '2026-08-17T09:15:00.000Z' },
    { rating: 5, review: 'Best mock test available', date: '2026-08-18T14:20:00.000Z' },
    { rating: 4, review: 'Well structured questions', date: '2026-08-19T16:45:00.000Z' },
    { rating: 5, review: 'Helped me clear TCS!', date: '2026-08-20T08:30:00.000Z' },
    { rating: 5, review: 'Highly recommended', date: '2026-08-21T12:00:00.000Z' },
    { rating: 4, review: 'Great for practice', date: '2026-08-22T10:15:00.000Z' },
    { rating: 5, review: 'Realistic test scenarios', date: '2026-08-23T15:30:00.000Z' },
    { rating: 5, review: 'Worth every penny', date: '2026-08-24T09:45:00.000Z' },
    { rating: 4, review: 'Good question quality', date: '2026-08-25T11:20:00.000Z' },
    { rating: 5, review: 'Covers all sections well', date: '2026-08-26T14:10:00.000Z' },
    { rating: 5, review: 'Perfect for TCS prep', date: '2026-08-27T16:00:00.000Z' },
    { rating: 4, review: 'Very useful resource', date: '2026-08-28T10:30:00.000Z' },
    { rating: 5, review: 'Improved my score significantly', date: '2026-08-29T13:15:00.000Z' },
    { rating: 5, review: 'Comprehensive test series', date: '2026-08-30T09:00:00.000Z' },
    { rating: 4, review: 'Good value for money', date: '2026-08-31T15:45:00.000Z' },
    { rating: 5, review: 'Excellent practice platform', date: '2026-09-01T11:30:00.000Z' },
    { rating: 5, review: 'Must-try for TCS aspirants', date: '2026-09-02T14:20:00.000Z' },
    { rating: 4, review: 'Well designed tests', date: '2026-09-03T10:00:00.000Z' },
    { rating: 5, review: 'Got placed thanks to this!', date: '2026-09-04T12:45:00.000Z' },
    { rating: 5, review: 'Amazing quality questions', date: '2026-09-05T09:30:00.000Z' },
    { rating: 4, review: 'Very effective preparation', date: '2026-09-06T16:15:00.000Z' },
    { rating: 5, review: 'Detailed explanations provided', date: '2026-09-07T11:00:00.000Z' },
    { rating: 5, review: 'Boosted my confidence', date: '2026-09-08T13:30:00.000Z' },
    { rating: 4, review: 'Good test difficulty level', date: '2026-09-09T10:45:00.000Z' },
    { rating: 5, review: 'Really helpful mock tests', date: '2026-09-10T15:00:00.000Z' },
    { rating: 5, review: 'Best TCS preparation course', date: '2026-09-11T09:15:00.000Z' },
    { rating: 4, review: 'Thorough coverage of syllabus', date: '2026-09-12T14:30:00.000Z' },
    { rating: 5, review: 'Exceeded expectations', date: '2026-09-13T11:45:00.000Z' },
    { rating: 5, review: 'Great for time management practice', date: '2026-09-14T10:20:00.000Z' },
    { rating: 4, review: 'Solid preparation material', date: '2026-09-15T16:00:00.000Z' },
    { rating: 5, review: 'Helped identify weak areas', date: '2026-09-16T12:30:00.000Z' },
    { rating: 5, review: 'Very comprehensive', date: '2026-09-17T09:50:00.000Z' },
    { rating: 4, review: 'Good practice platform', date: '2026-09-18T15:15:00.000Z' },
    { rating: 5, review: 'Highly effective preparation', date: '2026-09-19T11:10:00.000Z' },
    { rating: 5, review: 'Strongly recommend this course', date: '2026-09-20T14:45:00.000Z' },
    { rating: 5, review: 'Perfect for placement prep', date: '2026-09-21T10:05:00.000Z' }
  ],
  2: [ // Accenture
    { rating: 5, review: 'Outstanding mock test for Accenture', date: '2026-08-15T10:00:00.000Z' },
    { rating: 5, review: 'Cleared Accenture with this!', date: '2026-08-16T11:30:00.000Z' },
    { rating: 4, review: 'Very good question bank', date: '2026-08-17T09:15:00.000Z' },
    { rating: 5, review: 'Excellent preparation tool', date: '2026-08-18T14:20:00.000Z' },
    { rating: 4, review: 'Well organized content', date: '2026-08-19T16:45:00.000Z' },
    { rating: 5, review: 'Must-have for Accenture prep', date: '2026-08-20T08:30:00.000Z' },
    { rating: 5, review: 'Top quality mock tests', date: '2026-08-21T12:00:00.000Z' },
    { rating: 4, review: 'Great practice resource', date: '2026-08-22T10:15:00.000Z' },
    { rating: 5, review: 'Mirrors actual test format', date: '2026-08-23T15:30:00.000Z' },
    { rating: 5, review: 'Best investment for placement', date: '2026-08-24T09:45:00.000Z' },
    { rating: 4, review: 'Good question variety', date: '2026-08-25T11:20:00.000Z' },
    { rating: 5, review: 'All sections covered thoroughly', date: '2026-08-26T14:10:00.000Z' },
    { rating: 5, review: 'Ideal for Accenture placement', date: '2026-08-27T16:00:00.000Z' },
    { rating: 4, review: 'Very practical approach', date: '2026-08-28T10:30:00.000Z' },
    { rating: 5, review: 'Score improved dramatically', date: '2026-08-29T13:15:00.000Z' },
    { rating: 5, review: 'Complete test preparation', date: '2026-08-30T09:00:00.000Z' },
    { rating: 4, review: 'Worth the price', date: '2026-08-31T15:45:00.000Z' },
    { rating: 5, review: 'Superb practice platform', date: '2026-09-01T11:30:00.000Z' },
    { rating: 5, review: 'Essential for Accenture aspirants', date: '2026-09-02T14:20:00.000Z' },
    { rating: 4, review: 'Professionally designed', date: '2026-09-03T10:00:00.000Z' },
    { rating: 5, review: 'Got offer letter!', date: '2026-09-04T12:45:00.000Z' },
    { rating: 5, review: 'High-quality questions', date: '2026-09-05T09:30:00.000Z' },
    { rating: 4, review: 'Very good preparation tool', date: '2026-09-06T16:15:00.000Z' },
    { rating: 5, review: 'Clear and detailed content', date: '2026-09-07T11:00:00.000Z' },
    { rating: 5, review: 'Confidence booster', date: '2026-09-08T13:30:00.000Z' },
    { rating: 4, review: 'Appropriate difficulty', date: '2026-09-09T10:45:00.000Z' },
    { rating: 5, review: 'Extremely helpful', date: '2026-09-10T15:00:00.000Z' },
    { rating: 5, review: 'Best Accenture prep available', date: '2026-09-11T09:15:00.000Z' },
    { rating: 4, review: 'Complete syllabus coverage', date: '2026-09-12T14:30:00.000Z' },
    { rating: 5, review: 'Beyond expectations', date: '2026-09-13T11:45:00.000Z' },
    { rating: 5, review: 'Great time management practice', date: '2026-09-14T10:20:00.000Z' },
    { rating: 4, review: 'Strong content quality', date: '2026-09-15T16:00:00.000Z' },
    { rating: 5, review: 'Identified my weak points', date: '2026-09-16T12:30:00.000Z' },
    { rating: 5, review: 'Thoroughly comprehensive', date: '2026-09-17T09:50:00.000Z' },
    { rating: 4, review: 'Excellent practice', date: '2026-09-18T15:15:00.000Z' },
    { rating: 5, review: 'Highly recommend', date: '2026-09-19T11:10:00.000Z' },
    { rating: 5, review: 'Strongly recommended', date: '2026-09-20T14:45:00.000Z' },
    { rating: 5, review: 'Perfect placement preparation', date: '2026-09-21T10:05:00.000Z' }
  ]
}

export function saveUserRating(email, courseId, ratingData) {
  const normalized = normalizeEmail(email)
  if (!normalized) return
  
  const ratings = readJson(RATINGS_KEY, '{}')
  const ratingKey = `${normalized}-${courseId}`
  ratings[ratingKey] = {
    email: normalized,
    courseId,
    rating: ratingData.rating,
    review: ratingData.review || '',
    date: ratingData.date
  }
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings))
}

export function getUserRating(email, courseId) {
  const normalized = normalizeEmail(email)
  if (!normalized) return null
  
  const ratings = readJson(RATINGS_KEY, '{}')
  const ratingKey = `${normalized}-${courseId}`
  return ratings[ratingKey]?.rating || 0
}

export function getCourseRatings(courseId) {
  const ratings = readJson(RATINGS_KEY, '{}')
  
  // Get user ratings for this course
  const userRatings = Object.values(ratings).filter(r => r.courseId === courseId)
  
  // Get dummy reviews for this course
  const dummyReviews = DUMMY_REVIEWS[courseId] || []
  
  // Combine user ratings and dummy reviews
  const allRatings = [...dummyReviews, ...userRatings]
  
  if (allRatings.length === 0) {
    return { averageRating: 0, totalReviews: 0 }
  }
  
  const totalRating = allRatings.reduce((sum, r) => sum + r.rating, 0)
  const averageRating = (totalRating / allRatings.length).toFixed(1)
  
  return {
    averageRating: parseFloat(averageRating),
    totalReviews: allRatings.length,
    ratings: allRatings
  }
}
