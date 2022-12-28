const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const { ObjectId } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const collectedRewardSchema = new Schema(
  {
    user: { type: ObjectId, ref: 'User'},
    costs: Number,
    reward: { type: ObjectId, ref: 'Reward'},
    household: { type: ObjectId, ref: 'Household' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

module.exports = mongoose.model('CollectedReward', collectedRewardSchema);
