var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
const cors = require("cors")
const PORT = process.env.PORT || 3000;
var connection = mysql.createConnection({
                host: '34.72.44.127',
                user: 'root',
                password: 'abc123',
                database: 'db'
});

connection.connect;

var app = express();

// cors
app.use(cors());
app.use(express.json());

// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/build')));
 
// this code is executed when a user clicks the form submit button
// app.post('/mark', function(req, res) {
//   var netid = req.body.netid;
   
//   var sql = `INSERT INTO attendance (netid, present) VALUES ('${netid}',1)`;

// console.log(sql);
//   connection.query(sql, function(err, result) {
//     if (err) {
//       res.send(err)
//       return;
//     }
//     res.redirect('/success');
//   });
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
