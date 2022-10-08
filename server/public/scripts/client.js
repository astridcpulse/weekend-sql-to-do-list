const { response } = require("express");

console.log('we\'re here for ya'); //test

$(document).ready(onReady);

function onReady(){
    console.log('on READY'); //test
    $('#submitBtn').on('click', submitTask);
}

// submit new task on button click to data base function
function submitTask(){
    console.log('click function working'); //test

    let newTask ={
        name: $('#taskIn').val(),
        notes: $('#notesIn').val(),
        urge: $('#urgentIn').val(),
        comp: $('#completeIn').val()
    }
    postNewTask(newTask);
}

