$(document).ready(function() {

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

    events();

    renderTodos();

    function events () {
        $("#addTask").on("click", preAddTask);
        $("#completeTask").on("click", setDoneTask);
        $("#counterList").on("click", "#allCounter", renderAllTodos);
        $("#counterList").on("click", "#uncheckedCounter", renderActiveTodos);
        $("#counterList").on("click", "#checkedCounter", renderCompleteTodos);
        $("#counterList").on("click", ".deleteCheckedTodos", deleteCompleteTodos);
        $("#pagination").on("click", ".pagin", renderTodosPagination);
        $("#taskList")
            .on("click", ".deleteTask", preDeleteTask)
            .on("click", ".doneTask", preSetDoneTask)
            .on("dblclick", editTask)
            .on("clickout", ".editTask", saveTask)
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

    function preSetDoneTask(event) {
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

    function renderTodos(todosRender, type) {
        todosRender = todosRender || todos;
        //todosRender = todos.slice(0, 5);

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
        filterTodos();
        renderPagination();

        if (type === 'active') {
            return focusActiveCounter();
        } else if (type === 'completed') {
            return focusCompletedCounter();
        }
        
        focusAllCounter();

    }
    
    function renderPagination(todosRender) {

        // 1 -> 0-4 slice(0, 5)
        // 2 -> 5-9 slice(5, 10)
        // 3 -> 9-13 slice(10, 15)
    
        $("#pagination > li").remove();
        const pages = Math.ceil(todos.length / 5)
        for(let i = 1; i <= pages; i++) {
            const li = $(`
                <li data-index=${i}>
                    <a href="#" aria-label="" class="pagin">
                        ${i}
                    </a>
                </li>
            `);
            $("#pagination").append(li);
        }
    }
    
    function renderTodosPagination(event) {
        const page = $(event.target);
        const index = parseInt(page.parent().attr("data-index"), 10);
    }
    
    function renderAllTodos() {
        renderTodos(todos);
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