# YungsTech Learning Platform

A full-stack learning platform with gamification features to make learning tech skills engaging and fun.

## Features

- User authentication and profiles
- Personalized learning paths
- Interactive lessons and exercises
- Gamification (achievements, streaks, daily challenges)
- Progress tracking and analytics
- Community features

## Tech Stack

### Backend
- Django
- Django REST Framework
- JWT Authentication
- SQLite (development) / PostgreSQL (production)

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Set up environment variables:
   Create a `.env` file in the backend directory with:
   ```
   DJANGO_SECRET_KEY=your_secret_key
   DEBUG=True
   ```

6. Run migrations:
   ```
   python manage.py migrate
   ```

7. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

8. Start the development server:
   ```
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the project root directory

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## API Documentation

The API documentation is available at `/api/docs/` when the backend server is running.

## Project Structure

```
YungsTech/
├── backend/               # Django backend
│   ├── core/              # Project settings
│   ├── users/             # User authentication and profiles
│   ├── learning/          # Learning paths and lessons
│   └── gamification/      # Achievements, streaks, challenges
├── src/                   # React frontend
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React contexts
│   ├── lib/               # Utilities and API clients
│   ├── pages/             # Page components
│   └── types/             # TypeScript type definitions
└── public/                # Static assets
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Django REST Framework](https://www.django-rest-framework.org/)