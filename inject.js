'use strict';

var HeightBlock = $(".discussions__list").height();
var buttonComm = '<button class = "ButtonComments">test</button>';
function addDate()
{
    HeightBlock = $(".discussions__list").height();
    var children=$('.discussions__list').children();
    $('.discussions__list').children().each(function () {
        if($(this).find('.ButtonComments' ).length == 0)
        {
            $(this).find( ".comment-widget__header" ).after(buttonComm);//insert comments
                                                                        //insert canvas
        }
    });
}


$(window).scroll(function () {
    if (HeightBlock != $(".discussions__list").height())
        addDate();
});

/*
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
        button.addEventListener('click', function () {
            getAccessToken(0);
        });
    });
});*/
// <button class="discussions__load-btn small white expand" data-ember-action="1607">Показать обсуждения (1)</button>ton class="discussions__load-btn small white expand" data-ember-action="1607">Показать обсуждения (1)</button>