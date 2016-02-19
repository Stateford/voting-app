$(document).ready(function() {

    var optionCount = 2;

    // submit button click
    $('#submit').click(function() {
        // getting input data
        var question = $('#question').val();
        var option1 = $('#option1').val();
        var option2 = $('option2').val();
        var option3 = $('option3').val();

        // function for posting
        $.post('/newpoll', {
            question: question,
            option: option1,
            option: option2,
            option: option3
        }, function(data) {
            console.log(data);
        });
    });
});
