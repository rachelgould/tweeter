$(document).ready(function() {
    function renderTweets(tweets) {
        // First, delete all children of #tweets-container to prevent duplicates from being rendered
        $('#tweets-container').empty();
        for (let tweet in tweets) {
            $('#tweets-container').prepend(createTweetElement(tweets[tweet]));
        }
    }
        
    function createTweetElement(data) {
        let daysSince = function(date) {
            // Date.now() is in milliseconds, and there are 86400000 milliseconds in a day
            let days = Math.floor((Date.now() - date) / 86400000);
            return `${days} days ago`;
        }
        let $article = $('<article>').addClass('tweets_entry');
        // Everything is nested inside the article:
        let $header = $('<div>').addClass('tweets_header');
        // Elements nested inside the header of the tweet:
        let $avatar = $('<img>').attr('src', data.user.avatars.regular).attr('alt', `${data.user.name} avatar`);
        let $fullName = $('<h2>').text(data.user.name);
        let $userName = $('<h3>').text(data.user.handle);
        // Siblings of the header:
        let $content = $('<p>').addClass('tweets_content').text(data.content.text);
        let $date = $('<p>').addClass('tweets_date').text(daysSince(data['created_at']));
        let $buttonContainer = $('<div>').addClass('tweets_buttons');
        // Inside the button container:
        let buttonUrls = ["https://image.flaticon.com/icons/svg/149/149261.svg", "https://image.flaticon.com/icons/svg/1250/1250694.svg", "https://image.flaticon.com/icons/svg/149/149217.svg"];
        let $tweet = $($article)
                    .append($($header)
                        .append($($avatar), $($fullName), $($userName)))
                    .append($($content))
                    .append('<hr>')
                    .append($($date))
                    .append($($buttonContainer).append($('<img>').attr('src', buttonUrls[2]), $('<img>').attr('src', buttonUrls[1]),$('<img>').attr('src', buttonUrls[0])));
        return $tweet;
    }

    // -------------------------
    // Listen for new tweets being added & submit AJAX POST request
    $('.new-tweet form').on('submit', function (event) {
        event.preventDefault();
        $('.new-tweet_error').slideUp();
        let tweetLength = $('#new-tweet_input').val().length;
        if (tweetLength === 0) {
            $('.new-tweet_error').text('Please write something!').slideDown();
        } else if (tweetLength > 140) {
            $('.new-tweet_error').text('Your tweet is too long! Try again.').slideDown();
        } else {
            const data = $(this).serialize();
            $.post('/tweets', data)
                // Then refresh the page to show the new tweet
                .then(() => {
                    // Clear the textarea
                    $('#new-tweet_input').val(null);
                    loadTweets();
                })
        }
    });

    // -------------------------
    // Load new tweets with AJAX GET request, and pass them into renderTweets()
    function loadTweets() {
        $.get('/tweets')
            .done(function(data) {
                renderTweets(data);
            })
    }
    loadTweets();

    // -------------------------
    // When user presses button to compose tweet, slide down the form.
    $('#nav-bar button').on('click', function(event) {
        $('section.new-tweet').slideToggle(function() {
            $('#new-tweet_input').select();
        });
    })
  });

