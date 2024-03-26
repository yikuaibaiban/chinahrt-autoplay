function addCourse(course) {
    if (!course.title || !course.url) {
        notification("课程添加失败，缺少必要参数。");
        return false;
    }

    let courses = courses();
    if (courseAdded(courses, course.url)) {
        notification("课程已经在播放列表中。")
        return false;
    }
    courses.push({ title: course.title, url: course.url });
    courses(courses);
    return true;
}

function removeCourse(index) {
    let courses = courses();

    if (Number.isNaN(index)) {
        for (let i = courses.length; i >= 0; i--) {
            const element = courses[i];
            // 正则提取 href 中  sectionId courseId trainplanId
            let jsonHref = element.url;
            let jsonSectionId = jsonHref.match(/sectionId=([^&]*)/)[1];
            let jsonCourseId = jsonHref.match(/courseId=([^&]*)/)[1];
            let jsonTrainplanId = jsonHref.match(/trainplanId=([^&]*)/)[1];

            // 正则提取 window.location.href 中  sectionId courseId trainplanId
            let href = window.location.href;
            let sectionId = href.match(/sectionId=([^&]*)/)[1];
            let courseId = href.match(/courseId=([^&]*)/)[1];
            let trainplanId = href.match(/trainplanId=([^&]*)/)[1];

            if (jsonCourseId === courseId && jsonSectionId === sectionId && jsonTrainplanId === trainplanId) {
                courses.splice(i, 1);
            }
        }
    } else {
        courses.splice(index, 1);
    }

    courses(courses);
}

function courseAdded(courses, url) {
    if (courses && Array.isArray(courses)) {
        return courses.findIndex(value => value.url === url) > -1;
    }
    return courses().findIndex(value => value.url === url) > -1;
}

function coursesList(value) {
    if (value) {
        if (!Array.isArray(value)) {
            notification("保存课程数据失败，数据格式异常。");
            return [];
        }
        return General.setValue(coursesKey, value);
    }

    let courses = General.getValue(coursesKey, []);
    if (!Array.isArray(courses)) {
        return [];
    }

    return courses;
}

function appendToCanPlaylist(courses) {
    const box = document.getElementById("canPlaylist");
    if (Array.isArray(courses) && box) {
        for (let i = 0; i < courses.length; i++) {
            let course = courses[i];
            box.dispatchEvent(new CustomEvent("append", { detail: course }));
        }
    }
}