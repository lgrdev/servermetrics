// This file is used to get the disk usage of the server and insert it into the database every 5 seconds
const schedule = require('node-schedule');
const prisma = require('../modules/database.js');
const disk = require('node-disk-info');

// Function to get disk usage and insert it into the database
async function mainFunction() {

    var disks = disk.getDiskInfoSync();

    var freediskpercent = Math.trunc(disks[0].available / disks[0].blocks * 100);


    try {
        // Insert data into your database using Prisma
        const result = await prisma.data_disk.create({
            data: {
                freepercent: freediskpercent,
            },
        });
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

const job = schedule.scheduleJob('*/5 * * * * *', mainFunction);


module.exports = job;