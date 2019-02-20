$(document).ready(function() {
    
    // Make tweets darker when you mouse over them
    $('.tweets_entry').hover(enterTweet, exitTweet);
        function enterTweet() {
            const $tweet = $(this);
            // Add hover class to all the elements in the greyed heading for the tweet entry (avatar, full name, username).
            $tweet.children('.tweets_header').children().addClass('hover');
            // border around whole thing
            $tweet.addClass('hover');
            // The second div that contains buttons
            $tweet.children('.tweets_buttons').addClass('hover');
        }
        function exitTweet() {
            const $tweet = $(this);
            // Remove hover class to all the elements in the greyed heading for the tweet entry (avatar, full name, username).
            $tweet.children('.tweets_header').children().removeClass('hover');
            // border around whole thing
            $tweet.removeClass('hover');
            // The second div that contains buttons
            $tweet.children('.tweets_buttons').removeClass('hover');
        }
    //----------------------------------------
  });