# Aspire Volonte - Financial Advisory Website

A modern, responsive financial advisory website showcasing various insurance policies, featuring elegant modal interactions, tree planting initiative, and comprehensive insurance solutions.

![Aspire Volonte](https://img.shields.io/badge/Aspire%20Volonte-Insurance-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

## 🌟 Features

### Core Features

- 📱 Fully responsive design optimized for all devices
- 🎯 Interactive policy cards with themed modals
- 🌳 Environmental initiative with tree planting program
- 💬 Real-time chat support
- 📊 Quick quote calculator
- 📝 Smart contact forms with validation
- 📨 Newsletter subscription system
- 🎨 Modern UI with smooth animations

### Technical Features

- ⚡ Elegant animations and transitions
- 🎨 Themed components and modals
- 🔄 Dynamic content loading
- 📊 Real-time premium calculations
- 📱 Mobile-first approach
- 🔒 Secure form handling with Firebase
- 🌐 Integrated backend with Firebase

## 🛠️ Tech Stack

- **Frontend**:
  - HTML5
  - CSS3 (with modern Flexbox/Grid)
  - JavaScript (ES6+)
  - Google Fonts
  - Font Awesome Icons
  - AOS (Animate On Scroll)
  - Swiper.js
  - Vanilla-tilt.js
  - CountUp.js

- **Backend**:
  - Firebase (Firestore)
  - Node.js
  - Express.js

- **Dependencies**:
  - Firebase Admin SDK
  - Stripe.js (for payments)
  - Nodemailer (for emails)
  - Cors
  - Helmet (for security)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (latest version)
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DevPahanLankage/AspireVolonte-E360.git
   ```

2. Navigate to project directory:
   ```bash
   cd AspireVolonte-E360
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file with:
   ```env
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 🎨 Design System

### Color Themes

- Accident Insurance: `#FF8C00` (Orange)
- Critical Illness: `#E91E63` (Pink)
- Cancer Insurance: `#E91E63` (Pink)
- Disability Insurance: `#009688` (Teal)
- Life Insurance: `#673AB7` (Purple)
- Hospital Insurance: `#1976D2` (Blue)

### Typography

- Primary Font: Montserrat
- Secondary Font: Playfair Display

### Components

- Themed Policy Cards
- Interactive Modals
- Animated Buttons
- Smart Forms
- Responsive Navigation
- Environmental Impact Counter

## 📱 Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌳 Environmental Initiative

Our tree planting program features:
- Real-time tree counter
- CO₂ absorption tracking
- Community impact metrics
- Digital certificates

## 💻 Development

### File Structure

```
AspireVolonte-E360/
├── api/
│   └── forms.js
├── config/
│   └── firebase.js
├── functions/
│   └── index.js
├── public/
│   └── styles/
├── scripts/
│   ├── main.js
│   └── policy-data.js
├── styles/
│   ├── main.css
│   └── components.css
├── templates/
├── index.html
├── server.js
└── README.md
```

### Code Standards

- BEM methodology for CSS
- Modern JavaScript (ES6+)
- Semantic HTML5
- Responsive design principles
- Accessibility best practices

## 🔐 Security

- Firebase Authentication
- Secure form handling
- CORS protection
- Helmet security headers
- Environment variable protection

## 🚀 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Firebase for backend services
- Stripe for payment processing
