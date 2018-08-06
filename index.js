$(function () {

    // Configure Datepicker
    const getDatePicker = () => {
        $('#datepicker').datepicker({
            format: 'dd/mm/yyyy',
            uiLibrary: 'bootstrap4'
        });
    }

    // Show Current Date on navbar
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

    // Disable add button when task is empty
    const checkInput = () => {
        $('#add').prop('disabled', true);
        $('#task').keyup(function () {
            if ($(this).val() !== "") $('#add').prop('disabled', false);
            else $('#add').prop('disabled', true);
        });
    }

    // Get increment from localstorage
    //const getIncrement = () => {
    //    const increment = Number(localStorage.getItem("increment"));
    //    if (increment) return increment;
    //    else return 0;
    //};

    // Set increment to localstorage
    //const setIncrement = () => {
    //    const currentIncrement = getIncrement();
    //    localStorage.setItem("increment", currentIncrement + 1);
    //};

    // Get data from localstorage
    //const getStorage = () => {
    //    const todos = localStorage.getItem("todolist");
    //    if (todos) return JSON.parse(todos);
    //    else return [];
    //};

    // Set data to localstorage
    //const setStorage = todos => {
    //    localStorage.setItem("todolist", JSON.stringify(todos));
    //};

    // Search data from localstorage
    //const search = () => {
    //    const data = getStorage();
    //    $('#search').keyup(function () {
    //        const result = [];
    //        data.forEach((todo, index) => {
    //            const search = todo.task.toLowerCase().includes($('#search').val());
    //            if (search) result.push(data[index]);
    //        });
    //        displayToDOM(result);
    //    });
    //}

    // Template for output
    const createTemplate = ({
        id,
        task,
        priority,
        deadline
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
                            <h5>${deadline}</h5>
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
        deadline
    }) => {
        const template = createTemplate({
            id,
            task,
            priority,
            deadline
        });
        $("#result-field").append(template);
    };

    // Display data from storage to DOM
    const displayToDOM = (data) => {
        $("#result-field").html("");
        const todos = data;

        todos.forEach(todo => {
            addToDOM(todo);
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

    // Add data to localstorage
    const addData = event => {
        event.preventDefault();

        //setIncrement();
        //const todos = getStorage();

        const todo = {
            id: 20,
            task: $("#task").val(),
            priority: $("#priority").val(),
            date: $("#datepicker").val()
        };

        //todos.push(todo);
        //setStorage(todos);
        postDataServer(todo);
        //displayToDOM(getStorage());
        getDataServer();
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

    // Clear input after add new task
    const clearInput = () => {
        $('#task').val("");
        $('#priority').val("Priority");
        $('#datepicker').val("");

        checkInput();
    };

    // Method GET : Get data from server 
    const getDataServer = () => {
        return fetch("http://localhost:3000/todos")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                displayToDOM(data);
            });
    }

    const postDataServer = (data) => {
        var url = 'http://localhost:3000/todos';

        fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    // Event Listener
    $("#task-form").on("submit", addData);

    // Calling Function
    //displayToDOM(getStorage());
    getDatePicker();
    getCurrentDate();
    checkInput();
    //search();

    getDataServer();

});