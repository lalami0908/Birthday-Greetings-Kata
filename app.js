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

app.get('/greeting/api/v1', async (req, res) => { 
    let { today } = req.query;
    let todayStr = getTodayStr(today);

    await Member.find( { Date_of_Birth: { $regex: todayStr, $options: 'i' } }).then((members)=>{
        var greetingMsgs = [];
        members.forEach( member => { 
            let msg = { "title": "Subject: Happy birthday!", 
                        "content": "Happy birthday, dear " + member.First_Name +"!"}
            greetingMsgs.push(msg);
        });
        return res.json(greetingMsgs);
    })
});

module.exports = app;