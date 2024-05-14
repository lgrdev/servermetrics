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
 * /api/cpu:
 *   get:
 *     summary: Récupération des dernières données du CPU
 *     description: Cette route est utilisée pour récupérer les dernières données du CPU stockées dans la base de données. Un token JWT doit être fourni dans l'en-tête "x-auth-token" de la requête pour l'authentification.
 *     security:
 *       - x-auth-token: token string
 *     responses:
 *       200:
 *         description: Les dernières données du CPU sont renvoyées.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: L'ID de l'entrée de données.
 *                 avgpercent:
 *                   type: integer
 *                   description: Le pourcentage moyen d'utilisation du CPU.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: La date et l'heure de création de l'entrée de données.
 *       400:
 *         description: Une erreur est survenue lors de la récupération des données.
 */
router.get("/api/cpu", auth, async (req, res) => {
    try {
        // Tentative de récupération des dernières données du CPU
        const data = await prisma.data_cpu.findFirst(
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