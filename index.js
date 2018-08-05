$(function () {
    const getDatePicker = () => {
        $('#datepicker').datepicker({
            format: 'mm/dd/yyyy',
            uiLibrary: 'bootstrap4'
        });
    }

    const getCurrentDate = () => {
        let today = new Date();
        let date = today.getDate();
        let month = today.getMonth();
        const year = today.getFullYear();

        if (date < 10) date = '0' + date;
        if (month < 10) month = '0' + month;

        today = date + '-' + month + '-' + year;

        $('#current-date').html(today);
    }

    const checkInput = () => {
        $('#add').prop('disabled', true);
        $('#task').keyup(function () {
            if ($(this).val() != '') $('#add').prop('disabled', false);
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
                        <div class="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input">
                        </div>
                    </div>
                    <output id="task-output-${id}" type="text" class="form-control todo-content ${priority}" aria-label="Task output with checkbox">
                        <div class="d-flex flex-row ">
                            <h4 class="mr-auto">${task}</h4>
                            <h5>${date}</h5>
                        </div>
                    </output>
                </div>
            </div>
            <div class="add">
                <button type="button" id="delete-${id}" class="btn btn-danger" value=${id}>x</button>
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
    const displayToDOM = () => {
        $("#result-field").html("");
        const todos = getStorage();

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
        displayToDOM();
    };

    // Remove data in local storage
    const removeItem = idToRemove => {
        const todos = getStorage();

        todos.find((todo, index) => {
            if (todo.id === Number(idToRemove)) {
                todos.splice(index, 1);
                setStorage(todos);
                displayToDOM();
            }
        });
    };

    // Event Listener
    $("#task-form").on("submit", addData);

    // Calling Function
    displayToDOM();
    getDatePicker();
    getCurrentDate();
    checkInput();

});