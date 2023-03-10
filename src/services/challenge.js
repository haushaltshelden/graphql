const Challenge = require('../models/Challenge');
const CompletedChallenge = require('../models/CompletedChallenge');
const moment = require('moment')

const getChallenges = async (user) => {
  return await Challenge.find({
    household: user.household,
  }).sort({ last_done: -1 });
};

const createChallenge = async (name, points, user) => {
  const res = await Challenge.create({
    name,
    points,
    household: user.household,
  });

  return {
    success: true,
  };
};

const completeChallenge = async (id, user) => {
  const challenge = await Challenge.findById(id);

  if (!challenge)
    return { success: false, code: 1, msg: 'Challenge not found.' };

  await CompletedChallenge.create({
    user,
    points: challenge.points,
    challenge,
    household: user.household,
  });

  await challenge.update({
    last_done: new Date(),
  });

  await user.update({
    $inc: { points: challenge.points },
  });

  return {
    success: true,
  };
};

const getLastChallenges = async (user) => {
  return await CompletedChallenge.find({
    household: user.household,
  }).sort({ createdAt: -1 }).populate('user challenge').limit(5).lean();
}

module.exports = {
  getChallenges,
  createChallenge,
  completeChallenge,
  getLastChallenges
};
