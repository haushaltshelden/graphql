const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const { ObjectId } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const completeChallengeSchema = new Schema(
  {
    user: { type: ObjectId, ref: 'User'},
    points: Number,
    challenge: { type: ObjectId, ref: 'Challenge'},
    household: { type: ObjectId, ref: 'Household' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

module.exports = mongoose.model('CompleteChallenge', completeChallengeSchema);
