# QuizCat

QuizCat is a dynamic quiz application that offers a user-friendly interface and robust features for quizzing enthusiasts. The platform includes functionalities such as quiz-taking, history tracking, progress tracking, analytics, and customizable UI themes. The backend is built using Express.js, adhering to OOP principles and the MVC architecture, ensuring a scalable and maintainable codebase.

## Table of Contents
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)
* [Folder Structure](#folder-structure)
* [Frontend Details](#frontend-details)
* [Backend Details](#backend-details)
* [Contributing](#contributing)
* [License](#license)

## Features

### Frontend
* **Quizzes**: Take engaging quizzes with smooth animations.
* **History**: Track your past quiz attempts and scores.
* **Progress Tracker**: Monitor your growth and performance over time.
* **Analytics**: Gain insights into your quiz performance with visual data.
* **Themes**: Switch between **Dark Mode** and **Light Mode** for a personalized experience.
* **Smooth Animations**: Enjoy visually appealing transitions and animations.

### Backend
* **OOP Architecture**: Ensures modular and reusable code.
* **MVC Pattern**: Separates concerns for scalability and maintainability.
* **APIs**: Robust API endpoints for seamless frontend-backend communication.

## Technologies Used

### Frontend
* **Framework**: Vite + React
* **Styling**: CSS/SCSS
* **State Management**: React Context/State hooks
* **UI/UX**: Dynamic animations and responsive design

### Backend
* **Framework**: Express.js
* **Architecture**: Object-Oriented Programming (OOP) with Model-View-Controller (MVC)

## Getting Started

### Prerequisites
* Node.js (>=14.x)
* npm or yarn

### Installation
1. Clone the repository:
```bash
git clone https://github.com/<your-username>/quizcat.git
```

2. Navigate to the project directory:
```bash
cd quizcat
```

### Running the Application

#### Frontend
1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

#### Backend
1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Folder Structure
```
quizcat/
├── frontend/             # Frontend codebase
│   ├── public/           # Static assets
│   ├── src/              # React components and logic
│   ├── package.json
│   └── vite.config.js
├── backend/              # Backend codebase
│   ├── models/           # Data models
│   ├── controllers/      # API logic
│   ├── routes/           # Express routes
│   ├── repository/       # Database logic
│   ├── utils/            # Utility functions
│   ├── package.json
│   └── server.js         # Main application entry point
└── README.md             # Project documentation
```

## Frontend Details
The frontend is a React application built using Vite for blazing-fast development. Features include:
* Dynamic routing for quizzes and user profiles.
* Context-based state management for theme and analytics.
* Responsive design optimized for multiple devices.

## Backend Details
The backend is an Express.js server following the OOP paradigm:
* **Controllers**: Handle request-response logic.
* **Models**: Represent data entities and business logic.
* **Routes**: Define API endpoints.

APIs include:
* **GET**: Fetch quizzes, history, and analytics.
* **POST**: Submit quiz responses and track progress.

## Contributing
We welcome contributions! Please fork the repository and create a pull request with your changes. Ensure that your code follows the existing conventions and passes all linting checks.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
