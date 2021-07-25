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