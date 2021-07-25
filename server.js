const app = require('./app');

const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv-defaults').config();

const { conn } = require('./utils/mongoDB');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4000 
app.listen(port, () =>{
	console.log(`Example app listening on port ${port}!`);
});

app.use((err, req, res, next) => {
	console.log(err + '')
	res.json({
	  ok: false,
	  message: '伺服器出現錯誤'
	})
})