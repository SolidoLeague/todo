$(function () {
    const taskForm = $("#task-form");
    let id = 0;

    // Add data to DOM
    const addToDOM = (id, task, priority, date) => {
        $('#result-field').append(`
        <div class="row justify-content-md-center" id="task-result${id}">
            <div class="col col-lg-5">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input">
                        </div>
                    </div>
                    <output id="task-output${id}" type="text" class="form-control todo-content" aria-label="Task output with checkbox">
                        <div class="d-flex flex-row ">
                            <h4 class="mr-auto">${task}</h4>
                            <h5>${date}</h5>
                        </div>
                    </output>
                </div>
            </div>
            <div class="add">
                <button type="button" id="delete${id}" class="btn btn-danger" value=${id}>x</button>
            </div>
        </div>
        `)

        if (priority === "high") {
            $('#task-output' + id).css({
                "background-color": "tomato",
                "color": "white"
            });
        } else if (priority === "med") {
            $('#task-output' + id).css({
                "background-color": "yellow",
                "color": "purple"
            });
        } else if (priority === "low") {
            $('#task-output' + id).css({
                "background-color": "green",
                "color": "white"
            });
        }
    }

    // Add data to local storage
    const setItem = (event) => {
        event.preventDefault();

        const taskItem = {
            'id': id,
            'addTask': $("#task").val(),
            'prioritySelect': $("#inputGroupSelect01").val(),
            'datePicker': $("#datepicker").val()
        }
        localStorage.setItem('taskItem' + taskItem.id, JSON.stringify(taskItem));
        addToDOM(id, taskItem.addTask, taskItem.prioritySelect, taskItem.datePicker);
        console.log(id);
        id++;

    }

    // Get data from local storage
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

    // Remove data in local storage
    const removeItem = (id) => {
        localStorage.removeItem('taskItem' + id);
        $('#task-result' + id).remove();
    }

    getItem();

    // Event Listener
    taskForm.on("submit", setItem);

    for (let j = 0; j < localStorage.length; j++) {
        $(`#delete${j}`).on('click', function () {
            removeItem(j);
        })
    }
});