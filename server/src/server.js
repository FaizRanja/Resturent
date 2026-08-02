import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { sequelize, ensureDatabaseExists } from './config/database.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Core Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5174',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Root API Health Check Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Thin Nation Gourmet REST API Server Running',
    version: '1.0.0',
    documentation: '/api/v1',
  });
});

// Register Application Routes
app.use('/api/v1', routes);

// Global Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Database Initialization and Express Server Launch
const startServer = async () => {
  try {
    // 1. Ensure MySQL Database is created
    await ensureDatabaseExists();

    // 2. Authenticate and Sync Sequelize Models
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL database successfully');
    
    // Sync models (creates tables automatically if missing)
    await sequelize.sync({ alter: false });
    console.log('✅ Sequelize ORM models synchronized');
  } catch (error) {
    console.error('❌ Unable to connect to MySQL database:', error.message);
    console.log('ℹ️ MySQL database connection pending (credentials can be set in .env)');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Thin Nation REST API Server listening on http://localhost:${PORT}`);
  });
};

startServer();
