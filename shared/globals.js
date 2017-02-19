"use strict";

const GET_SETTINGS_MESSAGE = {
    action: "get-settings",
    upgrade: false
}

// TODO: make functions so settings can be set here
const SET_SETTINGS_MESSAGE = {
    action: "set-settings",
    settings: {}
}

// TODO: make functions so settings can be set here
const SET_FILTEREES_MESSAGE = {
    action: "set-fiterees",
    enabled: false,
    filteredUsers: []
}

// TODO: make functions so settings can be set here
const RESTORE_SETTINGS_MESSAGE = {
    action: "restore-settings",
}

const SHOW_MESSAGE = {
    action: "show"
}

const APPLY_SETTINGS_MESSAGE = {
    action: "apply-settings",
    settings: {}
}

const STATE_WAITING_FOR_ARTICLE = "waiting for article";
const STATE_WAITING_FOR_COMMENT_STREAM = "waiting for comment stream";

// a setInterval() that takes the interval as the first argument
function ffhSetInterval(a, b) {
    return setInterval(b, a);
}

// TODO: make globals a module
function getUserName() {
    var stream = $("#livefyre_comment_stream");
    var userName = stream.find(".fyre-user-loggedin").text().trim();
    return userName;
}

  // add common div for tools if not present
  function addToolsDiv() {
    if (!$("#ffh-tools").length) {
      $("<div id='ffh-tools' style='float:left;vertical-align:middle;margin-top:-5px' ></div>")
        .insertBefore("#livefyre_comment_stream .fyre-stream-header");
    }
  }