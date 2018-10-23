'use strict';

var HeightBlock = $(".discussions__list").height();
var buttonComm = '<button class = "ButtonComments">test</button>';

function getButton(elem) {

    var hrefPrev = elem.find('.ember-link').attr("href");
    var x = '<div class = "button-extensions">' +
        '        <div class = "Prev">' +
        '            <a href = "' + getlastsolutionURL(hrefPrev.slice(7))+'">' +
        '                Check Prev' +
        '            </a>' +
        '        </div>' +
        '        <div class = "progressBar">' +
        '            <div class = "progress-bar">' +
        '                <span></span>' +
        '            </div>' +
        '        </div>' +
        '    </div>';
    elem.find( ".comment-widget__header" ).after(x);//insert comments
}
function getGrafic() {
    var x = '<div class = "grafic-extensions">\n' +
        '        <div>\n' +
        '            <canvas id="Line" width="600" height="400"></canvas>\n' +
        '        </div>\n' +
        '\n' +
        '    </div>';
    return x;
}
function addDate()
{
    HeightBlock = $(".discussions__list").height();
    var children=$('.discussions__list').children();
    $('.discussions__list').children().each(function () {
        if($(this).find('.button-extensions' ).length === 0)
        {

            getButton($(this));                                                            //insert canvas
        }
    });

}
function addStat()
{
    if ($("body").find('#Line').length === 0)
    {
        $(".lesson__footer").after(getGrafic());
        /*Передаём в функцию*/
        getChart(a1, a2);
    }
}

$(window).scroll(function () {
    addStat();
    if (HeightBlock !== $(".discussions__list").height())
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