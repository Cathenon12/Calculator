const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all history (for a user or all)
router.get('/history', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;

        const query = `
            SELECT id, expression, result, calculation_type, created_at
            FROM history
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        `;

        const [rows] = await db.query(query, [limit, offset]);
        res.json({
            count: rows.length,
            data: rows,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'historique' });
    }
});

// Add to history
router.post('/history', async (req, res) => {
    try {
        const { expression, result, calculation_type } = req.body;

        if (!expression || !result) {
            return res.status(400).json({ error: 'Expression et résultat requis' });
        }

        const query = `
            INSERT INTO history (expression, result, calculation_type)
            VALUES (?, ?, ?)
        `;

        const [result_insert] = await db.query(query, [
            expression,
            String(result),
            calculation_type || 'basic'
        ]);

        res.status(201).json({
            id: result_insert.insertId,
            message: 'Enregistrement ajouté à l\'historique',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de l\'ajout à l\'historique' });
    }
});

// Clear history
router.delete('/history', async (req, res) => {
    try {
        const query = 'DELETE FROM history';
        await db.query(query);

        res.json({
            message: 'Historique supprimé',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'historique' });
    }
});

// Save a statistical calculation
router.post('/statistics', async (req, res) => {
    try {
        const { name, data_points, mean, median, mode, std_dev, min_value, max_value } = req.body;

        if (!data_points || !Array.isArray(data_points)) {
            return res.status(400).json({ error: 'data_points (tableau) requis' });
        }

        const query = `
            INSERT INTO statistics_data (name, data_points, mean, median, mode, std_dev, min_value, max_value)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result_insert] = await db.query(query, [
            name || `Analyse ${new Date().toLocaleString('fr-FR')}`,
            JSON.stringify(data_points),
            mean,
            median,
            mode,
            std_dev,
            min_value,
            max_value
        ]);

        res.status(201).json({
            id: result_insert.insertId,
            message: 'Analyse statistique sauvegardée',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
    }
});

// Get saved statistics
router.get('/statistics', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;

        const query = `
            SELECT id, name, mean, median, mode, std_dev, min_value, max_value, created_at
            FROM statistics_data
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        `;

        const [rows] = await db.query(query, [limit, offset]);
        res.json({
            count: rows.length,
            data: rows,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
});

// Save a financial calculation
router.post('/financial', async (req, res) => {
    try {
        const { calculation_type, name, input_data, result_data } = req.body;

        if (!calculation_type || !input_data || !result_data) {
            return res.status(400).json({ error: 'calculation_type, input_data et result_data requis' });
        }

        const query = `
            INSERT INTO financial_calculations (calculation_type, name, input_data, result_data)
            VALUES (?, ?, ?, ?)
        `;

        const [result_insert] = await db.query(query, [
            calculation_type,
            name || `Calcul ${new Date().toLocaleString('fr-FR')}`,
            JSON.stringify(input_data),
            JSON.stringify(result_data)
        ]);

        res.status(201).json({
            id: result_insert.insertId,
            message: 'Calcul financier sauvegardé',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
    }
});

// Get saved financial calculations
router.get('/financial', async (req, res) => {
    try {
        const type = req.query.type;
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;

        let query = `
            SELECT id, calculation_type, name, created_at
            FROM financial_calculations
        `;

        const params = [];

        if (type) {
            query += ` WHERE calculation_type = ?`;
            params.push(type);
        }

        query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        params.push(limit, offset);

        const [rows] = await db.query(query, params);
        res.json({
            count: rows.length,
            data: rows,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
});

// Save an expression
router.post('/expressions', async (req, res) => {
    try {
        const { name, expression, description, category } = req.body;

        if (!name || !expression) {
            return res.status(400).json({ error: 'Nom et expression requis' });
        }

        const query = `
            INSERT INTO saved_expressions (name, expression, description, category)
            VALUES (?, ?, ?, ?)
        `;

        const [result_insert] = await db.query(query, [
            name,
            expression,
            description || '',
            category || 'math'
        ]);

        res.status(201).json({
            id: result_insert.insertId,
            message: 'Expression sauvegardée',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
    }
});

// Get saved expressions
router.get('/expressions', async (req, res) => {
    try {
        const category = req.query.category;
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;

        let query = `
            SELECT id, name, expression, description, category, created_at
            FROM saved_expressions
        `;

        const params = [];

        if (category) {
            query += ` WHERE category = ?`;
            params.push(category);
        }

        query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        params.push(limit, offset);

        const [rows] = await db.query(query, params);
        res.json({
            count: rows.length,
            data: rows,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
});

// Get database stats
router.get('/stats', async (req, res) => {
    try {
        const [historyCount] = await db.query('SELECT COUNT(*) as count FROM history');
        const [statsCount] = await db.query('SELECT COUNT(*) as count FROM statistics_data');
        const [financeCount] = await db.query('SELECT COUNT(*) as count FROM financial_calculations');
        const [expressionsCount] = await db.query('SELECT COUNT(*) as count FROM saved_expressions');

        res.json({
            history: historyCount[0].count,
            statistics: statsCount[0].count,
            financial: financeCount[0].count,
            expressions: expressionsCount[0].count,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
    }
});

module.exports = router;
