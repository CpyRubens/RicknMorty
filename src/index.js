require('dotenv').config();
const express = require('express');
const connectToDatabase = require('./database/database');
const cors = require('cors');

const app = express();
const routes = require('./characater/character.route');
const authRoute = require("./auth/auth.route")
const userRoute = require('./users/users.route')


connectToDatabase();


const port = process.env.PORT || 3001;


app.use(express.json());
app.use(cors());
app.use('/characters', routes);
app.use("/users", userRoute)
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});