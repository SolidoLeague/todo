$(function () {
    const taskForm = $("#task-form");
    const resultField = $("#result-field");
    
    let id = localStorage.length;

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
                <button type="button" id="delete" class="btn btn-danger" value=${id}>x</button>
            </div>
        </div>
        `)

        if (priority === "high") {
            $('#task-output' + id).css({"background-color":"tomato", "color":"white"});
        } else if (priority === "med") {
            $('#task-output' + id).css({"background-color":"yellow","color":"purple"});
        } else if (priority === "low") {
            $('#task-output' + id).css({"background-color":"green","color":"white"});
        }
    }

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

    const getItem = () => {
        for (let i = 0; i < localStorage.length; i++) {
            const taskItem = JSON.parse(localStorage.getItem('taskItem' + i));
            addToDOM(taskItem.id, taskItem.addTask, taskItem.prioritySelect, taskItem.datePicker);
        }
    }

    const removeItem = (id) => {
        localStorage.removeItem('taskItem' + id);
        $('#task-result' + id).remove();
    }

    if (id > 0) getItem();
  
    // Event Listener
    taskForm.on("submit", setItem);


});