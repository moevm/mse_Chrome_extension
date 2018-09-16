'use strict';


document.addEventListener('click', function () {
    let commentHeader = document.getElementsByClassName("comment-widget__header");

    Array.from(commentHeader).forEach(function (item, i, commentHeader) {
        let parent = item.parentElement,
            next = item.nextSibling,
            button = document.createElement("button"),
            text = document.createTextNode("test");

        button.appendChild(text);
        if (next) {
            parent.insertBefore(button, next);
        } else {
            parent.appendChild(button);
        }
    });
});
// <button class="discussions__load-btn small white expand" data-ember-action="1607">Показать обсуждения (1)</button>