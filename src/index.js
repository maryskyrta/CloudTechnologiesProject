import 'bootstrap';
import './scss/main.scss';
import $ from 'jquery';


window.jQuery = $;
window.$ = $;
var AWS = require('aws-sdk');
var express = require('express');
var nodemailer = require('nodemailer');

var ddb = new AWS.DynamoDB();
var ddbTable =  process.env.STARTUP_SIGNUP_TABLE;
var snsTopic =  process.env.NEW_SIGNUP_TOPIC;

console.log('Hello!');
console.log(`The time is ${new Date()}`);

$(document).ready(function(){
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
});
