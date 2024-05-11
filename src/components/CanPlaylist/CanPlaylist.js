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
                if (button.innerText === "从播放列表移除") {
                    continue;
                }
                button.click();
            }
        }
    }
    playlist.appendChild(oneClick);
    playlist.addEventListener("clear", function () {
        let elementsByClassName = playlist.getElementsByClassName(".item");
        for (let i = elementsByClassName.length - 1; i >= 0; i--) {
            elementsByClassName[i].remove();
        }
    });

    playlist.addEventListener("refresh", function () {
        let elements = playlist.getElementsByClassName("item");
        for (let i = elements.length - 1; i >= 0; i--) {
            const element = elements[i];
            const buttonElement = element.getElementsByTagName("button")[0];
            let added = courseAdded(buttonElement.getAttribute("data-sectionId"));
            buttonElement.innerText = added ? "从播放列表移除" : "添加到播放列表";
            buttonElement.className = added ? "addBtn remove" : "addBtn";
        }
    });
    playlist.addEventListener("append", function (data) {
        let child = document.createElement("div");
        child.className = "item";
        this.appendChild(child);

        let title = document.createElement("p");
        title.innerText = data.detail.sectionName;
        title.title = title.innerText;
        title.className = "title";
        child.appendChild(title);

        let status = document.createElement("p");
        status.innerText = data.detail.study_status;
        status.title = status.innerText;
        status.className = "status";
        child.appendChild(status);

        let added = courseAdded(data.detail.sectionId);
        let addBtn = document.createElement("button");
        addBtn.type = "button";
        addBtn.innerText = added ? "从播放列表移除" : "添加到播放列表";
        addBtn.className = added ? "addBtn remove" : "addBtn";
        addBtn.setAttribute("data-sectionId", data.detail.sectionId);
        addBtn.onclick = function () {
            if (this.innerText === "从播放列表移除") {
                removeCourse(data.detail.sectionId);
            } else {
                addCourse(data.detail);
            }
        };
        child.appendChild(addBtn);
    });

    document.body.appendChild(playlist);
    return playlist;
}