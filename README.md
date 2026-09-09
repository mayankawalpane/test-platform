# Test Platform - Aspire Nexus

This is the **Test Platform** part of Aspire Nexus - where students take their mock tests after payment.

## What's Included

- **Test Detail Page**: Course details, test guidelines, and "Start Test" button
- **Test Assessment**: Full assessment with multiple sections
  - Technical Assessment (45 min)
  - Behavioral & Cognitive Games (40 min)
  - Communication Assessment (30 min)
- **Assessment Components**:
  - Coding Assessment with code editor
  - Cognitive Games
  - Behavioral Assessment
  - Communication Assessment

## Features

- **No login required** - session passed from payment platform
- Payment verification (redirects unpaid users to payment platform)
- Test attempt tracking
- Timed sections
- Progress tracking
- Results display
- Multiple test attempts

## Tech Stack

- React 18
- Vite
- Monaco Editor (for coding assessments)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Access Flow

1. User comes from payment platform after successful payment: `https://test-platform.com/test`
2. Payment is verified in localStorage
3. User sees test detail page with "Start Test" button
4. Can start taking tests
5. "Back to Courses" button redirects to payment platform

## Configuration

Update payment platform URL in `src/App.jsx` (lines ~21 and ~28):

```javascript
// Change this to your payment platform URL
window.location.href = 'https://payment-platform-url.com'
```

## Important Notes

- **No login/signup page** - users must come from payment platform
- Users MUST have completed payment to access tests
- Unpaid users are automatically redirected back to payment platform
- Payment verification uses localStorage (synced between both platforms)
- Test attempts are tracked per user
