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

    const courses = coursesList();
    for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        let playlistItem = document.createElement("div");
        playlistItem.className = "playlistItem";
        playlistBox.appendChild(playlistItem);

        let childTitle = document.createElement("p");
        childTitle.innerText = course.sectionName;
        childTitle.title = childTitle.innerText;
        childTitle.className = "child_title";
        playlistItem.appendChild(childTitle);

        let childBtn = document.createElement("button");
        childBtn.innerText = "移除";
        childBtn.type = "button";
        childBtn.className = "child_remove";
        childBtn.onclick = function () {
            if (confirm("确定要删除这个视频任务么？")) {
                removeCourse(course.sectionId);
            }
        };
        playlistItem.appendChild(childBtn);
    }
}

function removePlaylistBox() {
    let playlistBox = document.getElementById("playlistBox");
    if (playlistBox) {
        playlistBox.remove();
    }
}