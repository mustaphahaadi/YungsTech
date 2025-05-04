# YungsTech Learning Platform

A modern learning platform with gamification features, built with React (TypeScript) frontend and Django REST API backend.

## Project Overview

YungsTech is an interactive learning platform designed to make tech education engaging through gamification. The platform combines a React frontend with a Django backend to deliver a seamless learning experience.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Monaco Editor** for code editing capabilities
- **Supabase** client for additional backend services

### Backend
- **Django 5.0.2** with Django REST Framework
- **PostgreSQL** database
- **JWT Authentication** using Simple JWT
- **CORS** support for cross-origin requests

## Project Structure

```
YungsTech/
├── backend/               # Django backend
│   ├── core/              # Project settings
│   ├── users/             # User management app
│   ├── learning/          # Learning content app
│   ├── gamification/      # Gamification features app
│   └── manage.py          # Django management script
│
├── src/                   # React frontend
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React context providers
│   ├── pages/             # Application pages
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript type definitions
│
├── supabase/              # Supabase configurations
└── .env                   # Environment variables
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.10+)
- PostgreSQL

### Backend Setup

1. Create a Python virtual environment:
   ```bash
   cd backend
   python -m venv venv
   ```

2. Activate the virtual environment:
   ```bash
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   DJANGO_SECRET_KEY=your_secret_key
   DEBUG=True
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The application will be available at `http://localhost:5173`

## Features

- **User Authentication**: Secure login and registration system
- **Learning Modules**: Structured content for effective learning
- **Interactive Code Editor**: Built-in Monaco editor for coding exercises
- **Gamification**: Points, badges, and achievements to motivate learners
- **Progress Tracking**: Monitor learning progress and achievements

## Development

### Backend Development

- Create new Django apps as needed:
  ```bash
  python manage.py startapp app_name
  ```

- Run tests:
  ```bash
  python manage.py test
  ```

### Frontend Development

- Lint code:
  ```bash
  npm run lint
  ```

- Build for production:
  ```bash
  npm run build
  ```

## Deployment

### Backend Deployment
1. Set `DEBUG=False` in production
2. Configure proper `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS`
3. Use a production-ready server like Gunicorn
4. Set up proper static files serving

### Frontend Deployment
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the contents of the `dist` directory to your hosting service

## License
No lience yet
