const app = require('./app');

const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv-defaults').config();
const schedule  = require('node-schedule');
const parser = require('cron-parser');

if(process.env.DBIS_MONGO === 'true' ){
    const { conn } = require('./utils/mongoDB');
} else {
    const { conn } = require('./utils/mysql');
}

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dailySchedule = ()=>{
    var taskFreq = '0 0 0 * * *';
    schedule.scheduleJob(taskFreq,()=>{
        request('http://localhost:4000/greeting/api/v1', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log("birthday message: " + "\n" + res.body);
        });
    }); 
}

const checkDailySchedule = ()=>{
    var taskFreq =  parser.parseExpression('0 0 0 * * *');
     // check for the cron expression
     for (let i = 0; i < 5; ++i) {
        console.log(taskFreq.next().toString());
    }
}

const port = process.env.PORT || 4000 
app.listen(port, () =>{
	console.log(`Example app listening on port ${port}!`);
	// dailySchedule();
});

app.use((err, req, res, next) => {
	console.log(err + '')
	res.json({
	  ok: false,
	  message: '伺服器出現錯誤'
	})
})