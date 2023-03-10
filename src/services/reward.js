const Reward = require('../models/Reward');
const CollectedReward = require('../models/CollectedReward');
const moment = require('moment')

const getRewards = async (user) => {
  return await Reward.find({
    household: user.household,
  }).sort({ costs: 1 });
};

const createReward = async (name, costs, user) => {
  const res = await Reward.create({
    name,
    costs,
    household: user.household,
  });

  return {
    success: true,
  };
};

const collectReward = async (id, user) => {
  const reward = await Reward.findById(id);

  if (!reward) return { success: false, code: 1, msg: 'Reward not found.' };

  await CollectedReward.create({
    user,
    costs: reward.costs,
    reward,
    household: user.household,
  });

  await user.update({
    $inc: { points: -reward.costs },
  });

  return {
    success: true,
  };
};

const getLastRewards = async (user) => {
  return await CollectedReward.find({
    household: user.household,
  }).sort({ createdAt: -1 }).populate('user reward').limit(5).lean();
}

module.exports = {
  getRewards,
  createReward,
  collectReward,
  getLastRewards
};
