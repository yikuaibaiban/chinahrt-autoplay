function getVueInstance() {
    return document.querySelector("article")?.__vue__;
}

function registerRouterChange() {
    getVueInstance().$router.afterEach((to, from, failure) => {
        if (to.path === "/v_courseDetails") {
            // todo: 课程详情页面
        }
    });
}

function getVueCourses() {
    let results = [];

    let query = getVueInstance()?.$route?.query;

    const chapters = getVueInstance()?._data?.pageData?.course?.chapter_list;
    if (chapters && chapters.length > 0) {
        for (let i = 0; i < chapters.length; i++) {
            const sections = chapters[i]?.section_list;
            if (sections && sections.length > 0) {
                for (let j = 0; j < sections.length; j++) {
                    const section = sections[j];
                    const url = window.location.protocol + "//" + window.location.host + window.location.pathname +
                        "#/v_video?platformId=" + query.platformId + "&trainplanId=" + query.trainplanId + "&courseId=" +
                        query.courseId + "&sectionId=" + section.id;
                    results.push({
                        title: section.name,
                        url,
                        status: section.study_status + "( " + section.studyTimeStr + " )"
                    });
                }
            }
        }
    }

    return results;
}