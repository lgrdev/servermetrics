// Importation du module Express
const express = require("express");

// Importation du module jsonwebtoken pour la création de tokens JWT
const jwt = require("jsonwebtoken");

// Création d'un nouvel objet routeur à partir d'Express
const router = express.Router();

/**
 * Route POST pour l'authentification.
 * Cette route vérifie l'apikey et le secretid passés dans le corps de la requête.
 * Si les identifiants sont valides, un nouveau token JWT est créé et renvoyé.
 * Sinon, un message d'erreur est renvoyé avec le statut 400 (Bad Request).
 *
 * @name POST /api/auth
 * @param {string} req.body.apikey - L'API key de l'utilisateur
 * @param {string} req.body.secretid - Le secret ID de l'utilisateur
 * @return {string} 200 - Le token JWT
 * @return {Error}  400 - 'Invalid apikey or secretid'
 */
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