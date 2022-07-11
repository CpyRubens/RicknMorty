const Charslists = require('./Character');

const findAllCharService = async () => {
  const charList = await Charslists.find();
  return charList;
};

const findByIdCharService = async (idParam) => {
  const charList = await Charslists.findById(idParam)
  return charList;
};

const createCharService = async (newchar) => {
  const newChar = await Charslists.create(newchar)
  return newChar;
};

const updateCharService = async (id, charEdit) => {
  const charUpdated = await Charslists.findByIdAndUpdate(id, charEdit)
  return charUpdated;
};

const deleteCharService = async (id) => {
  return await Charslists.findByIdAndDelete(id);
};

module.exports = {
  findAllCharService,
  findByIdCharService,
  createCharService,
  updateCharService,
  deleteCharService,
};
