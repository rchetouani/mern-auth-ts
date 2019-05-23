const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const FormationSchema = new Schema({
  name: String,
  Type: String,
  Site: String,
  EndDate: Date,
  Rank: String,
  startDate: Date,
  Formateur: String
});
module.exports = User = mongoose.model("Formation", FormationSchema);
