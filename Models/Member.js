const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MemberSchema = new Schema({

    First_Name: String,
    Last_Name: String,
    Gender: String,
    Date_of_Birth: String,
    Email: String,

});
MemberSchema.methods.birthdayAgeIsOver = function(age) {
    var memberAge = new Date().getFullYear() - new Date(this.Date_of_Birth).getFullYear();
    if(memberAge > age){
        return true;
    }
    return false;
};
const Member = mongoose.model('Member', MemberSchema);
module.exports = Member