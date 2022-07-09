require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./characater/character.route');

const port = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());
app.use('/chars', routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta${port}`);
  });