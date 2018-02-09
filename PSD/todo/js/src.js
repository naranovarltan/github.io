$(document).ready(function() {

    events();

    const todos        = [{
        done: false,
        title: "Прекращать редактирования задачи при клике вне инпута"
    }, {
        done: false,
        title: "Фильтр на ввод srcript`a в input"
    }, {
        done: true,
        title: "Выделение выводимого списка"
    }, {
        done: false,
        title: "Почитать underscore"
    }, {
        done: true,
        title: "Добавить кнопку 'Удалить выполненные'"
    }, {
        done: false,
        title: "Pagination"
    }];

    const countersList = [{
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

    renderTodos();

    function events () {
        $("#addTask").on("click", preAddTask);
        $("#completeTask").on("click", setDoneTask);
        $("#counterList").on("click", "#allCounter", renderAllTodos);
        $("#counterList").on("click", "#uncheckedCounter", renderActiveTodos);
        $("#counterList").on("click", "#checkedCounter", renderCompleteTodos);
        $("#counterList").on("click", ".deleteCheckedTodos", deleteCompleteTodos);
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
    }

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

        const task = {
            done: false,
            title
        };
        todos.push(task);

        $("#newTask").val("");
        renderTodos();
    }

    function preDeleteTask(event) {
        const task = $(event.target);
        const index = parseInt(task.parent().attr("data-index"), 10);
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
        const task = $(event.target);
        if (task.hasClass("textTask")) {
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
            const parentTask = eTarget.parent();
            const index = parseInt(parentTask.attr("data-index"), 10);
            const newTextTask = parentTask.find(".editTask").val();
            todos[index].title = newTextTask;
            renderTodos();
        }
    }

    function saveKeyTask(event) {
        const eTarget = $(event.target);
        if (eTarget.hasClass("editTask")) {
            const index = parseInt(parentTask.attr("data-index"), 10);
            const parentTask = $(event.target).parent();
            const newTextTask = parentTask.find(".editTask").val();
            todos[index].title = newTextTask;
            renderTodos();
        }
    }

    function focusAllCounter() {
        $("#counterList #allCounter").addClass("focusCounter");
    }
    
    function focusActiveCounter() {
        $("#counterList #uncheckedCounter").addClass("focusCounter");
    }

    function focusCompletedCounter() {
        $("#counterList #checkedCounter").addClass("focusCounter");
    }

    function renderAllTodos() {
        renderTodos(todos);
    }

    function renderTodos(todosRender, type) {
        todosRender = todosRender || todos;

        $("#taskList > li").remove();
        todosRender.forEach((task, index) => {
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
        renderCounterList();

        if (type === 'active') {
            return focusActiveCounter();
        } else if (type === 'completed') {
            return focusCompletedCounter();
        }
        focusAllCounter();
        filterTodos();

    }

    function renderActiveTodos() {
        const activeTodos = todos.filter(task => !task.done);
        renderTodos(activeTodos, 'active');
    }

    function renderCompleteTodos() {
        const completedTodos = todos.filter(task => task.done);
        renderTodos(completedTodos, 'completed');

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
    }

    function deleteCompleteTodos(event) {
        event.stopPropagation();
        const completedTodos = [];

        todos.forEach((task, i) => {
            if(task.done){
                completedTodos.push(i);
            }
        });

        completedTodos.reverse().forEach(index => {
            todos.splice(index, 1)
        });
        renderTodos();
    }

});