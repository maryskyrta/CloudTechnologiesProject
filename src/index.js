import 'bootstrap';
import './scss/main.scss';

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