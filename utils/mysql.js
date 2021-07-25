require('dotenv-defaults').config();
const mysql = require('mysql')
const conn = mysql.createConnection({
  host     :   process.env.MYSQL_HOST,
  user     :   process.env.MYSQL_USER,
  password :   process.env.MYSQL_PASSWORD,
  database :   process.env.MYSQL_DBNAME,
  port: process.env.MYSQL_PORT
});

conn.connect(function(err) {
  if (err) {
      console.log('mysql connecting error');
      return;
  }
  console.log('mysql connecting success');
  initMySQL();
});

async function initMySQL () {
await query('TRUNCATE TABLE members');
  var sqls = [
  'INSERT INTO members (First_Name, Last_Name, Gender, Date_of_Birth, Email) VALUES ("Robert", "Yen", "Male", "1975/8/8", "robert.yen@linecorp.com")',
  'INSERT INTO members (First_Name, Last_Name, Gender, Date_of_Birth, Email) VALUES ("Cid", "Change", "Male", "1990/10/10", "cid.change@linecorp.com")',
  'INSERT INTO members (First_Name, Last_Name, Gender, Date_of_Birth, Email) VALUES ("Miki", "Lai", "Female", "1993/4/5", "miki.lai@linecorp.com")',
  'INSERT INTO members (First_Name, Last_Name, Gender, Date_of_Birth, Email) VALUES ("Sherry", "Chen", "Female", "1993/8/8", "sherry.lai@linecorp.com")',
  'INSERT INTO members (First_Name, Last_Name, Gender, Date_of_Birth, Email) VALUES ("Peter", "Wang", "Male", "1950/12/22", "peter.wang@linecorp.com")'];
  for (var i = 0; i < sqls.length; i++) {
      await query(sqls[i]);
  };
  console.log('mysql adding data completed');
}


const pool = mysql.createPool({
  host     :   process.env.MYSQL_HOST,
  user     :   process.env.MYSQL_USER,
  password :   process.env.MYSQL_PASSWORD,
  database :   process.env.MYSQL_DBNAME
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else { 
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()  
        })
      }
    })
  })
}

module.exports = { conn, query }