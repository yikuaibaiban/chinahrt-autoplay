class CourseDetail {
    constructor() {
        this.trainplanId = "";
        this.courseId = "";
        this.sectionId = "";
        this.sectionName = "";
        this.study_status = "";
    }

    getUrl() {
        const platformId = RegExp(/platformId=(\d+)/).exec(window.location.href)[1];
        return `https://${window.location.host}/index.html#/v_video?platformId=${platformId}&trainplanId=${this.trainplanId}&courseId=${this.courseId}&sectionId=${this.sectionId}&sectionName=${encodeURI(this.sectionName)}`;
    }
}