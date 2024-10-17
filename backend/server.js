require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const ruleRoutes = require('./routes/ruleRoutes');

var cors = require('cors')

// Connect to the database
connectDB();

const app = express();
app.use(cors()) // Use this after the variable declaration

// Middleware
app.use(express.json());

// Routes
app.use('/api/rules', ruleRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
