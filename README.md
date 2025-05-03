# Food_Delivery_Project

You have create your account on the Stripe - and past API key in the .env file.

Also you have to create an account on the mongodb Atlas - past their url on the db.js in config folder.

Also install following library ----

express: Handles routing, middleware, and server setup.

mongoose: Connects to MongoDB and manages schemas/models for data like users, orders, and food items.

jsonwebtoken: Secures routes by issuing and verifying tokens for user authentication.

bcrypt: Encrypts passwords before storing them in the database and verifies them during login.

cors: Enables cross-origin requests from frontend (like React or Next.js) to the backend.

dotenv: Manages sensitive config values (like DB URI, JWT secret, API keys) via environment variables.

body-parser: Parses incoming request bodies, especially JSON, for easier handling in Express.

multer: Uploads images (like food item pictures or user avatars) and handles file storage.

stripe: Processes online payments for orders.

validator: Validates user inputs (like email format, phone number, etc.) before saving or processing.

nodemon: Auto-restarts your server during development when file changes are detected.
