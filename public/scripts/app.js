$(document).ready(function() {
  function renderTweets(tweets) {
    // First, delete all children of #tweets-container to prevent duplicates from being rendered
    $('#tweets-container').empty();
    // Then add the tweets in the database to the DOM in reverse chronological order
    for (let tweet in tweets) {
      $('#tweets-container').prepend(createTweetElement(tweets[tweet]));
    }
  }
  // Create the text shown in the bottom left showing how long ago the tweet was made
  let daysSince = function(date) {
    let msDiff = Date.now() - date;
    let days = Math.floor(msDiff / 86400000);
    if (days === 0) {
      let hours = Math.floor(msDiff / 3600000);
      if (hours === 0) {
        let minutes = Math.floor(msDiff / 60000);
        if (minutes <= 5) {
          return `Posted just now`;
        } else {
          return `${minutes} minutes ago`;
        }
      } else {
        return `${hours} hours ago`;
      }
    } else {
      return `${days} days ago`;
    }
  }
  // Helper function to create the HTML that makes up a tweet entry
  function createTweetElement(data) {
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
  // Listen for new tweets being submitted from the form & create an AJAX POST request
  $('.new-tweet form').on('submit', function (event) {
    event.preventDefault(); // Prevents the page being refreshed
    // Slide up the error text in between tweet submissions
    $('.new-tweet_error').slideUp();
    let tweetLength = $('#new-tweet_input').val().length;
    if (tweetLength === 0) {
      $('.new-tweet_error').text('Please write something!').slideDown();
    } else if (tweetLength > 140) {
      $('.new-tweet_error').text('Your tweet is too long! Try again.').slideDown();
    } else {
      // Reset the tweet length counter if the tweet gets submitted
      $('#new-tweet_counter').text(140);
      const data = $(this).serialize();
      // Make POST request with the tweet
      $.post('/tweets', data)
      // Wait until the new tweet has been posted
      .then(() => {
        // Clear the textarea
        $('#new-tweet_input').val(null);
          // Refresh the page to show the new tweet
          loadTweets();
        })
    }
  });
  // Load new tweets with AJAX GET request, and pass them into renderTweets(), which creates the DOM elements
  function loadTweets() {
    $.get('/tweets')
      // Make DOM elements only once all tweets have been loaded
      .done(function(data) {
        renderTweets(data);
      })
  }
  // When user presses button to compose tweet, slide down the form.
  $('#nav-bar button').on('click', function(event) {
    $('section.new-tweet').slideToggle(function() {
      $('#new-tweet_input').select();
    });
  })

  // Load tweets as soon as the basic DOM is ready
  loadTweets();
});

