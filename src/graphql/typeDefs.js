const defaultPagination = '{ perPage: 50, page: 1 }';

const typeDefs = `
  scalar Date

  input Pagination {
    page: Int
    perPage: Int
  }
  
  input Filter {
    q: String
  }
  
  input Sorting {
    field: String!
    order: String!
  }

  type SuccessErrorResponse {
    success: Boolean
    code: Int
    msg: String
  }

  type Household {
    name: String
    membercount: Int
    members: [User]
    _id: ID
  }
  
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    wrongLoginCount: Int
    household: ID
    points: Int
    deleted: Boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }

  type Challenge {
    name: String
    points: Int
    last_done: Date
    household: Household
    created_at: Date
    _id: ID
  }

  type Reward {
    name: String
    costs: Int
    _id: ID
  }

  type CollectedReward {
    user: User
    costs: Int
    reward: Reward
    createdAt: Date
  }

  type CompletedChallenge {
    user: User
    points: Int
    challenge: Challenge
    createdAt: Date
  }
  
  type Query {
    users(sorting: Sorting, pagination: Pagination = ${defaultPagination}, filter: Filter): [User]
    myUser: User
    getHouseholds: [Household]
    getMyHousehold: Household
    getChallenges: [Challenge]
    getRewards: [Reward]
    getLastChallenges: [CompletedChallenge]
    getLastRewards: [CollectedReward] 
  }
  
  type Mutation {
    createUser(name: String!, email: String!, password: String!): SuccessErrorResponse
    loginUser(name: String!, password: String!, platform: String!): SuccessErrorResponse
    createHousehold(name: String!): SuccessErrorResponse
    joinHousehold(id: ID!): SuccessErrorResponse
    leaveHousehold: SuccessErrorResponse
    createChallenge(name: String!, points: Int!): SuccessErrorResponse
    completeChallenge(id: ID!): SuccessErrorResponse
    createReward(name: String, costs: Int!): SuccessErrorResponse
    collectReward(id: ID!): SuccessErrorResponse
  }
`;

module.exports = typeDefs;
