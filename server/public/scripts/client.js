console.log('js')

$(document).ready(readyNow)

function readyNow() {
    console.log('JQ')
    $('#submitNoteBtn').on('click', submitNewTask)
    getTasks()
}


// GET
function getTasks() {
    console.log('inside getTasks()')
    $.ajax({
        method: 'GET',
        url: '/toDos'
    }).then(function (response){
        console.log(response)
    }). catch(function (error) {
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
    }).then(function (response){
        console.log(response)
        getTasks()
    }).catch(function (error) {
        console.log('error in POST: ', error)
    })
} 

// DELETE


//PUT