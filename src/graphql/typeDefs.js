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

  type household {
    name: String
    membercount: Int
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
  
  type Query {
    users(sorting: Sorting, pagination: Pagination = ${defaultPagination}, filter: Filter): [User]
    myUser: User
    getHouseholds: [household]
    getMyHousehold: household
  }
  
  type Mutation {
    createUser(name: String!, email: String!, password: String!): SuccessErrorResponse
    loginUser(name: String!, password: String!, platform: String!): SuccessErrorResponse
    createHousehold(name: String!): SuccessErrorResponse
    joinHousehold(id: ID!): SuccessErrorResponse
    leaveHousehold: SuccessErrorResponse
  }
`;

module.exports = typeDefs;
