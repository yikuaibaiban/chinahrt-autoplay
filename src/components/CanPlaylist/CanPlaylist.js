function createCanPlaylist() {
    let playlist = document.createElement("div");
    playlist.id = "canPlaylist";
    playlist.className = "canPlaylist";

    let oneClick = document.createElement("button");
    oneClick.innerText = "一键添加";
    oneClick.type = "button";
    oneClick.className = "oneClick";
    oneClick.onclick = function () {
        const items = playlist.getElementsByClassName("item");
        for (let item of items) {
            const buttons = item.getElementsByTagName("button");
            for (let button of buttons) {
                if (button.disabled) {
                    continue;
                }
                button.click();
            }
        }
    }
    playlist.appendChild(oneClick);

    // 注册清空播放列表事件
    playlist.addEventListener("clear", function () {
        while (playlist.firstChild) {
            playlist.removeChild(playlist.firstChild);
        }
    });

    // 注册添加列表事件
    playlist.addEventListener("append", function (data) {
        let child = document.createElement("div");
        child.className = "item";
        this.appendChild(child);

        let title = document.createElement("p");
        title.innerText = data.detail.title;
        title.title = data.detail.title;
        title.className = "title";
        child.appendChild(title);

        let status = document.createElement("p");
        status.innerText = data.detail.status;
        status.title = data.detail.status;
        status.className = "status";
        child.appendChild(status);

        let added = courseAdded(undefined, data.detail.url);
        let addBtn = document.createElement("button");
        addBtn.innerText = added ? "已在列表中" : "添加到播放列表";
        addBtn.type = "button";
        addBtn.disabled = added;
        addBtn.className = added ? "addBtn disable" : "addBtn";
        addBtn.onclick = function () {
            if (addCourse(data.detail)) {
                this.setAttribute("disabled", true);
                this.setAttribute("class", "addBtn disable");
                this.innerText = "已在列表中";
            }
        };
        child.appendChild(addBtn);
    });

    document.body.append(playlist);
    return playlist;
}