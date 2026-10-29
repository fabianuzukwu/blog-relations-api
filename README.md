# Blog Relations API

A REST API for a simple blog where users write posts, demonstrating a one-to-many relationship (one user has many posts). Built with Node.js, Express, Sequelize and MySQL, and tested with Postman.

## Prerequisites

- Node.js  and npm
- MySQL server, installed and running
- Postman Or Any other API client Side (optional, for testing the endpoints)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fabianuzukwu/blog-relations-api.git
   ```
2. Move into the project folder:
   ```bash
   cd blog-relations-api
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Database Setup

1. Create the database in MySQL:
   ```sql
   CREATE DATABASE blog_relations;
   ```
2. Open `config.json` and set the `development` values (username, password, host, database name and dialect) to match your MySQL setup. Use your own credentials.
3. Run the migrations to create the `Users` and `Posts` tables:
   ```bash
   npx sequelize-cli db:migrate
   ```

## Running the Server

```bash
npm run dev
```

The server runs on **http://localhost:9090**.

## API Endpoints

### Users

| Method | Endpoint     | Description                                  |
|--------|--------------|----------------------------------------------|
| POST   | /users       | Create a new user                            |
| GET    | /users       | Get all users                                |
| GET    | /users/:id   | Get one user, including their posts          |
| PUT    | /users/:id   | Update a user                                |
| DELETE | /users/:id   | Delete a user                                |

### Posts

| Method | Endpoint     | Description                                  |
|--------|--------------|----------------------------------------------|
| POST   | /posts       | Create a new post for a user                 |
| GET    | /posts       | Get all posts                                |
| GET    | /posts/:id   | Get one post, including the user who wrote it |
| PUT    | /posts/:id   | Update a post                                |
| DELETE | /posts/:id   | Delete a post                                |

## Data Models

- **User:** firstName, lastName, email, gender
- **Post:** title, body, niche, userId (foreign key)

## Relationship

One user has many posts, and each post belongs to exactly one user.

- `User.hasMany(Post)` and `Post.belongsTo(User)`
- The `Users` table is the parent. The `Posts` table is the child and holds the `userId` foreign key.
- A post cannot exist without a user.
- **Cascade behaviour:** the foreign key is set to `ON DELETE CASCADE`, so deleting a user also deletes all of that user's posts. Deleting a single post does not affect the user.
- Read-one routes use eager loading (`include`) to return the related data in one response.