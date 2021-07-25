const express = require("express");
const app = express();

const Member = require('./models/member')

function getTodayStr (today) {
    var todayDate = new Date(today);
    if (!todayDate instanceof Date || isNaN(todayDate.getTime())){
        todayDate = new Date();
    }
    var month = todayDate.getMonth()+1;
    var date = todayDate.getDate();
    var todayStr = "/"+ month+ "/"+ date;
    console.log(`query birthday: ${todayStr}`);
    return todayStr;
};
const { query } = require('./utils/mysql')

app.get('/greeting/api/v4', async (req, res) => { 
    let { today } = req.query;
    let todayStr = getTodayStr(today);
    
    var greetingMsgs = [];
    var sql = `SELECT * FROM members WHERE Date_of_Birth LIKE N'%${todayStr}%'`;
    var members = await query(sql);
    members.forEach( member => { 
        let msg = { "title": "Subject: Happy birthday!", 
                    "content": "Happy birthday, dear " + member.Last_Name+ ", " + member.First_Name +"!"}
        greetingMsgs.push(msg);
    });
    return res.json(greetingMsgs);
});

module.exports = app;