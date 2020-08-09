console.log('js')

$(document).ready(readyNow)

function readyNow() {
    console.log('JQ')
    // click listeners for submit, complete and 
    $('#submitNoteBtn').on('click', submitNewTask)
    $('.completeDelete').on('click', '.completeBtn', markAsCompleted)
    $('.completeDelete').on('click', '.deleteBtn', deleteTask)
    getTasks()
}


// GET the data from the database, stop by the server first
function getTasks() {
    console.log('inside getTasks()')
    $.ajax({
        method: 'GET',
        url: '/toDos'
    }).then(function (response) {
        console.log(response)
        // go the append function
        AppendToDo(response)
    }).catch(function (error) {
        console.log('error in the server', error)
    });
}


//POST
function submitNewTask() {
    console.log('weeeeeeee')
    // make sure there is an input value in at least Task input
    if ($('#taskIn').val() === '') {
        alert('Please fill out the Task field before submitting')
    } else {
        // store the values in an object
        let newRow = {
            task: $('#taskIn').val(),
            note: $('#noteIn').val(),
        }
        // send it to the server 
        $.ajax({
            method: 'POST',
            url: '/toDos',
            data: newRow
        }).then(function (response) {
            console.log(response)
            // re-append for updated database
            getTasks()
        }).catch(function (error) {
            console.log('error in POST: ', error)
        })
    }
}

// DELETE
function deleteTask() {
    console.log('wahooooooo')
    // located the id data we put into THIS tr
    console.log(($(this).closest('tr').data().id))
    let rowId = $(this).closest('tr').data().id
    // url is the saved value
    $.ajax({
        method: 'DELETE',
        url: `/toDos/${rowId}`
    }).then(function (response) {
        console.log(response)
        getTasks()
    }).catch(function (error) {
        console.log('error in DELETE', error)
    })
}

//PUT
function markAsCompleted() {
    console.log('wahooooooo')
    console.log(($(this).closest('tr').data().id))
    let rowId = $(this).closest('tr').data().id
    let taskStatus = true;
    // send over the data id in the url and the taskStatus in the data
    $.ajax({
        method: 'PUT',
        url: `/toDos/${rowId}`,
        data: taskStatus
    }).then(function (response) {
        console.log(response)
        getTasks()
    }).catch(function (error) {
        console.log('error in DELETE', error)
    })
}

// append to the dom function 

function AppendToDo(value) {
    // clear the dom 
    $('.completeDelete').empty()
    // loop over the data ajax brought from the database 
    for (let i = 0; i < value.length; i++) {
        const toDo = value[i];
        // this if block either puts the data in the to do table 
        // or done table based on completed key status
        if (toDo.completed === false) {
            console.log(toDo)
            $('#toDoTableRows').append(`
        <tr class="${toDo.completed}" data-id="${toDo.id}" data-completed="${toDo.completed}" >
            <td>${toDo.task}</td>
            <td>${toDo.note}</td>
            <td><button class ="completeBtn btn btn-success">complete</button></td>
            <td><button class ="deleteBtn btn btn-danger">delete</button></td>
        </tr>
        `)
        } else {
            $('#doneRows').append(`
        <tr class="${toDo.completed}" data-id="${toDo.id}" data-completed="${toDo.completed}" >
            <td>${toDo.task}</td>
            <td>${toDo.note}</td>
            <td><button class ="deleteBtn btn btn-danger">delete</button></td>
        </tr>
        `)

        }
    }
};