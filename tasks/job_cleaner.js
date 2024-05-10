// This file is used to delete data from the database every 2 hours
const prisma = require('../modules/database.js');
const schedule = require('node-schedule');

async function mainFunction() {
    try {
        // Delete data from your database using Prisma
        const result = await prisma.data_memory.deleteMany({
            where: {
                createdAt: {
                    lt: new Date(new Date() - 2 * 60 * 60 * 1000)
                }
            }
        });
        console.log('Data deleted:', result);
    } catch (error) {
        console.error('Error deleting data:', error);
    }

    try {
        // Delete data from your database using Prisma
        const result = await prisma.data_cpu.deleteMany({
            where: {
                createdAt: {
                    lt: new Date(new Date() - 2 * 60 * 60 * 1000)
                }
            }
        });
        console.log('Data deleted:', result);
    } catch (error) {
        console.error('Error deleting data:', error);
    }

    try {
        // Delete data from your database using Prisma
        const result = await prisma.data_disk.deleteMany({
            where: {
                createdAt: {
                    lt: new Date(new Date() - 2 * 60 * 60 * 1000)
                }
            }
        });
        console.log('Data deleted:', result);
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}

// Run the main function every 5 hours
const job= schedule.scheduleJob('0 */5 * * *', mainFunction);

module.exports = job;