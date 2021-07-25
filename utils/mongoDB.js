/* Mongo */
const mongoose = require("mongoose");
if (!process.env.MONGO_URL) { 
	console.error('Missing MONGO_URL!!!') 
	process.exit(1)
}
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(process.env.MONGO_URL, dbOptions) .then(res => {
    console.log('mongo db connection created') 
    initMongoDB();
})
const conn = mongoose.connection;
const Member = mongoose.models.Member

async function initMongoDB () {
    Member.deleteMany({}, () => {     
        
        var First_Names = [ "Robert", "Cid", "Miki", "Sherry", "Peter" ];
        var Last_Names =  [ "Yen", "Change", "Lai", "Chen", "Wang"];
        var Genders = ["Male","Male","Female","Female","Male"];
        var Date_of_Births = ["1975/8/8", "1990/10/10" ,"1993/4/5" ,"1993/8/8" ,"1950/12/22" ];
        var Emails =  [ "robert.yen@linecorp.com", "cid.change@linecorp.com", "miki.lai@linecorp.com", 
                        "sherry.lai@linecorp.com", "peter.wang@linecorp.com"];
        for (var i = 0; i < First_Names.length; i++) {
                let member = new Member({ 
                    First_Name: First_Names[i],
                    Last_Name: Last_Names[i],
                    Gender: Genders[i],
                    // Date_of_Birth: new Date(Date_of_Births[i]),
                    Date_of_Birth: Date_of_Births[i],
                    Email: Emails[i],
                });
            member.save();
        }
        console.log('MongoDB adding data completed');
    });
}

module.exports = { conn }