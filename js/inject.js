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
        '                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMQSURBVFhHxdi3ixVRGMbha84JzIJZMSDYmf4GC8VQaGFjqBRc0EIwFxZaCdqIiIiVoIUYUcyYQMWcMCsqmBVUDL933YHh8J1z5+wEX3jYvbtzZr7LzJz5ztQqTBfMxRYcwBHsxmIMxX9LZ6zHV/zx+IVdGIBKMxYPYRVleYmJqCRT8AFWISEaMxKlRsV9hFVAFlfQEqVkMnzFvcdK6AuMx3w8gLXtLBSeUHEX0AduuuES3O33o9CEijsLFeKLbiZ3zDe0QCHJU1ySp3DH9kbuqLgn+AH3AFmLUy7DHT8IuaI7ree/XxujbzwdxxBTXHt8gVtgO5SWNk0/s2Qh3OJuIXfGQVPFqiYLMAox0Q1iTegb0Ky0hgoJPcKuYRrqZQSewx3/HcMQHQ3Swd0d+uyA7zoajmewxm1CdCbhLawdhmyHG31RX3HnoZsmKqF5rh6dLl0WSVScNefJXfRFVELFabZXH7cEDTiE30hv8wpJ1JiGiuuPqISKO4eBcDMVb6Bt9AVmQBkCTejufuQOCi3uBDrCl65Qx9Kr8VOtNhiPYe3rNvohKqF+7iRUnB7ky6C7+jgmwIrmxUew9qXJOPqaq1dcJyhzkP6fnsXroOmjLdQVr8ZnpLdLqDir/QomVNwpJMUpmj6s7bK4iejiRsO3hjgNrc7S0Z1rbVvPdUS3UVqz3oe1wzPQ/92oGdgLa4zPYfRAdNbC2qFaJt2RvuhGWY5PsMYn9ARailaIjk6d1YvpkZO1n1NPqFN+EPeggm5gD+Yh637MzIRb3DsU0m4Xka1wC1yDrNF0ol6we+OnErIPboGabrJExb2AxvzERWzDZqxArlOb5CjcArO8H1FxVrMpug4LexG0E+4BFiGUyopT9H7OPYjaed/p0YReWXGK2iC9n3MPpnXqGCRRl6u1iN6vuNtKKcUlsU6zqPlUI6m3TaHJuNTiFO38NayD11N6cUnUz/lOn4/eWEX3c3miu/MqrGLStBDaiOjVVxHR+5bZ0HM1/eJb16M6Hq34m7WoLiNqqdRYajXWQX+oNrXaXx7wC/cUsLYcAAAAAElFTkSuQmCC">' +
        '            </a>' +
        '            <span class="tooltiptext">это ссылка</span>   '+
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