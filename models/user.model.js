const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        gender:String,
        email: { type: String, required: true, unique: true },
        hobby:String,
        mobileNumber:String,
        password: {
            type: String, required: true
        },


    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);