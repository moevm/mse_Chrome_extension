function getStepSolutionMap(lesson_id, step_index){
    let access_token = getAccessToken();
    console.log(access_token);
    let step_id = getStepId(lesson_id,step_index,access_token);
    console.log(step_id);
    let solution_list = getSolutionList(step_id,access_token);
    console.log("++");
    console.log(solution_list);
    let solution_map = new Map();
    solution_list.forEach(function(item,i,arr) {
        solution_map.set(item.time, [item.id, item.status]);
    });
    console.log(solution_map);
    return solution_map;
}