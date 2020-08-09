console.log('js')

$(document).ready(readyNow)

function readyNow() {
    console.log('JQ')
    $('#submitNoteBtn').on('click', submitNewTask)
    $('.completeDelete').on('click', '.completeBtn', markAsCompleted)
    $('.completeDelete').on('click', '.deleteBtn', deleteTask)
    getTasks()
}


// GET
function getTasks() {
    console.log('inside getTasks()')
    $.ajax({
        method: 'GET',
        url: '/toDos'
    }).then(function (response) {
        console.log(response)
        AppendToDo(response)
    }).catch(function (error) {
        console.log('error in the server', error)
    });
}


//POST
function submitNewTask() {
    console.log('weeeeeeee')
    let newRow = {
        task: $('#taskIn').val(),
        note: $('#noteIn').val(),
    }
    $.ajax({
        method: 'POST',
        url: '/toDos',
        data: newRow
    }).then(function (response) {
        console.log(response)
        getTasks()
    }).catch(function (error) {
        console.log('error in POST: ', error)
    })
}

// DELETE
function deleteTask() {
    console.log('wahooooooo')
    console.log(($(this).closest('tr').data().id))
    let rowId = $(this).closest('tr').data().id
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

// append to the dom

function AppendToDo(value) {
    $('.completeDelete').empty()
    for (let i = 0; i < value.length; i++) {
        const toDo = value[i];
        if (toDo.completed === false) {
            console.log(toDo)
            $('#toDoTableRows').append(`
        <tr class="${toDo.completed}" data-id="${toDo.id}" data-completed="${toDo.completed}" >
            <td>${toDo.task}</td>
            <td>${toDo.note}</td>
            <td><button class ="completeBtn">complete</button></td>
            <td><button class ="deleteBtn">delete</button></td>
        </tr>
        `)
        } else {
            $('#doneRows').append(`
        <tr class="${toDo.completed}" data-id="${toDo.id}" data-completed="${toDo.completed}" >
            <td>${toDo.task}</td>
            <td>${toDo.note}</td>
            <td><button class ="deleteBtn">delete</button></td>
        </tr>
        `)

        }
    }
};