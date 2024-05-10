// Importation du middleware d'authentification
const auth = require("../middleware/auth");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Importation du module Express
const express = require("express");

// Création d'un nouvel objet routeur à partir d'Express
const router = express.Router();

// Définition d'une route GET pour la route racine ("/")
// Le middleware d'authentification est appliqué à cette route
// Une fonction asynchrone est définie pour gérer les requêtes à cette route
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