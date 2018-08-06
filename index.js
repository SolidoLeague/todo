$(function () {
    const getDatePicker = () => {
        $('#datepicker').datepicker({
            format: 'dd/mm/yyyy',
            uiLibrary: 'bootstrap4'
        });
    }

    const getCurrentDate = () => {
        let today = new Date();
        let date = today.getDate();
        let month = today.getMonth() + 1;
        const year = today.getFullYear();

        if (date < 10) date = '0' + date;
        if (month < 10) month = '0' + month;

        today = date + '-' + month + '-' + year;

        $('#current-date').html(today);
    }

    const checkInput = () => {
        $('#add').prop('disabled', true);
        $('#task').keyup(function () {
            if ($(this).val() !== "") $('#add').prop('disabled', false);
            else $('#add').prop('disabled', true);
        });
    }

    const getIncrement = () => {
        const increment = Number(localStorage.getItem("increment"));
        if (increment) return increment;
        else return 0;
    };

    const setIncrement = () => {
        const currentIncrement = getIncrement();
        localStorage.setItem("increment", currentIncrement + 1);
    };

    const getStorage = () => {
        const todos = localStorage.getItem("todolist");
        if (todos) return JSON.parse(todos);
        else return [];
    };

    const setStorage = todos => {
        localStorage.setItem("todolist", JSON.stringify(todos));
    };

    const search = () => {
        const data = getStorage();
        $('#search').keyup(function () {
            const result = [];
            data.forEach((todo, index) => {
                const search = todo.task.toLowerCase().includes($('#search').val());
                if (search) result.push(data[index]);
            });
            displayToDOM(result);
        });
    }

    const createTemplate = ({
        id,
        task,
        priority,
        date
    }) => {
        return `
        <div class="row justify-content-md-center" id="task-result-${id}">
            <div class="col col-lg-11">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="input-group-text ${priority}">
                            <input type="checkbox" id="checkbox-${id}" title="Mark as completed">
                        </div>
                    </div>
                    <output type="text" class="form-control todo-content" aria-label="Task output with checkbox">
                        <div class="d-flex flex-row ">
                            <h4 class="mr-auto" id="task-output-${id}">${task}</h4>
                            <h5>${date}</h5>
                        </div>
                    </output>
                </div>
            </div>
            <div class="add">
                <button type="button" id="delete-${id}" class="btn btn-danger" title="Delete this task" value=${id}>x</button>
            </div>
        </div>
        `;
    };

    // Render data to DOM
    const addToDOM = ({
        id,
        task,
        priority,
        date
    }) => {
        const template = createTemplate({
            id,
            task,
            priority,
            date
        });
        $("#result-field").append(template);
    };

    // Display data from storage to DOM
    const displayToDOM = (data) => {
        $("#result-field").html("");
        const todos = data;

        todos.forEach(todo => {
            addToDOM({
                id: todo.id,
                task: todo.task,
                priority: todo.priority,
                date: todo.date
            });
        });

        todos.forEach(todo => {
            $(`#delete-${todo.id}`).on("click", function () {
                removeItem(todo.id);
            });
        });

        todos.forEach(todo => {
            $(`#checkbox-${todo.id}`).on("click", function () {
                if ($(`#checkbox-${todo.id}`).prop('checked')) {
                    $(`#task-output-${todo.id}`).html(`<del>${todo.task}</del>`);
                } else {
                    $(`#task-output-${todo.id}`).html(`${todo.task}`);
                }
            });
        });
    };

    // Add data
    const addData = event => {
        event.preventDefault();

        setIncrement();
        const todos = getStorage();

        const todo = {
            id: getIncrement(),
            task: $("#task").val(),
            priority: $("#priority").val(),
            date: $("#datepicker").val()
        };

        todos.push(todo);
        setStorage(todos);
        displayToDOM(getStorage());
        clearInput();
    };

    // Remove data in local storage
    const removeItem = idToRemove => {
        const todos = getStorage();

        todos.find((todo, index) => {
            if (todo.id === Number(idToRemove)) {
                todos.splice(index, 1);
                setStorage(todos);
                displayToDOM(getStorage());
            }
        });
    };

    const clearInput = () => {
        $('#task').val("");
        $('#priority').val("Priority");
        $('#datepicker').val("");

        checkInput();
    };

    const getData = () => {
        fetch("http://localhost:3000/todos")
            .then(response => {
                return response.json();
            })
            .then(data => {
                displayToDOM(data.todos);
            });
    }


    // Event Listener
    $("#task-form").on("submit", addData);

    // Calling Function
    displayToDOM(getStorage());
    getDatePicker();
    getCurrentDate();
    checkInput();
    search();
    getData();

});