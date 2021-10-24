const mongoose = require('mongoose')


const userSchema = mongoose.Schema(
{
    _id: mongoose.Schema.Types.ObjectId,
    userid: Number,
    usertag: String,
    notified: Boolean,
    banned: Boolean,
    verified: Boolean,
});

module.exports = mongoose.model("User", userSchema)