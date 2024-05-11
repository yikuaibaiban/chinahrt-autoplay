function addCourse(course) {
    let courses = coursesList();
    if (courseAdded(course.sectionId)) {
        notification(`课程 ${course.sectionName} 已经在播放列表中。`);
        return false;
    }
    courses.push({...course, url: course.getUrl()});
    coursesList(courses);
    return true;
}

function removeCourse(sectionId) {
    let courses = coursesList();

    for (let i = courses.length - 1; i >= 0; i--) {
        if (courses[i].sectionId !== sectionId) {
            continue;
        }
        courses.splice(i, 1);
    }

    coursesList(courses);
}

function courseAdded(sectionId) {
    let courses = coursesList();
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].sectionId === sectionId) {
            return true;
        }
    }
    return false;
}

function coursesList(value) {
    if (value) {
        if (!Array.isArray(value)) {
            notification("保存课程数据失败，数据格式异常。");
            return [];
        }
        return GM_setValue('courses', value);
    }

    let courses = GM_getValue('courses', []);
    if (!Array.isArray(courses)) {
        return [];
    }
    return courses;
}