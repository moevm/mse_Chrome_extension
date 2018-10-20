'use strict';
const base_url = 'https://stepik.org';
const client_id='vjMGH2zVSQnMa2Gv1glZ5TSKKFERP7PzbpTHrGgy';
const client_secret='Brtj8jfJF9CQCSr2EGEsJEGQBuyq1H00INuoIftLJsiA9SCk84ppelTpqOp37ho6JKw0qNGMQKrZmwihokdnN9KKU036Ox6tX5Rn5vMj4NpC2jnOgDYYcCWu1ZzIRq7L';
const grant_type='client_credentials';
var course_id,user_id = "19656106",lesson_id,step_index,step_id, access_token, solution_id, section_id, course_id;
var lastSolutionURL;
var rightSolutions = [];
var wrongSolutions = [];
var userScore, userCost;

var URL = document.location.href; //Отсюда получаем lesson_id и step_index
let ids = URL.split(/[/?]/);
lesson_id = ids[4];
step_index = ids[6];
// Получение access_token
function getAccessToken(moreSolutions) {
    $.ajax({
        url: base_url + "/oauth2/token/",
        data: {grant_type: grant_type, client_id: client_id, client_secret: client_secret},
        type: "POST",
        dataType: 'json',
        success: function (data) {
            access_token = data.access_token;
            if (moreSolutions == 2){
                getSectionId();
            }
            else
                getStepId(moreSolutions);
            //Где-то здесь парс ответа и сохранение authorization header с access_token
        },
        error: function () {
            alert("getting Access Token failed.")
        }
    });
}
// С этого момента считаем, будто у нас есть access_token
// Имея lesson_id и step_index, выгружаем нужный степ
function getStepId(moreSolutions) {
    $.ajax({
        url: base_url + "/api/lessons/" + lesson_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            step_id = data.lessons[0].steps[step_index - 1];
            getSolutionId(moreSolutions);
            //из parsed_data выгружаем массив всех степов, берем оттуда степ с индексом step_index
            //и присваеваем его переменной step_id
        }
    });
}
/*
*       Парсим user_id конкретного пользователя
*       из его комментария
*       и используем его для выгрузки его последних решений
*/
// Считаем, что получили user_id
function getSolutionId(moreSolutions) {
    $.ajax({
        url: base_url + "/api/submissions?order=desc&page=1&step=" + step_id + "&user=" + user_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            if (moreSolutions == 0){
                for (let i =0; i < data.submissions.length;i++){
                    if (data.submissions[i].status == "correct")
                        rightSolutions.push(data.submissions[i]);
                    else
                        wrongSolutions.push(data.submissions[i]);
                }
            }
            else {
                solution_id = data.submissions[0].id;
                lastSolutionURL = base_url + "/submissions/" + step_id + "/" + solution_id;
                //из parsed_data выгружаем массив всех решений, забираем solution_id для первого элемента
                //данные отсортированы, поэтому первый элемент массива будет являться последним решением юзера
            }
        }
    });
}

function getSectionId(){
    $.ajax({
        url: base_url + "/api/units/?lesson=" + lesson_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            section_id = data.units[0].section;
            getCourseId();
        }
    });
}

function getCourseId(){
    $.ajax({
        url: base_url + "/api/sections/" + section_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            course_id = data.sections[0].course;
            getUserScore();
        }
    });
}

function getUserScore(){
    $.ajax({
        url: base_url + "/api/course-grades?course=" + course_id + "&user=" + user_id,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        },
        success: function (data) {
            userScore = data["course-grades"][0].score;
            getUserCost();
        }
    });
}

function getUserCost(){
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

//Берем последние 20 решений и сортируем их на два массива: удачные и неудачные
function getSolutionsArrays() {
    getAccessToken(0);
}

// Считаем, что получили solution_id
function getLastSolutionURL() {
    getAccessToken(1);
// lastSolutionURL - ссылка на последнее решение автора комментария, ее необходимо только вывести
}

// Получение последних решений (на одну страницу помещается 20 последних решений, пока что выгружаем не более 20 решений
// Считаем, что ссылку на решения автора мы уже получали
function getUserProgress(){
    getAccessToken(2);

}




getLastSolutionURL(); //результат выполнения - в переменной lastSolutionURL
getSolutionsArrays(); //результат выполнения - в переменных rightSolutions и wrongSolutions
getUserProgress(); //результат выполнения - в переменных userScore и userCost