'use strict';

var HeightBlock = $(".discussions__list").height();


function get_user_id(elem){
    var x = elem.find('.ember-link').attr("href");
    return x.slice(7);
}


function getButton(elem_id) {

    var elem = $("#" + elem_id);
    var hrefPrev = elem.find('.ember-link').attr("href");
    var id_check = hrefPrev.slice(7);
    hrefPrev = getLastSolutionURL(get_lesson_step()[0],get_lesson_step()[1], id_check);


    var progress = getUserProgress(get_lesson_step()[0],id_check);
    console.log(progress);
    if (progress[0] === undefined)
    {
        progress = 0;
    }
    else
    progress = progress[0] / progress[1] * 100;


    var x = '<div class = "button-extensions">' +
        '        <div class = "Prev">' +
        '            <a href = "' + hrefPrev + '">' +
        '                Check Prev' +
        '            </a>' +
        '        </div>' +
        '        <div class = "progressBar">' +
        '            <div class = "progress-bar">' +
        '                <span style = "width:' +progress +'%"></span>' +
                            '<span class = "progress-num">'+progress.toFixed(2)+'% </span>'
        '            </div>' +
        '        </div>' +
        '    </div>';
    elem.find(".comment-widget__header").after(x);//insert comments
}

function getGrafic() {













    var x = '<div class = "grafic-extensions">\n' +
        '        <div>\n' +
        '            <canvas id="Line" width="1022" height="500"></canvas>\n' +
        '        </div>\n' +
        '\n' +
        '    </div>';
    return x;
}

function addDate() {
    HeightBlock = $(".discussions__list").height();
    var children = $('.discussions__list').children();
    $('.discussions__list').children().each(function () {
        if ($(this).find('.button-extensions').length === 0) {
            getButton(this.id)
        }
    });

}

function addStat() {
    if ($("body").find('#Line').length === 0) {
        $(".lesson__footer").after(getGrafic());
        /*Передаём в функцию*/
        getChart(a1, a2);
    }
}
function checkPage()
{
    addStat();
    if (HeightBlock !== $(".discussions__list").height())
        addDate();
}
/*$(window).scroll(function () {
    checkPage();
});

$('body').on("click",".discussions__load-btn",function () {
    checkPage();
});*/

$(document).bind('DOMNodeInserted', function(e) {
    checkPage();
});