$(document).ready(function() {
    $('#submit').click(function() {
        
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var confirm = $('#confirm').val();
        
        
        var passwordCheck = function(str, str2) {
            if(str === str2) {
                return true;
            }
            else {
                return false;
            }
        };
        
        if(passwordCheck(password, confirm) && (username == '' || email == '' || password == '' || confirm == '')) {
            alert('incorrect value');
        } else {
            // if entry is valid
            
            $.post('/signup', {
                username: username,
                email: email,
                password: password
            }, function(data) {
                console.log(data);
            });
        }
    });
});