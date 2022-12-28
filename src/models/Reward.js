const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const { ObjectId } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const rewardSchema = new Schema(
  {
    name: String,
    costs: Number,
    household: { type: ObjectId, ref: 'Household' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

module.exports = mongoose.model('Reward', rewardSchema);
