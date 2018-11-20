var ACCESS_TOKEN, STEP_ID, SOLUTION_LIST, SECTION_ID, COURSE_ID, USER_COST;

function getServiceInfo(lesson_id, step_index) {
    return new Promise(function(resolve, reject)
    {
        if (ACCESS_TOKEN = getAccessToken() !== undefined)
            if (STEP_ID = getStepId(lesson_id, step_index, ACCESS_TOKEN) !== undefined)
                if (SOLUTION_LIST = getSolutionList(STEP_ID, ACCESS_TOKEN) !== undefined)
                    if (SECTION_ID = getSectionId(lesson_id, ACCESS_TOKEN) !== undefined)
                        if (COURSE_ID = getCourseId(SECTION_ID, ACCESS_TOKEN) !== undefined)
                            if (USER_COST = getUserCost(COURSE_ID,ACCESS_TOKEN) !== undefined)
                                return resolve(1);
        return reject(100);
    });
}