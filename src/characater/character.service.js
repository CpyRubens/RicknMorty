const Charslists = require('./Character');

const createCharService = (name, userId, imageUrl) => {
  return Charslists.create({ user: userId, name, imageUrl });
};

const findAllCharService = (offset=0,limit=10) => {
  return Charslists.find().skip(offset).limit(limit).populate("user")
};

const findByIdCharService =  (idParam) => {
  return  Charslists.findById(idParam)
};

const updateCharService = (id, charEdit) => {
  return Charslists.findByIdAndUpdate(id, charEdit)
};

const deleteCharService =  (id) => {
  return  Charslists.findByIdAndDelete(id);
};

const searchCharService = (name) => {
  return Charslists.find({ name: { $regex: `${name || ""}`, $options: "i" } }).populate("user")
}

module.exports = {
  findAllCharService,
  findByIdCharService,
  createCharService,
  updateCharService,
  deleteCharService,
  searchCharService,
};
