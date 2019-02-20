$(document).ready(function() {
    $('#new-tweet_input').keyup(function() {
        const $charsUsed = $(this).val().length;
        let charsRemaining = 140 - $charsUsed;
        console.log(charsRemaining);
    });
  });