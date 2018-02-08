$(function (){
    let $notification = $("#notification"),
          $taskInput = $("#taskInput"),
           $tasksList = $("#tasksList");
     


    let displayNotification = function () {
        if (!$tasksList.children().length) {
            $notification.fadeIn("fast");
        } else {
            $notification.css ("display", "none");
        }
    }

    $("#addTask").on("click", function () {
        if (!$taskInput.val()) {
            return false;
        }

        $tasksList.append ("<li>" + $taskInput.val() + "<button class='delete'>&#10006</button></li>");

        $taskInput.val("");
        displayNotification ();
        $(".tasksCounter").text("Всего:" + $tasksList.children().length);

        $(".delete").on("click", function(){
            let $parent = $(this).parent ();
            $parent.css ("amination", "fadeOut .3s linear");
            $(".tasksCounter").text("Всего:" + $tasksList.children().length);
            setTimeout (function() {
                $parent.remove();
                displayNotification();
            }, 295)
        });
    })

})