
console.log('we\'re here for ya'); //test

$(document).ready(onReady);

function onReady(){
    console.log('on READY'); //test
    getFullList();
    $('#submitBtn').on('click', submitTask);
    $('#taskTable').on('click', '#compStatus', completeTask);
    $('#taskTable').on('click', '#dltBtn', deleteTask);

}

// POST submit new task on button click to data base function
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
// PUT update list with 
function completeTask(){
    let taskId = $(this).data('id');
    console.log(taskId);

    $.ajax({
        method: 'PUT', 
        url: `/tasks/${taskId}`,
        data: {status: taskId}
    }).then((response) =>{
        getFullList();
    }).catch((err) => {
        console.log('error in PUT', err);
    });
}

// DELETE button function
function deleteTask(){
    let taskId = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    }).then((response) =>{
        console.log('task deleted');
        getFullList();
    }).catch((err) => {
        console.log('error in PUT', err);
    });
}

// GET display the full list of tasks 
function getFullList(){
    console.log('gonna display full list')
    $('#taskTable').empty();

    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then((response) => {
        //TO DO: Complete cant take a ? in its calling for html. Rename table
        console.log(response);
        for(let x of response) {
            console.log(x.complete);
            // if(x.complete === true){
            //     $('#taskTable').addClass('redStatus');
            // }
            $('#taskTable').append(`
                <tr>
                    <td>${x.name}</td>
                    <td>${x.notes}</td>
                    <td>${x.urgency}</td>
                    <td id=compStatus data-id=${x.id}>
                        ${x.complete}
                        <button class="MTT"> 
                            Finished? 
                        </button>
                    </td> 
                    <td> 
                        <button id= dltBtn data-id=${x.id}> 
                            Delete 
                        </button>
                    </td>
                </tr>
            `);
        }
    }).catch((err) => {
        console.log('error in GET', err);
    });
}