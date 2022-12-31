const ErrorHandling = require('../utils/errorHandling');

const UserService = require('../services/user');
const HouseholdService = require('../services/household');
const ChallengeService = require('../services/challenge');
const RewardService = require('../services/reward')

const queries = {
  users: (_, { sorting, pagination, filter }) => {
    return UserService.getUsers(pagination, sorting, filter);
  },
  myUser: (_, args, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'myUser',
        context,
      });

    return context.user;
  },
  getHouseholds: (_, { sorting, pagination, filter }) => {
    return HouseholdService.getHousholds();
  },
  getMyHousehold: (_, args, context)  => {
    return HouseholdService.getMyHousehold(context.user);
  },
  getChallenges: (_, args, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'getChallenges',
        context,
      });

    return ChallengeService.getChallenges(context.user);
  },
  getRewards: (_, args, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'getRewards',
        context,
      });

    return RewardService.getRewards(context.user);
  },
  getLastChallenges: (_, args, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'getLastChallenges',
        context,
      });

    return ChallengeService.getLastChallenges(context.user);
  },
  getLastRewards: (_, args, context) => {
    if (!context.user)
      ErrorHandling.handleError('No user context', {
        method: 'getLastRewards',
        context,
      });

    return RewardService.getLastRewards(context.user);
  },
};

module.exports = queries;
