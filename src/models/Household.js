const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const { ObjectId } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const householdSchema = new Schema(
  {
    name: String,
    membercount: Number
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

module.exports = mongoose.model('Household', householdSchema);
