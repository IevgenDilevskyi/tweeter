/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

  const createTweetElement = function(tweetData) {
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
/*-------TEST for createTweetElement function--------
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }
  
  const $createdTweet = createTweetElement(tweetData);
  console.log($createdTweet);
  
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
    console.log('this', this);
    console.log($serialized);

    $.ajax({ url: "/tweets", data: $serialized, type: 'POST' }) // Ajax request sending serialized data to /tweets URL
    .then(function (result) {
      console.log('Success: ', result);
    });

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


/*{ <article>
            <header>
              <h4> <i class="far fa-meh-blank"></i>Newton </h4>
              <h5>@SirIsaac</h5>
            </header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            </p>
            <footer>
              <div class="date">10 days ago</div>
              <div class="likes"> <i class="fab fa-font-awesome-flag"></i> <i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>
            </footer>
</article> }*/