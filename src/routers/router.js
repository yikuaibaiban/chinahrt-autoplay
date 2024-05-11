let tempCourses = [];

function interceptsXHRCallback(url, response, method, readyState) {
    if (readyState !== 4) return;

    // url: /gp6/lms/stu/course/courseDetail
    if (url.includes("courseDetail")) {
        let canPlaylist = document.getElementById("canPlaylist");
        if (canPlaylist === null) {
            canPlaylist = createCanPlaylist();
        }

        canPlaylist.dispatchEvent(new CustomEvent("clear", {}));
        tempCourses = [];

        const data = JSON.parse(response);
        data.data.course.chapter_list.forEach((chapter) => {
            chapter.section_list.forEach((section) => {
                const courseDetail = new CourseDetail();
                courseDetail.courseId = data.data.courseId;
                courseDetail.sectionId = section.id;
                courseDetail.sectionName = section.name;
                courseDetail.trainplanId = data.data.trainplanId;
                courseDetail.study_status = section.study_status;

                tempCourses.push(courseDetail);
                canPlaylist.dispatchEvent(new CustomEvent("append", {
                    detail: courseDetail
                }));
            })
        });
    }
}

function interceptFetchCallback(url, response, options) {
    response.json().then(data => {
    });
}

function initRouter() {
    interceptsXHR(interceptsXHRCallback);
    interceptFetch(interceptFetchCallback);

    if (currentPageType() === 1) {
        GM_addValueChangeListener("courses", function (name, oldValue, newValue, remote) {
            const element = document.getElementById("canPlaylist");
            if (element) {
                element.dispatchEvent(new CustomEvent("refresh", {}));
            }
        });
    } else if (currentPageType() === 2) {
        playInit();
    }
}