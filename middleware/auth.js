// Importation du module jsonwebtoken pour la vérification des tokens JWT
const jwt = require("jsonwebtoken");

// Exportation d'une fonction middleware qui vérifie le token JWT
module.exports = (req, res, next) => {
    try {
        // Récupération du token à partir de l'en-tête "x-auth-token" de la requête
        const token = req.header("x-auth-token");

        // Si aucun token n'est fourni, envoi d'un message d'erreur avec le statut 403 (Forbidden)
        if (!token) return res.status(403).send("Access denied.");

        // Vérification du token avec la clé privée JWT stockée dans les variables d'environnement
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);

        // Passage au prochain middleware
        next();
        
    } catch (error) {
        // Si une erreur se produit (par exemple, si le token est invalide), envoi d'un message d'erreur avec le statut 400 (Bad Request)
        res.status(400).send("Invalid token");
    }
};
