// Importation du module Prisma pour la base de données
const prisma = require('../modules/database.js');

// Importation du module node-schedule pour la planification de tâches
const schedule = require('node-schedule');

/**
 * Fonction principale pour supprimer les données de la base de données.
 * Cette fonction supprime les données de la mémoire, du CPU et du disque qui ont été créées il y a plus de 2 heures.
 * En cas d'erreur lors de la suppression des données, un message d'erreur est affiché dans la console.
 *
 * @async
 * @function
 */
async function mainFunction() {
    try {
        // Suppression des données de la mémoire
        const result = await prisma.data_memory.deleteMany({
            where: {
                createdAt: {
                    lt: new Date(new Date() - 2 * 60 * 60 * 1000)
                }
            }
        });
        
    } catch (error) {
        console.error('Error deleting data:', error);
    }

    try {
        // Suppression des données du CPU
        const result = await prisma.data_cpu.deleteMany({
            where: {
                createdAt: {
                    lt: new Date(new Date() - 2 * 60 * 60 * 1000)
                }
            }
        });
        
    } catch (error) {
        console.error('Error deleting data:', error);
    }

    try {
        // Suppression des données du disque
        const result = await prisma.data_disk.deleteMany({
            where: {
                createdAt: {
                    lt: new Date(new Date() - 2 * 60 * 60 * 1000)
                }
            }
        });
        
    } catch (error) {
        console.error('Error deleting data:', error);
    }

    try {
        // Suppression des données de la DataContainerState
        const result = await prisma.DataContainerState.deleteMany({
            where: {
                createdAt: {
                    lt: new Date(new Date() - 2 * 60 * 60 * 1000)
                }
            }
        });
    
    } catch (error) {
        console.error('Error deleting data:', error);
    }
    
}

// Planification de l'exécution de la fonction principale toutes les 5 heures
const job= schedule.scheduleJob('0 */5 * * *', mainFunction);

// Exportation de la tâche planifiée
module.exports = job;