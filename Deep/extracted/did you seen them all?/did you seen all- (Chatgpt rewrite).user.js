// ==UserScript==
// @name        did you seen all? (Chatgpt rewrite)
// @namespace   BLZ.Ekasportal.utils.iss
// @match       https://aryion.com/iss/*
// @version     0.1
// @description Take over EkasPortal
// @grant GM_setValue
// @grant GM_getValue
// @author      Blazzycrafter
// @author      ChatGpt version Dec 15
// @icon        https://www.google.com/s2/favicons?sz=64&domain=aryion.com
// @require https://userscripts-mirror.org/scripts/source/107941.user.js
// ==/UserScript==


const DEBUG = true

function Dlog(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}


function getParams(url) {
  // find the position of the '?' character
  const queryStringStart = url.indexOf('?');

  // extract the query string (everything after the '?' character)
  const queryString = url.substring(queryStringStart + 1);

  // split the query string into an array of key-value pairs
  const keyValuePairs = queryString.split('&');

  // create an object to store the extracted values
  const urlParams = {};

  // iterate over the key-value pairs
  for (const pair of keyValuePairs) {
    // split the pair into a key and a value
    const [key, value] = pair.split('=');

    // store the key-value pair in the urlParams object
    urlParams[key] = value;
  }

  return urlParams;
}




function injectCss() {
    let styleString1 = ".seen {background: greenyellow;}"
    const style1 = document.createElement('style');
    style1.textContent = styleString1;
    document.head.append(style1);
    let styleString2 = ".unseen {background: red;}"
    const style2 = document.createElement('style');
    style2.textContent = styleString2;
    document.head.append(style2);
};

function runPageFunction() {
    // Code for running on page.php goes here...
    var params = getParams(window.location.href);
    var story = params["story"];
    var page = params["page"];
    var nk = story + "_" + page; //newKey
    GM_SuperValue.set (nk, true);

}

function runOverviewFunction() {
    // Code for running on overview.php goes here...
    injectCss();
    const currentUrl = window.location.href;
    const urlParams = getParams(currentUrl);
    // extract the story number from the urlParams object
    const storynumber = urlParams['story'];


    // find all the big elements
    const bigElements = document.querySelectorAll('big');

    // iterate over the big elements
    for (const big of bigElements) {
        // find the parent a element
        const parentLink = big.parentElement;

        // get the href attribute of the parent a element
        const href = parentLink.getAttribute('href');

        // log the href value to the console for debugging purposes
        Dlog(href);


        // get the URL that you want to parse
        const url = href;

        // create a new URLSearchParams object from the URL
        const Params = getParams(url);

        // extract the values of the parameters
        const story = Params['story'];
        const page = Params['page'];

        // log the values to the console for debugging purposes

        var nk = story + "_" + page;

        var val = GM_SuperValue.get(nk, false);

        Dlog(nk, val);

        if (val) {
            big.classList.add('seen');
        } else {
            big.classList.add('unseen');
        }

    }
}







(function() {
    'use strict';

    const currentUrl = window.location.href;
    if (currentUrl.includes('page.php')) {
        runPageFunction();
    } else if (currentUrl.includes('overview.php')) {
        runOverviewFunction();
    }
})();
