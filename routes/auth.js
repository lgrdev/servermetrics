// Importation du module Express
const express = require("express");

// Importation du module jsonwebtoken pour la création de tokens JWT
const jwt = require("jsonwebtoken");

// Création d'un nouvel objet routeur à partir d'Express
const router = express.Router();

// Définition d'une route POST pour la route racine ("/")
// Cette route vérifie l'apikey et le secretid passés dans le corps de la requête
router.post("/api/auth", (req, res) => {
    const { apikey, secretid } = req.body

    // Si l'apikey et le secretid sont valides
    if (apikey === process.env.APIKEY && secretid === process.env.SECRETID) {
        // Création d'un nouveau token JWT
        const token = jwt.sign({ apikey: req.body.apikey }, process.env.JWTPRIVATEKEY, { expiresIn: "1h" });

        // Envoi du token en réponse
        res.send(token);
    } else {
        // Si l'apikey ou le secretid sont invalides, envoi d'un message d'erreur avec le statut 400 (Bad Request)
        return res.status(400).send("Invalid apikey or secretid");
    }
});

// Exportation de l'objet routeur pour être utilisé dans d'autres parties de l'application
module.exports = router;