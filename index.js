const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { timeStamp } = require('console');
const app = express();
const ip = `127.0.0.1`; // changer et mettre ip publique ec2 
const port = 3000;

const connectedRaspberries = new Map();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/update-ip', (req, res) => {
  const { ip } = req.body;
  connectedRaspberries.set(ip, Date.now());   //date.now permet d'avoir le timestamp du moment où on a une requête, -> utiliser le timestamp pour calculer si au bout de 2 minutes le rasp n'envoie plus de requetes
  console.log(`IP du Raspberry mise à jour : ${ip}`);
  console.log(connectedRaspberries);
  res.send('OK');
});

app.get('/raspberry-status', (req, res) => {
  const raspberries = Array.from(connectedRaspberries);
  res.json({ raspberries });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
