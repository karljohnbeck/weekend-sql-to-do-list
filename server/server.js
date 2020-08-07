const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = 5000;
const toDoRouter = require('.router/todo.router.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES! 
app.use('/toDos', toDoRouter)

// run PORT on 5000
app.listen (PORT, () => {
    console.log('listening on port ', PORT)
});