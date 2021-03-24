/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

  const createTweetElement = function(tweetData) {
    const tweet = $(`
    <article class="tweet">
      <header>
        <h4> ${tweetData.user.avatars} ${tweetData.user.name} </h4>
        <h5> ${tweetData.user.handle} </h5>
      </header>
      <p>${tweetData.content.text}</p>
      <footer>
        <div class="date">${tweetData.created_at}</div>
        <div class="likes"> <i class="fab fa-font-awesome-flag"></i> <i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>
      </footer>
    </article>`);
    return tweet
  }

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

});

// const markup = `
//  <div class="person">
//     <h2>
//         ${person.name}
//     </h2>
//     <p class="location">${person.city}</p>
//     <p class="bio">${person.bio}</p>
//  </div>
// `;

{/* <article>
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
</article> */}