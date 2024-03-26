function getJQueryCourses() {
    let results = [];
    if (this.pageCategory() === General.pageCategory.detail) {
        const allLinks = document.querySelectorAll("a");
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            if (element.href.indexOf("/course/play_video") > -1) {
                results.push({
                    title: element.innerText,
                    url: element.href,
                    status: $(element).prev().text()
                });
            }
        }
    }
    return results;
}