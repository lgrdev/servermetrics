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
 * Route GET pour récupérer les dernières données de la mémoire.
 * Cette route nécessite une authentification.
 * Si l'authentification est réussie, les dernières données de la mémoire sont récupérées et renvoyées.
 * En cas d'erreur, un message d'erreur est renvoyé.
 *
 * @name GET /api/memory
 * @function
 * @async
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {Object} 200 - Les dernières données de la mémoire
 * @returns {Error} 500 - 'An error occured'
 */
router.get("/api/memory", auth, async (req, res) => {
    try {
        // Tentative de récupération des dernières données de la mémoire
        const data = await prisma.data_memory.findFirst(
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