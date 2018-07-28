$(function () {
    const taskForm = $("#task-form")
    const resultField = $("#result-field")



    const addDOM = (event) => {
        event.preventDefault()

        const divChild = document.createElement('div')
        $('#result-field').append(`<div class="input-group mb-3" id="task-result">
        <div class="input-group-prepend">
            <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input">
            </div>
        </div>
        <output id="task-output" type="text" class="form-control" aria-label="Task output with checkbox">
    </div>
        `)
    }







    // Event Listener
    taskForm.on("submit", addDOM)


})

