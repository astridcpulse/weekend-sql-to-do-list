
console.log('we\'re here for ya'); //test

$(document).ready(onReady);

function onReady(){
    console.log('on READY'); //test
    getFullList();
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
        url: '/tasks',
        data: newTask
    }).then((response) => {
        getFullList();
    }).catch((err) => {
        console.log('error in POST', err);
    });
}



function getFullList(){
    console.log('gonna display full list')
    $('#taskTable').empty();

    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then((response) =>{
        //TO DO: Complete cant take a ? in its calling for html. Rename table
        console.log(response);
        for(let x of response) {
            $('#taskTable').append(`
                <tr>
                    <td>${x.name}</td>
                    <td>${x.notes}</td>
                    <td>${x.urgency}</td>
                    <td>${x.complete}</td> 
                </tr>
            `);
        }
    });
}