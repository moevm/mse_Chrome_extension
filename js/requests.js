'use strict';
const base_url = 'https://stepik.org';
const client_id = 'twn1edJgt89eHiteEUXHtDR2XCDXi2ec06UBZMMA';
const client_secret = 'gWJyvnx7rXYOwku5vynQnGYvIOFEel71TXCuP2uxifJABxtwg3o2NueB9rdoZXmHE4ySTfYEKhuVsWFTz6AfXElOz681rNt7GR1IYG6B7ukKi8DHcA0g60VjLzfO6svZ';
const grant_type = 'client_credentials';
var page_num = 1;
var SOLUTION_LIST = [];


var USER_LIST =[];
var Stepp;

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
            Stepp = step_id;
        }
    });
    return step_id;
}



function getSolutionId(step_id, user_id, access_token,page) {
    $.ajaxSetup({async: false});
    $.ajax({
        url: "https://stepik.org/api/submissions?order=desc&page="+page+"&step=" + step_id + "&user=" + user_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {

            USER_LIST = USER_LIST.concat(data.submissions);

            if (page <9 && data.meta.has_next === true)
            {
                page++;
                getSolutionId(step_id, user_id, access_token,page);
            }
        }
    });
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

function getPartSolutionList(step_id, access_token, part) {
    let numPages = part/20;
    SOLUTION_LIST.step_id = step_id;
    $.ajaxSetup({async: false});
    $.ajax({
        url: base_url + "/api/submissions?order=desc&page="+ page_num +"&step=" + step_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            if (SOLUTION_LIST.length === 0)
                SOLUTION_LIST = data.submissions;
            else {
                SOLUTION_LIST = [...SOLUTION_LIST,...data.submissions];

            }
            if (data.meta.has_next === true && numPages !== page_num) {
                page_num++;
                getPartSolutionList(step_id, access_token, part);
            }
        }
    });
    page_num = 1;
}

function getSolutionList(step_id, access_token) {
    SOLUTION_LIST.step_id = step_id;
    $.ajaxSetup({async: false});
    $.ajax({
        url: base_url + "/api/submissions?order=desc&page="+ page_num +"&step=" + step_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            if (SOLUTION_LIST.length === 0)
                SOLUTION_LIST = data.submissions;
            else {
                SOLUTION_LIST = [...SOLUTION_LIST,...data.submissions];

            }
            if (data.meta.has_next === true) {
                page_num++;
                getSolutionList(step_id, access_token);
            }
        }
    });
    page_num = 1;
}
function getSolutionUserList(user_id,step_id, access_token) {
    $.ajaxSetup({async: false});
    $.ajax({
        url: base_url + "/api/submissions?order=desc&page="+ page_num +"&step=" + step_id+ "&user=" + user_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            if (SOLUTION_LIST.length === 0)
                SOLUTION_LIST = data.submissions;
            else {
                SOLUTION_LIST = [...SOLUTION_LIST,...data.submissions];
                // SOLUTION_LIST.concat(data.submissions);
            }
            if (data.meta.has_next === true) {
                page_num++;
                getSolutionList(step_id, access_token);
            }
        }
    });
    page_num = 1;
}

