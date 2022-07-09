const route = require('express').Router();

const controllerChar = require('./character.controller');

route.get('/', controllerChar.findAllCharController);
route.get('/:id', controllerChar.findByIdCharController);
route.post('/', controllerChar.createCharController);
route.put('/:id', controllerChar.updateCharController);
route.delete('/:id', controllerChar.deleteCharController);

module.exports = route;
