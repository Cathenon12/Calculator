const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Database connection
const db = require('./config/database');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const calculatorRoutes = require('./routes/calculator');
const statisticsRoutes = require('./routes/statistics');
const financialRoutes = require('./routes/financial');
const databaseRoutes = require('./routes/database');
const aiRoutes = require('./routes/ai');

app.use('/api/calculator', calculatorRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/database', databaseRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Serveur actif' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Une erreur serveur s\'est produite' });
});

// Start server
app.listen(PORT, HOST, () => {
    console.log(`🚀 Serveur démarré sur http://${HOST}:${PORT}`);
    console.log(`📊 API Calculatrice disponible`);
    console.log(`✅ Backend prêt pour production`);
});
