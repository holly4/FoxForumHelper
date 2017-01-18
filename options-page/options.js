"use strict";

// this is the application code that runs when the popup U/I is shown

$(document).ready(function () {
  const _browser = window.browser ? window.browser : window.chrome;
  
  var settings = {
    logging: true
  };

  function logAll(line) {
    console.log("options.js: " + line);
  }

  function log(line) {
    if (settings && settings.logging) {
      logAll(line);
    }
  }

  // get the state of the settings from the U/I and return them
  function getSettings() {
    settings.cleanComments = $('#cbCleanComments').is(':checked');
    settings.cleanCommentshighlight = $('#cbCleanCommentsHighlight').is(':checked');
    settings.cleanCommentsColor = $('#textcleanCommentsColor').val();
    settings.cleanPage = $('#cbCleanPage').is(':checked');
    settings.disableScrolling = $('#cbDisableScrolling').is(':checked');
    settings.filterUsers = $('#cbFilterUsers').is(':checked');
    settings.logging = $('#cbEnableLogging').is(':checked');
    settings.removeVideo = $('#cbRemoveVideo').is(':checked');
    settings.showFilteredComments = $('#cbShowFilteredComments').is(':checked');
    settings.showFilteredCommentsHighlight = $('#cbShowFilteredHighlight').is(':checked');
    settings.showFilteredCommentsColor = $('#textShowFilteredhighlight').val();
    settings.showLikerAvatars = $('#cbShowLikerAvatars').is(':checked');

    if (settings.cleanCommentsColor) {
      $('#cleanCommentsColorTest').css('background-color', settings.cleanCommentsColor);
    }
    if (settings.showFilteredCommentsColor) {
      $('#showFilteredCommentsColorTest').css('background-color', settings.showFilteredCommentsColor);
    }   

    log("getSettings: " + JSON.stringify(settings));
  }

  // set the settings in the user interface
  function setSettings() {
    log("setSettings: " + JSON.stringify(settings));
    $('#cbCleanComments').prop('checked', settings.cleanComments);
    $('#cbCleanCommentsHighlight').prop('checked', settings.cleanCommentshighlight);
    $('#textcleanCommentsColor').val(settings.cleanCommentsColor);
    $('#cbCleanPage').prop('checked', settings.cleanPage);
    $('#cbDisableScrolling').prop('checked', settings.disableScrolling);
    $('#cbFilterUsers').prop('checked', settings.filterUsers);
    $('#cbEnableLogging').prop('checked', settings.logging);
    $('#cbRemoveVideo').prop('checked', settings.removeVideo);
    $('#cbShowFilteredComments').prop('checked', settings.showFilteredComments);
    $('#cbShowFilteredHighlight').prop('checked', settings.showFilteredCommentsHighlight);
    $('#textShowFilteredhighlight').val(settings.showFilteredCommentsColor);
    $('#cbShowLikerAvatars').prop('checked', settings.showLikerAvatars);

    if (settings.cleanCommentsColor) {
      $('#cleanCommentsColorTest').css('background-color', settings.cleanCommentsColor);
    }
    if (settings.showFilteredCommentsColor) {
      $('#showFilteredCommentsColorTest').css('background-color', settings.showFilteredCommentsColor);
    }   
  }

  // load settings from local storage
  function loadSettings() {
    _browser.runtime.sendMessage(
      GET_SETTINGS_MESSAGE,
      function (_settings) {
        if (arguments.length < 1) {
          logAll("loadSettings: ERROR, " + JSON.stringify(chrome.runtime.lastError));
        } else {
          log("loadSettings: " + JSON.stringify(_settings));
          settings = _settings;
          setSettings();
        }
      });
  }

  // save settings to local storage
  function saveSettings() {
    if (!settings) {
      logAll("Cannot save settings when have none!!!");
    } else {
      getSettings();
      log("saveSettings: " + JSON.stringify(settings));
      var msg = SET_SETTINGS_MESSAGE;
      msg.settings = settings;
      _browser.runtime.sendMessage(msg, function(state){
        if (!state)
          logAll("Failed to save settings.");
        else
          log("Saved settings.");
      });
    }
  }

  $('#btnRestoreDefaults').click(function () {
    var msg = RESTORE_SETTINGS_MESSAGE;
    _browser.runtime.sendMessage(msg, function (state) {
        loadSettings();
    });
  });

  $('#btnHelp').click(function () {
    var manifest = _browser.runtime.getManifest();
    _browser.tabs.create({
      url: "http://hollies.pw/static/ffh/" + manifest.version + "/help/"
    });
  });

  // load settings on startup
  loadSettings();

  // save settings any time a checkbox is changed
  $('input').click(function () {
    saveSettings();
  });
});