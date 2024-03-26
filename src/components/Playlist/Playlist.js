function createPlaylistBox() {
    let playlistBox = document.createElement("div");
    playlistBox.id = "playlistBox";
    playlistBox.className = "playlistBox";
    document.body.appendChild(playlistBox);

    let oneClear = document.createElement("button");
    oneClear.innerText = "一键清空";
    oneClear.className = "oneClear";
    oneClear.onclick = function () {
        if (confirm("确定要清空播放列表么？")) {
            coursesList([]);
        }
    };
    playlistBox.appendChild(oneClear);

    let title = document.createElement("div");
    title.innerText = "视频列表";
    title.className = "title";
    playlistBox.appendChild(title);

    const courses = coursesList();
    for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        let childTitle = document.createElement("p");
        childTitle.innerText = course.title;
        childTitle.title = course.title;
        childTitle.className = "child_title";
        playlistBox.appendChild(childTitle);

        let childBtn = document.createElement("button");
        childBtn.innerText = "移除";
        childBtn.type = "button";
        childBtn.setAttribute("data", i);
        childBtn.className = "child_remove";
        childBtn.onclick = function () {
            if (confirm("确定要删除这个视频任务么？")) {
                removeCourse(this.getAttribute("data"));
            }
        };
        playlistBox.appendChild(childBtn);
    }
}