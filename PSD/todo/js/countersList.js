countersList = [{
    id: "allCounter",
    name: "Всего задач:",
    type: "warning",
    buttonClass: "allTodos",
    buttonText: "Показать",
    addFocus(){
        $("#this.id").addClass("focusCounter");
    },
    deleteFocus(){
        $("#this.id").removeClass("focusCounter");
    },
    asd(){
        console.log(this.id);
    }
}, {
    id: "uncheckedCounter",
    name: "Невыполнено:",
    type: "info",
    buttonClass: "showUncheckedTodos",
    buttonText: "Показать",
    addFocus(){
        $("#this.id").addClass("focusCounter");
    },
    deleteFocus(){
        $("#this.id").removeClass("focusCounter");
    }
}, {
    id: "checkedCounter",
    name: "Выполнено:",
    type: "success",
    buttonClass: "showCheckedTodos",
    buttonText: "Показать",
    addFocus(){
        $("#this.id").addClass("focusCounter");
    },
    deleteFocus(){
        $("#this.id").removeClass("focusCounter");
    }
}];