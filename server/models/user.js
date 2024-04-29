const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;

const profileSchema = new Schema({
  email: { type: String },
  organization: { type: String },
  username: { type: String },
});

const userSchema = new Schema(
  {
    currents: { type: Array },
    email: { type: String },
    feed: { type: Array },
    hashedPassword: { type: String },
    id: { type: String },
    notifications: { type: Array },
    profile: profileSchema,
    shared: { type: Array },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("hashedPassword")) return next();
  // update the password with the computed hash
  this.hashedPassword = await bcrypt.hash(this.hashedPassword, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model("UpturnUser", userSchema);
