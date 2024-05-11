// Importation des modules nécessaires
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");

// Importation des tâches planifiées
const jobmemory = require('./tasks/job_memory.js');
const jobcpu = require('./tasks/job_cpu.js');
const jobdisk = require('./tasks/job_disk.js');
const jobcleaner = require('./tasks/job_cleaner.js');
const jobdocker = require('./tasks/job_docker.js');


// Création de l'application Express
const app = express();

// Utilisation du middleware pour parser le corps des requêtes en JSON
app.use(express.json());
app.use(cors());

/**
 * Récupération de la liste des fichiers dans le répertoire "routes"
 * Pour chaque fichier de route trouvé, inclure la route dans l'application
 */
const routesDir = path.join(__dirname, 'routes');
const routeFiles = fs.readdirSync(routesDir);
routeFiles.forEach(file => {
  const routePath = path.join(routesDir, file);
  const route = require(routePath);
  app.use('/', route);
});

// Démarrage du serveur sur le port spécifié dans les variables d'environnement ou sur le port 3000 par défaut
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Serveur démarré sur le port ' + PORT);
});