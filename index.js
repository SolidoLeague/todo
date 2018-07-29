$(function () {
    const taskForm = $("#task-form")
    const resultField = $("#result-field")



    const addDOM = (event) => {
        event.preventDefault()

        const addTask = $("#task").val();
        const prioritySelect = $("#inputGroupSelect01").val();
        const datePicker = $("#datepicker").val();
        console.log(addTask, prioritySelect, datePicker)

        if (prioritySelect == "high") 
            $('#task-output').css('background-color', 'red');
        else if (prioritySelect == "med")
            $('#task-output').css('background-color', 'yellow');
        else if (prioritySelect == "low")
            $('#task-output').css('background-color', 'green');

        $('#result-field').append(`<div class="input-group mb-3" id="task-result">
        <div class="input-group-prepend">
            <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input">
            </div>
        </div>
        <output id="task-output" type="text" class="form-control" aria-label="Task output with checkbox">
            <div>
                <h3>${addTask}</h3>
            </div>
            <div>
                <h3>${datePicker}</h3>
            </div>
        </output>
    </div>
        `)
    }






    // Event Listener
    taskForm.on("submit", addDOM)


})