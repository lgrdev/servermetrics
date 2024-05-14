
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
 * /api/memories/{nb}:
 *   get:
 *     summary: Récupération des dernières données de la mémoire
 *     description: Cette route est utilisée pour récupérer les dernières données de la mémoire stockées dans la base de données. Un token JWT doit être fourni dans l'en-tête "x-auth-token" de la requête pour l'authentification.
 *     security:
 *       - x-auth-token: token string
 *     parameters:
 *       - in: path
 *         name: nb
 *         schema:
 *           type: integer
 *         required: true
 *         description: Le nombre de données à récupérer.
 *     responses:
 *       200:
 *         description: Les dernières données de la mémoire sont renvoyées.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: L'ID de l'entrée de données.
 *                   freepercent:
 *                     type: integer
 *                     description: Le pourcentage de mémoire libre.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: La date et l'heure de création de l'entrée de données.
 *       400:
 *         description: Une erreur est survenue lors de la récupération des données.
 */
router.get("/api/memories/:nb", auth, async (req, res) => {
    try {
        // Tentative de récupération des dernières données du CPU
        let nb = req.params.nb;
        
        // Si le paramètre n'est pas spécifié ou s'il est invalide (<= 0), on utilise la valeur par défaut 20
        if (!nb || nb <= 0) {
            nb = 20;
        }
        
        const data = await prisma.data_memory.findMany(
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
 * /api/memories:
 *   get:
 *     summary: Récupération des 20 dernières données de la mémoire
 *     description: Cette route est utilisée pour récupérer les dernières données de la mémoire stockées dans la base de données. Un token JWT doit être fourni dans l'en-tête "x-auth-token" de la requête pour l'authentification.
 *     security:
 *       - x-auth-token: token string
 *     parameters:
 *       - in: path
 *         name: nb
 *         schema:
 *           type: integer
 *         required: true
 *         description: Le nombre de données à récupérer.
 *     responses:
 *       200:
 *         description: Les dernières données de la mémoire sont renvoyées.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: L'ID de l'entrée de données.
 *                   freepercent:
 *                     type: integer
 *                     description: Le pourcentage de mémoire libre.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: La date et l'heure de création de l'entrée de données.
 *       400:
 *         description: Une erreur est survenue lors de la récupération des données.
 */
router.get("/api/memories", auth, async (req, res) => {
    res.redirect('/api/memories/20');
});

// Exportation de l'objet routeur pour être utilisé dans d'autres parties de l'application
module.exports = router;