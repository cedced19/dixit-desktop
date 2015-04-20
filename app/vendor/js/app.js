$(document).ready(function() {
    var exec = require('child_process').exec;

    $(document).keypress(function(e) {
        if(e.which == 13) {
            if ($('#path').val() === null){
                 $('#path').val(process.cwd());
            } 
            exec($('#command').val(), {cwd: $('#path').val()}, function (error, stdout, stderr) {
                $('#log').show();
                $('#loader').hide();
                
                if (error !== null){
                     $('#log').html(ansi('\033[31m ' + error + ' \033[91m ') + ansi(stdout));
                } else {
                     $('#log').html(ansi(stdout));
                }
            });
            
            $('#log').hide();
            $('#loader').show();

            if ($('#log').html() != ''){
                $('h2').show();
                $('#latest').html($('#log').html());
            }
        }
    });

    $('#path').val((process.platform === "win32") ? process.env.USERPROFILE : process.env.HOME);

});