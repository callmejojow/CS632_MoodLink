# MoodLink - Your Wellness Companion

A modern, responsive mental health mood tracking application built with React and Tailwind CSS.

## Overview

MoodLink is a comprehensive mood tracking app designed to help users monitor their mental health and wellbeing. With a clean, therapeutic interface and intuitive design, it provides a safe space for users to track their daily moods, reflect through journaling, and access helpful mental health resources.

## Features

### 🎯 Core Functionality
- **Daily Mood Tracking**: Select from 5 emoji-based mood levels (Great, Good, Okay, Low, Sad)
- **Optional Notes**: Add detailed thoughts and feelings to mood entries
- **Local Storage**: All data is stored securely on your device
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### 📊 Mood Analytics
- **7-Day Calendar View**: Visual representation of your mood patterns
- **Statistics Dashboard**: Track total entries, most common moods, and percentages
- **Recent Entries**: Quick overview of your latest mood logs
- **Trend Analysis**: Identify patterns in your emotional wellbeing

### 📝 Personal Journal
- **Reflection Space**: Read and review mood entries with detailed notes
- **Journaling Tips**: Helpful prompts for effective emotional expression
- **Chronological Timeline**: See your emotional journey over time

### 🛠️ Resources & Support
- **Mental Health Resources**: Breathing exercises, mindfulness techniques, and coping strategies
- **Self-Care Activities**: Practical wellness tips and daily routines
- **Professional Help Guidance**: Information on when and how to seek professional support

### ⚠️ Crisis Support
- **24/7 Helplines**: Direct access to crisis hotlines and text services
- **Emergency Resources**: Clear steps for crisis situations
- **Safety Information**: Immediate help for users in distress

### ⚙️ Settings & Privacy
- **Data Export**: Download your mood data as JSON
- **Data Management**: Clear all data with confirmation
- **Privacy First**: All data stored locally, never shared
- **Customizable Reminders**: Set daily mood tracking notifications

## Technology Stack

- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.0
- **Build Tool**: Create React App
- **Storage**: Browser LocalStorage
- **Icons**: Heroicons (SVG)
- **Fonts**: Inter (Google Fonts)

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd moodlink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the app

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Usage Guide

### Tracking Your Mood

1. **Select Your Mood**: Click on one of the five emoji buttons representing your current feeling
2. **Add Details (Optional)**: Click "Add more detail" to include thoughts or context
3. **Save Entry**: Click "Save Mood Entry" to record your mood
4. **Confirmation**: See a success message confirming your entry was saved

### Viewing Trends

1. **Navigate to Mood Tracker**: Use the sidebar menu or click the "Mood Trends" card
2. **Review Statistics**: See your total entries, most common mood, and percentage breakdown
3. **Check Calendar**: View the last 7 days with color-coded mood indicators
4. **Browse Recent Entries**: Scroll through your latest mood logs

### Using the Journal

1. **Access Journal**: Click on "Journal" in the sidebar menu
2. **Read Entries**: View mood entries that include personal notes
3. **Reflect**: Use the journaling tips to enhance your self-reflection practice

### Accessing Resources

1. **Explore Resources**: Visit the "Resources" section for mental health tools
2. **Try Techniques**: Practice breathing exercises, mindfulness, and coping strategies
3. **Professional Help**: Get guidance on when to seek additional support

### Crisis Support

1. **Immediate Help**: Access the "Crisis Support" section for emergency resources
2. **Call or Text**: Use direct links to contact crisis helplines
3. **Emergency Steps**: Follow clear instructions for crisis situations

## Data Privacy & Security

- **Local Storage Only**: All mood data is stored locally on your device
- **No Server Communication**: No data is transmitted to external servers
- **User Control**: Complete control over your data with export and delete options
- **No Tracking**: No analytics or user tracking implemented
- **Privacy by Design**: Built with user privacy as the primary concern

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Compatible**: Proper ARIA labels and semantic HTML
- **High Contrast**: Therapeutic color palette with accessible contrast ratios
- **Touch Friendly**: Large touch targets (minimum 44px) for mobile devices
- **Responsive Design**: Works seamlessly across all device sizes

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Project Structure

```
src/
├── components/
│   ├── Dashboard.js          # Main dashboard with mood entry
│   ├── MoodSelector.js       # Emoji mood selection component
│   ├── MoodTrends.js         # Analytics and trends view
│   ├── Journal.js            # Journal entries view
│   ├── Resources.js          # Mental health resources
│   ├── Settings.js           # App settings and data management
│   ├── CrisisSupport.js      # Crisis support resources
│   └── Sidebar.js            # Navigation sidebar
├── App.js                    # Main app component
├── index.js                  # App entry point
└── index.css                 # Tailwind CSS and custom styles
```

## Contributing

This is a mental health application. When contributing:

1. **Sensitivity**: Be mindful of the sensitive nature of mental health topics
2. **Accessibility**: Ensure all features remain accessible
3. **Privacy**: Maintain the privacy-first approach
4. **Testing**: Test thoroughly across different devices and browsers
5. **Documentation**: Update documentation for any new features

## Disclaimer

MoodLink is a self-tracking tool and is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers with any questions you may have regarding your mental health.

## License

This project is created for educational and personal use. Please ensure any usage complies with applicable mental health privacy regulations.

## Support

If you're experiencing a mental health crisis:
- **US**: Call 988 (Suicide & Crisis Lifeline)
- **US**: Text HOME to 741741 (Crisis Text Line)
- **Emergency**: Call 911

Remember: You are not alone, and help is always available.

---

*Built with ❤️ for mental health awareness and support* 