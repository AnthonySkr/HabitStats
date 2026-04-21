const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'habits.db');

// On crée une instance de la base de données.
const db = new Database(dbPath, { verbose: console.log });

function initializeDatabase() {
  console.log('Initialisation de la base de données...');

  // Requête pour créer la table 'Habitudes'.
  const createHabitudesTable = `
    CREATE TABLE IF NOT EXISTS Habitudes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL,
      unite_par_defaut TEXT
    );
  `;

  // Requête pour créer la table 'PointsDeDonnees'.
  const createPointsDeDonneesTable = `
    CREATE TABLE IF NOT EXISTS PointsDeDonnees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habitude_id INTEGER NOT NULL,
      date_enregistrement TEXT NOT NULL,
      heure_enregistrement TEXT NOT NULL,
      valeur REAL NOT NULL,
      FOREIGN KEY (habitude_id) REFERENCES Habitudes (id) ON DELETE CASCADE
    );
  `;

  // On exécute les requêtes de création.
  db.exec(createHabitudesTable);
  db.exec(createPointsDeDonneesTable);

  console.log('Base de données prête.');
}

module.exports = { db, initializeDatabase };
