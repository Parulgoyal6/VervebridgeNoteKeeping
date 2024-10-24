const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  isPinned: { type: Boolean, default: false },
  userId: { type: String, required: true },
  color: { type: String, default: "#ffffff" },
  fontColor: { type: String, default: "black" },
  fontColorContent: { type: String, default: "black" },
  tagColorContent: { type: String, default: "black" },
  titleFont: { type: String, default: "Arial" },
  contentFont: { type: String, default: "Arial" },
  tagFont: { type: String, default: "Arial" },
  createdOn: { type: Date, default: Date.now },  // Set to current date on creation
  modifiedOn: { type: Date }  // Will be updated when modified
});

// Pre-save hook to update `modifiedOn` field when the document is modified
userSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.modifiedOn = Date.now();  // Set modifiedOn to the current date only on updates
  }
  next();
});

module.exports = mongoose.model("NotesApp", userSchema);
