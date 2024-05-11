// ==UserScript==
// @name         chinahrt继续教育；chinahrt全自动刷课；解除系统限制；
// @version      2024.05.11.01
// @license      Apache-2.0
// @namespace    https://github.com/yikuaibaiban/chinahrt
// @description  【❤全自动刷课❤】功能可自由配置，只需将视频添加到播放列表，后续刷课由系统自动完成；使用教程：https://www.cnblogs.com/ykbb/p/16695563.html
// @author       yikuaibaiban
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAArFJREFUWEftlttPE0EUxr+9ddtdYOXSSmmlFFoasSFemmg0qYkIMfGF/9J/wTeN0cSYGBHEBBIoLSIU0VrKpe1eagaySWVmutu+GJPO4+5cfvOdc745wkGl3sI/HEIf4L9ToHrqoHLi4LTRgmm1IAhAMCDgmi4ibEgQhe4SyncOFA9tFMoWaucO9wRJFDAZlpCeUKAq/kA8AY7PHKwWmqic+i8WRRaQTciIj8qeFB0Bjo4dvN9ooOX/7L8OnLshYybaWQouALn5m/XeD3dJ5qcCSEQkrhJcgLfrdabshV8mvtdsPEoEPeV1JzzOqhjSROZ8JsBO2cJa0WQueLFSQ6lqYWpYQT4ZQnSQfzt3g+iwhFw64B/g9VqDm+0uANlNkYB8UkMupnqqkc+qMBgqUAqQOiex5412AHdOJhzAUlqDpvBNIBOXMTtBJyQF0El+ciALgHwfUEUspjTMjrGzPmKIuJ+hlaIA1ksmtg+srhRon7wwE0IuTieoHhTwZJ7+TgGsbDexe2T3DJAdV/E8o1HriTMu3QlR3ymAz4UmSj96A1AkActzOqZH6DD4BtjYM7G5130IYkMynmV0jHHqfXRQxMObPnKg/NvGh81mVyG4HQ1gcVYH22out5oel3Fr0kcVOC3g5cdz2JxH72oVPE1ruDfh7QMPMirCBo3IdMIvRfPi6WUNF2BMl0Aynjii1yAGRIyINZgADRN4tVa/aDiujnfFOg5PbCykNAyp/roPYsPEjn0DkInfflr4tMV+D7xu3P4/eV1GNsFXqWM/sLVv4usuvyK8QGIjEu6m2I+Qu9azIyKt2OoOvyp4EF439w1AJpLmhHjDfoVvUO6GJOHSMZkb86vAngq0L6ieOSA+UalddsWWfZmkA0ERhi4iYkjMUusUqq4AvGLey/8+QF+BP0npcPDdfTv7AAAAAElFTkSuQmCC
// @match        http://*.chinahrt.com/*
// @match        https://*.chinahrt.com/*
// @match        http://*.chinahrt.com.cn/*
// @match        https://*.chinahrt.com.cn/*
// @match        https://*.heb12333.cn/*
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        GM_notification
// ==/UserScript==

