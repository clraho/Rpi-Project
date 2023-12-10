const express = require('express');
const path = require('path');
const app = express();
const ip = `51.21.86.169`; // changer et mettre ip publique ec2 
const port = 3000;

// Définir le dossier public pour les fichiers statiques (comme les fichiers HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint pour afficher le fichier HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`http://${ip}:${port}`);
});
