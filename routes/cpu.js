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
 * Route GET pour récupérer les dernières données du CPU.
 * Cette route nécessite une authentification.
 * Si l'authentification est réussie, les dernières données du CPU sont récupérées et renvoyées.
 * En cas d'erreur, un message d'erreur est renvoyé.
 *
 * @name GET /api/cpu
 * @function
 * @async
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {Object} 200 - Les dernières données du CPU
 * @returns {Error} 500 - 'An error occured'
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