(function initStyles() {
    let style = document.createElement("style");
    style.appendChild(document.createTextNode(`.autoPlayBox {    padding: 5px 10px;}.autoPlayBox .title {    color: blue;}.autoPlayBox label {    margin-right: 6px;}.autoPlayBox label input {    margin-left: 4px;}.canPlaylist {    width: 300px;    height: 500px;    position: fixed;    top: 100px;    background: rgba(255, 255, 255, 1);    right: 80px;    border: 1px solid #c1c1c1;    overflow-y: auto;}.canPlaylist .oneClick {    margin: 0 auto;    width: 100%;    border: none;    padding: 6px 0;    background: linear-gradient(180deg, #4BCE31, #4bccf2);    height: 50px;    border-radius: 5px;    color: #FFF;    font-weight: bold;    letter-spacing: 4px;    font-size: 18px;}.canPlaylist .item {    border-bottom: 1px solid #c1c1c1;    padding: 8px;    line-height: 150%;    border-bottom: 1px solid #c1c1c1;    margin-bottom: 3px;}.canPlaylist .item .title {    font-size: 13px;    white-space: nowrap;    overflow: hidden;    text-overflow: ellipsis;}.canPlaylist .item .status {    font-size: 12px;    white-space: nowrap;    overflow: hidden;    text-overflow: ellipsis;    color: #c90000;}.canPlaylist .item .addBtn {    color: #FFF;    background-color: #4bccf2;    border: none;    padding: 5px 10px;    margin-top: 4px;}.canPlaylist .item .addBtn.remove {    background-color: #fd1952;}.dragBox {    padding: 5px 10px;}.dragBox .title {    color: blue;}.dragBox .remark {    font-size: 12px;    color: #fc1818;}.dragBox label {    margin-right: 6px;}.dragBox label input {    margin-left: 4px;}.multiSegmentBox {    position: fixed;    right: 255px;    top: 0;    width: 250px;    height: 280px;    background-color: #FFF;    z-index: 9999;    border: 1px solid #ccc;    font-size: 12px;}.multiSegmentBox .tip {    border-bottom: 1px solid #ccc;    padding: 5px;    font-weight: bold;    color: red;}.multiSegmentBox .item {    font-size: 14px;}.multiSegmentBox label {    margin-right: 3px;}.multiSegmentBox label input {    margin-left: 2px;}.muteBox {    padding: 5px 10px;}.muteBox .title {    color: blue;}.muteBox .remark {    font-size: 12px;    color: #fc1818;}.muteBox label {    margin-right: 6px;}.muteBox label input {    margin-left: 4px;}.controllerBox {    position: fixed;    right: 0;    top: 0;    width: 250px;    height: 280px;    background-color: #FFF;    z-index: 9999;    border: 1px solid #ccc;    overflow-y: auto;    font-size: 12px;}.controllerBox .linksBox {    display: flex;    flex-wrap: wrap;    justify-content: space-between;    height: 30px;    line-height: 30px;    font-weight: bold;    border-bottom: 1px dotted;}.playlistBox {    position: fixed;    right: 0;    top: 290px;    width: 250px;    height: 450px;    background-color: #FFF;    z-index: 9999;    border: 1px solid #ccc;    overflow-y: auto;}.playlistBox .oneClear {    width: 100%;    border: none;    padding: 6px 0;    background: linear-gradient(180deg, #4BCE31, #4bccf2);    height: 50px;    border-radius: 5px;    color: #FFF;    font-weight: bold;    letter-spacing: 4px;    font-size: 18px;    cursor: pointer;    margin-bottom: 5px;}.playlistBox .playlistItem {    display: flex;    justify-content: space-between;    align-items: center;    margin-bottom: 5px;}.playlistBox .playlistItem .child_title {    font-size: 13px;    white-space: nowrap;    overflow: hidden;    text-overflow: ellipsis;    width: 180px;}.playlistBox .playlistItem .child_remove {    color: #FFF;    background-color: #fd1952;    border: none;    padding: 5px 10px;    cursor: pointer;}.speedBox {    padding: 5px 10px;}.speedBox .title {    color: blue;}.speedBox .remark {    font-size: 12px;    color: #fc1818;}.speedBox label {    margin-right: 6px;}.speedBox label input {    margin-left: 4px;}`));
    document.head.appendChild(style);
})();

function autoPlay(value) {
    if (value !== undefined) {
        GM_setValue('autoPlay', value);
        return value;
    }

    return GM_getValue('autoPlay', true);
}

function mute(value) {
    if (value !== undefined) {
        GM_setValue('mute', value);
        return value;
    }

    return GM_getValue('mute', true);
}

function drag(value) {
    if (attrset !== undefined) {
        attrset.ifCanDrag = 1;
    }

    if (value) {
        GM_setValue('drag', value);
        return value;
    }

    return GM_getValue('drag', 5);
}

function speed(value) {
    if (attrset !== undefined) {
        attrset.playbackRate = 1;
    }

    if (value) {
        GM_setValue('speed', value);
        return value;
    }

    return GM_getValue('speed', 1);
}

