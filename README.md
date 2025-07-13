# 🚀 User Notification Microservices

This project consists of two microservices: `user` and `notification`, communicating over RabbitMQ.  
The **User Service** handles basic CRUD operations for users, while the **Notification Service** listens for user-related events and processes notifications accordingly.

---

## 🐳 Getting Started (via Docker)

To run the entire application stack, simply run:

```bash
docker-compose up --build
```

Make sure Docker is installed and running on your system.

This will spin up the following services:

User Service (http://localhost:3000)

Notification Service (http://localhost:3001)

MongoDB (for user data persistence)

RabbitMQ (http://localhost:15672, default login: guest/guest)

## API Guide – User Service
Base URL: http://localhost:3000/users

| Method | Endpoint     | Description                                             |
|--------|--------------|---------------------------------------------------------|
| GET    | `/users`     | Get all users (supports pagination: `?page=1&limit=10`) |
| GET    | `/users/:id` | Get a user by ID                                        |
| POST   | `/users`     | Create a new user (send JSON body)                      |
| PATCH  | `/users/:id` | Update a user by ID                                     |
| DELETE | `/users/:id` | Delete a user by ID                                     |
| GET    | `/health`    | Health check                                            |
