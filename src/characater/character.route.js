const route = require('express').Router();

const controllerChar = require('./character.controller');
const authMidware = require('../auth/auth.midleware')

route.get('/', authMidware, controllerChar.findAllCharController);
route.get('/find/:id',authMidware , controllerChar.findByIdCharController);
route.post('/create', authMidware, controllerChar.createCharController);
route.put('/update/:id', authMidware,controllerChar.updateCharController);
route.delete('/delete/:id',authMidware, controllerChar.deleteCharController);
route.get('/search', authMidware, controllerChar.searchCharController)


module.exports = route;
