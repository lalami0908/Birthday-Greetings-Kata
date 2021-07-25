const express = require("express");
const app = express();
require('dotenv-defaults').config();
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

if(process.env.DBIS_MONGO === 'true'){
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

    app.get('/greeting/api/v2', async (req, res) => { 
        let { today } = req.query;
        let todayStr = getTodayStr(today);

        await Member.find( { Date_of_Birth: { $regex: todayStr, $options: 'i' } }).then((members)=>{
        
            var greetingMsgs = [];
            members.forEach( member => { 
                let msg = {};
                if(member.Gender == "Male"){
                    msg = { "title": "Subject: Happy birthday!", 
                            "content": "Happy birthday, dear " + member.First_Name +"!"+ "\n" +
                                        "We offer special discount 20% off for the following items:"+ "\n" + 
                                        "White Wine, iPhone X"}
                } else {
                    msg = { "title": "Subject: Happy birthday!", 
                    "content": "Happy birthday, dear " + member.First_Name +"!"+ "\n" +
                                "We offer special discount 50% off for the following items:"+ "\n" + 
                                "Cosmetic, LV Handbags"}
                } 
                greetingMsgs.push(msg);
            });
            return res.json(greetingMsgs);
        })
    });

    app.get('/greeting/api/v3', async (req, res) => { 
        let { today } = req.query;
        let todayStr = getTodayStr(today);

        await Member.find( { Date_of_Birth: { $regex: todayStr, $options: 'i' } }).then((members)=>{
            var greetingMsgs = [];
            members.forEach( member => { 
                let msg = { "title": "Subject: Happy birthday!", 
                            "content": "Happy birthday, dear " + member.First_Name +"!"}
                if(member.birthdayAgeIsOver(49)){
                    msg['imgUrl'] = `https://i.imgur.com/WFOiLGh.jpg`;
                }
                greetingMsgs.push(msg);
            });
            return res.json(greetingMsgs);
        })
    });


    app.get('/greeting/api/v5', async (req, res) => { 
        let { today } = req.query;
        let todayStr = getTodayStr(today);

        await Member.find( { Date_of_Birth: { $regex: todayStr, $options: 'i' } }).then((members)=>{
            let xml = 
            // '<?xml version="1.0" encoding="utf-8"?>' +
                '<root>';
            members.forEach( member => { 
                xml += '<title>Subject: Happy birthday!</title>'+
                    '<content>Happy birthday, dear '+ member.First_Name + '!</content>';
            });
            xml += "</root>";
            res.set('Content-Type', 'text/xml');
            res.send(xml);
        })
    });
} else {
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

}
module.exports = app;