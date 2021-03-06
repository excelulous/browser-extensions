const likes = require("../lib/likes")
const tabs = require("./tabs")

module.exports = {
  listenForChanges,
  set
}

function listenForChanges() {
  tabs.onUpdated(onTabsUpdated)
}

function onTabsUpdated() {
  setAsLoading()

  tabs.current((error, tab) => {
    if (error) return console.error(error)
    likes.isLiked(tab.url, set)
  })
}

function set (liked) {
  const path = "./images/heart-icon" + (liked ? "-liked" : "") + ".png";
  const title = liked ? "Click to delete it from your likes" : "Click to add it to your likes"

  chrome.browserAction.setIcon({ path });
  chrome.browserAction.setTitle({ title });
}

function setAsLoading () {
  chrome.browserAction.setIcon({
    path: "./images/heart-icon-loading.png"
  });

  chrome.browserAction.setTitle({
    title: "Please wait..."
  });
}
