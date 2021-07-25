const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MemberSchema = new Schema({

    First_Name: String,
    Last_Name: String,
    Gender: String,
    Date_of_Birth: String,
    Email: String,

});


const Member = mongoose.model('Member', MemberSchema);
module.exports = Member