# Setup and Run

Prerequisites

- Node.js (LTS)

Install dependencies

```bash
npm install
```

Create environment file

- Create a file named `.env.development` in the project root containing the following variables:

```
PORT=
HOST=
DB_URI=
DB_NAME=
HASH_SALT=
ENCRYPTION_ALGORITM=
CIPHER_IV_SIZE=
ENCRYPTION_KEY=
SECRET_ADMIN_ACCESS_TOKEN=
SECRET_USER_ACCESS_TOKEN=
SECRET_USER_REFRESH_TOKEN=
SECRET_ADMIN_REFRESH_TOKEN=
TOKEN_ADMIN_PREFIX=
TOKEN_USER_PREFIX=
```

Run the app

```bash
node src/app.js
```

Optional (with nodemon)

```bash
npx nodemon src/app.js
```

# Implemented Endpoints

- POST /auth/register
- POST /auth/log-in
- GET /auth/refresh-token
- POST /posts/posts
- GET /posts/posts
- PUT /posts/post/:postId
- DELETE /posts/post/:postId

# WHY MONGODB

- Document Based.
- allow nested documents
- storing data in flexible, BSON documents rather than rigid rows and columns
- supporting dynamic updates
