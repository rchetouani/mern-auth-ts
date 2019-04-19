const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const cors = require("cors");
const chalk = require("chalk");
require("./models/User");
require("dotenv").config();
const config = require("./config");
const users = require("./routes/api/users");

const app = express();
const User = mongoose.model("users");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(chalk.bgGreen("MongoDB successfully connected")))
  .catch(err => console.log(err));
app.use(cors("*"));
const server = new ApolloServer({ typeDefs, resolvers, context: { User } });
server.applyMiddleware({ app });
// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

//const port = process.env.PORT || 5000;

app.listen(config.PORT, () =>
  console.log(
    `Server ready at http://localhost:${config.PORT}${server.graphqlPath}`
  )
);
