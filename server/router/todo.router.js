const express = require('express');
const Router = require('express');
// let us use this router when exported
const toDoRouter = express.Router();

// GET DB connection with pg
const pool = require('../modules/pool');
const { query } = require('../modules/pool');

// GET
toDoRouter.get('/', (req, res) => {
    // command to send to PostgreSQL
    let queryText = 'SELECT * FROM "todolist";'
    // send command to the server then get back the data
    pool.query(queryText).then((result) => {
        // send back the ROWS, since the rest is not really useful for this app
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET: ', error)
        res.sendStatus(500);
    });
});

//POST
toDoRouter.post('/', (req, res) => {
    // save the data
    let newToDo = req.body;
    // command to send to PostgreSQL
    let queryText = `
    INSERT INTO todolist ("task", "note")
    VALUES ($1, $2);
    `;
    // send command to the server then get back the data
    // the $1,$2 were placeholders for SQL injection protection
    pool.query(queryText, [newToDo.task, newToDo.note])
        .then((result) => {
            res.sendStatus(201)
        }).catch((error) => {
            console.log('Error in POST: ', error)
            res.sendStatus(500);
        })
})

// DELETE
toDoRouter.delete('/:id', (req, res) => {
    // save the id in the url
    let rowId = req.params.id
    console.log('delete from from id: ', rowId)
    // command to send to PostgreSQL

    let queryText = `
    DELETE FROM "todolist"
    WHERE "id" = $1;
    `;
    // send command to the server then get back the data
    // the $1,$2 were placeholders for SQL injection protection
    pool.query(queryText, [rowId]).then((result) => {
        res.send(200);
    }).catch((error) => {
        console.log('error in DELETE', error);
        res.sendStatus(500);
    })
})

//PUT
toDoRouter.put('/:id', (req, res) => {
    // save the data sent
    let status = req.body
    // save the id in the url
    let rowId = req.params.id
    console.log('update from from id: ', rowId)
    // command to send to PostgreSQL
    let queryText = `
    UPDATE "todolist"
    SET "completed" = ${Boolean(status)} 
    WHERE "id" = $1;
    `;
    // send command to the server then get back the data
    // the $1,$2 were placeholders for SQL injection protection
    pool.query(queryText, [rowId]).then((result) => {
        res.send(200);
    }).catch((error) => {
        console.log('error in DELETE', error);
        res.sendStatus(500);
    })
})




module.exports = toDoRouter;