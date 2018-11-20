var ACCESS_TOKEN, STEP_ID, SOLUTION_LIST, SECTION_ID, COURSE_ID, USER_COST;

function getServiceInfo(lesson_id, step_index) {
    return new Promise(function(resolve, reject)
    {
        ACCESS_TOKEN = getAccessToken();
        STEP_ID = getStepId(lesson_id, step_index, ACCESS_TOKEN);
        SOLUTION_LIST = getSolutionList(STEP_ID, ACCESS_TOKEN);
        SECTION_ID = getSectionId(lesson_id, ACCESS_TOKEN);
        COURSE_ID = getCourseId(SECTION_ID, ACCESS_TOKEN);
        USER_COST = getUserCost(COURSE_ID,ACCESS_TOKEN);
        if (ACCESS_TOKEN === undefined || STEP_ID === undefined || SOLUTION_LIST === undefined || SECTION_ID === undefined || COURSE_ID === undefined || USER_COST === undefined)
            return reject(100);
        return resolve(1);
    });
}