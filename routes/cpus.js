// Importation du middleware d'authentification
const auth = require("../middleware/auth");

// Importation du client Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Importation du module Express
const express = require("express");

// Création d'un nouvel objet routeur à partir d'Express
const router = express.Router();


/**
 * @openapi
 * /api/cpus/{nb}:
 *   get:
 *     summary: Get the latest CPU data
 *     description: Retrieve the latest CPU data with the specified number of entries.
 *     parameters:
 *       - in: path
 *         name: nb
 *         schema:
 *           type: integer
 *         required: true
 *         description: The number of entries to retrieve.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the data entry.
 *                   avgpercent:
 *                     type: integer
 *                     description: The average CPU usage percentage.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time of the data entry creation.
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */
router.get("/api/cpus/:nb", auth, async (req, res) => {
    try {
        // Tentative de récupération des dernières données du CPU
        let nb = req.params.nb;
        
        // Si le paramètre n'est pas spécifié ou s'il est invalide (<= 0), on utilise la valeur par défaut 20
        if (!nb || nb <= 0) {
            nb = 20;
        }
        
        const data = await prisma.data_cpu.findMany(
            {
            orderBy: {
                createdAt: 'desc'
            },
            take: parseInt(nb)
            }
        );

        // Envoi des données en réponse
        res.send(data);
    } catch (error) {
        // Enregistrement de l'erreur dans la console
        console.log(error);

        // Envoi d'un message d'erreur en réponse
        res.send("An error occured");
    }
});


/**
 * @openapi
 * /api/cpus:
 *   get:
 *     summary: Get the latest 20 CPU data
 *     description: Retrieve the latest CPU data with the specified number of entries.
 *     parameters:
 *       - in: path
 *         name: nb
 *         schema:
 *           type: integer
 *         required: true
 *         description: The number of entries to retrieve.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the data entry.
 *                   avgpercent:
 *                     type: integer
 *                     description: The average CPU usage percentage.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time of the data entry creation.
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */
router.get("/api/cpus", auth, async (req, res) => {
    res.redirect('/api/cpus/20');
});

// Exportation de l'objet routeur pour être utilisé dans d'autres parties de l'application
module.exports = router;