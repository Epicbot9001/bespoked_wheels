const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

app.use(cors());

//Parse json
app.use(express.json());

//password is either empty or "password"
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'bespoked_data'
});

//Makes a route for create so would be localhost:3001/create
//Take from frontend is req (request), and send something to frontend is res (respond)
app.post('/create', (req, res) => {

})

app.get('/products', (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(3001, ()=> {
    console.log("ya server running on port 3001");
})