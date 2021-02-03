import mongoose from 'mongoose'; // MongoDB (database)
import express from 'express'; // Backend App (server)
import cors from 'cors'; // HTTP headers (enable requests)
import morgan from 'morgan'; // Logs incoming requests
import helmet from 'helmet'; // Secures response headers
import dotenv from 'dotenv'; // Secures content
import accountRoutes from './api/routes/account.js';
import emailRoutes from './api/routes/email.js';

// initialize app
const app = express();
const origin = '*';

// middlewares
dotenv.config(); // protected variables
app.use(cors({ origin })); // enables http requests on react development server
app.use(express.json({ limit: '10mb', extended: false })); // body parser
app.use(express.urlencoded({ limit: '1mb', extended: false })); // url parser
app.use(morgan('common')); // logs requests
app.use(helmet()); // protect response headers

// configure db: i'm using the local MongoDB-community server
const CONNECTION_URL = 'mongodb://localhost:27017/GmailDB';
const DEPRECATED_FIX = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

// connect to db
mongoose
  .connect(CONNECTION_URL, DEPRECATED_FIX)
  .catch((error) => console.log('❌ MongoDB connection error', error)); // listen for errors on initial connection

const db = mongoose.connection;
db.on('connected', () => console.log('✅ MongoDB connected')); // connected
db.on('disconnected', () => console.log('❌ MongoDB disconnected')); // disconnected
db.on('error', (error) => console.log('❌ MongoDB connection error', error)); // listen for errors during the session

// routes
app.get('/', (request, response, next) => response.status(200).json('MERN Gmail clone'));
app.use('/api/v1/account', accountRoutes);
app.use('/api/v1/email', emailRoutes);

// server is listening for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server is listening on port: ${PORT}`));
