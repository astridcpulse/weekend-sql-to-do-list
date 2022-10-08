
console.log('we\'re here for ya'); //test

$(document).ready(onReady);

function onReady(){
    console.log('on READY'); //test
    $('#submitBtn').on('click', submitTask);
}

// submit new task on button click to data base function
function submitTask(){
    console.log('click function working'); //test

    let newTask = {
        name: $('#taskIn').val(),
        notes: $('#notesIn').val(),
        urge: $('#urgentIn').val(),
        comp: $('#completeIn').val()
    }
    $.ajax({
        type: 'POST', 
        url: '/task',
        data: newTask
    }).then((response) => {
        getFullList();
    }).catch((err) => {
        console.log('error in POST', err);
    });
}

function postNewTask(newTask) {
    $.ajax({
        method: 'POST', 
        url: '/task',
        data: newTask
    }).then((response) => {
        getFullList();
    }).catch((err) => {
        console.log('error in POST', err);
    });

}

function getFullList(){
    console.log('gonna display full list')
}