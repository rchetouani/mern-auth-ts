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
  email :  String!
}

type Query {
  allUsers: [User!]!
  User(id :String!):User
}

type Mutation {
  createUser(name: String!): User!
  addUser(  
    name: String!,
  username : String!,
  password : String!,
    status: String!,
    agency: String!,
    gender: String!,
    birthday: String!,
    email :  String!):User!

updateUser(id:String!,
  name: String!,
  username : String!,
   status: String!,
agency: String!,
gender: String!,
birthday: String!,
email :  String!):User!
}
`;
