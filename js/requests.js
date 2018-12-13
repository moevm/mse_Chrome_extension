'use strict';
const base_url = 'https://stepik.org';
const client_id = 'twn1edJgt89eHiteEUXHtDR2XCDXi2ec06UBZMMA';
const client_secret = 'gWJyvnx7rXYOwku5vynQnGYvIOFEel71TXCuP2uxifJABxtwg3o2NueB9rdoZXmHE4ySTfYEKhuVsWFTz6AfXElOz681rNt7GR1IYG6B7ukKi8DHcA0g60VjLzfO6svZ';
const grant_type = 'client_credentials';


// Получение access_token
function getAccessToken() {
    var access_token;
    $.ajaxSetup({async: false});
    $.ajax({
        url: base_url + "/oauth2/token/",
        data: {grant_type: grant_type, client_id: client_id, client_secret: client_secret},
        type: "POST",
        dataType: 'json',
        success: function (data) {
            access_token = data.access_token;
        }
    });
    return access_token;
}

function getStepId(lesson_id, step_index, access_token) {
    var step_id;
    $.ajaxSetup({async: false});
    $.ajax({
        url: base_url + "/api/lessons/" + lesson_id,
        type: 'GET',

        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            step_id = data.lessons[0].steps[step_index - 1];
        }
    });
    return step_id;
}

function getSolutionId(step_id, user_id, access_token) {
    var sol_id;
    //$.ajaxSetup({async: false});
    $.ajax({
        url: "https://stepik.org/api/submissions?order=desc&page=1&step=" + step_id + "&user=" + user_id,
        type: 'GET',
        dataType: 'json',
        /* beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", "Bearer " + access_token);
         },*/
        success: function (data) {
            sol_id = data.submissions[0]['id'];
        }
    });
    return sol_id;
}

function getSectionId(lesson_id, access_token) {
    var section_id;
    $.ajaxSetup({async: false});
    $.ajax({
        url: base_url + "/api/units?lesson=" + lesson_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            section_id = data.units[0].section;
        }
    });
    return section_id;
}

function getCourseId(section_id, access_token) {
    var course_id;
    $.ajaxSetup({async: false});
    $.ajax({
        url: base_url + "/api/sections/" + section_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            course_id = data.sections[0].course;
        }
    });
    return course_id;
}

function getUserScore(course_id, user_id, access_token) {
    var userScore;
    $.ajaxSetup({async: false});
    $.ajax({
        url: base_url + "/api/course-grades?course=" + course_id + "&user=" + user_id,
        type: 'GET',
        dataType: 'json',
        /* beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", "Bearer " + access_token);
         },*/
        success: function (data) {
            if (data["course-grades"] != null && data["course-grades"][0] != null) {
                userScore = data["course-grades"][0].score;
            }
        }
    });
    return userScore;
}

function getUserCost(course_id, access_token) {
    var userCost;
    $.ajaxSetup({async: false});
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
    return userCost;
}

function getSolutionList(step_id, access_token) {
    var solution_list = [];
    $.ajaxSetup({async: false});
    $.ajax({
        url: base_url + "/api/submissions?order=desc&page=1&step=" + step_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            solution_list = data.submissions;
            if (data.meta.has_next === true) {
                var has_next = true;
                let i = 2;
                while (has_next) {
                    $.ajaxSetup({async: false});
                    $.ajax({
                        url: base_url + "/api/submissions?order=desc&page=" + i + "&step=" + step_id,
                        type: 'GET',
                        dataType: 'json',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
                        },
                        success: function (data) {
                            if (data.submissions.length > 0) {
                                let date = new Date(data.submissions[data.submissions.length - 1].time).getMonth();
                                alert(date);
                                let now = new Date().getMonth();
                                alert(now);
                                if (date === now && i < 26) {
                                    solution_list.push(data.submissions);
                                    has_next = data.meta.has_next;
                                }
                            }
                        }
                    });
                    i++;
                }
            }
        }
    });
    return solution_list;
}


