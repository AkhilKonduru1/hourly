# Hourly - Volunteer Hours Tracking App

A comprehensive Expo app for iOS that connects students with verified volunteer opportunities while helping schools and nonprofits manage service hours.

## Features

### For Students 🎓
- **Interactive Map**: Browse local volunteer opportunities on a fully interactive map powered by OpenStreetMap (defaults to Cedar Park, TX area)
- **Smart Search**: Filter opportunities by category, date, and location
- **Easy Booking**: Reserve volunteer spots with one tap
- **Hour Tracking**: Automatically log verified hours using GPS, QR codes, or signatures
- **Digital Profile**: Build a comprehensive volunteer resume
- **Premium Features**: 
  - Auto-generated volunteer resume for college applications
  - Early access to limited spots
  - Local business rewards

### For Organizations/Schools 🏫
- **Dashboard**: Comprehensive overview of volunteer activities
- **Post Opportunities**: Easy event creation and management
- **Hour Approval**: Review and approve student volunteer hours
- **Reports & Analytics**: Export data and track engagement metrics
- **Contest Management**: Run volunteer competitions to boost engagement
- **Featured Listings**: Increase visibility for high-priority events

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Xcode) or physical iPhone for testing

## Installation

1. Navigate to the project directory:
```bash
cd hourly
```

2. Install dependencies (already done):
```bash
npm install
```

## Running the App

### iOS Simulator
```bash
npx expo start --ios
```

### iOS Device
```bash
npx expo start
```
Then scan the QR code with your iPhone using the Expo Go app.

### Web (for testing only)
```bash
npx expo start --web
```

## Project Structure

```
hourly/
├── App.js                          # Main app entry point
├── context/
│   └── AuthContext.js             # Authentication state management
├── data/
│   └── mockData.js                # Mock volunteer opportunities and user data
├── navigation/
│   └── AppNavigator.js            # Navigation configuration
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.js         # Login screen
│   │   ├── SignupScreen.js        # Signup screen
│   │   └── UserTypeSelection.js  # Choose student or organization
│   ├── student/
│   │   ├── StudentHomeScreen.js   # Home with map and opportunities
│   │   ├── OpportunityDetailsScreen.js  # Detailed opportunity view
│   │   └── StudentProfileScreen.js      # Student profile and hours
│   └── organization/
│       ├── OrgDashboardScreen.js  # Organization dashboard
│       ├── PostOpportunityScreen.js     # Create opportunities
│       ├── ManageHoursScreen.js   # Approve volunteer hours
│       └── ReportsScreen.js       # Analytics and reports
└── package.json
```

## How to Use

### As a Student:
1. **Sign Up**: Create an account and select "Student" as your account type
2. **Browse**: View volunteer opportunities on the map or list view
3. **Filter**: Use category filters to find opportunities that interest you
4. **Book**: Reserve your spot at an event
5. **Attend**: Show up to the event and verify attendance (simulated in demo)
6. **Track**: View your accumulated hours in your profile
7. **Upgrade**: Try the Premium features for enhanced benefits

### As an Organization:
1. **Sign Up**: Create an account and select "Organization/School" as your account type
2. **Post**: Create new volunteer opportunities with all details
3. **Manage**: View registered volunteers and event statistics
4. **Approve**: Review and approve volunteer hours
5. **Report**: Export data and view analytics
6. **Feature**: Mark important events as featured for increased visibility

## Mock Data

The app includes comprehensive mock data for demonstration:
- 6 sample volunteer opportunities across different categories
- Student volunteer history with approved and pending hours
- Organization dashboard statistics
- Top volunteers leaderboard
- Event performance metrics

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **Maps**: Apple MapKit JS (with OpenStreetMap fallback) via WebView
- **WebView**: react-native-webview
- **State Management**: React Context API

## Map Implementation

The app uses **Apple MapKit JS** to display an interactive map with the Apple Maps interface (including the Apple logo in the bottom-left corner). For production use, you would need to:

1. Sign up for [Apple Developer Program](https://developer.apple.com/programs/)
2. Create a MapKit JS identifier and private key
3. Generate JWT tokens for authentication

For demo purposes, the app includes an OpenStreetMap fallback that activates if MapKit JS authentication fails.

## Features Not Implemented (Backend Required)

The following features are UI-only demonstrations:
- Real authentication and user management
- Actual GPS verification
- QR code generation and scanning
- Push notifications
- Payment processing for premium subscriptions
- Email reports
- Real-time updates

## Business Model (Conceptual)

- **School Licenses**: Annual subscriptions for schools
- **Featured Listings**: Organizations pay to feature their events
- **Premium Subscriptions**: $4.99/month for students
- **Local Sponsor Ads**: Advertising from local businesses

## Future Enhancements

- Push notifications for upcoming events and hour approvals
- In-app messaging between students and organizers
- Social features (share achievements, invite friends)
- Gamification (badges, achievements, levels)
- Integration with school systems
- Real payment processing
- Advanced analytics and insights

## Support

For questions or issues, please contact support@hourly.app (demo only)

## License

MIT License - This is a demonstration project.

---

Built with ❤️ for the volunteer community
