/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function(tweetData) { // Creates new tweet with html structure
    const $tweet = $(`
    <article class="tweet">
      <header>
        <h4> <img src="${tweetData.user.avatars}"> ${tweetData.user.name} </h4>
        <h5> ${tweetData.user.handle} </h5>
      </header>
      <p>${tweetData.content.text}</p>
      <footer>
        <div class="date">${tweetData.created_at}</div>
        <div class="likes"> <i class="fab fa-font-awesome-flag"></i> <i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>
      </footer>
    </article>`);
    return $tweet
  }
/*
  const $createdTweet = createTweetElement(tweetData);  
  $('#tweets').append($createdTweet);
*/

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {   // loops through tweets
      let $result = createTweetElement(tweet) // calls createTweetElement for each tweet
      $('#tweets').append($result);  // takes return value and appends it to the tweets container
    }
  }

  $(".new-tweet form").on("submit", function (event) {
    event.preventDefault(); // Prevent default action
    const $serialized = $( this ).serialize(); //Create jQuery string out of form data (text=....)
    let textLength = $('#tweet-text').val().length;
    if (textLength <= 0) {
      alert('You can\'t send empty tweet')
    } else if (textLength > 140) {
      alert('Your tweet is too long. Make it shorter')
    } else {
        $.ajax({ url: "/tweets", data: $serialized, type: 'POST' }) // Ajax request sending serialized data to /tweets URL
        .then(function (result) {
          $.ajax('/tweets', { method: 'GET' }) // Gets the tweets from /tweets
            .then(function (jsonResponse) {
              // console.log('trying to find',jsonResponse[jsonResponse.length - 1]);
              const $createdTweet = createTweetElement(jsonResponse[jsonResponse.length - 1]); //Creates HTML structured tweet
              // console.log("created", $createdTweet)
              $('#tweets').prepend($createdTweet) // And adds it to the beginning of the page
            });
        });
      }
  })

  const loadtweets = function() { // Requests array of tweet objects and passes them to renderTweets function
    $.ajax('/tweets', { method: 'GET' })
    .then(function (jsonResponse) {
      console.log(jsonResponse);
      renderTweets(jsonResponse);
    });

  }
  loadtweets();

});
