const express = require('express');
const cors = require('cors');

const { initializeDatabase } = require('./database.js');
const habitRoutes = require('./habitRoutes.js');

initializeDatabase();

const app = express();
const PORT = process.env.PORT || 3001; // Port pour le backend

// Middlewares
app.use(cors()); // Active CORS pour toutes les routes
app.use(express.json()); // Permet à Express de parser le JSON des requêtes

app.use('/api/habits', habitRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('Le serveur backend est démarré !');
});

app.listen(PORT, () => {
  console.log(`Serveur backend écoutant sur http://localhost:${PORT}`);
});
