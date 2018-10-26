// import {getAccessToken,getSectionId,getStepId,getSolutionId,getCourseId,getUserCost,getUserScore} from "./requests";

  function getLastSolutionURL(lesson_id, step_index, user_id){
    console.log("---------");
    let access_token = getAccessToken();
    let step_id = getStepId(lesson_id, step_index, access_token);
    let solution_id = getSolutionId(step_id,user_id,access_token);
      console.log(access_token + ' '+step_id + ' ' +solution_id);
    return base_url + "/submissions/" + step_id + "/" + solution_id;

}

function getUserProgress(lesson_id, user_id){
    let access_token = getAccessToken();
    let section_id = getSectionId(lesson_id, access_token);
    let course_id = getCourseId(section_id, access_token);
    let user_score = getUserScore(course_id,user_id,access_token);
    let user_cost = getUserCost(course_id,access_token);
    console.log(access_token+' ' + section_id +' '+course_id + ' '+user_score + ' ' +user_cost);
    return [user_score,user_cost];
}