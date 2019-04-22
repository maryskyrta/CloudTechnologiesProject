import 'bootstrap';
import './scss/main.scss';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;

console.log('Hello!');
console.log(`The time is ${new Date()}`);

$(document).ready(function(){
    // Email validation
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
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


    $("#edit_mail_button").on('click',function(){
        //reset the input email field
        $('#new_email').attr('style', "border-radius: 5px; border:#6d7fcc 1px solid;");
        $("#error_mail").attr("hidden","true");
        let mail=$("#current_email").text();
        $("#new_email").val(mail);


    });

    function resetTheEditWindow(){
        let content=$(`
<div class="modal fade" id="edit_email" tabindex="-1" role="dialog" aria-labelledby="mailLabel" aria-hidden="true" >
    <div class="modal-dialog " role="document">
        <div class="modal-content">
            <div class=" modal-body">
                <form>
                    <div class="modal-header">
                        <h5 id="mailLabel">Edit your mail</h5>
                    </div>
                    <div class="form-group">
                        <label for="new_email" class="col-form-label">New Email:</label>
                        <input type="email" class="form-control " id="new_email" required>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" id="change_email_button"  class="btn btn-primary">OK</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
`);

        $("#change_email_container").html(content);

    }


    $('#toRegistration').on('click', function () {
        $('#registration').removeAttr("hidden");
        $('#login').attr("hidden", "true");
    });

    $('#toLogin').on('click', function () {
        $('#login').removeAttr("hidden");
        $('#registration').attr("hidden", "true");
    });
    $('#toProfileFromMain').on('click', function () {
        $('.panel').attr("hidden", "true");
        $('#user_info').removeAttr("hidden");


    });
    $('#toMainFromLogin').on('click', function () {
        $('.enter').attr("hidden", "true");
        $('.main').removeAttr("hidden");
        $('#deadline_table').removeAttr("hidden");

    });
 $('#toDeadlineTable').on('click',function(){
     $('.panel').attr("hidden", "true");
     $('#deadline_table').removeAttr("hidden");
});
    $('#toMainFromRegistration').on('click', function () {
        $('.enter').attr("hidden", "true");
        $('.main').removeAttr("hidden");
    });
    //change the email
    $(document).on("click", "#change_email_button", function() {
        let mail= $("#new_email").val();
        //check if the mail is correct
        if(mail.length !==0 && isEmail(mail))
        {
            $("#current_email").text(mail);
            $('#edit_email').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            resetTheEditWindow();
        }

    });
    //check if the email is correct ,if not--the input field gets the error label
    $(document).on('input', '#new_email', function() {
        let mail= $(this).val();
        if(mail.length ===0 || !isEmail(mail))
        {
            $('#new_email').attr('style', "border-radius: 8px; border:#FF0000 1px solid;");
            $("#error_mail").removeAttr("hidden");
        }
        else{
            $('#new_email').attr('style', "border-radius: 5px; border:#6d7fcc 1px solid;");
            $("#error_mail").attr("hidden","true");
        }
    });
});

