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
const Member = require('../Models/Member')

async function initMongoDB () {
   
}

module.exports = { conn }