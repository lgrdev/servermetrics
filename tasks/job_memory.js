// Importation du module node-schedule pour la planification de tâches
const schedule = require('node-schedule');

// Importation du module Prisma pour la base de données
const prisma = require('../modules/database.js');

/**
 * Fonction principale pour récupérer le pourcentage de mémoire libre et l'insérer dans la base de données.
 * Cette fonction récupère le pourcentage de mémoire libre toutes les 5 secondes et l'insère dans la base de données.
 * En cas d'erreur lors de l'insertion des données, un message d'erreur est affiché dans la console.
 *
 * @async
 * @function
 */
async function mainFunction() {
    // Importation du module os pour récupérer les informations sur le système d'exploitation
    var os = require('os');

    // Calcul du pourcentage de mémoire libre
    var freememorypercent = Math.trunc(os.freemem() / os.totalmem() * 100);

    try {
        // Insertion des données dans la base de données à l'aide de Prisma
        const result = await prisma.data_memory.create({
            data: {
                freepercent: freememorypercent,
            },
        });
    } catch (error) {
        // Affichage de l'erreur dans la console
        console.error('Error inserting data:', error);
    }
}

// Planification de l'exécution de la fonction principale toutes les 5 secondes
const job = schedule.scheduleJob('*/5 * * * * *', mainFunction);

// Exportation de la tâche planifiée
module.exports = job;