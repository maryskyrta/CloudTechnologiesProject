import  'bootstrap';
import './scss/main.scss';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;

console.log('Hello!');
console.log(`The time is ${new Date()}`);


$(document).ready(function(){


    function resetTheAddDeadlineWindow() {
        let content=$(`
<div class="modal fade " id="create_deadline" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog add_deadline" role="document" >
        <div class="modal-content" >
            <div class="modal-body">
                <form >
                    <div class="modal-header">
                        <h5>Add new deadline</h5>
                    </div>
                    <div class="form-group">
                        <label for="new_deadline" class="col-form-label">Name of deadline:</label>
                        <input type="text" class="form-control" id="new_deadline" required>
                    </div>
                    <div class="form-group">
                        <label for="deadline-description" class="col-form-label">Description of deadline:</label>
                        <textarea class="form-control" id="deadline-description" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="deadline-time" class="col-form-label">Final date:</label>
                        <label>
                            <input type="datetime-local" id="deadline-time" required class="date_of_deadline" >
                        </label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="add_deadline_button">OK</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`);

        $("#add_deadline_container").html(content);
    }
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

    $(document).on('show.bs.modal','#create_deadline',function () {
        $('#deadline-time').val(new Date().toJSON().slice(0,19));
        $('#new_deadline').val("Name");
        $('#deadline-description').val("Description");
    });
    // $('#create_deadline').on('show.bs.modal', function () {
    //     $('#deadline-time').val(new Date().toJSON().slice(0,19));
    //     $('#new_deadline').val("Name");
    //     $('#deadline-description').val("Description");
    //
    // });
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
        $('#deadline_table').removeAttr("hidden");
    });

    //change the email
    $(document).on("click", "#change_email_button", function() {
        let mail= $("#new_email").val();
        //check if the mail is correct
        // if(mail.length !==0 && isEmail(mail))
        // {
            $("#current_email").text(mail);
            $('#edit_email').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            resetTheEditWindow();
        //}

    });
    $(document).on("click", "#add_deadline_button", function() {

let time=$("#deadline-time").val().substring(0,10)+" "+$("#deadline-time").val().substring(11);
        let content =$(` <tr>
                            <td>
							<span class="custom-checkbox">
								<input type="checkbox" id="checkbox3" name="options[]" value="1">
								<label for="checkbox3"></label>
							</span>
                            </td>
                            <td>${$("#new_deadline").val()}</td>
                            <td>${$("#deadline-description").val()}</td>
                            <td>${time}</td>
                            <td>
                                <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                            </td>
                        </tr>`);
        $("#deadline_list").append(content);
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        resetTheAddDeadlineWindow();


    });
    //check if the email is correct ,if not--the input field gets the error label
    $(document).on('input', '#new_email', function() {
        let mail= $(this).val();
        if(mail.length ===0 || !isEmail(mail))
        {
            $('#new_email').attr('style', "border-radius: 8px; border:#FF0000 1px solid;");
            $("#error_mail").removeAttr("hidden");
            $("#change_email_button").prop('disabled', true);

        }
        else{
            $('#new_email').attr('style', "border-radius: 5px; border:#6d7fcc 1px solid;");
            $("#error_mail").attr("hidden","true");

            $("#change_email_button").prop('disabled', false);
        }
    });
    $(document).on('input', '#new_deadline', function() {
        let name= $(this).val();
        if(name.length ===0 )
        {
            $('#new_deadline').attr('style', "border-radius: 8px; border:#FF0000 1px solid;");
            $("#error_name").removeAttr("hidden");
            $("#add_deadline_button").prop('disabled', true);
        }
        else{
            $('#new_deadline').attr('style', "border-radius: 5px; border:#6d7fcc 1px solid;");
            $("#error_name").attr("hidden","true");
            if($("#deadline-description").val().length!==0)
            $("#add_deadline_button").prop('disabled', false);
        }
    });
    $(document).on('input', '#deadline-description', function() {
        let name= $(this).val();
        if(name.length ===0 )
        {
            $('#deadline-description').attr('style', "border-radius: 8px; border:#FF0000 1px solid;");
            $("#error_des").removeAttr("hidden");
            $("#add_deadline_button").prop('disabled', true);
        }
        else{
            $('#deadline-description').attr('style', "border-radius: 5px; border:#6d7fcc 1px solid;");
            $("#error_des").attr("hidden","true");
            if($("#new_deadline").val().length!==0)
            $("#add_deadline_button").prop('disabled', false);
        }
    });

});

