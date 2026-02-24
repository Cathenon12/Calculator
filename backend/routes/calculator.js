const express = require('express');
const router = express.Router();

// Basic calculator operations
router.post('/calculate', (req, res) => {
    try {
        const { expression } = req.body;

        if (!expression) {
            return res.status(400).json({ error: 'Expression requise' });
        }

        // Validate and sanitize expression
        const sanitized = expression.replace(/[^0-9+\-*/.()]/g, '');
        
        // Evaluate the expression
        let result;
        try {
            // Using Function constructor for evaluation (plus sûr qu'eval)
            result = Function('"use strict"; return (' + sanitized + ')')();
        } catch (e) {
            return res.status(400).json({ error: 'Expression invalide' });
        }

        res.json({
            expression: expression,
            result: result,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors du calcul' });
    }
});

// Advanced operations
router.post('/advanced', (req, res) => {
    try {
        const { operation, value } = req.body;

        if (!operation || value === undefined) {
            return res.status(400).json({ error: 'Opération et valeur requises' });
        }

        let result;
        
        switch(operation) {
            case 'sqrt':
                result = Math.sqrt(value);
                break;
            case 'pow2':
                result = Math.pow(value, 2);
                break;
            case 'pow3':
                result = Math.pow(value, 3);
                break;
            case 'factorial':
                result = factorial(value);
                break;
            case 'reciprocal':
                result = 1 / value;
                break;
            case 'percent':
                result = value / 100;
                break;
            case 'sin':
                result = Math.sin(value);
                break;
            case 'cos':
                result = Math.cos(value);
                break;
            case 'tan':
                result = Math.tan(value);
                break;
            case 'log':
                result = Math.log10(value);
                break;
            case 'ln':
                result = Math.log(value);
                break;
            case 'exp':
                result = Math.exp(value);
                break;
            default:
                return res.status(400).json({ error: 'Opération non supportée' });
        }

        res.json({
            operation: operation,
            value: value,
            result: result,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l\'opération' });
    }
});

// Utility function
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

module.exports = router;
