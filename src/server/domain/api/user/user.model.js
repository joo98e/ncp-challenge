import mongoose from "mongoose";
import bcrypt from "bcrypt";

/**
 * @typedef {import('mongoose').Document} MongooseDocument
 * @typedef {import('mongoose').Model<MongooseDocument>} MongooseModel
 *
 * @typedef {Object} UserDocument
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 * @property {function} checkPassword
 * @property {function(string): boolean} validPassword - bcrypt compare
 */

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

/**
 * 비밀번호를 비교하는 메서드
 * @param {string} password - 비교할 비밀번호
 * @returns {boolean} - 비밀번호 일치 여부
 */
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

/**
 * @type {MongooseModel<UserDocument>}
 */
const User = mongoose.model("User", userSchema);

export default User;
