const path = require("path");
const fs = require("fs");

// Import the job from tasks folder
const jobmemory = require('./tasks/job_memory.js');
const jobcpu = require('./tasks/job_cpu.js');
const jobdisk = require('./tasks/job_disk.js');
const jobcleaner = require('./tasks/job_cleaner.js');

const express = require("express");
const app = express();

app.use(express.json());

// Récupérer la liste des fichiers dans le répertoire "routes"
const routesDir = path.join(__dirname, 'routes');
const routeFiles = fs.readdirSync(routesDir);

// Pour chaque fichier de route trouvé, inclure la route dans l'application
routeFiles.forEach(file => {
  const routePath = path.join(routesDir, file);
  const route = require(routePath);

  app.use('/', route);
});

// lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Serveur démarré sur le port ' + PORT);
});