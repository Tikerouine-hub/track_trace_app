const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const data = require('./data');

// Créer un lot
app.post('/lots', (req, res) => {
  const { product, quantity } = req.body;

  const lot = {
    id: Date.now(),
    product,
    quantity,
    status: 'Créé',
    date: new Date().toLocaleString()
  };

  data.lots.push(lot);
  data.history.push({
    lotId: lot.id,
    action: 'Lot créé',
    date: lot.date
  });

  res.json(lot);
});

// Récupérer les lots
app.get('/lots', (req, res) => {
  res.json(data.lots);
});

// Mettre à jour le statut
app.put('/lots/:id', (req, res) => {
  const lot = data.lots.find(l => l.id == req.params.id);
  if (!lot) return res.status(404).send('Lot non trouvé');

  lot.status = req.body.status;
  data.history.push({
    lotId: lot.id,
    action: `Statut changé en ${lot.status}`,
    date: new Date().toLocaleString()
  });

  res.json(lot);
});

// Historique
app.get('/history', (req, res) => {
  res.json(data.history);
});

app.listen(3000, () => {
  console.log('Serveur Track & Trace démarré sur http://localhost:3000');
});
