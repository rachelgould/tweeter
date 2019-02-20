$(document).ready(function() {
    const data = [
        {
          "user": {
            "name": "Newton",
            "avatars": {
              "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
              "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
              "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
            },
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": {
              "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
              "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
              "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        },
        {
          "user": {
            "name": "Johann von Goethe",
            "avatars": {
              "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
              "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
              "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            "handle": "@johann49"
          },
          "content": {
            "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
          },
          "created_at": 1461113796368
        }
      ];

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
    renderTweets(data);

    // -------------------------
    // Listen for new tweets being added & submit AJAX request
    $('.new-tweet form').on('submit', function (event) {
        event.preventDefault();
        const data = $('.new-tweet form').serialize();
        console.log(data);
        $.post('/tweets', data);
            // .then(() => {
            //     renderTweets()
            // })
    });

  });

