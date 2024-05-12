// Importation du module Express
const express = require("express");

// Importation du module jsonwebtoken pour la création de tokens JWT
const jwt = require("jsonwebtoken");

// Création d'un nouvel objet routeur à partir d'Express
const router = express.Router();

/**
 * @openapi
 * /api/auth:
 *   post:
 *     summary: Authentification de l'utilisateur
 *     description: Cette route est utilisée pour authentifier l'utilisateur en vérifiant l'apikey et le secretid fournis, et renvoie un token JWT si l'authentification est réussie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - apikey
 *               - secretid
 *             properties:
 *               apikey:
 *                 type: string
 *                 description: La clé API de l'utilisateur.
 *               secretid:
 *                 type: string
 *                 description: L'ID secret de l'utilisateur.
 *     responses:
 *       200:
 *         description: L'authentification a réussi et un token JWT est renvoyé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Le token JWT.
 *       400:
 *         description: L'apikey ou le secretid sont invalides.
 */
router.post("/api/auth", (req, res) => {
    const { apikey, secretid } = req.body

    // Si l'apikey et le secretid sont valides
    if (apikey === process.env.APIKEY && secretid === process.env.SECRETID) {
        // Création d'un nouveau token JWT
        const accessToken = jwt.sign({ server: 'servermectrics:'+Date.now().toString }, process.env.JWTPRIVATEKEY, { expiresIn: "5m" });

        // Envoi du token en réponse
        res.json({ token: accessToken });
        
    } else {
        // Si l'apikey ou le secretid sont invalides, envoi d'un message d'erreur avec le statut 400 (Bad Request)
        return res.status(400).send("Invalid apikey or secretid");
    }
});

// Exportation de l'objet routeur pour être utilisé dans d'autres parties de l'application
module.exports = router;