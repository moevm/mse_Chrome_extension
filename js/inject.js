'use strict';

var HeightBlock = $(".discussions__list").height();

function getButton(elem_id) {
    console.log(isCorrectData);
    if (isCorrectData !== false) {
        var elem = $("#" + elem_id);
        var hrefPrev = elem.find('.ember-link').attr("href");
        var id_check = hrefPrev.slice(7);
        hrefPrev = getLastSolutionURL(id_check);
        var progress = getUserProgress(id_check);
        console.log(progress);
        if (progress === undefined) {
            progress = 0;
        }
        else
            console.log("usercost:" + USER_COST);
        progress = progress / USER_COST * 100;


        var x = '<div class = "button-extensions">' +
            '        <div class = "Prev">' +
            '            <a href = "' + hrefPrev + '">' +
            '                Check Prev' +
            '            </a>' +
            '        </div>' +
            '        <div class = "progressBar">' +
            '            <div class = "progress-bar">' +
            '                <span style = "width:' + progress + '%"></span>' +
            '<span class = "progress-num">' + progress.toFixed(2) + '% </span>'
        '            </div>' +
        '        </div>' +
        '    </div>';
        elem.find(".comment-widget__header").after(x);//insert comments
    }
}

function getGrafic() {
    if (isCorrectData !== false) {

        var x = '<div class = "grafic-extensions">\n' +
            '        <div>\n' +
            '            <canvas id="Line" width="1022" height="500"></canvas>\n' +
            '        </div>\n' +
            '\n' +
            '    </div>';
        return x;
    }
}

function addDate() {
    if (isCorrectData !== false) {
        HeightBlock = $(".discussions__list").height();
        var children = $('.discussions__list').children();
        $('.discussions__list').children().each(function () {
            if ($(this).find('.button-extensions').length === 0) {
                getButton(this.id)
            }
        });
    }
}

function addStat() {
    if (isCorrectData !== false) {
        if ($("body").find('#Line').length === 0) {
            $(".lesson__footer").after(getGrafic());
            /*Передаём в функцию*/
            getChart(a1, a2);
        }
    }
}

function checkPage() {
    console.log(isCorrectData);
    if (isCorrectData !== false) {
        addStat();
        if (HeightBlock !== $(".discussions__list").height())
            addDate();
    }
}

/*$(window).scroll(function () {
    checkPage();
});

$('body').on("click",".discussions__load-btn",function () {
    checkPage();
});*/

$(document).bind('DOMNodeInserted', function (e) {
    checkPage();
});