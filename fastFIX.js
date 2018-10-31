'use strict';

var access_token, lesson_id, step_index, user_id, step_id, solution_id, URL, solution_list, section_id, course_id, userScore, userCost, solution_map = new Map();
function getLastSolutionURL(){
    $.ajax({
        url: base_url + "/oauth2/token/",
        data: {grant_type: grant_type, client_id: client_id, client_secret: client_secret},
        type: "POST",
        dataType: 'json',
        success: function (data) {
            access_token = data.access_token;
            $.ajax({
                url: base_url + "/api/lessons/" + lesson_id,
                type: 'GET',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                },
                success: function (data) {
                    step_id = data.lessons[0].steps[step_index - 1];
                    $.ajax({
                        url: base_url + "/api/submissions?order=desc&page=1&step=" + step_id + "&user=" + user_id,
                        type: 'GET',
                        dataType: 'json',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                        },
                        success: function (data) {
                            solution_id = data.submissions[0].id;
                            URL = "https://stepik.org/submissions/" + step_id + "/" + solution_id;
                        }
                    });
                }
            });
        }
    });

}
function getStepSolutionMap(){
    $.ajax({
        url: base_url + "/oauth2/token/",
        data: {grant_type: grant_type, client_id: client_id, client_secret: client_secret},
        type: "POST",
        dataType: 'json',
        success: function (data) {
            access_token =  data.access_token;
            $.ajax({
                url: base_url + "/api/lessons/" + lesson_id,
                type: 'GET',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                },
                success: function (data) {
                    step_id = data.lessons[0].steps[step_index - 1];
                    $.ajax({
                        url: base_url + "/api/submissions?order=desc&page=1&step=" + step_id,
                        type: 'GET',
                        dataType: 'json',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                        },
                        success: function (data) {
                            solution_list = data.submissions; //последние 20 решений (пока что так)
                            solution_list.forEach(function(item,i,arr) {
                                solution_map.set(item.time, [item.id, item.status]);
                            });
                        }
                    });

                }
            });
        }
    });

}

function getUserProgress(){
    $.ajax({
        url: base_url + "/oauth2/token/",
        data: {grant_type: grant_type, client_id: client_id, client_secret: client_secret},
        type: "POST",
        dataType: 'json',
        success: function (data) {
            access_token =  data.access_token;
            $.ajax({
                url: base_url + "/api/units/?lesson=" + lesson_id,
                type: 'GET',
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                },
                success: function (data) {
                    section_id = data.units[0].section;
                    $.ajax({
                        url: base_url + "/api/sections/" + section_id,
                        type: 'GET',
                        dataType: 'json',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                        },
                        success: function (data) {
                            course_id = data.sections[0].course;
                            $.ajax({
                                url: base_url + "/api/course-grades?course=" + course_id + "&user=" + user_id,
                                type: 'GET',
                                dataType: 'json',
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                                },
                                success: function (data) {
                                    userScore = data["course-grades"][0].score;
                                }
                            });
                            $.ajax({
                                url: base_url + "/api/progresses/78-" + course_id,
                                type: 'GET',
                                dataType: 'json',
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                                },
                                success: function (data) {
                                    userCost = data.progresses[0].cost;
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}


document.addEventListener('click', function () {
    //console.log(getLastSolutionURL(182624,2,19656106));
    lesson_id = 182624; step_index = 2; user_id = 19656106;
    getLastSolutionURL();
    step_id = 514904;
    console.log(URL);
    getSolutionList();
    console.log(solution_list);
    getUserProgress();
    console.log(userScore + ":" + userCost);
});
/*var HeightBlock = $(".discussions__list").height();

function getButton(elem) {

    var hrefPrev = elem.find('.ember-link').attr("href");
    var x = '<div class = "button-extensions">' +
        '        <div class = "Prev">' +
        '            <a href = "' + getLastSolutionURL(hrefPrev.slice(7)) + '">' +
        '                Check Prev' +
        '            </a>' +
        '        </div>' +
        '        <div class = "progressBar">' +
        '            <div class = "progress-bar">' +
        '                <span></span>' +
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

            getButton($(this))  //insert canvas
        }
    });

}

function addStat() {
    if ($("body").find('#Line').length === 0) {
        $(".lesson__footer").after(getGrafic());
        /*Передаём в функцию*/
   /*     getChart(a1, a2);
    }
}
function checkPage()
{
    addStat();
    if (HeightBlock !== $(".discussions__list").height())
        addDate();
}*/
/*$(window).scroll(function () {
    checkPage();
});

$('body').on("click",".discussions__load-btn",function () {
    checkPage();
});*/

/*$(document).bind('DOMNodeInserted', function(e) {
    checkPage();
});*/