'use strict';


var HeightBlock = $(".discussions__list").height();

/*function getButton(elem_id) {
    if (isCorrectData !== false) {
        var elem = $("#" + elem_id);
        var hrefPrev = elem.find('.ember-link').attr("href");
        var timeElem = elem.find('.comment-widget__date').attr("datetime");
        var dateOfComment = new Date(timeElem);


        var id_check = hrefPrev.slice(7);

        var correctSol = false;
        getLastSolutionURL(id_check);
        var prevSol = USER_LIST;




        let minTime = -9999999999999;
        let idComment = 1;
        for(let i = 0; i < prevSol.length; i++)
        {

            let item = prevSol[i];

            let timeT = item.time;
            let testDate = new Date(timeT.substr(0,4),(timeT.substr(5,2) - 1),timeT.substr(8,2),timeT.substr(11,2),timeT.substr(14,2),timeT.substr(17,2),0);


            testDate.setHours(testDate.getHours() + 3);
            let RaznizaTime = testDate.getTime() - dateOfComment.getTime();
            if((RaznizaTime) < 0 && (RaznizaTime) > minTime)
            {
                idComment = item.id;
                minTime = RaznizaTime;

            }

            if (item.status === "correct") {
                correctSol = true;
            }
        }


        hrefPrev = base_url + "/submissions/" + Stepp + "/" + idComment;

       // hrefPref

        var progress = getUserProgress(id_check);
        if (progress === undefined) {
            return;

        }
        progress = progress / USER_COST * 100;

        if (minTime === -9999999999999) {
            var x = '<div class = "button-extensions extens-def" style="width:210px">' +
                '        <div class = "progressBar" style="margin-left: 10px">' +
                '            <div class = "progress-bar">' +
                '                <span style = "width:' + progress + '%"></span>' +
                '<span class = "progress-num">' + progress.toFixed(2) + '% </span>' +
                '            </div>' +
                '        </div>' +
                '    </div>';
        }
        else {
            let imgLink;
            if (correctSol === true)
             imgLink ="https://image.flaticon.com/icons/svg/128/128384.svg";
                else
             imgLink = "https://image.flaticon.com/icons/svg/151/151882.svg";
            var x = '<div class = "button-extensions extens-def">' +
                '        <div class = "Prev">' +
                '            <a href = "' + hrefPrev + '">' +
                '                <img src="'+imgLink+'">' +
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
}*/
function getGrafic() {
    if (isCorrectData !== false) {
        if (SOLUTION_LIST.length !== 0) {
            var x = '<div class = "grafic-extensions extens-def">\n' +
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
        /*try{

            if (HeightBlock !== $(".discussions__list").height())
                addDate();
        }
        catch(ex)
        {}*/

    }
}

var url = undefined;
var flag_time = 1;
$(document).bind('DOMNodeInserted', function (e) {
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


setInterval(function () {
    chrome.storage.sync.get(['key'], function (result) {

        if (result.key === "off") {
            $(".extens-def").fadeOut(0);
        } else {
            checkPage();
            $(".extens-def").fadeIn(0);
        }
    });
}, 2000)


function insertButtonExt(elem, id_check) {
    var timeElem = elem.find('.comment-widget__date').attr("datetime");
    var dateOfComment = new Date(timeElem);
    getLastSolutionURL(id_check);
    var prevSol = USER_LIST;

    var correctSol = false;
    var hrefPrev;

    let minTime = -9999999999999;
    let idComment = 1;
    for (let i = 0; i < prevSol.length; i++) {
        let item = prevSol[i];
        let timeT = item.time;
        let testDate = new Date(timeT.substr(0, 4), (timeT.substr(5, 2) - 1), timeT.substr(8, 2), timeT.substr(11, 2), timeT.substr(14, 2), timeT.substr(17, 2), 0);
        testDate.setHours(testDate.getHours() + 3);
        let RaznizaTime = testDate.getTime() - dateOfComment.getTime();
        if ((RaznizaTime) < 0 && (RaznizaTime) > minTime) {
            idComment = item.id;
            minTime = RaznizaTime;
        }
        if (item.status === "correct") {
            correctSol = true;
        }
    }
    hrefPrev = base_url + "/submissions/" + Stepp + "/" + idComment;

    // hrefPref

    var progress = getUserProgress(id_check);
    if (progress === undefined) {
        return;
    }
    progress = progress / USER_COST * 100;

    if (minTime === -9999999999999) {
        var x = '<div class = "button-extensions extens-def" style="width:210px">' +
            '        <div class = "progressBar" style="margin-left: 10px">' +
            '            <div class = "progress-bar">' +
            '                <span style = "width:' + progress + '%"></span>' +
            '<span class = "progress-num">' + progress.toFixed(2) + '% </span>' +
            '            </div>' +
            '        </div>' +
            '    </div>';
    } else {
        let imgLink;
        if (correctSol === true)
            imgLink = "https://image.flaticon.com/icons/svg/128/128384.svg";
        else
            imgLink = "https://image.flaticon.com/icons/svg/151/151882.svg";
        var x = '<div class = "button-extensions extens-def">' +
            '        <div class = "Prev">' +
            '            <a href = "' + hrefPrev + '">' +
            '                <img src="' + imgLink + '">' +
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
    console.log("4");
}


var buf = [];
$("body").on("click", ".comment-widget", function () {
    console.log("1");
    $(this).append('<div class ="Prelouder-ext"><div class="windows8">\n' +
        '\t<div class="wBall wBall_1">\n' +
        '\t\t<div class="wInnerBall"></div>\n' +
        '\t</div>\n' +
        '\t<div class="wBall wBall_2">\n' +
        '\t\t<div class="wInnerBall"></div>\n' +
        '\t</div>\n' +
        '\t<div class="wBall wBall_3">\n' +
        '\t\t<div class="wInnerBall"></div>\n' +
        '\t</div>\n' +
        '\t<div class="wBall wBall_4">\n' +
        '\t\t<div class="wInnerBall"></div>\n' +
        '\t</div>\n' +
        '\t<div class="wBall wBall_5">\n' +
        '\t\t<div class="wInnerBall"></div>\n' +
        '\t</div>\n' +
        '</div></div>');

    setTimeout(tryadd, 550, this);

});

function tryadd(x) {
    if ($(x).find(".button-extensions").length == 0) {

        /*Сылки ещё нет*/
        var idUser = ($(x).find('.ember-link').attr("href")).slice(7);//Получение id user
        var idComment = $(x).attr("id");
        if ($.inArray(idComment, buf) == -1) {


            buf.push(idComment);

            insertButtonExt($(x), idUser);

            console.log("5");
            buf.pop();
            $(x).find(".Prelouder-ext").remove();
        }


    }
}


$(document).ready(function () {

    $("body").on("mouseover", ".discussions__comment-widget", function () {

        if ($(this).find(".tooltiptext1").length === 0) {
            $(this).append('<span class="tooltiptext1">Click to get more info</span>');

        }
    });
});