function playMode(value) {
    if (value !== undefined) {
        GM_setValue('playMode', value);
        return value;
    }

    return GM_getValue('playMode', 'loop');
}
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
function interceptFetch(callback) {
    const originalFetch = window.fetch;
    window.fetch = function (url, options) {
        const result = originalFetch(url, options);
        result.then(res => {
            callback(url, res, options);
        });
        return result;
    }
}

function interceptsXHR(callback) {
    const open = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        this.addEventListener('readystatechange', function () {
            callback(url, this.response, method, this.readyState);
        });
        open.apply(this, arguments);
    };
}
function notification(content) {
    GM_notification({
        text: content,
        title: "Chinahrt自动刷课",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAArFJREFUWEftlttPE0EUxr+9ddtdYOXSSmmlFFoasSFemmg0qYkIMfGF/9J/wTeN0cSYGBHEBBIoLSIU0VrKpe1eagaySWVmutu+GJPO4+5cfvOdc745wkGl3sI/HEIf4L9ToHrqoHLi4LTRgmm1IAhAMCDgmi4ibEgQhe4SyncOFA9tFMoWaucO9wRJFDAZlpCeUKAq/kA8AY7PHKwWmqic+i8WRRaQTciIj8qeFB0Bjo4dvN9ooOX/7L8OnLshYybaWQouALn5m/XeD3dJ5qcCSEQkrhJcgLfrdabshV8mvtdsPEoEPeV1JzzOqhjSROZ8JsBO2cJa0WQueLFSQ6lqYWpYQT4ZQnSQfzt3g+iwhFw64B/g9VqDm+0uANlNkYB8UkMupnqqkc+qMBgqUAqQOiex5412AHdOJhzAUlqDpvBNIBOXMTtBJyQF0El+ciALgHwfUEUspjTMjrGzPmKIuJ+hlaIA1ksmtg+srhRon7wwE0IuTieoHhTwZJ7+TgGsbDexe2T3DJAdV/E8o1HriTMu3QlR3ymAz4UmSj96A1AkActzOqZH6DD4BtjYM7G5130IYkMynmV0jHHqfXRQxMObPnKg/NvGh81mVyG4HQ1gcVYH22out5oel3Fr0kcVOC3g5cdz2JxH72oVPE1ruDfh7QMPMirCBo3IdMIvRfPi6WUNF2BMl0Aynjii1yAGRIyINZgADRN4tVa/aDiujnfFOg5PbCykNAyp/roPYsPEjn0DkInfflr4tMV+D7xu3P4/eV1GNsFXqWM/sLVv4usuvyK8QGIjEu6m2I+Qu9azIyKt2OoOvyp4EF439w1AJpLmhHjDfoVvUO6GJOHSMZkb86vAngq0L6ieOSA+UalddsWWfZmkA0ERhi4iYkjMUusUqq4AvGLey/8+QF+BP0npcPDdfTv7AAAAAElFTkSuQmCC",
    });
}

