const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const { ObjectId } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const challengeSchema = new Schema(
  {
    name: String,
    points: Number,
    last_done: Date,
    household: { type: ObjectId, ref: 'Household' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

module.exports = mongoose.model('Challenge', challengeSchema);
