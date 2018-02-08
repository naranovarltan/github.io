$(document).ready(function() {
    $("#addTask").on("click", preAddTask);
    $("#completeTask").on("click", setDoneTask);
    $("#counterList").on("click", ".showCheckedTodos", renderCheckedTodos);
    $("#counterList").on("click", ".showUncheckedTodos", renderUncheckedTodos);
    $("#counterList").on("click", ".allTodos", renderTodos);
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

    const todos = [],
        countersList = [{
            id: "allCounter",
            name: "Всего задач:",
            type: "warning",
            classB: "allTodos",
            buttonList: "Показать"
        }, {
            id: "uncheckedCounter",
            name: "Невыполнено:",
            type: "info",
            classB: "showUncheckedTodos",
            buttonList: "Показать"
        }, {
            id: "checkedCounter",
            name: "Выполнено:",
            type: "success",
            classB: "showCheckedTodos",
            buttonList: "Показать"
        }];

    function filterTodos() {
        const checkedTodos = [];
        const uncheckedTodos = [];

        todos.forEach(i => {
            if(i.done){
                checkedTodos.push(i);
            } else{
                uncheckedTodos.push(i);
            }
        });

        const checkedCounter = checkedTodos.length,
            uncheckedCounter = uncheckedTodos.length,
            allCounter = todos.length;

        $("#allCounter").find("span").empty();
        $("#allCounter").find("span").append(allCounter);

        $("#checkedCounter").find("span").empty();
        $("#checkedCounter").find("span").append(checkedCounter);

        $("#uncheckedCounter").find("span").empty();
        $("#uncheckedCounter").find("span").append(uncheckedCounter);



    }

    function preAddTask(event) {
        const title = $("#newTask").val();
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

    function renderCheckedTodos() {

        const checkedTodos = [];

        todos.forEach(i => {
            if(i.done){
                checkedTodos.push(i);
            } else{
                false;
            }
        });

        $("#taskList > li").remove();
        checkedTodos.forEach((task, index) => {
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

    function renderUncheckedTodos() {

        const uncheckedTodos = [];

        todos.forEach(i => {
            if(!i.done){
                uncheckedTodos.push(i);
            } else{
                false;
            }
        });

        $("#taskList > li").remove();
        uncheckedTodos.forEach((task, index) => {
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
        console.log(todos, uncheckedTodos);
    }

    function renderCounterList() {
        $("#counterList > div").remove();
        countersList.forEach((counter, id, name, type) => {
            const button = $(`
                <div class="alert col-sm-4 counter alert-${counter.type}" id="${counter.id}" role="alert">
                    ${counter.name} 
                    <span class="${counter.id}"></span>
                    <a class="${counter.classB}">${counter.buttonList}</a>
                </div>
            `);
            $("#counterList").append(button);
        });
        filterTodos();
    }

});

