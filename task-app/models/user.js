const mongoose = require("mongoose");
const validator = require("validator");
const User = mongoose.model("Users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("Invalid Email !");
      }
    },
  },
  password: {
    type: String || Number,
    minlength: 8,
    validate(value) {
      if (value.includes("00000000")) {
        throw new Error("Try another password");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
  },
});

module.exports = User