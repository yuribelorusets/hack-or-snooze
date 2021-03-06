"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <i id="fav" class="fa-regular fa-star"></i>
      <i id="unfav" class="fa-solid fa-star" style="display: none"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    const $favBtn = $story.find("#fav");
    const $unfavBtn = $story.find("#unfav");

    // if user is logged in, marks favorited stories on main story list
    if (currentUser){
      for (let i = 0; i < currentUser.favorites.length; i++){
        if (currentUser.favorites[i].storyId === story.storyId){
    
          $favBtn.hide();
          $unfavBtn.show();
        }
      }
    }

    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}


/** Adds a story to the page using data from addStoryForm inputs and pushes it to API */

async function addStoryAndDisplay(evt) {
  evt.preventDefault();

  const title = $("#title-name").val();
  const author = $("#author-name").val();
  const url = $("#url").val();

  const storyData = { title, author, url };

  const newStory = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(newStory);
  $allStoriesList.prepend($story);

  $storyForm.trigger("reset");
  $storyForm.hide();
}

$storyForm.on("submit", addStoryAndDisplay);



