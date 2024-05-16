// Importation du module node-schedule pour la planification de tâches
const schedule = require('node-schedule');

// Importation du module Prisma pour la base de données
const prisma = require('../modules/database.js');

// Importation du module node-disk-info pour obtenir des informations sur le disque
const disk = require('node-disk-info');

/**
 * Fonction principale pour récupérer l'utilisation du disque et l'insérer dans la base de données.
 * Cette fonction récupère l'utilisation du disque toutes les 5 secondes et l'insère dans la base de données.
 * En cas d'erreur lors de l'insertion des données, un message d'erreur est affiché dans la console.
 *
 * @async
 * @function
 */
async function mainFunction() {
    // Récupération des informations sur le disque
    var disks = disk.getDiskInfoSync();

    // Calcul du pourcentage de disque libre
    var freediskpercent = Math.trunc(disks[0].available / disks[0].blocks * 100);

    try {
        // Insertion des données dans la base de données à l'aide de Prisma
        const result = await prisma.data_disk.create({
            data: {
                freepercent: freediskpercent,
            },
        });
    } catch (error) {
        // Affichage de l'erreur dans la console
        console.error('Error inserting data:', error);
    }
}

// Planification de l'exécution de la fonction principale toutes les 5 secondes
const job = schedule.scheduleJob(process.env.DISK_CRON, mainFunction);

// Exportation de la tâche planifiée
module.exports = job;