# Smart Survey Engine 🚀

A comprehensive, enterprise-grade dynamic form generator and survey management platform built with React, Redux Toolkit, and TypeScript. This application demonstrates senior-level development skills with advanced state management, authentication system, and professional UX patterns.

![Smart Survey Engine](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop)

## ✨ Features

### 🔐 **Authentication System**
- **User Registration & Login** - Secure authentication with local storage
- **Profile Management** - Update personal information and preferences
- **Session Management** - Persistent login state across browser sessions
- **User Preferences** - Theme settings, notifications, and language options

### 🎯 **Core Functionality**
- **Dynamic Survey Builder** - Create surveys with 12+ question types
- **Real-time Preview** - See how surveys look to respondents
- **Response Collection** - Collect and manage survey responses
- **Advanced Analytics** - Comprehensive insights and metrics with dynamic calculations
- **Theme Support** - Light/Dark mode with system preference detection

### 📊 **Question Types Supported**
- Short Text & Long Text (Textarea)
- Number, Email, Phone inputs
- Single Choice & Multiple Choice
- Dropdown selections
- Rating (1-5 stars)
- Scale (1-10 rating)
- Date & Time pickers

### 🏗️ **Advanced Features**
- **Redux Toolkit** state management with 5 specialized slices
- **localStorage** persistence with automatic sync
- **TypeScript** throughout for type safety
- **Responsive design** with mobile-first approach
- **Accessibility** considerations (ARIA labels, keyboard navigation)
- **Real-time validation** with custom error messages
- **Progress tracking** for multi-step surveys
- **Dynamic calculations** for all statistics and analytics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or download the project**
   \`\`\`bash
   git clone <repository-url>
   cd smart-survey-engine
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 How to Use

### 🔐 **Getting Started**

1. **Create Account**
   - Click "Sign up" on the login page
   - Fill in your personal information
   - Your account will be saved locally

2. **Login**
   - Use your email and any password to login
   - Your session will persist across browser restarts

### 🏠 **Dashboard**
The main dashboard provides a dynamic overview of your surveys and analytics:

- **Dynamic Stats** - Real-time calculations of surveys, responses, and completion rates
- **Survey Management** - Edit, preview, duplicate, or delete surveys
- **Recent Activity** - Track latest changes and responses
- **Quick Actions** - Create new surveys or view analytics

### 🛠️ **Creating Surveys**

1. **Start a New Survey**
   - Click "Create Survey" or "New Survey" button
   - Enter survey title and description

2. **Add Questions**
   - Click "Add Question" to open the question builder
   - Select question type from dropdown
   - Enter question title and optional description
   - Configure options for choice-based questions
   - Set validation rules (required, min/max length, etc.)

3. **Configure Settings**
   - Toggle survey settings in the sidebar
   - Enable/disable progress bar, anonymous responses
   - Set navigation preferences

4. **Preview & Publish**
   - Click "Preview" to test your survey
   - Click "Publish" to make it available for responses

### 📝 **Question Types Guide**

| Type | Description | Use Case |
|------|-------------|----------|
| **Short Text** | Single line text input | Names, titles, short answers |
| **Long Text** | Multi-line textarea | Comments, feedback, descriptions |
| **Number** | Numeric input with validation | Age, quantity, scores |
| **Email** | Email validation included | Contact information |
| **Phone** | Phone number formatting | Contact details |
| **Single Choice** | Radio buttons | Satisfaction ratings, preferences |
| **Multiple Choice** | Checkboxes | Multiple selections allowed |
| **Dropdown** | Select menu | Long lists of options |
| **Rating** | 1-5 star rating | Product ratings, satisfaction |
| **Scale** | 1-10 numeric scale | NPS scores, likelihood ratings |
| **Date** | Date picker | Event dates, birthdays |
| **Time** | Time picker | Appointment scheduling |

### 📊 **Taking Surveys**

1. **Access Survey**
   - Click "Preview" or "Take Survey" from any survey
   - Navigate through questions using Next/Previous buttons

2. **Answer Questions**
   - Fill out required fields (marked with *)
   - Use appropriate input methods for each question type
   - View progress bar if enabled

3. **Submit Response**
   - Complete all required questions
   - Click "Submit" to save your response
   - Receive confirmation message

### 📈 **Analytics Dashboard**

View comprehensive insights about your surveys with dynamic calculations:

- **Response Statistics** - Real-time total responses, completion rates
- **Question Performance** - Dynamic response rates per question
- **Response Distribution** - Visual breakdown of answers
- **Sample Responses** - Preview actual text responses
- **Time Analytics** - Calculated completion times

### 👤 **Profile Management**

- **Personal Information** - Update name, email, and contact details
- **Preferences** - Configure notifications, language, and theme settings
- **Account Overview** - View account creation date and activity

### 🎨 **Theme Customization**

- **Light Mode** - Clean, professional appearance
- **Dark Mode** - Reduced eye strain for extended use
- **System Mode** - Automatically matches your OS preference
- **Toggle** - Use the theme button in the header to switch

## 🏗️ Architecture

### **State Management**
\`\`\`
├── auth/             # User authentication and profile
├── surveyBuilder/    # Survey creation and editing
├── surveyResponse/   # Response collection and validation  
├── ui/              # UI state, theme, notifications
└── analytics/       # Data analysis and insights
\`\`\`

### **Component Structure**
\`\`\`
├── components/
│   ├── auth/         # Authentication components
│   ├── dashboard/    # Main dashboard components
│   ├── builder/      # Survey creation interface
│   ├── survey-taker/ # Response collection UI
│   ├── analytics/    # Data visualization
│   ├── profile/      # User profile management
│   ├── layout/       # Header, sidebar, navigation
│   ├── ui/          # Reusable UI components
│   └── theme/       # Theme provider and controls
\`\`\`

### **Key Technologies**
- **React 18** with hooks and modern patterns
- **Redux Toolkit** for predictable state management
- **TypeScript** for type safety and developer experience
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible component primitives
- **Lucide React** for consistent iconography

## 🔧 Development

### **Project Structure**
\`\`\`
smart-survey-engine/
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                # Utilities and business logic
│   ├── hooks/          # Custom React hooks
│   ├── store/          # Redux store and slices
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Helper functions
├── public/             # Static assets
└── README.md          # This file
\`\`\`

### **Available Scripts**
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
\`\`\`

### **Key Features for Developers**

1. **Type Safety** - Full TypeScript coverage with strict mode
2. **State Management** - Redux Toolkit with proper typing
3. **Authentication** - Complete user management system
4. **Component Patterns** - Compound components, render props
5. **Custom Hooks** - Business logic abstraction
6. **Error Boundaries** - Graceful error handling
7. **Performance** - Memoization and optimization patterns

## 🎯 Use Cases

### **Business Applications**
- Customer satisfaction surveys
- Employee feedback forms
- Product research questionnaires
- Event registration forms
- Market research studies

### **Educational Use**
- Student assessments
- Course evaluations
- Research data collection
- Quiz and test creation

### **Personal Projects**
- Event planning surveys
- Group decision making
- Feedback collection
- Data gathering forms

## 🚀 Advanced Features

### **Implemented Features**
- ✅ User authentication and registration
- ✅ Profile management with preferences
- ✅ Dynamic survey creation with 12+ question types
- ✅ Real-time preview and testing
- ✅ Response collection and validation
- ✅ Dynamic analytics with live calculations
- ✅ Theme switching (light/dark/system)
- ✅ Responsive design for all devices
- ✅ localStorage persistence
- ✅ Survey management (CRUD operations)
- ✅ Question reordering and validation
- ✅ Progress tracking for surveys
- ✅ Notification system

### **Planned Enhancements**
- [ ] Conditional logic and branching
- [ ] File upload question type
- [ ] Matrix/grid questions
- [ ] Survey templates library
- [ ] Advanced chart visualizations
- [ ] CSV/PDF export functionality
- [ ] Email notifications
- [ ] Survey sharing and collaboration
- [ ] API integration capabilities
- [ ] White-label customization

### **Performance Optimizations**
- Component memoization with React.memo
- Selective re-rendering with useCallback/useMemo
- Efficient state updates with Redux Toolkit
- Lazy loading for large surveys
- Optimistic UI updates

## 🤝 Contributing

This project demonstrates senior-level React development patterns and is designed for educational and portfolio purposes. Key learning areas include:

- Advanced Redux Toolkit patterns
- User authentication and session management
- Complex form handling and validation
- TypeScript in large applications
- Component composition patterns
- State management architecture
- Responsive design implementation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://radix-ui.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- State management with [Redux Toolkit](https://redux-toolkit.js.org/)

---

**Smart Survey Engine** - A complete survey management platform demonstrating enterprise-level React development with authentication, advanced state management, and professional user experience design.
