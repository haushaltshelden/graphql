const ErrorHandling = require('../utils/errorHandling');

const UserService = require('../services/user');
const HouseholdService = require('../services/household');
const ChallengeService = require('../services/challenge');
const RewardService = require('../services/reward');

const mutations = {
  createUser: (_, { name, email, password }) => {
    if (!name || !email || !password)
      ErrorHandling.handleError('No name, email or password is given', {
        name,
        email,
        password,
      });

    return UserService.createUser(name, email, password);
  },
  loginUser: (_, { name, password, platform }) => {
    return UserService.loginUser(name, password, platform);
  },
  createHousehold: (_, { name }, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'createHousehold',
        context,
      });

    return HouseholdService.createHousehold(name, context.user);
  },
  joinHousehold: (_, { id }, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'joinHousehold',
        context,
      });

    return HouseholdService.joinHousehold(id, context.user);
  },
  leaveHousehold: (_, args, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'leaveHousehold',
        context,
      });

    return HouseholdService.leaveHousehold(context.user);
  },
  createChallenge: (_, { name, points }, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'createChallenge',
        context,
      });

    return ChallengeService.createChallenge(name, points, context.user);
  },
  completeChallenge: (_, { id }, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'completeChallenge',
        context,
      });

    return ChallengeService.completeChallenge(id, context.user);
  },
  createReward: (_, { name, costs }, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'createReward',
        context,
      });

    return RewardService.createReward(name, costs, context.user);
  },
  collectReward: (_, { id }, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'collectReward',
        context,
      });

    return RewardService.collectReward(id, context.user);
  },
};

module.exports = mutations;
