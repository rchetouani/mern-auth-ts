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
  formationsfollowed:[ Formation ]
  projects : [ Project ]
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
  id: String
  name: String
  Type: String
  Site: String
  EndDate: String
  Rank: String
  startDate: String
  Formateur: String
}

type Project{
  id : String
  name: String,
  description: String,
  technology: String,
  society: String,
  size: String,
  Site: String,

  startDate: String,
  EndDate: String,
  status: String,
  Progress: String
}

input ProjectInput {
  id : String
  name: String,
  description: String,
  technology: String,
  society: String,
  size: String,
  Site: String,

  startDate: String,
  EndDate: String,
  status: String,
  Progress: String
}

type Query {
  allUsers: [User!]!
  allFormations: [Formation!]!
  User(id :String):User
  Formation(id :String!):Formation
  Project(id:String!):Project

}

type Mutation {
  createUser(name: String!): User!
  
  
  addUser( 
    id:String!, 
    name: String,
    username : String,
    status: String,
    agency: String,
    gender: String,
    birthday: String,
    email :  String,
    formations : [FormationInput]
    projects : [ProjectInput]):User!


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
    name: String,
    username : String,
    status: String,
    agency: String,
    gender: String,
    birthday: String,
    email :  String,
    formationsfollowed : [FormationInput]):User!
    updateFormation(id:String!,formations:[FormationInput]):User!
    deleteUser(id:String!,formations:[FormationInput]):User!
   
   
   
    addProject( 
      id:String!, 
    name: String,
    username : String,
    status: String,
    agency: String,
    gender: String,
    birthday: String,
    email :  String,
    projects : [ProjectInput]):User!



      updateProject(id:String!,projects:[ProjectInput]):User!
}
`;
