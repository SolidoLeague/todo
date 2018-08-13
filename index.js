$(function () {
  const url = 'https://learn-heroku-deploy.herokuapp.com';

  // Configure Datepicker
  const getDatePicker = () => {
    $('#datepicker').datepicker({
      format: 'dd/mm/yyyy',
      uiLibrary: 'bootstrap4'
    });
  };

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
  };

  // Disable add button when todo_task is empty
  const checkInput = () => {
    $('#add').prop('disabled', true);
    $('#todo_task').keyup(function () {
      if ($(this).val() !== '') $('#add').prop('disabled', false);
      else $('#add').prop('disabled', true);
    });
  };

  // Template for output
  const createTemplate = ({
    id,
    todo_task,
    priority,
    due_date,
    completed
  }) => {
    const completedClass = completed ? 'completed' : '';

    return `
        <div class="row justify-content-md-center" id="todo_task-result-${id}">
            <div class="col col-lg-11">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="input-group-text ${priority}">
                            <input type="checkbox" id="checkbox-${id}" title="Mark as completed">
                        </div>
                    </div>
                    <output type="text" class="form-control todo-content" aria-label="todo_Task output with checkbox">
                        <div class="d-flex flex-row ">
                            <h4 class="mr-auto ${completedClass}" id="todo_task-output-${id}">
                              ${todo_task}
                            </h4>
                            <h5 class="due_date">${dateFns.format(
                              due_date,
                              'D MMMM YYYY'
                            )}</h5>
                        </div>
                    </output>
                </div>
            </div>
            <div class="add">
                <button type="button" id="edit-${id}" class="btn" title="Delete this todo_task" value=${id}>Edit</button>
                <button type="button" id="delete-${id}" class="btn btn-danger" title="Delete this todo_task" value=${id}>x</button>
            </div>
        </div>
        `;
  };

  // Render data to DOM
  const addToDOM = ({
    id,
    todo_task,
    priority,
    due_date,
    completed
  }) => {
    const template = createTemplate({
      id,
      todo_task,
      priority,
      due_date,
      completed
    });
    $('#result-field').append(template);
  };

  // Display data from storage to DOM
  const displayToDOM = data => {
    $('#result-field').html('');
    console.log(data);
    const todos = data.todo_lists;

    todos.forEach(todo => {
      addToDOM(todo);
    });

    todos.forEach(todo => {
      $(`#delete-${todo.id}`).on('click', function () {
        putDataServer(todo.id);
        getDataServer();
      });
    });

    todos.forEach(todo => {
      $(`#delete-${todo.id}`).on('click', function () {
        deleteDataServer(todo.id);
        getDataServer();
      });
    });

    // TODO: Implement actual update on completed check via API
    todos.forEach(todo => {
      $(`#checkbox-${todo.id}`).on('click', function () {
        if ($(`#checkbox-${todo.id}`).prop('checked')) {
          $(`#todo_task-output-${todo.id}`).html(`<del>${todo.todo_task}</del>`);
        } else {
          $(`#todo_task-output-${todo.id}`).html(`${todo.todo_task}`);
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
      todo_task: $('#todo_task').val(),
      priority: $('#priority').val(),
      due_date: $('#datepicker').val()
    };

    //todos.push(todo);
    //setStorage(todos);
    postDataServer(todo);
    //displayToDOM(getStorage());
    getDataServer();
    clearInput();
  };

  // Clear input after add new todo_task
  const clearInput = () => {
    $('#todo_task').val('');
    $('#priority').val('Priority');
    $('#datepicker').val('');

    checkInput();
  };

  // Method GET : Get data from server
  const getDataServer = () => {
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        displayToDOM(data);
      });
  };

  // Method POST : Add data to server
  const postDataServer = data => {
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response);
        getDataServer();
      });
  };

  // Method PUT : Edit data to server
  const putDataServer = data => {
    fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response);
        getDataServer();
      });
  };

  // Method DELETE : Delete data from server
  const deleteDataServer = id => {
    return fetch(`${url}/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        getDataServer();
      });
  };

  const searchOneByKeyword = keyword => {
    console.log(keyword);

    // TODO: Implement search via API
    // fetch(`${url}/todos/search?keyword=${keyword}`)
  };

  // Event Listener
  $('#todo_task-form').on('submit', addData);

  // Calling Function
  getDatePicker();
  getCurrentDate();
  //checkInput();
  //search();

  getDataServer();
});