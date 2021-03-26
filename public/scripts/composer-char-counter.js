
$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let textLength = $('#tweet-text').val().length; // Count the length of text entered
    let count = 140 - (textLength);
    const counter = $(this).siblings(".bottomLine").find('.counter'); // Traversing DOM up and down
    counter.text(count);
    
    if (count <= 0) { // If users exceed the 140 character limit add class with corresponding CSS properties
      counter.addClass('char-over');
    } else {
      counter.removeClass('char-over');
    }
  });
});