const express = require('express');
const router = express.Router();

// Calculate basic statistics
router.post('/analyze', (req, res) => {
    try {
        const { numbers } = req.body;

        if (!Array.isArray(numbers) || numbers.length === 0) {
            return res.status(400).json({ error: 'Tableau de nombres requis' });
        }

        const list = numbers.map(n => parseFloat(n)).filter(n => !isNaN(n));

        if (list.length === 0) {
            return res.status(400).json({ error: 'Aucun nombre valide' });
        }

        const sum = list.reduce((a, b) => a + b, 0);
        const mean = sum / list.length;
        const sorted = [...list].sort((a, b) => a - b);
        const median = sorted.length % 2 === 0
            ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
            : sorted[Math.floor(sorted.length / 2)];
        
        const mode = calculateMode(list);
        const min = Math.min(...list);
        const max = Math.max(...list);
        const range = max - min;
        
        const variance = list.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / list.length;
        const stdDev = Math.sqrt(variance);

        res.json({
            count: list.length,
            sum: sum.toFixed(2),
            mean: mean.toFixed(2),
            median: median.toFixed(2),
            mode: mode,
            min: min.toFixed(2),
            max: max.toFixed(2),
            range: range.toFixed(2),
            variance: variance.toFixed(4),
            stdDev: stdDev.toFixed(2),
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l\'analyse statistique' });
    }
});

// Calculate frequency distribution
router.post('/frequency', (req, res) => {
    try {
        const { numbers } = req.body;

        if (!Array.isArray(numbers) || numbers.length === 0) {
            return res.status(400).json({ error: 'Tableau de nombres requis' });
        }

        const list = numbers.map(n => parseFloat(n)).filter(n => !isNaN(n));
        const frequency = {};
        
        list.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
        });

        const sorted = Object.entries(frequency)
            .sort((a, b) => a[0] - b[0])
            .map(([value, freq]) => ({
                value: parseFloat(value),
                frequency: freq,
                percentage: ((freq / list.length) * 100).toFixed(2)
            }));

        res.json({
            total: list.length,
            distribution: sorted,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors du calcul des fréquences' });
    }
});

// Calculate quartiles
router.post('/quartiles', (req, res) => {
    try {
        const { numbers } = req.body;

        if (!Array.isArray(numbers) || numbers.length === 0) {
            return res.status(400).json({ error: 'Tableau de nombres requis' });
        }

        const list = numbers.map(n => parseFloat(n)).filter(n => !isNaN(n));
        const sorted = [...list].sort((a, b) => a - b);
        const n = sorted.length;

        const q1 = sorted[Math.floor((n + 1) / 4) - 1];
        const q2 = sorted[Math.floor((n + 1) / 2) - 1];
        const q3 = sorted[Math.floor(3 * (n + 1) / 4) - 1];
        const iqr = q3 - q1;

        res.json({
            q1: q1.toFixed(2),
            q2: q2.toFixed(2),
            q3: q3.toFixed(2),
            iqr: iqr.toFixed(2),
            min: sorted[0].toFixed(2),
            max: sorted[n - 1].toFixed(2),
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors du calcul des quartiles' });
    }
});

// Utility function to calculate mode
function calculateMode(numbers) {
    const frequency = {};
    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
    });

    let mode = null;
    let maxFreq = 0;
    
    for (let num in frequency) {
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
            mode = parseFloat(num);
        }
    }
    
    return mode;
}

module.exports = router;
