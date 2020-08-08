const express = require('express');
const Router = require('express');
const toDoRouter = express.Router();


// GET DB connection with pg
const pool = require('../modules/pool')
// GET
toDoRouter.get('/', (req,res) => {
    let queryText = 'SELECT * FROM "todolist";'
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET: ', error)
        res.sendStatus(500);
    });
});

//POST
toDoRouter.post('/', (req,res) => {
    let newToDo = req.body;
    let queryText = `
    INSERT INTO todolist ("task", "note")
    VALUES ($1, $2);
    `;
    pool.query(queryText, [newToDo.task, newToDo.note])
.then((result) => {
    res.sendStatus(201)
}).catch((error) => {
    console.log('Error in POST: ', error)
    res.sendStatus(500);
})
})

// DELETE


//PUT





module.exports = toDoRouter;