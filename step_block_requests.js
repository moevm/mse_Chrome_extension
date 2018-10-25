function getStepSolutionMap(lesson_id, step_index){
    let access_token = getAccessToken();
    let step_id = getStepId(lesson_id,step_index,access_token);
    let solution_list = getSolutionList(step_id,access_token);
    let solution_map = new Map();
    solution_list.forEach(function(item,i,arr) {
        solution_map.set(item.time, [item.id, item.status]);
    });
    return solution_map;
}