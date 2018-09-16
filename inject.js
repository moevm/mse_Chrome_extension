'use strict';

document.addEventListener('click', function () {
    var buttonOnSite = document.querySelector(".comment-widget__header"),
        parent = buttonOnSite.parentElement,
        next = buttonOnSite.nextSibling,
        button = document.createElement("button"),
        text = document.createTextNode("test");

    button.appendChild(text);
    if (next) {
        parent.insertBefore(button, next);
    } else {
        parent.appendChild(button);
    }
});