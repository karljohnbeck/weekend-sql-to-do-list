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


// DELETE


//PUT





module.exports = toDoRouter;