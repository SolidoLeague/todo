$(function () {
    const taskForm = $("#task-form");
    const resultField = $("#result-field");
    
    let i = 1;

    const addToDOM = (event) => {
        event.preventDefault();

        const addTask = $("#task").val();
        const prioritySelect = $("#inputGroupSelect01").val();
        const datePicker = $("#datepicker").val();
        console.log(addTask, prioritySelect, datePicker)


        $('#result-field').append(`
        <div class="row justify-content-md-center">
        <div class="col col-lg-5">
        <div class="input-group mb-3" id="task-result">
        <div class="input-group-prepend">
        <div class="input-group-text">
        <input type="checkbox" aria-label="Checkbox for following text input">
        </div>
        </div>
        <output id="task-output${i}" type="text" class="form-control" aria-label="Task output with checkbox">
        <div>
        <h3>${addTask}</h3>
        </div>
        <div>
        <h5>${datePicker}</h5>
        </div>
        </output>
        </div>
        </div>
        <div class="delete">
        <button type="button" id="delete" class="btn btn-danger">x</button>
        </div>
        </div>
        `)
        if (prioritySelect == "high")
            $('#task-output' + i).css('background-color', 'red');
        else if (prioritySelect == "med")
            $('#task-output' + i).css('background-color', 'yellow');
        else if (prioritySelect == "low")
            $('#task-output' + i).css('background-color', 'green');
        i += 1
        console.log(i)
    }

    

    // Event Listener
    taskForm.on("submit", addToDOM);
});