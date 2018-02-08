$(document).ready(function() {
    $("#addTask").on("click", preAddTask);
    $("#completeTask").on("click", setDoneTask);
    $("#counterList").on("click", "#allCounter", renderTodos);
    $("#counterList").on("click", "#uncheckedCounter", renderActiveTodos);
    $("#counterList").on("click", "#checkedCounter", renderCompleteTodos);
    $("#counterList").on("click", ".deleteUncheckedTodos", deleteActiveTodos);
    $("#taskList")
        .on("click", ".deleteTask", preDeleteTask)
        .on("click", ".doneTask", preSetPDoneTask)
        .on("dblclick", editTask)
        .on("click", ".saveTask", saveTask)
        .on("keypress", ".editTask", function (event) {
            if (event.keyCode === 13) {
                saveKeyTask(event);
                event.preventDefault();
            }
        });
    $("#newTask").on("keypress", function (event) {
        if (event.keyCode === 13) {
            preAddTask();
            event.preventDefault();
        }
    });

    const      todos = [],
        countersList = [{
            id: "allCounter",
            name: "All Tasks:",
            type: "warning"
        }, {
            id: "uncheckedCounter",
            name: "Active:",
            type: "info"
        }, {
            id: "checkedCounter",
            name: "Completed:",
            type: "success"
        }];

    function filterTodos() {
        const completedTodos = [],
                 activeTodos = [];

        todos.forEach(i => {
            if(i.done){
                completedTodos.push(i);
            } else{
                activeTodos.push(i);
            }
        });

        const checkedCounter = completedTodos.length,
            uncheckedCounter = activeTodos.length,
                  allCounter = todos.length;

        $("#allCounter").find(".allCounter").empty();
        $("#allCounter").find(".allCounter").append(allCounter);

        $("#checkedCounter").find(".checkedCounter").empty();
        $("#checkedCounter").find(".checkedCounter").append(checkedCounter);

        $("#uncheckedCounter").find(".uncheckedCounter").empty();
        $("#uncheckedCounter").find(".uncheckedCounter").append(uncheckedCounter);

    }

    function preAddTask() {
        const title = $("#newTask").val().trim();
        if (!title) {
            return;
        }
        addTask(title);
        $("#newTask").val("");
        renderTodos();
    }

    function addTask(title) {
        const task = {
            done: false,
            title
        };
        todos.push(task);
    }

    function preDeleteTask(event) {
        const task = $(event.target);
        const index = parseInt(task.parent().attr("data-index"), 10);
        deleteTask(index);
    }

    function deleteTask(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    function preSetPDoneTask(event) {
        const task = $(event.target);
        const index = parseInt(task.parent().attr("data-index"), 10);
        setDoneTask(index);
        renderTodos();
    }

    function setDoneTask(index) {
        const task = todos[index];
        task.done = !task.done;
    }

    function editTask() {
        const eTarget = $(event.target);
        if (eTarget.hasClass("textTask")) {
            const task = $(event.target);
            const index = parseInt(task.parent().attr("data-index"), 10);
            const textTask = task.text();
            task.hide();
            const parent = task.parent();
            const editTask = parent.children(".editTask");
            editTask.val(textTask);
            parent.children(".saveTask").show();
            editTask.show();
        }
    }

    function saveTask(event) {
        const eTarget = $(event.target);
        if (eTarget.hasClass("saveTask")) {
            const parentTask = $(event.target).parent();
            const index = parseInt(parentTask.attr("data-index"), 10);
            const newTextTask = parentTask.find(".editTask").val();
            todos[index].title = newTextTask;
            renderTodos();
        }
    }

    function saveKeyTask(event) {
        const eTarget = $(event.target);
        if (eTarget.hasClass("editTask")) {
            const parentTask = $(event.target).parent();
            const index = parseInt(parentTask.attr("data-index"), 10);
            const newTextTask = parentTask.find(".editTask").val();
            todos[index].title = newTextTask;
            renderTodos();
        }
    }

    function renderTodos() {
        $("#taskList > li").remove();
        todos.forEach((task, index) => {
            const li = $(`
                <li data-index=${index}>
                    <span class="${task.done ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked'} doneTask"></span>
                    <span class="textTask ${task.done ? 'done' : ''}">${task.title}</span>
                    <input type="text" class="editTask">
                    <button class="btn btn-info saveTask">save</button>
                    <span class="deleteTask glyphicon glyphicon-trash"></span>
                </li>
            `);
            $("#taskList").append(li);
        });
        filterTodos();
        renderCounterList();
    }

    function renderActiveTodos() {

        const activeTodos = [];

        todos.forEach(i => {
            if(!i.done){
                activeTodos.push(i);
            } else{
                false;
            }
        });

        $("#taskList > li").remove();
        activeTodos.forEach((task, index) => {
            const li = $(`
                <li data-index=${index}>
                    <span class="${task.done ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked'} doneTask"></span>
                    <span class="textTask ${task.done ? 'done' : ''}">${task.title}</span>
                    <input type="text" class="editTask">
                    <button class="btn btn-info saveTask">save</button>
                    <span class="deleteTask glyphicon glyphicon-trash"></span>
                </li>
            `);
            $("#taskList").append(li);
        });
        filterTodos();
    }

    function renderCompleteTodos() {

        const completedTodos = [];

        todos.forEach(i => {
            if(i.done){
                completedTodos.push(i);
            } else{
                false;
            }

        $("#taskList > li").remove();
            completedTodos.forEach((task, index) => {
            const li = $(`
                <li data-index=${index}>
                    <span class="${task.done ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked'} doneTask"></span>
                    <span class="textTask ${task.done ? 'done' : ''}">${task.title}</span>
                    <input type="text" class="editTask">
                    <button class="btn btn-info saveTask">save</button>
                    <span class="deleteTask glyphicon glyphicon-trash"></span>
                </li>
            `);
            $("#taskList").append(li);
        });

        });
    }

    function renderCounterList() {
        $("#counterList > div").remove();
        countersList.forEach((counter) => {
            const button = $(`
                <div class="alert col-sm-4 counter alert-${counter.type}" id="${counter.id}" role="alert">
                    <span>${counter.name}</span>
                    <span class="${counter.id}"></span>
                    <span class="${counter.id == 'checkedCounter' ? 'deleteCheckedTodos glyphicon glyphicon-trash' : ''}"></span>
                </div>
            `);
            $("#counterList").append(button);
        });
        filterTodos();
    }

    function deleteActiveTodos() {
        const activeTodos = [];

        todos.forEach(i => {
            if(!i.done){
                activeTodos.push(i);
            }
        });

        activeTodos.splice(0, activeTodos.length);
        console.log(activeTodos, activeTodos.length);
        renderTodos();

    }

});

