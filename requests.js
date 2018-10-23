'use strict';
const base_url = 'https://stepik.org';
const client_id = 'vjMGH2zVSQnMa2Gv1glZ5TSKKFERP7PzbpTHrGgy';
const client_secret = 'Brtj8jfJF9CQCSr2EGEsJEGQBuyq1H00INuoIftLJsiA9SCk84ppelTpqOp37ho6JKw0qNGMQKrZmwihokdnN9KKU036Ox6tX5Rn5vMj4NpC2jnOgDYYcCWu1ZzIRq7L';
const grant_type = 'client_credentials';
var course_id, user_id = "19656106", lesson_id, step_index, section_id, course_id;
var lastSolutionURL;
var rightSolutions = [];
var wrongSolutions = [];
var userScore, userCost;

var URL = document.location.href; //Отсюда получаем lesson_id и step_index
let ids = URL.split(/[/?]/);
lesson_id = ids[4];
step_index = ids[6];
//строки 12-15 должны быть перенесены в модули для работы со страницей. Соответственно эти параметры должны передаваться извне.

// Получение access_token
export function getAccessToken() {
    let access_token;
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

export function getStepId(lesson_id, step_index,access_token) {
    let step_id;
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

export function getSolutionId(step_id, user_id,access_token) {
    let solution_id;
    $.ajax({
        url: base_url + "/api/submissions?order=desc&page=1&step=" + step_id + "&user=" + user_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            solution_id = data.submissions[0].id;
        }
    });
    return solution_id;
}

export function getSectionId(lesson_id,access_token) {
    let section_id;
    $.ajax({
        url: base_url + "/api/units/?lesson=" + lesson_id,
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

export function getCourseId(section_id,access_token) {
    let course_id;
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

export function getUserScore(course_id, user_id,access_token) {
    let userScore;
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
    return userScore;
}

export function getUserCost(course_id,access_token) {
    let userCost;
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

export function getSolutionList(step_id,access_token){
    let solution_list = [];
    $.ajax({
        url: base_url + "/api/submissions?order=desc&page=1&step=" + step_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            solution_list = data.submissions; //последние 20 решений (пока что так)
        }
    });
    return solution_list;
}


