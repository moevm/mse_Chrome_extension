'use strict';
document.cookie = "flag=0";
var HeightBlock = $(".discussions__list").height();

function getButton(elem_id) {
    if (isCorrectData !== false) {
        var elem = $("#" + elem_id);
        var hrefPrev = elem.find('.ember-link').attr("href");
        var id_check = hrefPrev.slice(7);
        hrefPrev = getLastSolutionURL(id_check);
        var progress = getUserProgress(id_check);
        if (progress === undefined) {
            return;

        }
        progress = progress / USER_COST * 100;

        if (hrefPrev === null) {
            var x = '<div class = "button-extensions" style="width:200px">' +
                '        <div class = "progressBar">' +
                '            <div class = "progress-bar">' +
                '                <span style = "width:' + progress + '%"></span>' +
                '<span class = "progress-num">' + progress.toFixed(2) + '% </span>' +
                '            </div>' +
                '        </div>' +
                '    </div>';
        }
        else {
            var x = '<div class = "button-extensions">' +
                '        <div class = "Prev">' +
                '            <a href = "' + hrefPrev + '">' +
                '                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMQSURBVFhHxdi3ixVRGMbha84JzIJZMSDYmf4GC8VQaGFjqBRc0EIwFxZaCdqIiIiVoIUYUcyYQMWcMCsqmBVUDL933YHh8J1z5+wEX3jYvbtzZr7LzJz5ztQqTBfMxRYcwBHsxmIMxX9LZ6zHV/zx+IVdGIBKMxYPYRVleYmJqCRT8AFWISEaMxKlRsV9hFVAFlfQEqVkMnzFvcdK6AuMx3w8gLXtLBSeUHEX0AduuuES3O33o9CEijsLFeKLbiZ3zDe0QCHJU1ySp3DH9kbuqLgn+AH3AFmLUy7DHT8IuaI7ree/XxujbzwdxxBTXHt8gVtgO5SWNk0/s2Qh3OJuIXfGQVPFqiYLMAox0Q1iTegb0Ky0hgoJPcKuYRrqZQSewx3/HcMQHQ3Swd0d+uyA7zoajmewxm1CdCbhLawdhmyHG31RX3HnoZsmKqF5rh6dLl0WSVScNefJXfRFVELFabZXH7cEDTiE30hv8wpJ1JiGiuuPqISKO4eBcDMVb6Bt9AVmQBkCTejufuQOCi3uBDrCl65Qx9Kr8VOtNhiPYe3rNvohKqF+7iRUnB7ky6C7+jgmwIrmxUew9qXJOPqaq1dcJyhzkP6fnsXroOmjLdQVr8ZnpLdLqDir/QomVNwpJMUpmj6s7bK4iejiRsO3hjgNrc7S0Z1rbVvPdUS3UVqz3oe1wzPQ/92oGdgLa4zPYfRAdNbC2qFaJt2RvuhGWY5PsMYn9ARailaIjk6d1YvpkZO1n1NPqFN+EPeggm5gD+Yh637MzIRb3DsU0m4Xka1wC1yDrNF0ol6we+OnErIPboGabrJExb2AxvzERWzDZqxArlOb5CjcArO8H1FxVrMpug4LexG0E+4BFiGUyopT9H7OPYjaed/p0YReWXGK2iC9n3MPpnXqGCRRl6u1iN6vuNtKKcUlsU6zqPlUI6m3TaHJuNTiFO38NayD11N6cUnUz/lOn4/eWEX3c3miu/MqrGLStBDaiOjVVxHR+5bZ0HM1/eJb16M6Hq34m7WoLiNqqdRYajXWQX+oNrXaXx7wC/cUsLYcAAAAAElFTkSuQmCC">' +
                '            </a>' +
                '            <span class="tooltiptext">Ссылка на последнее неверное решение перед комментированием</span>   ' +
                '        </div>' +
                '        <div class = "progressBar">' +
                '            <div class = "progress-bar">' +
                '                <span style = "width:' + progress + '%"></span>' +
                '<span class = "progress-num">' + progress.toFixed(2) + '% </span>' +
            '            </div>' +
            '        </div>' +
            '    </div>';
        }
        elem.find(".comment-widget__header").after(x);//insert comments
    }
}
    function getGrafic() {
        if (isCorrectData !== false) {
            if (SOLUTION_LIST.length !== 0) {
                var x = '<div class = "grafic-extensions">\n' +
                    '        <div>\n' +
                    '            <canvas id="Line" width="1022" height="500"></canvas>\n' +
                    '        </div>\n' +
                    '\n' +
                    '    </div>';
                return x;
            }
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

        if (isCorrectData !== false && $("div").is('.lesson__footer')) {
            if ($("*").is('#Line') === false) {

                $(".lesson__footer").after(getGrafic());
                /*Передаём в функцию*/
                getChart(a1, a2);
            }
        }
    }

    function checkPage() {
        if (isCorrectData !== false) {
            addStat();
            try{

                if (HeightBlock !== $(".discussions__list").height())
                    addDate();
            }
            catch(ex)
            {}

        }
    }

var url = undefined;
var flag_time = 1;
$(document).bind('DOMNodeInserted', function(e) {
    if (flag_time === 1) {
        setTimeout(function () {
            flag_time = 1;
            checkPage();
        }, 1000);
        flag_time = 0;
        if (url !== undefined) {
            var new_url = document.location.href;
            let new_ids = new_url.split(/[/?]/);
            let ids = url.split(/[/?]/);
            if (url !== new_url && new_ids[3] === ids[3]) {
                window.location.reload();
            }
        }
        url = document.location.href;
    }
});