const model = require('./model');
const customError = require('../../custom-errors');

const create = async (name, status, action, method, isEncrypt, fields) => {
  const form = await model.create(name, status, action, method, isEncrypt, fields);
  if (!form) throw new customError.RejectError();
  return form;
};

const find = async (id) => {
  const form = await model.find(id);
  if (!form) throw new customError.FormNotFoundError();
  return form;
};

const inquiry = async (start, size) => {
  const form = await model.inquiry(start, size);
  if (!form) throw new customError.FormNotFoundError();
  return form;
};

const findByName = async (name) => {
  const form = await model.findByName(name);
  if (!form) throw new customError.FormNotFoundError();
  return form;
};

const update = async (id, status, action, method, isEncrypt, fields) => {
  const form = await model.update(id, status, action, method, isEncrypt, fields);
  if (!form) throw new customError.RejectError();
  return true;
};

const remove = async (id) => {
  try {
    await model.remove(id);
  } catch (e) {
    return false;
  }
  return true;
};

const createData = async (id, data) => {
  const result = await model.createData(id, data);
  if (!result) throw new customError.RejectError();
  return result;
};

const removeData = async (id) => {
  const result = await model.removeData(id);
  return result;
};

module.exports = {
  create,
  find,
  inquiry,
  findByName,
  update,
  remove,
  createData,
  removeData,
};
