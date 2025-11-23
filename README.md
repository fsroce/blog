# Blog Application

A full-stack blog application with React frontend and Express backend.

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- React Router
- Axios

### Backend
- Node.js + Express
- TypeScript
- SQLite (with better-sqlite3)
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

1. Start backend:
```bash
cd backend
npm install
npm run dev
```

2. Start frontend:
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

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (auth required)
- `PUT /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)

## License

MIT
