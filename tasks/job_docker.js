// Importation du module node-schedule pour la planification de tâches
const schedule = require('node-schedule');

// Importation du module Prisma pour la base de données
const prisma = require('../modules/database.js');

async function mainFunction() {
    const { exec } = require('child_process');

    exec('docker ps --format "{{.Names}}\t{{.State}}\t{{.Status}}"', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        const dockerList = stdout.split('\n').filter((line) => line !== '');
        dockerList.forEach(async (line) => {
            const [name , state , status] = line.split('\t');
            try {
                const data = {
                    container_name: name,
                    container_status: status,
                    container_state: state,
                };

                await prisma.DataContainer.upsert({
                    where: { name: data.container_name },
                    update: {},
                    create: {
                        name: data.container_name
                    }
                })

                await insererDataContainerState(data);    
            } catch (error) {
                console.error('Error inserting data:', error);
            }
        });
    });
}

async function insererDataContainerState(containerData) {
    try {
      // Insérer une nouvelle ligne dans la table DataContainerState avec les données fournies
      await prisma.DataContainerState.create({
        data: {
          status: containerData.container_status,
          state: containerData.container_state,
          // Supposons que containerId soit une référence à un conteneur existant dans la table DataContainer
          container: {
            connect: { name: containerData.container_name }
          }
        }
      });
    } catch (error) {
      console.error('Erreur lors de l\'insertion dans DataContainerState :', error);
    } 
  }

  
// Planification de l'exécution de la fonction principale toutes les 2 minutes
const job = schedule.scheduleJob('*/2 * * * *', mainFunction);

// Exportation de la tâche planifiée
module.exports = job;