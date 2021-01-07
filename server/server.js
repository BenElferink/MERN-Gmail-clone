import mongoose from 'mongoose'; // MongoDB (database)
import express from 'express'; // Backend App (server)
import dotenv from 'dotenv'; // Secures content
import helmet from 'helmet'; // Secures response headers
import cors from 'cors'; // HTTP headers
import morgan from 'morgan'; // Logs incoming requests
import accountRoutes from './api/routes/account.js';
import emailRoutes from './api/routes/email.js';

// initialize app
const app = express();
dotenv.config(); // what is dotenv   --->   https://github.com/motdotla/dotenv#readme

// middlewares
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false })); // url parser
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('common'));

// configure db --->            if you want to connect to cloud server: edit "CONNECTION_URL" in -> .env file
const DB_NAME = 'GmailDB'; // if you want to use local server: edit this "DB_NAME" (and remove the "CONNECTION_URL" from -> .env file)
const CONNECTION_URL = process.env.CONNECTION_URL || `mongodb://localhost:27017/${DB_NAME}`;
const PORT = process.env.PORT || 8080; // 8080 === development port
const DEPRECATED_FIX = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }; // change this with (possible) warnings on first connection

// mongoose connections   --->   https://mongoosejs.com/docs/connections.html
// connect to db
mongoose
  .connect(CONNECTION_URL, DEPRECATED_FIX)
  .catch((error) => console.log('❌ MongoDB:', error)); // listen for errors on initial connection
mongoose.connection.on('connected', () => console.log('✅ MongoDB connected'));
mongoose.connection.on('error', (error) => console.log('❌ MongoDB:', error)); // listen for errors after the connection is established (errors during the session)
mongoose.connection.on('disconnected', () => console.log('❌ MongoDB disconnected'));

// routes
app.get('/', (req, res) =>
  res.send('Gmail clone - GitHub repository: https://github.com/belferink1996/MERN-Gmail-clone'),
);
app.use('/api/v1/account', accountRoutes);
app.use('/api/v1/email', emailRoutes);
app.use('/api/v1/uploads', express.static('uploads'));

// server is listening for requests
app.listen(PORT, () => console.log(`✅ Server is listening on port: ${PORT}`));
