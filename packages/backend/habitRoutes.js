const express = require('express');
const { db } = require('./database.js');

const router = express.Router();

// --- GET /api/habits : Récupérer toutes les habitudes ---
router.get('/', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM Habitudes ORDER BY nom');
        const habits = stmt.all();
        res.status(200).json(habits);
    } catch (error) {
        console.error('Erreur lors de la récupération des habitudes:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// --- POST /api/habits : Créer une nouvelle habitude ---
router.post('/', (req, res) => {
    const { nom, type, unite_par_defaut } = req.body;

    if (!nom || !type) {
        return res.status(400).json({ error: 'Le nom et le type sont requis.' });
    }

    try {
        const stmt = db.prepare(
        'INSERT INTO Habitudes (nom, type, unite_par_defaut) VALUES (?, ?, ?)'
        );
        const info = stmt.run(nom, type, unite_par_defaut);

        const newHabit = db.prepare('SELECT * FROM Habitudes WHERE id = ?').get(info.lastInsertRowid);
        
        res.status(201).json(newHabit);

    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({ error: `L'habitude nommée "${nom}" existe déjà.` });
        }
        console.error("Erreur lors de la création de l'habitude:", error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
