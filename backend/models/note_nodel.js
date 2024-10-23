const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title:{type : String, required: true},

  content:{type: String, required: true},

  tags:{ type:[String], default: []},

  isPinned: {type : Boolean, default: false},

  userId: {type : String, required: true},

  color: { type: String, default: "#ffffff" },
  fontColor: { type: String, default: "black" },
  fontColorContent: { type: String, default: "black" },
  tagColorContent: { type: String, default: "black" },
  titleFont: { type: String, default: "Arial" },  // Add default font
  contentFont: { type: String, default: "Arial" }, // Add default font
  tagFont: { type: String, default: "Arial" }, // 
  createdOn: {type: Date, default: new Date().getTime()},
  modifiedOn: { type: Date, default: Date.now },
})

module.exports = mongoose.model("NotesApp", userSchema);