# Password Reset Flow | Backend

- This is the backend for the password reset flow which consists of endpoints such as,

  - auth/register
  - auth/forgot
  - auth/login
  - auth/reset

- This follow the MVC pattern for neat and clean code.

## Before starting the server...

- Create a .env file
  - add your links, id, password

```plaintext
PORT        = 3000
MONGODB_URI = <your_mongodb_url>
SECRET_KEY  = <your_random_key>
EMAIL_ID    = <sender_email_id>
EMAIL_PASS  = <sender_app_password>
CLIENT_URL  = <your_frontend_url>
```

## To start the server...

- Open the terminal,

```bash
cd server
npm install
```

- To run,

```bash
npm start
```

- To run on nodemon,

```bash
npm run dev
```
