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
    function resetTheDeleteDeadlineWindow() {
        let content=$(`
<div id="delete_deadline" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <form>
                <div class="modal-header">
                    <h4 class="modal-title">Delete deadline</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete these Records?</p>
                    <p class="text-warning"><small>This action cannot be undone.</small></p>
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                    <input type="button" id="delete_deadline_button" class="btn btn-danger" value="Delete">
                </div>
            </form>
        </div>
    </div>
</div></div>
`);

        $("#delete_deadline_container").html(content);
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

    checkbox.click(function(){
        if(!this.checked){
            $("#selectAll").prop("checked", false);
        }
    });


    $("#edit_mail_button").on('click',function(){


            $("#error_mail").attr("hidden",true);
            $('#new_email').attr('style', "border-radius: 5px; border:#6d7fcc 1px solid;");
        let mail=$("#current_email").text();
        $("#new_email").val(mail);


    });
    function parseDateToInput(jsDate){

        var jsDay = jsDate.getDate();
        if (jsDay < 10){jsDay = '0' + jsDay;}
        var jsMonth = jsDate.getMonth()+1;
        if (jsMonth < 10){jsMonth = '0' + jsMonth;}
        var jsYear = jsDate.getFullYear();
        if (jsYear < 10){jsYear = '0' + jsYear;}
        var jsHour = jsDate.getHours();
        if (jsHour < 10){jsHour = '0' + jsHour;}
        var jsMinute = jsDate.getMinutes();
        if (jsMinute < 10){jsMinute = '0' + jsMinute;}

        return jsYear + '-' + jsMonth + '-' + jsDay + 'T' + jsHour + ':' + jsMinute;
    }

    $(document).on('click',".edit",function () {
        let id=$(this).attr('data-id');
        console.log(id);
       let el= $('#deadline-body').find(`tr[data-id='${id}']`);
       el.addClass('selected');
        $('#edit_deadline_time').val(parseDateToInput(new Date()));
        $('#edit_deadline_name').val(el.find('.name').text());
        $('#edit_deadline_des').val(el.find('.des').text());
    });
    $(document).on('click',".delete",function () {
        let id=$(this).attr('data-id');
        console.log(id);
        let el= $('#deadline-body').find(`tr[data-id='${id}']`);
        el.addClass('selected');

    });
    function resetTheEditWindow(){
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
                            <label for="new_deadline" class="col-form-label" id="error_name"  hidden><i class="fa fa-exclamation-triangle"></i>Empty field!</label>
                            <input type="text" class="form-control" id="new_deadline" required>
                        </div>
                        <div class="form-group">
                            <label for="deadline-description" class="col-form-label">Description of deadline:</label>
                            <label for="deadline-description" class="col-form-label" id="error_des"  hidden><i class="fa fa-exclamation-triangle"></i>Empty field!</label>
                            <textarea class="form-control" id="deadline-description" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="deadline-time" class="col-form-label">Final date:</label>
                            <label for="deadline-time" class="col-form-label" id="error_date"  hidden><i class="fa fa-exclamation-triangle"></i>Wrong date!</label>
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

        $("#change_email_container").html(content);

    }

    $(document).on('show.bs.modal','#create_deadline',function () {
        $("#error_name").attr("hidden",true);
        $("#error_des").attr("hidden",true);
        $('#new_deadline').attr('style', "border-radius: 5px; border:#6d7fcc 1px solid;");
        $('#deadline-description').attr('style', "border-radius: 5px; border:#6d7fcc 1px solid;");
        $('#deadline-time').val(new Date().toJSON().slice(0,19));
        $('#new_deadline').val("Name");
        $('#deadline-description').val("Description");
        $("#add_deadline_button").prop('disabled', false);
    });
    $(document).on('show.bs.modal','#edit_deadline',function () {
        $("#error_edit_name").attr("hidden",true);
        $("#error_edit_des").attr("hidden",true);
        $('#edit_deadline_name').attr('style', "border-radius: 5px; border:#6d7fcc 1px solid;");
        $('#edit_deadline_des').attr('style', "border-radius: 5px; border:#6d7fcc 1px solid;");
        $("#save_edit_deadline_button").prop('disabled', false);
    });


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


    function resetTheEditDeadlineWindow() {
        let content=$(`
<div id="edit_deadline" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <form>
                <div class="modal-header">
                    <h4 class="modal-title">Edit deadline</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Name of deadline</label>
                        <input type="text" id="edit_deadline_name" class="form-control" required>
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control" id="edit_deadline_des" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Final date</label>
                        <input type="datetime-local" id="edit_deadline_time" class="form-control" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                    <input type="submit" class="btn btn-info" id="save_edit_deadline_button" value="Save">
                </div>
            </form>
        </div>
    </div>
</div>
`);

        $("#edit_deadline_container").html(content);
    }

    $(document).on("click", "#save_edit_deadline_button", function() {

        let id=$('.selected').attr('data-id');
        console.log(id);
        let el= $('#deadline-body').find(`tr[data-id='${id}']`);
        el.find('.time').text(new Date($('#edit_deadline_time').val()).toLocaleString());
       el.find('.name').text( $('#edit_deadline_name').val());
        el.find('.des').text($('#edit_deadline_des').val());
        el.removeClass('selected');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        resetTheEditDeadlineWindow();

    });

    $(document).on("click", "#delete_deadline_button", function() {

        let id=$('.selected').attr('data-id');
        console.log(id);
        $('#deadline-body').children(`tr[data-id='${id}']`).remove();
          $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
         resetTheDeleteDeadlineWindow();
    });

    $('#toMainFromRegistration').on('click', function () {
        $('.enter').attr("hidden", "true");
        $('.main').removeAttr("hidden");
        $('#deadline_table').removeAttr("hidden");
    });

    //change the email
    $(document).on("click", "#change_email_button", function() {
        let mail= $("#new_email").val();
        $("#edit_mail_button").prop('disabled', false);
            $("#current_email").text(mail);
            $('#edit_email').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            resetTheEditWindow();

    });
    $(document).on("click", "#add_deadline_button", function() {

let time=new Date($("#deadline-time").val()).toLocaleString();
let id=$("#deadline-body").children('tr').length;
        let content =$(` <tr data-id=${id}>
                            
                            <td data-id="${id}" class="name" >${$("#new_deadline").val()}</td>
                            <td data-id="${id}" class="des">${$("#deadline-description").val()}</td>
                            <td data-id="${id}" class="time">${time}</td>
                            <td class="btn-group">
                                <button type="button" data-target="#edit_deadline" data-id=${id} class="edit btn btn-light" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></button>
                                <button type="button" data-target="#delete_deadline"  data-id=${id} class="delete btn btn-light" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>
                            </td>
                        </tr >`);
        $("#deadline-body").append(content);
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
    $(document).on('input', '#edit_deadline_name', function() {
        let name= $(this).val();
        if(name.length ===0 )
        {
            $('#edit_deadline_name').attr('style', "border-radius: 8px; border:#FF0000 1px solid;");
            $("#error_edit_name").removeAttr("hidden");
            $("#save_edit_deadline_button").prop('disabled', true);
        }
        else{
            $('#edit_deadline_name').attr('style', "border-radius: 5px; border:#6d7fcc 1px solid;");
            $("#error_edit_name").attr("hidden","true");
            if($("#edit_deadline_des").val().length!==0)
                $("#save_edit_deadline_button").prop('disabled', false);
        }
    });
    $(document).on('input', '#edit_deadline_des', function() {
        let name= $(this).val();
        if(name.length ===0 )
        {
            $('#edit_deadline_des').attr('style', "border-radius: 8px; border:#FF0000 1px solid;");
            $("#error_edit_des").removeAttr("hidden");
            $("#save_edit_deadline_button").prop('disabled', true);
        }
        else{
            $('#edit_deadline_des').attr('style', "border-radius: 5px; border:#6d7fcc 1px solid;");
            $("#error_edit_des").attr("hidden","true");
            if($("#edit_deadline_name").val().length!==0)
                $("#save_edit_deadline_button").prop('disabled', false);
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

