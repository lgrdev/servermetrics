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
 * /api/docker:
 *   get:
 *     summary: Récupération des dernières données des conteneurs Docker
 *     description: Cette route est utilisée pour récupérer les dernières données des conteneurs Docker stockées dans la base de données. Un token JWT doit être fourni dans l'en-tête "x-auth-token" de la requête pour l'authentification.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Les dernières données des conteneurs Docker sont renvoyées.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Le nom du conteneur Docker.
 *                   status:
 *                     type: string
 *                     description: Le statut du conteneur Docker.
 *                   state:
 *                     type: string
 *                     description: L'état du conteneur Docker.
 *       400:
 *         description: Une erreur est survenue lors de la récupération des données.
 */
router.get("/api/docker", auth, async (req, res) => {
    try {
        // Tentative de récupération des dernières données des conteneurs Docker
        const resultats = await prisma.dataContainer.findMany({
            select: {
              name: true,
              states: {
                orderBy: { createdAt: 'desc' }, // Trier par date de création décroissante
                take: 1, // Récupérer seulement le premier (donc le plus récent) DataContainerState
                select: {
                  status: true,
                  state: true
                }
              }
            }
        });
        // Transformer le résultat pour avoir la structure souhaitée
        const resultatTransforme = resultats.map(({ name, states }) => {
          const { status, state } = states[0];
          return { name, status, state };
        });
        // Envoi des données en réponse
        res.send(resultatTransforme);
    } catch (error) {
        // Enregistrement de l'erreur dans la console
        console.log(error);

        // Envoi d'un message d'erreur en réponse
        res.send("An error occured");
    }
});

// Exportation de l'objet routeur pour être utilisé dans d'autres parties de l'application
module.exports = router;