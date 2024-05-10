// This file is a job that runs every 5 seconds to get the CPU load average and insert it into the database
const schedule = require('node-schedule');
const prisma = require('../modules/database.js');

async function mainFunction() {
    var os = require('os');
    var cpuaload = os.loadavg();
    var cpualoadpercent = Math.trunc(cpuaload[0] * 100);
    
    try {
        // Insert data into your database using Prisma
        const result = await prisma.data_cpu.create({
            data: {
                avgpercent: cpualoadpercent,
            },
        });
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

const job = schedule.scheduleJob('*/5 * * * * *', mainFunction);


module.exports = job;