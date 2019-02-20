$(document).ready(function() {
    $('#new-tweet_input').keyup(function() {
        let charactersLeft = 140 - $(this).val().length;
        if(charactersLeft >= 0) {
            $('#new-tweet_counter').text(charactersLeft).removeClass('red');
        } else if (charactersLeft < 0) {
            $('#new-tweet_counter').text(charactersLeft).addClass('red');
        }
    });
  });