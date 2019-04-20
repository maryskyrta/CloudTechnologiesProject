import 'bootstrap';
import './scss/main.scss';

<<<<<<< HEAD
    $(document).ready(function(){
        // Activate tooltip
        $('[data-toggle="tooltip"]').tooltip();

        // Select/Deselect checkboxes
        var checkbox = $('table tbody input[type="checkbox"]');
        $("#selectAll").click(function(){
            if(this.checked){
                checkbox.each(function(){
                    this.checked = true;
                });
            } else{
                checkbox.each(function(){
                    this.checked = false;
                });
            }
        });
        checkbox.click(function(){
            if(!this.checked){
                $("#selectAll").prop("checked", false);
            }
        });
    });
=======
console.log('Hello!');
console.log(`The time is ${new Date()}`);

$(document).ready(function () {
    $('#toRegistration').on('click', function () {
        $('#registration').removeAttr("hidden");
        $('#login').attr("hidden", "true");
    });

    $('#toLogin').on('click', function () {
        $('#login').removeAttr("hidden");
        $('#registration').attr("hidden", "true");
    });
});
>>>>>>> e1b2698d607fcb929f999cf86a50f7da93b81fe4
