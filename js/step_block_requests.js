function getStepSolutionMap(){
    let solution_map = new Map();
    SOLUTION_LIST.forEach(function(item,i,arr) {
        solution_map.set(item.time, [item.id, item.status]);
    });

    return solution_map;
}