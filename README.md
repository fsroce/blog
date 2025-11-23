# Blog Application

A full-stack blog application with React frontend and Express backend, optimized for mobile devices.

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- React Router
- Axios
- Responsive design (mobile-friendly)

### Backend
- Node.js + Express
- TypeScript
- MongoDB (with Mongoose)
- JWT Authentication

## Project Structure

```
blog/
├── frontend/          # React frontend application
├── backend/           # Express backend API
├── docker-compose.yml # Docker compose for full stack
└── README.md
```

## Quick Start

### Development

1. Start MongoDB locally (or use Docker):
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7
```

2. Start backend:
```bash
cd backend
npm install
npm run dev
```

3. Start frontend:
```bash
cd frontend
npm install
npm run dev
```

### Docker

Run the entire stack with Docker:
```bash
docker-compose up --build
```

This will start:
- MongoDB on port 27017
- Backend API on port 3001
- Frontend on port 80

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (auth required)
- `PUT /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)

## Mobile Support

The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile phones (iOS/Android)

Features include:
- Hamburger menu navigation on mobile
- Touch-friendly buttons and inputs
- Safe area support for notched phones
- Optimized font sizes and spacing

## License

MIT
