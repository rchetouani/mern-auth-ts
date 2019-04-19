module.exports = `

type User {
  id: String!
  name: String!
username : String!
password : String!
  status: String!
  agency: String!
  gender: String!
  birthday: String!
}

type Query {
  allUsers: [User!]!
}

type Mutation {
  createUser(name: String!): User!
}

`;
