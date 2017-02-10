//Set text shown on hover over icon
chrome.browserAction.setTitle({
    title:'Push to Telegram'
});

//this is for when the icon is clicked
chrome.browserAction.onClicked.addListener(function(tab){
    shareMessage(tab.index, tab.url, "", tab.id);
});

//Main fuction to share to native Telegram client
function shareMessage(index,url,tagText,tabid) {
var openurl = "tg://msg_url?url="+encodeURIComponent(url)+"&text="+encodeURIComponent(tagText);
var newindex = index+1;
    chrome.tabs.create({'url': openurl, 'active': false, 'index': newindex},  function(tab){
        setTimeout(function(){
            chrome.tabs.remove(tab.id);
            chrome.tabs.update(tabid, {active: true})
        }, 1500);
   });
}

//Since the page is non persistant, add a listener at install time to create the context menu
chrome.runtime.onInstalled.addListener(function() {
    //Create context for page and frame
    chrome.contextMenus.create({
        title: 'Push Page to Telegram',
        id: 'share-page',
        contexts: ["page","frame"],
    });

    //Create context for links
    chrome.contextMenus.create({
        title: 'Push Link to Telegram',
        id: 'share-link',
        contexts: ["link"],
    });

    //Create context for media
    chrome.contextMenus.create({
        title: 'Push Image to Telegram',
        id: 'share-media',
        contexts: ["image"],
    });

    chrome.contextMenus.create({
        title: 'Push Video to Telegram',
        id: 'share-media',
        contexts: ["video"],
    });

    chrome.contextMenus.create({
        title: 'Push Audio to Telegram',
        id: 'share-media',
        contexts: ["audio"],
    });

    //Create context for selected text
    chrome.contextMenus.create({
        title: 'Push Selection to Telegram',
        id: 'share-selection',
        contexts: ["selection"],
    });
});

//onClick listener for each type of context menu
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    switch (info.menuItemId) {
        case "share-page":
            var data = info.pageUrl;
            break;

        case "share-link":
            var data = info.linkUrl;
            console.log(data);
            break;

        case "share-media":
            var data = info.srcUrl;
            break;

        case "share-selection":
            var data = "Quote: \""+info.selectionText+"\"";
            break;
    }
    shareMessage(tab.index, data, "", tab.id);
});
