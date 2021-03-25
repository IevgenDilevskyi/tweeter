/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

{/* <p>${tweetData.content.text}</p> */}
// `<p>${escape(${tweetData.content.text})}</p>

const escape =  function(str) { // Helper function to escape text from user (for XSS). We use it in the createTweetElement function
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function() {

  const createTweetElement = function(tweetData) { // Creates new tweet with html structure
    const readableDate = new Date(tweetData.created_at).toLocaleDateString('en-gb');
    const $tweet = $(`
    <article class="tweet">
      <header>
        <h4> <img src="${tweetData.user.avatars}"> ${tweetData.user.name} </h4>
        <h5> ${tweetData.user.handle} </h5>
      </header>
      <p>${escape(tweetData.content.text)}</p>
      <footer>
        <div class="date">${readableDate}</div>
        <div class="likes"> <i class="fab fa-font-awesome-flag"></i> <i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>
      </footer>
    </article>`);
    return $tweet
  }

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {   // loops through tweets
      let $result = createTweetElement(tweet) // calls createTweetElement for each tweet
      $('#tweets').prepend($result);  // takes return value and prepends it to the tweets container
    }
  }

  $(".new-tweet form").on("submit", function (event) {
    event.preventDefault(); // Prevent default action
    const $serialized = $( this ).serialize(); //Create jQuery string out of form data (text=....)
    let textLength = $('#tweet-text').val().length;
    $("#err").slideUp();
    if (textLength <= 0) {
      const errShort = $(`<p id="err">Error. You can't send empty tweet </p>`);
      $('#length-err-msg').prepend(errShort)
      $("#err").slideDown();

    } else if (textLength > 140) {
      const errLong = $(`<p id="err">Error. Your tweet is too long. Make it shorter </p>`);
      $('#length-err-msg').prepend(errLong)
      $("#err").slideDown();
    } else {
        $.ajax({ url: "/tweets", data: $serialized, type: 'POST' }) // Ajax request sending serialized data to /tweets URL
        .then(function (result) {
          $.ajax('/tweets', { method: 'GET' }) // Gets the tweets from /tweets
            .then(function (jsonResponse) {
              // console.log('trying to find',jsonResponse[jsonResponse.length - 1]);
              const $createdTweet = createTweetElement(jsonResponse[jsonResponse.length - 1]); //Creates HTML structured tweet
              // console.log("created", $createdTweet)
              $('#tweets').prepend($createdTweet) // And adds it to the beginning of the page
              $('#tweet-text').val("")
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