function currentPageType() {
    if (window.location.pathname === "/videoPlay/playEncrypt") return 2;
    if (window.location.pathname === "/videoPlay/play") return 2;

    const currentPage = RegExp(/#\/(.+)\?/).exec(window.location.href)[1];
    switch (currentPage) {
        case "v_courseDetails":
            return 1;
        default:
            return 0;
    }
}
function createAutoPlayOption() {
    let box = document.createElement('div');
    box.classList.add('autoPlayBox');

    let title = document.createElement('p');
    title.classList.add('title');
    title.innerText = '自动播放';
    box.appendChild(title);

    let options = [
        {text: "是", value: true},
        {text: "否", value: false}
    ]

    options.forEach(option => {
        let label = document.createElement('label');
        label.innerText = option.text;
        box.appendChild(label);
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'autoPlay';
        input.value = option.value;
        input.checked = autoPlay() === option.value;
        input.onclick = function () {
            autoPlay(option.value);
        };
        label.appendChild(input);
    });

    return box;
}
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
function createDragOption() {
    let box = document.createElement('div');
    box.classList.add('dragBox');

    let title = document.createElement('p');
    title.classList.add('title');
    title.innerText = '拖动';
    box.appendChild(title);

    let options = [
        {text: "还原", value: 5},
        {text: "启用", value: 1}
    ]

    options.forEach(option => {
        let label = document.createElement('label');
        label.innerText = option.text;
        box.appendChild(label);
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'drag';
        input.value = option.value;
        input.checked = drag() === option.value;
        input.onclick = function () {
            drag(option.value);
        };
        label.appendChild(input);
    });

    let remark = document.createElement('p');
    remark.classList.add('remark');
    remark.innerText = '注意：慎用此功能，后台可能会检测播放数据。';
    box.appendChild(remark);

    return box;
}
function createMultiSegmentBox() {
    let box = document.createElement("div");
    box.className = "multiSegmentBox";
    document.body.appendChild(box);

    let tip = document.createElement("div");
    tip.innerHTML = "此功能只适用个别地区。无法使用的就不要使用了。<br/>网站会定期上传学习进度非必要别使用此功能。";
    tip.className = "tip";
    box.appendChild(tip);

    let options = [
        {text: "正常", value: 0},
        {text: "二段播放", value: 3, title: "将视频分为二段：开始，结束各播放90秒"},
        {text: "三段播放", value: 1, title: "将视频分为三段：开始，中间，结束各播放90秒"},
        {text: "秒播", value: 2, title: "将视频分为两段:开始，结束各播放一秒"}
    ];

    options.forEach(option => {
        let label = document.createElement('label');
        label.innerText = option.text;
        box.appendChild(label);
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'playMode';
        input.value = option.value;
        input.checked = playMode() === option.value;
        input.onclick = function () {
            playMode(option.value);
        };
        label.appendChild(input);
    });
}

function timeHandler(t) {
    let videoDuration = parseInt(player.getMetaDate().duration);
    if (playMode() === 1) {
        if (videoDuration <= 270) {
            return;
        }
        const videoMiddleStart = (videoDuration / 2) - 45;
        const videoMiddleEnd = (videoDuration / 2) + 45;
        const videoEndStart = videoDuration - 90;
        if (t > 90 && t < videoMiddleStart) {
            player.videoSeek(videoMiddleStart);
            return;
        }
        if (t > videoMiddleEnd && t < videoEndStart) {
            player.videoSeek(videoEndStart);
            return;
        }
        return;
    }
    if (playMode() === 2) {
        if (t > 1 && t < videoDuration - 1) {
            player.videoSeek(videoDuration - 1);
        }
        return;
    }
    if (playMode() === 3) {
        if (videoDuration <= 180) {
            return;
        }
        if (t > 90 && t < videoDuration - 90) {
            player.videoSeek(videoDuration - 90);
        }
    }
}
function createMuteOption() {
    let box = document.createElement('div');
    box.classList.add('muteBox');

    let title = document.createElement('p');
    title.classList.add('title');
    title.innerText = '静音';
    box.appendChild(title);

    let options = [
        {text: "是", value: true},
        {text: "否", value: false}
    ]

    options.forEach(option => {
        let label = document.createElement('label');
        label.innerText = option.text;
        box.appendChild(label);
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'mute';
        input.value = option.value;
        input.checked = mute() === option.value;
        input.onclick = function () {
            mute(option.value);
        };
        label.appendChild(input);
    });

    let remark = document.createElement('p');
    remark.classList.add('remark');
    remark.innerText = '注意：受浏览器策略影响，不静音，视频可能会出现不会自动播放';
    box.appendChild(remark);

    return box;
}
function createControllerBox() {
    let controllerBox = document.createElement("div");
    controllerBox.id = "controllerBox";
    controllerBox.className = "controllerBox"
    document.body.appendChild(controllerBox);

    let linksBox = document.createElement("div");
    linksBox.className = "linksBox";
    controllerBox.appendChild(linksBox);

    const links = [
        {title: "使用教程", link: "https://www.cnblogs.com/ykbb/p/16695563.html"},
        {title: "留言", link: "https://msg.cnblogs.com/send/ykbb"},
        {title: "博客园", link: "https://www.cnblogs.com/ykbb/"},
        {title: "Gitee", link: "https://gitee.com/yikuaibaiban/chinahrt-autoplay/issues"},
        {title: "GitHub", link: "https://github.com/yikuaibaiban/chinahrt-autoplay/issues"},
    ];

    for (const link of links) {
        let a = document.createElement("a");
        a.innerText = link.title;
        a.target = "_blank";
        a.href = link.link;
        linksBox.appendChild(a);
    }

    controllerBox.appendChild(createAutoPlayOption());
    controllerBox.appendChild(createDragOption());
    controllerBox.appendChild(createMuteOption());
    controllerBox.appendChild(createSpeedOption());

    return controllerBox
}

function playerInit() {
    player.changeControlBarShow(true);
    player.changeConfig('config', 'timeScheduleAdjust', drag());
    if (mute()) {
        player.videoMute();
    } else {
        player.videoEscMute();
    }
    player.changePlaybackRate(speed());
    if (autoPlay()) {
        player.videoPlay();
    }
}

function playInit() {
    removePauseBlur();
    createPlaylistBox();
    createControllerBox();
    createMultiSegmentBox();

    GM_addValueChangeListener("courses", function (name, oldValue, newValue, remote) {
        removePlaylistBox();
        createPlaylistBox();
    });

    let checkPlayerTimer = setInterval(function () {
        if (!player) return;
        clearInterval(checkPlayerTimer);
        player.removeListener('ended', endedHandler);
        GM_addValueChangeListener("autoPlay", function (name, oldValue, newValue, remote) {
            if (newValue) {
                player.videoPlay();
            }
        });
        GM_addValueChangeListener("mute", function (name, oldValue, newValue, remote) {
            if (newValue) {
                player.videoMute();
            } else {
                player.videoEscMute();
            }
        });
        GM_addValueChangeListener("drag", function (name, oldValue, newValue, remote) {
            player.changeConfig('config', 'timeScheduleAdjust', newValue);
        });
        GM_addValueChangeListener("speed", function (name, oldValue, newValue, remote) {
            player.changePlaybackRate(newValue);
        });

        playerInit();

        player.addListener('ended', function (event) {
            courseyunRecord();
            player.videoClear();
            $.ajax({
                url: "/videoPlay/takeRecord",
                data: {
                    studyCode: attrset.studyCode,
                    recordUrl: attrset.recordUrl,
                    updateRedisMap: attrset.updateRedisMap,
                    recordId: attrset.recordId,
                    sectionId: attrset.sectionId,
                    signId: attrset.signId,
                    isEnd: true,
                    businessId: attrset.businessId
                },
                dataType: "json",
                type: "post",
                success: function (data) {
                    console.log("提交学习记录", data);
                    removeCourse(attrset.sectionId);
                    let courses = coursesList();
                    if (courses.length === 0) {
                        notification("所有视频已经播放完毕");
                    } else {
                        notification("即将播放下一个视频:" + courses[0].sectionName);
                        window.top.location.href = courses[0].url;
                    }
                }
            });
        });

        player.addListener('time', timeHandler);
    }, 500);
}
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
function createSpeedOption() {
    let box = document.createElement('div');
    box.classList.add('speedBox');

    let title = document.createElement('p');
    title.classList.add('title');
    title.innerText = '播放速度';
    box.appendChild(title);

    let options = [
        {text: "0.5x", value: 0.5},
        {text: "1x", value: 1},
        {text: "1.25x", value: 2},
        {text: "1.5x", value: 3},
        {text: "2x", value: 4}
    ]

    options.forEach(option => {
        let label = document.createElement('label');
        label.innerText = option.text;
        box.appendChild(label);
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'speed';
        input.value = option.value;
        input.checked = speed() === option.value;
        input.onclick = function () {
            speed(option.value);
        };
        label.appendChild(input);
    });

    let remark = document.createElement('p');
    remark.classList.add('remark');
    remark.innerText = '注意：慎用此功能，后台可能会检测播放数据。';
    box.appendChild(remark);

    return box;
}
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


(async function () {
    initRouter()
})();