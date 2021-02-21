const mongoose = require("mongoose");

const Users = mongoose.model("Users", {
    email: {
      unique: true,
      type: String,
    },
    account: {
      username: {
        required: true,
        type: String,
      },
      phone: String,
      avatar: Object,
    },
    token: String,
    hash: String,
    salt: String,
});




module.exports = Users;
