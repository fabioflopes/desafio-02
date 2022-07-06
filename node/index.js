const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    port: '3306'
}

const mysql = require('mysql')

const sqlInsert = `INSERT INTO people(name) values('Poalla');`

const sqlSelect = `SELECT people.name FROM people;`

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

app.get('/', (req, res) => {

    const connection = new Database(config)

    let response = ""

    response += '<h1>Fullcycle Rocks!</h1>'

    connection.query(sqlInsert)
        .then(
            rows => {
                return connection.query(sqlSelect)
                    .then(
                        rows => {
                            rows.forEach(element => {
                                response += "<p>" + element.name + "</p>"
                            })
                            return connection.close()
                                .then(
                                    rows => {
                                        res.send(response)
                                    }
                                )
                        })
            }
        )
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
