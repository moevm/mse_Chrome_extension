 function getLastSolutionURL(user_id){
     USER_LIST = [];
    getSolutionId(STEP_ID, user_id, ACCESS_TOKEN,1);

}

function getUserProgress(user_id){
    let user_score = getUserScore(COURSE_ID,user_id,ACCESS_TOKEN);
    return user_score;
}