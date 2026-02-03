# 🌙 Cravin Landing Page

A modern, production-ready landing page for Cravin - a midnight snack delivery service for hostel students. Features real-time traffic simulation to showcase live activity.

## 🎨 Design Features

- **Modern Dark Theme** with neon orange accents
- **Real-Time Activity Display** - Simulated live traffic and order feed
- **Smooth Animations** - Scroll reveals, hover effects, and transitions
- **Glassmorphism** - Frosted glass effects on cards
- **Mobile-First & Responsive** - Looks great on all devices
- **Performance Optimized** - Lazy loading, debounced events
- **Accessibility** - Keyboard navigation, reduced motion support

## 📁 Project Structure

```
cravin-landing/
├── index.html          # Main HTML structure
├── style.css           # All styles and animations
├── script.js           # Interactive features + traffic simulation
└── README.md           # This file
```

## 🚀 Quick Start

### Option 1: Local Development

1. **Clone or download** this repository
2. **Open `index.html`** in your browser
3. **Customize** the content (see below)

### Option 2: Deploy to GitHub Pages

1. **Create a new GitHub repository**
2. **Upload all files** (index.html, style.css, script.js)
3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main (or master)
   - Folder: / (root)
4. **Your site will be live** at `https://yourusername.github.io/repository-name`

## 🛠️ Customization Guide

### 1. Add Your Google Form

**Step 1:** Create a Google Form
- Go to [Google Forms](https://forms.google.com)
- Create your order form with fields like:
  - Name
  - Hostel/Room Number
  - Phone Number
  - Snack Items
  - Delivery Instructions

**Step 2:** Get the Embed Code
- Click **Send** button in your form
- Click the **< > Embed** icon
- Copy the iframe code

**Step 3:** Replace in `index.html`
- Find this line (around line 134):
```html
<iframe 
    src="https://docs.google.com/forms/d/e/1FAIpQLSf_REPLACE_WITH_YOUR_FORM_ID/viewform?embedded=true"
```
- Replace with your iframe src

### 2. Connect Real Traffic Data (Optional)

The site currently uses **simulated traffic data** for demonstration. To connect real data:

**Edit `script.js`** and replace the simulation with API calls:

```javascript
// Replace this simulation code:
function updateTrafficData() {
    // Simulated updates...
}

// With actual API calls:
async function updateTrafficData() {
    const response = await fetch('YOUR_API_ENDPOINT');
    const data = await response.json();
    
    document.getElementById('activeUsers').textContent = data.activeUsers;
    document.getElementById('todayOrders').textContent = data.todayOrders;
    // etc...
}
```

**Activity Feed:** Similarly, replace `generateActivity()` with real order data from your backend.

### 3. Update GitHub Link

In `index.html`, find this line (around line 172):
```html
<a href="https://github.com/yourusername/cravin" target="_blank" class="footer-link">
```
Replace with your actual GitHub repository URL.

### 4. Change Color Scheme

To change from neon orange to another accent color, edit `style.css`:

**For Electric Purple:**
```css
--color-primary: #a855f7;
--color-primary-glow: rgba(168, 85, 247, 0.4);
--gradient-primary: linear-gradient(135deg, #a855f7 0%, #c084fc 100%);
```

**For Lime Green:**
```css
--color-primary: #84cc16;
--color-primary-glow: rgba(132, 204, 22, 0.4);
--gradient-primary: linear-gradient(135deg, #84cc16 0%, #a3e635 100%);
```

### 5. Customize Traffic Numbers

To set initial traffic values, edit `script.js` (around line 75):

```javascript
let trafficData = {
    activeUsers: 3,        // Change to your actual number
    todayOrders: 12,       // Change to your actual number
    totalDeliveries: 247,  // Change to your actual number
    avgTime: 18           // Average delivery time in minutes
};
```

## 📱 Mobile Responsiveness

The site is fully responsive with breakpoints at:
- **768px** - Tablet layout
- **480px** - Mobile optimizations

Test on different devices using browser DevTools (F12 → Toggle Device Toolbar).

## ⚡ Traffic Simulation Features

### Live Metrics
- **Active Users** - Fluctuates between 1-8 users
- **Today's Orders** - Incrementally increases
- **Total Deliveries** - Running total since launch
- **Avg Delivery Time** - Varies between 15-22 minutes

### Activity Feed
- Shows recent order activity from different hostels
- New activities appear every 8-15 seconds
- Displays last 6 activities
- Includes hostel names and popular items

**Note:** This is simulated data for demo purposes. Replace with real data for production.

## 🎯 Order Status Feature

The site includes a smart status indicator that shows:
- **🟢 Orders OPEN** (11:30 PM - 2:00 AM)
- **🔴 Orders CLOSED** (other times)

This updates automatically based on the user's local time.

## 🐛 Troubleshooting

**Google Form not showing?**
- Check if the iframe src is correct
- Ensure the form is set to "Anyone can respond"
- Try opening the form link directly in a new tab

**Traffic numbers not updating?**
- Check browser console for errors (F12)
- Ensure `script.js` is loading correctly
- Verify JavaScript is enabled in browser

**Animations not working?**
- Make sure `script.js` is loading correctly
- Check browser console for errors (F12)
- Some users may have "reduced motion" enabled

**Mobile issues?**
- Test using actual devices or browser DevTools
- Check viewport meta tag is present in `<head>`

## 📊 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Performance Tips

1. **Optimize Images** - If you add images, compress them
2. **Minimize Requests** - All CSS/JS is inline-ready
3. **Enable Caching** - Configure on your hosting platform
4. **CDN Integration** - Consider Cloudflare for faster delivery

## 💡 Pro Tips

1. **Test the order flow** - Fill out your form to ensure it works
2. **Add analytics** - Use Google Analytics or similar to track visits
3. **Custom domain** - GitHub Pages supports custom domains
4. **Meta tags** - Add Open Graph tags for better social sharing
5. **Favicon** - Add a custom favicon for brand identity
6. **Backend Integration** - Connect to a real API for actual traffic data

## 🔧 Advanced: Connecting to Real Backend

To make this a fully functional app:

1. **Backend Setup**
   - Create an API endpoint that returns traffic stats
   - Store orders in a database (Firebase, MongoDB, etc.)
   
2. **Update JavaScript**
   - Replace simulated data with API calls
   - Add error handling for network failures
   
3. **Real-time Updates**
   - Use WebSockets or Server-Sent Events
   - Or poll the API every 5-10 seconds

Example API structure:
```javascript
{
  "activeUsers": 5,
  "todayOrders": 23,
  "totalDeliveries": 412,
  "avgDeliveryTime": 19,
  "recentActivities": [
    {
      "hostel": "Block A",
      "item": "Maggi",
      "timestamp": "2024-01-15T23:45:00Z"
    }
  ]
}
```

## 📄 License

Free to use for your startup experiments. Built for students, by students.

---

**Operating since 2024** | Designed for hostel students | Real-time activity tracking

Need help? Open an issue on GitHub or reach out to the community!
