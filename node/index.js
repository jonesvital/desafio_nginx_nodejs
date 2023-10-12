const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000

app.use(require('body-parser').urlencoded({ extended: false }));

const config = {
    host: 'db',
    user: 'root',
    password: 'teste123',
    database: 'desafio'
};

app.post('/insert_name', (req, res) => {
    const connection = mysql.createConnection(config)

    let sql = `INSERT INTO people (name) values ("`+req.body.name+`")`
    connection.query(sql)
    
    sql = `SELECT name FROM people`

    connection.query(sql, (err, rows) => {
        let result = ''

        rows.forEach((key) => {
            result = result+key.name+"<br>"
        })

        res.send('<h1>Full Cycle Rocks!</h1><br>'+result)
    })
    
    connection.end()
    
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})