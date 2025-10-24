import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); // pour lire le JSON envoyé par fetch()
app.use(express.static(path.join(__dirname, "public"))); // pour servir ton site

// Route d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route d'inscription
app.post("/submit", (req, res) => {
  console.log("Inscription reçue :", req.body);
  res.json({ message: "Inscription enregistrée (simulation)" });
});

// Route de connexion
app.post("/login", (req, res) => {
  console.log("Connexion reçue :", req.body);
  res.json({ message: "Connexion réussie (simulation)" });
});

// Lancer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Serveur en ligne sur le port ${port}`));
