 function getLastSolutionURL(user_id){
    let solution_id = getSolutionId(STEP_ID, user_id, ACCESS_TOKEN);
    if (solution_id === undefined){
        return null;
    }

    return base_url + "/submissions/" + STEP_ID + "/" + solution_id;

}

function getUserProgress(user_id){
    let user_score = getUserScore(COURSE_ID,user_id,ACCESS_TOKEN);
    return user_score;
}