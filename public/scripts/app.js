$(document).ready(function() {
    function renderTweets(tweets) {
        for (let tweet in tweets) {
            $('#tweets-container').append(createTweetElement(tweets[tweet]));
        }
    }
        
    function createTweetElement(data) {
        let daysSince = function(date) {
            let days = 0; // ** FIX THIS!
            return `${days} days ago`;
        }
        let $article = $('<article>').addClass('tweets_entry');
        // Everything is nested inside the article:
        let $header = $('<div>').addClass('tweets_header');// ** can add .appendTo($article)
        // Elements nested inside the header of the tweet:
        let $avatar = $(`<img src="${data.user.avatars.regular}" alt="${data.user.name} avatar">`); // ** add src after, (.attr = object with src + alt)
        let $fullName = $('<h2>').text(data.user.name);
        let $userName = $('<h3>').text(data.user.handle);
        // Siblings of the header:
        let $content = $('<p>').addClass('tweets_content').text(data.content.text);
        let $date = $('<p>').addClass('tweets_date').text(daysSince(data['created_at']));
        let $buttonContainer = $('<div>').addClass('tweets_buttons');
        // Inside the button container:
        // ** array of button images, loop through it to create the img tags
        let $button1 = $('<img src="https://vanillicon.com/v2/d38210281760fba56ba70f58c0065f7a.svg">');
        let $button2 = $('<img src="https://vanillicon.com/v2/d38210281760fba56ba70f58c0065f7a.svg">');
        let $button3 = $('<img src="https://vanillicon.com/v2/d38210281760fba56ba70f58c0065f7a.svg">');
        let $tweet = $($article)
                    .append($($header)
                        .append($($avatar), $($fullName), $($userName)))
                    .append($($content))
                    .append('<hr>')
                    .append($($date))
                    .append($($buttonContainer).append($($button1), $($button2), $($button3)));
        return $tweet;
    }

    // -------------------------
    // Listen for new tweets being added & submit AJAX POST request
    $('.new-tweet form').on('submit', function (event) {
        event.preventDefault();
        let tweetLength = $('#new-tweet_input').val().length;
        if (tweetLength === 0 || tweetLength > 140) {
            alert('There was a problem with your tweet! Please try again.')
        } else {
            const data = $(this).serialize();
            $.post('/tweets', data)
                // Then refresh the page to show the new tweet
                .then(() => {
                    // Clear the textarea
                    $('#new-tweet_input').val(null);
                    // Add something to clear screen you don't see double?
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

  });

