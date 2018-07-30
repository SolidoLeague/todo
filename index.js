$(function () {
    const taskForm = $("#task-form");
    let val = 0;
    let id = localStorage.length;

    // Add Data to DOM
    const addToDOM = (id, task, priority, date) => {
        console.log(`${id}`);

        $('#result-field').append(`
        <div class="row justify-content-md-center" id="task-result${id}">
            <div class="col col-lg-5">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input">
                        </div>
                    </div>
                    <output id="task-output${id}" type="text" class="form-control" aria-label="Task output with checkbox">
                        <div>
                            <h3>${task}</h3>
                        </div>
                    </output>
                </div>
            </div>
            <div class="add">
                <button type="button" id="delete${id}" class="btn btn-danger" value=${id}>x</button>
            </div>
        </div>
        `)

        $('#delete' + id).val(id);
        console.log("addToDOM: ", $('#delete').val());

        if (priority === "high") {
            $('#task-output' + id).css('background-color', 'red');
        } else if (priority === "med") {
            $('#task-output' + id).css('background-color', 'yellow');
        } else if (priority === "low") {
            $('#task-output' + id).css('background-color', 'green');
        }
    }

    // Add Data to Local Storage
    const setItem = (event) => {
        event.preventDefault();

        const taskItem = {
            'id': id,
            'addTask': $("#task").val(),
            'prioritySelect': $("#inputGroupSelect01").val(),
            'datePicker': $("#datepicker").val()
        }
        localStorage.setItem('taskItem' + taskItem.id, JSON.stringify(taskItem));
        addToDOM(taskItem.id, taskItem.addTask, taskItem.prioritySelect, taskItem.datePicker);
        id++;
    }

    // Get Data from Local Storage
    const getItem = () => {
        let length = localStorage.length;
        for (let i = 0; i < length; i++) {
            const taskItem = JSON.parse(localStorage.getItem('taskItem' + i));
            if (taskItem != null) {
                addToDOM(taskItem.id, taskItem.addTask, taskItem.prioritySelect, taskItem.datePicker);
            } else {
                length++;
            }
        }
    }

    // Remove Data from Local Storage
    const removeItem = (id) => {
        localStorage.removeItem('taskItem' + id);
        $('#task-result' + id).remove();
        console.log('taskItem' + id)
    }

    if (id > 0) getItem();

    // Event Listener
    taskForm.on("submit", setItem);

    $("#result-field").on("click", function () {
        for (let i = 0; i < length; i++) {
            const taskItem = JSON.parse(localStorage.getItem('taskItem' + i));
            if (taskItem != null) {
                removeItem(i);
                console.log("test");
            } else {
                length++;
            }
        }
    });

});