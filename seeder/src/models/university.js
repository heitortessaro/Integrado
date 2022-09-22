const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  alphaTwoCode: String,
  webPages: Array,
  name: String,
  country: String,
  domains: Array,
  stateProvince: String,
}, { versionKey: false });

const University = mongoose.model('University', universitySchema);

module.exports = University;
