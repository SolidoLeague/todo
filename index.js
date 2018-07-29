$(function () {
    const taskForm = $("#task-form");
    const resultField = $("#result-field");
    let i = 1;

    const addToDOM = (event) => {
        event.preventDefault();

        let addTask = $("#task").val();
        let prioritySelect = $("#inputGroupSelect01").val();
        let datePicker = $("#datepicker").val();

        console.log(addTask, prioritySelect, datePicker)

        if (prioritySelect == "high")
            $('#task-output' + i).css('background-color', 'red');
        else if (prioritySelect == "med")
            $('#task-output' + i).css('background-color', 'yellow');
        else if (prioritySelect == "low")
            $('#task-output' + i).css('background-color', 'green');

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
                            <h3>${datePicker}</h3>
                        </div>
                    </output>
                </div>
            </div>
            <div class="add">
                <button type="button" id="delete" class="btn btn-danger">x</button>
            </div>
        </div>
        `)


        $("#task").val(null)
        $("#inputGroupSelect01").val(null)
        $("#datepicker").val(null)


    }

    const deleteDOM = ()=>{
        event.preventDefault()
        resultField.empty()
    }

    // Event Listener
    taskForm.on("submit", addToDOM);
});
