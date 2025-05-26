const express = require('express');
const app = express();
const port = 3000; // Porta padrão para a API Node.js

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Rota POST para receber a localização
app.post('/location', (req, res) => {
  const { latitude, longitude } = req.body;

  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'Latitude e longitude são obrigatórias' });
  }

  console.log(`Coordenadas recebidas: Latitude ${latitude}, Longitude ${longitude}`);

  // Resposta simples retornando as coordenadas recebidas
  res.json({
    message: 'Coordenadas recebidas com sucesso!',
    received_latitude: latitude,
    received_longitude: longitude
  });
});

// Inicia o servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`API rodando em http://0.0.0.0:${port}`);
});
