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

## Deploy to Render

1. **Connect your repository** to Render
2. **Create a new Static Site**:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
3. **Add Environment Variable**:
   - Key: `VITE_PAYMENT_PLATFORM_URL`
   - Value: `https://your-payment-platform.vercel.app` (or your actual payment URL)
4. **Deploy** - Render will automatically build and deploy

The `render.yaml` and `_redirects` files are already configured for proper SPA routing.

## Access Flow

1. User comes from payment platform after successful payment: `https://test-platform.com/test`
2. Payment is verified in localStorage
3. User sees test detail page with "Start Test" button
4. Can start taking tests
5. "Back to Courses" button redirects to payment platform

## Configuration

Set your payment platform URL as an environment variable:

**For local development**, create `.env` file:
```env
VITE_PAYMENT_PLATFORM_URL=https://your-payment-platform.vercel.app
```

**For Render deployment**:
1. Go to your Render dashboard
2. Select your test-platform service
3. Go to Environment tab
4. Add: `VITE_PAYMENT_PLATFORM_URL` = `https://your-payment-platform-url.com`

## Important Notes

- **No login/signup page** - users must come from payment platform
- Users MUST have completed payment to access tests
- Unpaid users are automatically redirected back to payment platform
- Payment verification uses localStorage (synced between both platforms)
- Test attempts are tracked per user
