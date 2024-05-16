const prisma = require("@prisma/client");
const { PrismaClient } = prisma;

const prismaClient = new PrismaClient();

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
        await prismaClient.data_memory.deleteMany({
            where: {
                createdAt: {
                    lt: new Date(new Date() - process.env.CLEANER_DELETE_AFTER_HOURS * 60 * 60 * 1000)
                }
            }
        });
        
    } catch (error) {
        console.error('Error deleting data:', error);
    }

    try {
        // Suppression des données du CPU
        await prismaClient.data_cpu.deleteMany({
            where: {
                createdAt: {
                    lt: new Date(new Date() - process.env.CLEANER_DELETE_AFTER_HOURS * 60 * 60 * 1000)
                }
            }
        });
        
    } catch (error) {
        console.error('Error deleting data:', error);
    }

    try {
        // Suppression des données du disque
       await prismaClient.data_disk.deleteMany({
            where: {
                createdAt: {
                    lt: new Date(new Date() - process.env.CLEANER_DELETE_AFTER_HOURS * 60 * 60 * 1000)
                }
            }
        });
        
    } catch (error) {
        console.error('Error deleting data:', error);
    }

    try {
        // Suppression des données de la DataContainerState
        await prismaClient.DataContainerState.deleteMany({
            where: {
                createdAt: {
                    lt: new Date(new Date() - process.env.CLEANER_DELETE_AFTER_HOURS * 60 * 60 * 1000)
                }
            }
        });
    
    } catch (error) {
        console.error('Error deleting data:', error);
    }
    
}

// Planification de l'exécution de la fonction principale toutes les 5 heures
const job= schedule.scheduleJob(process.env.CLEANER_CRON, mainFunction);

// Exportation de la tâche planifiée
module.exports = job;