# Razorpay Redirect Setup

## How It Works

1. User pays on payment platform (https://aspire-nexus.vercel.app)
2. Payment platform stores payment info in localStorage
3. Razorpay redirects to test platform: `https://test-platform-zrqk.onrender.com`
4. Test platform checks localStorage for payment (same browser)
5. If payment found → show tests
6. If no payment → show access denied message

## Razorpay Configuration

In your payment platform Razorpay handler, set:

```javascript
const options = {
  key: "your_razorpay_key",
  amount: 200000, // 2000 INR in paise
  currency: "INR",
  name: "Aspire Nexus",
  description: "Course Payment",
  handler: function (response) {
    // Save payment to localStorage
    const email = /* user email */;
    const courseId = /* course id */;
    
    localStorage.setItem('aspire_session', email);
    
    const payment = {
      paymentId: response.razorpay_payment_id,
      amount: 2000,
      currency: 'INR',
      timestamp: new Date().toISOString()
    };
    
    const payments = JSON.parse(localStorage.getItem('aspire_payments') || '{}');
    if (!payments[email]) payments[email] = {};
    payments[email][courseId] = payment;
    localStorage.setItem('aspire_payments', JSON.stringify(payments));
    
    // Redirect to test platform
    window.location.href = 'https://test-platform-zrqk.onrender.com';
  }
};
```

## Important Notes

- **Same Browser Required**: Payment and test must be in the same browser (localStorage is browser-specific)
- **No URL Parameters Needed**: Payment info comes from localStorage, not URL
- **Simple Redirect**: Just redirect to `https://test-platform-zrqk.onrender.com`

## Testing

1. Open payment platform in browser
2. Complete payment
3. Gets redirected to test platform
4. Should see tests (if payment stored correctly)
5. If you see "Access Denied", check localStorage in browser DevTools

## Debugging

Open browser console (F12) and check:
```javascript
// Check session
localStorage.getItem('aspire_session')

// Check payments
localStorage.getItem('aspire_payments')
```

Both platforms must use the same localStorage keys!
