module.exports = `

type User {
  id: String
  name: String
  username : String
  password : String
  status: String
  agency: String
  gender: String
  birthday: String
  email :  String
  formations : [ Formation ]
}
type Formation{
      id: String
      name: String
      Type: String
      Site: String
      EndDate: String
      Rank: String
      startDate: String
      Formateur: String
}
input  FormationInput{
  name: String
  Type: String
  Site: String
  EndDate: String
  Rank: String
  startDate: String
  Formateur: String
}
type Query {
  allUsers: [User!]!
  allFormations: [Formation!]!
  User(id :String!):User
  Formation(id :String!):Formation
}

type Mutation {
  createUser(name: String!): User!
  addUser( id:String!, 
    name: String,
    username : String,
    status: String,
    agency: String,
    gender: String,
    birthday: String,
    email :  String,
    formations : [FormationInput]):User!

updateUser(id:String!,
  name: String!,
  username : String!,
  status: String!,
  agency: String!,
  gender: String!,
  birthday: String!,
  email :  String!,
  ):User!



  addFormation( 
    id:String!,
    name: String!,
    Type: String!,
    Site: String!,
    EndDate: String!,
    Rank: String!,
    startDate: String!,
    Formateur: String!):Formation!
}
`;
