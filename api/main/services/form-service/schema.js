const mongoose = require('mongoose');

const filedSchema = new mongoose.Schema({
  type: { type: String, enum: ['text', 'number', 'select,', 'radio', 'date', 'password', 'checkbox', 'email', 'hidden', 'image', 'month', 'datetime-local', 'range', 'reset', 'search', 'submit', 'tel', 'time', 'url', 'week', 'textarea', 'datalist'] }, // required: true
  name: { type: String },
  id: { type: String },
  value: { type: String },
  size: { type: String },
  maxlength: { type: String },
  min: { type: String },
  max: { type: String },
  pattern: { type: String },
  required: { type: Boolean },
  step: { type: String },
  width: { type: String },
  height: { type: String },
  list: { type: String },
  label: { type: String }, // required: true
  placeholder: { type: String },
  options: { type: [String] },
  isMulti: { type: Boolean },
});

const formSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  status: {
    type: String, required: true, enum: ['ACTIVE', 'DELETED'], default: 'ACTIVE',
  },
  action: { type: String },
  method: { type: String, required: true, enum: ['GET', 'POST'] },
  isEncrypt: { type: Boolean, required: false },
  fields: { type: [filedSchema] },
}, { collection: 'forms', versionKey: false });

const dataSchema = new mongoose.Schema({}, { strict: false, collection: 'form-data', versionKey: false });

const Form = mongoose.model('Form', formSchema);
const Data = mongoose.model('Data', dataSchema);

module.exports = {
  Form,
  Data,
};
