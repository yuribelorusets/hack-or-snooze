"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** Displays submit new story form when submit link clicked */

function displayNewStoryForm() {
  console.debug("displayNewStoryForm");
  $storyForm.show();

  if($favStoryList.is(":visible")){
    $favStoryList.toggle();
    $allStoriesList.toggle();
  }
}

$newStory.on("click", displayNewStoryForm);

/** displays list of favorite stories */

function displayFavorites() {
  populateFavoritesList();
  $favStoryList.show();
  $allStoriesList.hide();

  if($storyForm.is(":visible")){
    $storyForm.toggle();
  }
}

$navFavs.on("click", displayFavorites);

