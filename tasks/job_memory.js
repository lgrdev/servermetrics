// This file is a job that runs every 5 seconds and inserts the free memory percentage into the database.
const schedule = require('node-schedule');
const prisma = require('../modules/database.js');

async function mainFunction() {
    var os = require('os');
    var freememorypercent = Math.trunc(os.freemem() / os.totalmem() * 100);

    try {
        // Insert data into your database using Prisma
        const result = await prisma.data_memory.create({
            data: {
                freepercent: freememorypercent,
            },
        });

    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

const job = schedule.scheduleJob('*/5 * * * * *', mainFunction);

module.exports = job;
