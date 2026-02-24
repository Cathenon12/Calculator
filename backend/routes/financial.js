const express = require('express');
const router = express.Router();

// Compound interest calculation
router.post('/compound-interest', (req, res) => {
    try {
        const { principal, rate, years } = req.body;

        if (!principal || !rate || !years) {
            return res.status(400).json({ error: 'Principal, taux et années requis' });
        }

        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const n = parseInt(years);

        const amount = p * Math.pow(1 + r, n);
        const interest = amount - p;

        res.json({
            principal: p.toFixed(2),
            rate: parseFloat(rate).toFixed(2),
            years: n,
            amount: amount.toFixed(2),
            interest: interest.toFixed(2),
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors du calcul des intérêts composés' });
    }
});

// Mortgage/Loan calculation
router.post('/mortgage', (req, res) => {
    try {
        const { loanAmount, annualRate, years } = req.body;

        if (!loanAmount || !annualRate || !years) {
            return res.status(400).json({ error: 'Montant, taux et durée requis' });
        }

        const principal = parseFloat(loanAmount);
        const annualRate_val = parseFloat(annualRate) / 100;
        const years_val = parseInt(years);

        const monthlyRate = annualRate_val / 12;
        const numberOfPayments = years_val * 12;

        // Avoid division by zero
        if (monthlyRate === 0) {
            const monthlyPayment = principal / numberOfPayments;
            const totalPaid = monthlyPayment * numberOfPayments;

            return res.json({
                loanAmount: principal.toFixed(2),
                annualRate: parseFloat(annualRate).toFixed(2),
                years: years_val,
                monthlyPayment: monthlyPayment.toFixed(2),
                totalPaid: totalPaid.toFixed(2),
                totalInterest: 0,
                timestamp: new Date().toISOString()
            });
        }

        const monthlyPayment = principal *
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        const totalPaid = monthlyPayment * numberOfPayments;
        const totalInterest = totalPaid - principal;

        res.json({
            loanAmount: principal.toFixed(2),
            annualRate: parseFloat(annualRate).toFixed(2),
            years: years_val,
            monthlyPayment: monthlyPayment.toFixed(2),
            totalPaid: totalPaid.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors du calcul du prêt hypothécaire' });
    }
});

// VAT (TVA) calculation
router.post('/vat', (req, res) => {
    try {
        const { amountHT, vatRate } = req.body;

        if (amountHT === undefined || !vatRate) {
            return res.status(400).json({ error: 'Montant HT et taux TVA requis' });
        }

        const amount = parseFloat(amountHT);
        const rate = parseFloat(vatRate) / 100;

        const vat = amount * rate;
        const amountTTC = amount + vat;

        res.json({
            amountHT: amount.toFixed(2),
            vatRate: parseFloat(vatRate).toFixed(2),
            vat: vat.toFixed(2),
            amountTTC: amountTTC.toFixed(2),
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors du calcul de la TVA' });
    }
});

// Investment return calculation
router.post('/investment', (req, res) => {
    try {
        const { investment, annualReturn, years } = req.body;

        if (!investment || !annualReturn || !years) {
            return res.status(400).json({ error: 'Investissement, rendement et années requis' });
        }

        const inv = parseFloat(investment);
        const ret = parseFloat(annualReturn) / 100;
        const n = parseInt(years);

        const finalValue = inv * Math.pow(1 + ret, n);
        const gain = finalValue - inv;
        const gainPercent = (gain / inv * 100).toFixed(2);

        res.json({
            investment: inv.toFixed(2),
            annualReturn: parseFloat(annualReturn).toFixed(2),
            years: n,
            finalValue: finalValue.toFixed(2),
            gain: gain.toFixed(2),
            gainPercent: gainPercent,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors du calcul du rendement d\'investissement' });
    }
});

module.exports = router;
