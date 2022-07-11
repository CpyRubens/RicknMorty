const CharService = require('./character.service');
const mongoose = require('mongoose');


const findAllCharController = async (req, res) => {
  const Char = await CharService.findAllCharService();
  res.send(Char);
};

const findByIdCharController = async (req, res) => {
  const idParam = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res
      .status(400)
      .send({ message: 'ID inválido!' });
    return;
  }

  const escolhaChar = await CharService.findByIdCharService(idParam);

  if (!escolhaChar) {
    return res.status(404).send({ message: "Char não encontrada!" })
  }

  res.send(escolhaChar);
};

const createCharController = async (req, res) => {
  const Char = req.body;
  if (
    !Char ||
    !Char.name ||
    !Char.image
  ) {
    res.status(400).send({ mensagem: "Você não preencheu todos os dados para adicionar uma nova Char a sua lista!" });

  }
  const newChar = await CharService.createCharService(Char);
  res.send(newChar);
};

const updateCharController = async (req, res) => {
  const idParam = req.params.id;
  const CharEdit = req.body;

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res.status(400).send({ message: 'ID inválido!' });
    return;
  }

  const escolhaChar = await CharService.findByIdCharService(idParam);

  if (!escolhaChar) {
    return res.status(404).send({ message: "Char não encontrada!" })
  }


  if (!CharEdit || !CharEdit.name || !CharEdit.image) {
    return res.status(400).send({ message: "Você não preencheu todos os dados para editar a Char!" });
  }

  const updateChar = await CharService.updateCharService(idParam, CharEdit);
  res.send(updateChar);
};

const deleteCharController = async (req, res) => {
  const idParam = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res.status(400).send({ message: 'ID inválido!' });
    return;
  }

  const escolhaChar = await CharService.findByIdCharService(idParam);

  if (!escolhaChar) {
    return res.status(404).send({ message: "Char não encontrada!" })
  }


  await CharService.deleteCharService(idParam);
  res.send({ message: 'Item da lista deletado com sucesso!' })
};
module.exports = {
  findAllCharController,
  findByIdCharController,
  createCharController,
  updateCharController,
  deleteCharController,
};
