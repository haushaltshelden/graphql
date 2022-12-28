const ErrorHandling = require('../utils/errorHandling');

const UserService = require('../services/user');
const HouseholdService = require('../services/household');

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
};

module.exports = queries;
