const schedule = require('node-schedule');
const si = require('systeminformation');
const moment = require('moment');

const prisma = require("@prisma/client");
const { PrismaClient } = prisma;

const prismaClient = new PrismaClient();

async function updateDataMemory() {

    const newValue = await si.mem().then(data => { 
        return (data.free / data.total) * 100;
    });

    try {
        // Insertion des données dans la base de données à l'aide de Prisma
        await prismaClient.data_memory.create({
            data: {
                freepercent: newValue,
            },
        });
    } catch (error) {
        // Affichage de l'erreur dans la console
        console.error('Error inserting data:', error);
    }
 
}

async function updateDataDisk() {   

    const newValue = await si.fsSize().then(data => { 
        return data[0].use;
    });

    try {
        // Insertion des données dans la base de données à l'aide de Prisma
        await prismaClient.data_disk.create({
            data: {
                freepercent: newValue,
            },
        });
    } catch (error) {
        // Affichage de l'erreur dans la console
        console.error('Error inserting data:', error);
    }
}

async function updateDataCpu() {

    const newValue = await si.currentLoad().then(data => { 
        return data.currentLoad / data.cpus.length * 100;
    });

    try {
        // Insertion des données dans la base de données à l'aide de Prisma
        await prismaClient.data_cpu.create({
            data: {
                avgpercent: newValue,
            },
        });
    } catch (error) {
        // Affichage de l'erreur dans la console
        console.error('Error inserting data:', error);
    }
}


async function insererDataContainerState(containerData) {
  try {
    // Insérer une nouvelle ligne dans la table DataContainerState avec les données fournies
    await prismaClient.DataContainerState.create({
      data: {
        status: containerData.status,
        state: containerData.state,
        // Supposons que containerId soit une référence à un conteneur existant dans la table DataContainer
        container: {
          connect: { name: containerData.name }
        }
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'insertion dans DataContainerState :', error);
  } 
}

async function getDockerContainersInfo() {
  try {
    const dockerData = await si.dockerContainers('all'); // Utilisation de await pour attendre les données Docker
    const now = moment();

    const containersInfo = dockerData.map(container => {
  
      const createdAt = moment(container.createdAt);
      const duration = moment.duration(now.diff(createdAt));
      const durationString = `${duration.humanize()} ago`;

      let formattedStatus = '';
      if (container.state === 'running') {
        formattedStatus = `Up ${durationString}`;
      } else if (container.state === 'restarting') {
        formattedStatus = `Restarting (${container.restartCount}) ${durationString}`;
      } else if (container.state === 'exited') {
        const duration = moment.duration(now.diff(container.finishedAt));
        const durationString = `${duration.humanize()} ago`;          
        formattedStatus = `Down ${durationString}`;
      }

      return {
        name: container.name,
        state: container.state,
        status: formattedStatus,
      };
      
    });

    return containersInfo;
  } catch (error) {
    console.error('Error retrieving Docker containers information:', error);
  }
}

async function updateDataDocker() {
  try {
    const containersInfo = await getDockerContainersInfo();

    for (const container of containersInfo) {
      try {
        await prismaClient.DataContainer.upsert({
          where: { name: container.name },
          update: {},
          create: {
            name: container.name
          }
        });
        
        await insererDataContainerState(container);
      } catch (error) {
        // Affichage de l'erreur dans la console
        console.error('Error inserting data:', error);
      }
    }
  } catch (error) {
    console.error('Error retrieving containers info:', error);
  }
}

async function mainFunction() {
    updateDataDocker()
    updateDataMemory();
    updateDataDisk();
    updateDataCpu();
}

// Planification de l'exécution de la fonction principale toutes les 5 secondes
const job = schedule.scheduleJob(process.env.WRITER_CRON, mainFunction);

// Exportation de la tâche planifiée
module.exports = job;