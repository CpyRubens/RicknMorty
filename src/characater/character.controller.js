const CharService = require('./character.service');
const mongoose = require('mongoose');


const findAllCharController = async (req, res) => {

  try {

    let { offset, limit } = req.query

    limit = Number(limit)
    offset = Number(offset);

    if (!limit) {
      limit = 10
    }
    if (!offset) {
      offset = 0
    }
    const Chars = await CharService.findAllCharService(offset, limit);
    return res.send({
      results: Chars.map((char) => ({
        id: char._id,
        user: char.user.id,
        name: char.name,
        imageUrl: char.imageUrl,
      })),
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }

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
  try {
    const { name } = req.body;
    const { imageUrl } = req.body;

    if (!name || !imageUrl) {
      res.status(400).send({ message: 'Envie todos os dados necessários' });
    }


    const { id } = await CharService.createCharService(name, req.userId, imageUrl)

    return res.send({
      message: "Char criado com suecesso",
      character: { id, name, imageUrl }
    })
  } catch (err) {
    res.status(500).send({ message: err.message });

  }
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


  if (!CharEdit || !CharEdit.name || !CharEdit.imageUrl) {
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

const searchCharController = async (req, res) => {
  try {
    const { name } = req.query;

    const Chars = await CharService.searchCharService(name);

    return res.send({
      characters: Chars.map((char) => ({
        id: char._id,
        user: char.user.id,
        name: char.name,
        imageUrl: char.imageUrl,
      })),
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}


module.exports = {
  findAllCharController,
  findByIdCharController,
  createCharController,
  updateCharController,
  deleteCharController,
  searchCharController,
};
