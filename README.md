# React Forum Application

A modern forum application built with React 19, featuring user authentication, post management, and a comments system with a sleek dark-themed UI.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![React Router](https://img.shields.io/badge/React_Router-7.9.6-CA4245?logo=react-router)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.18-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)

## 📖 About

This forum application allows users to create accounts, share posts organized by categories, and engage in discussions through comments. Built as a learning project to demonstrate modern React patterns and best practices.

## ✨ What You Can Do

- **Create an account** and log in securely
- **Write posts** with custom categories and content
- **Edit and delete** your own posts
- **Comment** on posts and join discussions
- **Browse posts** by category
- **View profiles** showing user post history
- **Navigate easily** with pagination (5 posts per page)

## 🛠 Tech Stack

**Frontend:**
- React 19.1.1
- React Router v7
- Tailwind CSS + CSS Modules
- Vite

**State Management:**
- Context API
- useReducer for complex state

**Backend:**
- SoftUni Practice Server (REST API)

**Testing:**
- Vitest
- React Testing Library

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. Clone the repo
   ```bash
   git clone <repository-url>
   cd react-forum-app
   ```

2. Install dependencies
   ```bash
   cd client
   npm install
   ```

3. Start the backend server
   ```bash
   cd server
   node server.js
   ```

4. Start the development server
   ```bash
   cd client
   npm run dev
   ```

Visit `http://localhost:5173` to see the app!

### Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm test          # Run tests
```

## 📸 Features Highlight

### Authentication
Register, login, and logout with session persistence

### Posts
Create, read, update, and delete posts with categories

### Comments
Add and delete comments on posts

### Categories
Filter posts by category with dynamic sidebar

### Pagination
Navigate through posts 5 at a time

### User Profiles
View any user's profile and their post history

## 🎨 Design

- **Dark theme** with smooth gradients
- **Responsive** design for all devices
- **Smooth animations** and hover effects
- **Form validation** with real-time feedback
- **Loading states** for better UX

## 📝 License

This project is part of a SoftUni React course evaluation.

## 👨‍💻 Author

**Rosen Filipov** - React Student
