$(function () {
  const url = 'https://learn-heroku-deploy.herokuapp.com';

  // Configure Datepicker
  const getDatePicker = () => {
    $('#datepicker').datepicker({
      uiLibrary: 'bootstrap4'
    });
  };

  // Show Current Date on navbar
  const getCurrentDate = () => {
    $('#current-date').html(dateFns.format(new Date(), 'D MMMM YYYY'));
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
    let completedClass = '';

    let checked = '';
    if (completed == 'true') {
      completedClass = 'completed';
      checked = 'checked';
    }

    return `
        <div class="row justify-content-md-center" id="todo_task-result-${id}">
            <div class="col col-lg-11">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="input-group-text ${priority}">
                            <input type="checkbox" id="checkbox-${id}" title="Mark as completed" ${checked}>
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
      $(`#edit-${todo.id}`).on('click', function () {
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
          putDataServer(todo.id, {
            "completed": "true"
          });
          getDataServer();
        } else {
          putDataServer(todo.id, {
            "completed": "false"
          });
          getDataServer();
        }
      });
    });
  };

  // Add data to localstorage
  const addData = event => {
    event.preventDefault();

    const todo = {
      todo_task: $('#todo_task').val(),
      priority: $('#priority').val(),
      completed: 'false',
      due_date: $('#datepicker').val()
    };

    console.log('add data = ', todo)
    postDataServer(todo);
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
  const putDataServer = (id, data) => {
    fetch(`${url}/${id}`, {
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

  const searchByKeyword = () => {
    const keyword = $('#search').val();
    const keywordLowercase = keyword.toLowerCase();

    fetch(`${url}/search/?q=${keywordLowercase}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrer: 'no-referrer'
      })
      .then(response => response.json())
      .then(data => {
        getDataServer();
      });
  };

  // Event Listener
  $('#task-form').on('submit', addData);
  $('#search').keyup(function () {
    searchByKeyword();
  })

  // Calling Function
  getDatePicker();
  getCurrentDate();
  checkInput();

  getDataServer();
});