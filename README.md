# Forum Application

A modern forum application with a React frontend and .NET backend, featuring user authentication, post management, and a comments system.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)

## About

This forum application allows users to create accounts, share posts organized by categories, and engage in discussions through comments.

## Features

- **User Authentication** - Register, login, logout with JWT tokens
- **Posts** - Create, edit, delete posts with categories
- **Comments** - Add and delete comments on posts
- **Categories** - Filter posts by category
- **User Profiles** - View user post history
- **Pagination** - Browse posts 5 at a time

## Tech Stack

### Frontend
- React 19 with React Router v7
- Tailwind CSS + CSS Modules
- Vite
- Context API + useReducer

### Backend
- ASP.NET Core 9 Web API
- Entity Framework Core (Code-First)
- PostgreSQL
- JWT Authentication
- FluentValidation
- AutoMapper

## Prerequisites

- Node.js (v18+)
- .NET 9 SDK
- PostgreSQL 15+

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd .NET-forum-app
```

### 2. Set up the Backend

```bash
cd ForumApi

# Copy the launch settings template
cp Properties/launchSettings.example.json Properties/launchSettings.json

# Edit launchSettings.json and replace YOUR_PASSWORD_HERE with your PostgreSQL password
```

Update the connection string in `Properties/launchSettings.json`:
```json
"ConnectionStrings__DefaultConnection": "Host=localhost;Port=5432;Database=forumdb_dev;Username=postgres;Password=YOUR_PASSWORD"
```

Apply database migrations and run:
```bash
dotnet ef database update
dotnet run
```

The API will be available at `http://localhost:5000`

### 3. Set up the Frontend

```bash
cd client
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` | Register new user |
| POST | `/users/login` | Login user |
| GET | `/users/logout` | Logout user |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/data/posts` | Get all posts |
| GET | `/data/posts?load=author=_ownerId:users` | Get posts with author |
| GET | `/data/posts/{id}` | Get single post |
| POST | `/data/posts` | Create post |
| PATCH | `/data/posts/{id}` | Update post |
| DELETE | `/data/posts/{id}` | Delete post |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/jsonstore/comments?where=postId="{id}"` | Get comments for post |
| POST | `/jsonstore/comments` | Create comment |
| DELETE | `/jsonstore/comments/{id}` | Delete comment |

## Project Structure

```
.NET-forum-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   └── ...
│   └── package.json
├── ForumApi/              # .NET backend
│   ├── Controllers/
│   ├── Models/
│   │   ├── Entities/
│   │   └── DTOs/
│   ├── Services/
│   ├── Validators/
│   ├── Data/
│   └── Program.cs
└── ForumApi.sln
```

## Development

### Backend Scripts
```bash
cd ForumApi
dotnet run              # Start development server
dotnet build            # Build project
dotnet ef migrations add <name>  # Create migration
dotnet ef database update        # Apply migrations
```

### Frontend Scripts
```bash
cd client
npm run dev      # Start development server
npm run build    # Build for production
npm test         # Run tests
```

## API Documentation

Swagger UI is available at `http://localhost:5000/swagger` when running in development mode.

## Authentication

The API uses JWT tokens sent via the `X-Authorization` header:

```bash
curl -H "X-Authorization: <your-token>" http://localhost:5000/data/posts
```

## License

This project is for educational purposes.

## Author

**Rosen Filipov**
