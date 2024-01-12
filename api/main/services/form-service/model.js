/* eslint-disable no-underscore-dangle */
const { Form, Data } = require('./schema');

const create = async (name, status, action, method, isEncrypt, fields) => {
  const form = new Form({
    name, status, action, method, isEncrypt, fields,
  });
  let f;
  try {
    f = await form.save();
    console.log(f);
    if (f) return { id: f._id, name: f.name };
  } catch (e) {
    //
  }
  return f;
};

const find = async (id) => {
  const form = await Form.findById(id);
  return form;
};

const inquiry = async (start = 0, size = 15) => {
  let forms = [];
  forms = await Form.find({}, {}, { skip: start, limit: size });
  return forms;
};

const findByName = async (name) => {
  const form = await Form.find({ name });
  return form;
};

const update = async (id, status, action, method, isEncrypt, fields) => {
  const object = {
    status,
    action,
    method,
    isEncrypt,
    fields,
  };
  let form;
  const condition = { $set: object };
  try {
    form = await Form.findByIdAndUpdate(id, condition);
  } catch (e) {
    return form;
  }
  return form;
};

const remove = async (id) => {
  const form = await Form.findByIdAndDelete(id);
  return form;
};

const createData = async (id, data) => {
  const formData = new Data({ formId: id, formData: data });
  let d;
  try {
    d = await formData.save();
  } catch (e) {
    return d;
  }
  return d;
};

const removeData = async (id) => {
  const form = await Data.deleteOne({ formId: id });
  return form;
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
