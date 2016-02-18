$(document).ready(function() {
    $('#submit').click(function() {
        
        var username = $('.original').val();
        
        if(username == '') {
            alert('incorrect value');
        } else {
            // if entry is valid
            
            $.post('http://localhost:8080/signup', {
                username = username
            }, function(data) {
                console.log(data);
            });
        }
    });
});