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
 * /api/disk:
 *   get:
 *     summary: Récupération des dernières données du disque
 *     description: Cette route est utilisée pour récupérer les dernières données du disque stockées dans la base de données. Un token JWT doit être fourni dans l'en-tête "x-auth-token" de la requête pour l'authentification.
 *     security:
 *       - x-auth-token: token string
 *     responses:
 *       200:
 *         description: Les dernières données du disque sont renvoyées.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: L'ID de l'entrée de données.
 *                 freepercent:
 *                   type: integer
 *                   description: Le pourcentage de disque libre.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: La date et l'heure de création de l'entrée de données.
 *       400:
 *         description: Une erreur est survenue lors de la récupération des données.
 */
router.get("/api/disk", auth, async (req, res) => {
    try {
        // Tentative de récupération des dernières données du disque
        const data = await prisma.data_disk.findFirst(
            {
                orderBy: {
                    createdAt: 'desc'
                }
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

// Exportation de l'objet routeur pour être utilisé dans d'autres parties de l'application
module.exports = router;