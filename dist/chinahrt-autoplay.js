// ==UserScript==
// @name         chinahrt继续教育；chinahrt全自动刷课；解除系统限制；
// @version      2024.03.06.01
// @namespace    https://github.com/yikuaibaiban/chinahrt
// @description  【❤全自动刷课❤】功能可自由配置，只需将视频添加到播放列表，后续刷课由系统自动完成；使用教程：https://www.cnblogs.com/ykbb/p/16695563.html
// @author       yikuaibaiban
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAArFJREFUWEftlttPE0EUxr+9ddtdYOXSSmmlFFoasSFemmg0qYkIMfGF/9J/wTeN0cSYGBHEBBIoLSIU0VrKpe1eagaySWVmutu+GJPO4+5cfvOdc745wkGl3sI/HEIf4L9ToHrqoHLi4LTRgmm1IAhAMCDgmi4ibEgQhe4SyncOFA9tFMoWaucO9wRJFDAZlpCeUKAq/kA8AY7PHKwWmqic+i8WRRaQTciIj8qeFB0Bjo4dvN9ooOX/7L8OnLshYybaWQouALn5m/XeD3dJ5qcCSEQkrhJcgLfrdabshV8mvtdsPEoEPeV1JzzOqhjSROZ8JsBO2cJa0WQueLFSQ6lqYWpYQT4ZQnSQfzt3g+iwhFw64B/g9VqDm+0uANlNkYB8UkMupnqqkc+qMBgqUAqQOiex5412AHdOJhzAUlqDpvBNIBOXMTtBJyQF0El+ciALgHwfUEUspjTMjrGzPmKIuJ+hlaIA1ksmtg+srhRon7wwE0IuTieoHhTwZJ7+TgGsbDexe2T3DJAdV/E8o1HriTMu3QlR3ymAz4UmSj96A1AkActzOqZH6DD4BtjYM7G5130IYkMynmV0jHHqfXRQxMObPnKg/NvGh81mVyG4HQ1gcVYH22out5oel3Fr0kcVOC3g5cdz2JxH72oVPE1ruDfh7QMPMirCBo3IdMIvRfPi6WUNF2BMl0Aynjii1yAGRIyINZgADRN4tVa/aDiujnfFOg5PbCykNAyp/roPYsPEjn0DkInfflr4tMV+D7xu3P4/eV1GNsFXqWM/sLVv4usuvyK8QGIjEu6m2I+Qu9azIyKt2OoOvyp4EF439w1AJpLmhHjDfoVvUO6GJOHSMZkb86vAngq0L6ieOSA+UalddsWWfZmkA0ERhi4iYkjMUusUqq4AvGLey/8+QF+BP0npcPDdfTv7AAAAAElFTkSuQmCC
// @match        http://*.chinahrt.com/*
// @match        https://*.chinahrt.com/*
// @match        http://videoadmin.chinahrt.com.cn/videoPlay/play*
// @match        http://videoadmin.chinahrt.com/videoPlay/play*
// @match        https://videoadmin.chinahrt.com.cn/videoPlay/play*
// @match        https://videoadmin.chinahrt.com/videoPlay/play*//
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        GM_notification
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

function initStyles() {
    let style = document.createElement("style");
    style.appendChild(document.createTextNode(`.autoPlayBox {    position: fixed;    right: 0;    top: 0;    width: 250px;    height: 280px;    background-color: #FFF;    z-index: 9999;    border: 1px solid #ccc;    overflow-y: auto;}.autoPlayBox > .title {    border-bottom: 1px solid #ccc;    padding: 5px;    /*font-weight: bold;*/}.autoPlayBox .item {    border-bottom: 1px dotted #ccc;    padding: 5px 0;    font-size: 14px;}.autoPlayBox .item .title {    /*border-bottom: 1px dotted #ccc;*/    padding-bottom: 5px;    display: inline-block;    font-weight: bold;}.autoPlayBox .item .title:after {    content: ":";    margin-right: 5px;}.autoPlayBox .item .remark {    font-size: 12px;    color: #c1c1c1;    /*font-weight: bold;*/}.autoPlayBox label {    margin-right: 3px;}.autoPlayBox label input {    margin-left: 2px;}.canPlaylist {    width: 300px;    height: 500px;    position: fixed;    top: 100px;    background: rgba(255, 255, 255, 1);    right: 80px;    border: 1px solid #c1c1c1;    overflow-y: auto;}.canPlaylist .oneClick {    margin: 0 auto;    width: 100%;    border: none;    padding: 6px 0;    background: linear-gradient(180deg, #4BCE31, #4bccf2);    height: 50px;    border-radius: 5px;    color: #FFF;    font-weight: bold;    letter-spacing: 4px;    font-size: 18px;}.canPlaylist .item {    border-bottom: 1px solid #c1c1c1;    padding: 8px;    line-height: 150%;    border-bottom: 1px solid #c1c1c1;    margin-bottom: 3px;}.canPlaylist .item .title {    font-size: 13px;    white-space: nowrap;    overflow: hidden;    text-overflow: ellipsis;}.canPlaylist .item .status {    font-size: 12px;    white-space: nowrap;    overflow: hidden;    text-overflow: ellipsis;    color: #c1c1c1;}.canPlaylist .item .addBtn {    color: #FFF;    background-color: #4bccf2;    border: none;    padding: 5px 10px;    margin-top: 4px;}.canPlaylist .item .addBtn.disable {    color: #000;    background-color: #c3c3c3;}.dragBox {    position: fixed;    right: 0;    top: 0;    width: 250px;    height: 280px;    background-color: #FFF;    z-index: 9999;    border: 1px solid #ccc;    overflow-y: auto;}.dragBox > .title {    border-bottom: 1px solid #ccc;    padding: 5px;    /*font-weight: bold;*/}.dragBox .item {    border-bottom: 1px dotted #ccc;    padding: 5px 0;    font-size: 14px;}.dragBox .item .title {    /*border-bottom: 1px dotted #ccc;*/    padding-bottom: 5px;    display: inline-block;    font-weight: bold;}.dragBox .item .title:after {    content: ":";    margin-right: 5px;}.dragBox .item .remark {    font-size: 12px;    color: #c1c1c1;    /*font-weight: bold;*/}.dragBox label {    margin-right: 3px;}.dragBox label input {    margin-left: 2px;}.feedbackBox {    font-size: 14px;    font-weight: bold;    background-color: #FFF;    padding: 4px 7px;    position: absolute;    top: 0;    line-height: 30px;    z-index: 99999;    display: flex;    flex-direction: row;    left: 30px;    flex-wrap: wrap;    width: 226px;}.feedbackBox .link {    /*font-size: 18px;*/    padding: 8px 0 8px 10px;    /*color: #4bccf2;*/}.feedbackBox .notice {    font-size: 14px;    color: red;    border-bottom: 2px dotted #c1c1c1;}.feedbackBox .changelog {    margin: 10px 0;    border-bottom: 2px dotted #c1c1c1;}.multiSegmentBox {    position: fixed;    right: 255px;    top: 0;    width: 250px;    height: 280px;    background-color: #FFF;    z-index: 9999;    border: 1px solid #ccc;}.multiSegmentBox .tip {    border-bottom: 1px solid #ccc;    padding: 5px;    font-weight: bold;    color: red;}.multiSegmentBox .item {    font-size: 14px;}.multiSegmentBox label {    margin-right: 3px;}.multiSegmentBox label input {    margin-left: 2px;}.muteBox {    position: fixed;    right: 0;    top: 0;    width: 250px;    height: 280px;    background-color: #FFF;    z-index: 9999;    border: 1px solid #ccc;    overflow-y: auto;}.muteBox > .title {    border-bottom: 1px solid #ccc;    padding: 5px;    /*font-weight: bold;*/}.muteBox .item {    border-bottom: 1px dotted #ccc;    padding: 5px 0;    font-size: 14px;}.muteBox .item .title {    /*border-bottom: 1px dotted #ccc;*/    padding-bottom: 5px;    display: inline-block;    font-weight: bold;}.muteBox .item .title:after {    content: ":";    margin-right: 5px;}.muteBox .item .remark {    font-size: 12px;    color: #c1c1c1;    /*font-weight: bold;*/}.muteBox label {    margin-right: 3px;}.muteBox label input {    margin-left: 2px;}.controllerBox{}.controllerBox .title{}.playlistBox {    position: fixed;    right: 0;    top: 290px;    width: 250px;    height: 450px;    background-color: #FFF;    z-index: 9999;    border: 1px solid #ccc;    overflow-y: auto;}.playlistBox .oneClear {    margin: 0 auto;    width: 100%;    border: none;    padding: 6px 0;    background: linear-gradient(180deg, #4BCE31, #4bccf2);    height: 50px;    border-radius: 5px;    color: #FFF;    font-weight: bold;    letter-spacing: 4px;    font-size: 18px;}.playlistBox .title {    border-bottom: 1px solid #ccc;    padding: 5px;    font-weight: bold;}.playlistBox .child_title {    font-size: 13px;    white-space: nowrap;    overflow: hidden;    text-overflow: ellipsis;}.playlistBox .child_remove {    color: #FFF;    background-color: #fd1952;    border: none;    padding: 5px 10px;    margin: 4px 0 10px 0;}.speedBox {    position: fixed;    right: 0;    top: 0;    width: 250px;    height: 280px;    background-color: #FFF;    z-index: 9999;    border: 1px solid #ccc;    overflow-y: auto;}.speedBox > .title {    border-bottom: 1px solid #ccc;    padding: 5px;    /*font-weight: bold;*/}.speedBox .item {    border-bottom: 1px dotted #ccc;    padding: 5px 0;    font-size: 14px;}.speedBox .item .title {    /*border-bottom: 1px dotted #ccc;*/    padding-bottom: 5px;    display: inline-block;    font-weight: bold;}.speedBox .item .title:after {    content: ":";    margin-right: 5px;}.speedBox .item .remark {    font-size: 12px;    color: #c1c1c1;    /*font-weight: bold;*/}.speedBox label {    margin-right: 3px;}.speedBox label input {    margin-left: 2px;}`));
    document.head.appendChild(style);
}

function autoPlay(value) {
    if (value) {
        GM_setValue('autoPlay', value);
        return value;
    }

    return GM_getValue('autoPlay', true);
}

function mute(value) {
    if (value) {
        GM_setValue('mute', value);
        return value;
    }

    return GM_getValue('mute', true);
}

function drag(value) {
    if (value) {
        GM_setValue('drag', value);
        return value;
    }

    return GM_getValue('drag', true);
}

function speed(value) {
    if (value) {
        GM_setValue('speed', value);
        return value;
    }

    return GM_getValue('speed', 1);
}

function playMode(value) {
    if (value) {
        GM_setValue('playMode', value);
        return value;
    }

    return GM_getValue('playMode', 'loop');
}
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
function notification(content){
    GM_notification({
        text: content,
        title: "Chinahrt自动刷课",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAArFJREFUWEftlttPE0EUxr+9ddtdYOXSSmmlFFoasSFemmg0qYkIMfGF/9J/wTeN0cSYGBHEBBIoLSIU0VrKpe1eagaySWVmutu+GJPO4+5cfvOdc745wkGl3sI/HEIf4L9ToHrqoHLi4LTRgmm1IAhAMCDgmi4ibEgQhe4SyncOFA9tFMoWaucO9wRJFDAZlpCeUKAq/kA8AY7PHKwWmqic+i8WRRaQTciIj8qeFB0Bjo4dvN9ooOX/7L8OnLshYybaWQouALn5m/XeD3dJ5qcCSEQkrhJcgLfrdabshV8mvtdsPEoEPeV1JzzOqhjSROZ8JsBO2cJa0WQueLFSQ6lqYWpYQT4ZQnSQfzt3g+iwhFw64B/g9VqDm+0uANlNkYB8UkMupnqqkc+qMBgqUAqQOiex5412AHdOJhzAUlqDpvBNIBOXMTtBJyQF0El+ciALgHwfUEUspjTMjrGzPmKIuJ+hlaIA1ksmtg+srhRon7wwE0IuTieoHhTwZJ7+TgGsbDexe2T3DJAdV/E8o1HriTMu3QlR3ymAz4UmSj96A1AkActzOqZH6DD4BtjYM7G5130IYkMynmV0jHHqfXRQxMObPnKg/NvGh81mVyG4HQ1gcVYH22out5oel3Fr0kcVOC3g5cdz2JxH72oVPE1ruDfh7QMPMirCBo3IdMIvRfPi6WUNF2BMl0Aynjii1yAGRIyINZgADRN4tVa/aDiujnfFOg5PbCykNAyp/roPYsPEjn0DkInfflr4tMV+D7xu3P4/eV1GNsFXqWM/sLVv4usuvyK8QGIjEu6m2I+Qu9azIyKt2OoOvyp4EF439w1AJpLmhHjDfoVvUO6GJOHSMZkb86vAngq0L6ieOSA+UalddsWWfZmkA0ERhi4iYkjMUusUqq4AvGLey/8+QF+BP0npcPDdfTv7AAAAAElFTkSuQmCC",
    });
}
function getVueInstance() {
    return document.querySelector("article")?.__vue__;
}

function isVue() {
    return getVueInstance() !== undefined;
}

function registerRouterChange() {
    getVueInstance().$router.afterEach((to, from, failure) => {
        if (to.path === "/v_courseDetails") {
            // todo: 课程详情页面
        }
    });
}

function getVueCourses() {
    let results = [];

    let query = getVueInstance()?.$route?.query;

    const chapters = getVueInstance()?._data?.pageData?.course?.chapter_list;
    if (chapters && chapters.length > 0) {
        for (let i = 0; i < chapters.length; i++) {
            const sections = chapters[i]?.section_list;
            if (sections && sections.length > 0) {
                for (let j = 0; j < sections.length; j++) {
                    const section = sections[j];
                    const url = window.location.protocol + "//" + window.location.host + window.location.pathname +
                        "#/v_video?platformId=" + query.platformId + "&trainplanId=" + query.trainplanId + "&courseId=" +
                        query.courseId + "&sectionId=" + section.id;
                    results.push({
                        title: section.name,
                        url,
                        status: section.study_status + "( " + section.studyTimeStr + " )"
                    });
                }
            }
        }
    }

    return results;
}
function createAutoPlayOption() {
    let box = document.createElement('div');
    box.classList.add('autoPlayBox');

    let title = document.createElement('p');
    title.classList.add('.title');
    title.innerText = '自动播放';
    box.appendChild(title);

    let options = [
        { text: "是", value: true },
        { text: "否", value: false }
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

        let added = General.courseAdded(undefined, data.detail.url);
        let addBtn = document.createElement("button");
        addBtn.innerText = added ? "已在列表中" : "添加到播放列表";
        addBtn.type = "button";
        addBtn.disabled = added;
        addBtn.className = added ? "addBtn disable" : "addBtn";
        addBtn.onclick = function () {
            if (General.addCourse(data.detail)) {
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
function createDragOption() {
    let box = document.createElement('div');
    box.classList.add('dragBox');

    let title = document.createElement('p');
    title.classList.add('.title');
    title.innerText = '拖动';
    box.appendChild(title);

    let options = [
        { text: "还原", value: 5 },
        { text: "启用", value: 1 }
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
    remark.classList.add('.remark');
    remark.innerText = '注意：慎用此功能，后台可能会检测播放数据。';
    box.appendChild(remark);

    return box;
}
function createFeedbackBox() {
    let box = document.createElement("div");
    box.className = "feedbackBox";
    document.body.appendChild(box);

    let changelog = document.createElement("div");
    changelog.className = "changelog";
    changelog.innerHTML = "1.本次重构了所有代码。<br/>" +
        "2.修复了鼠标移出视频会暂停的问题。<br/>" +
        "3.增加了'一键添加'到播放列表与'一键清空'的功能。<br/>" +
        "4.修复一些已知错误。<br/>";
    box.appendChild(changelog);

    let notice = document.createElement("div");
    notice.innerHTML = "点击课程详情页中的插件提供的【添加到播放列表】按钮添加需要自动播放的课程。<br/>受到浏览器策略影响第一次可能无法自动播放，请手动点击播放或在控制配置中设置为静音，再刷新。";
    notice.className = "notice";
    box.appendChild(notice);

    const links = [
        { title: "使用教程", link: "https://www.cnblogs.com/ykbb/p/16695563.html" },
        { title: "博客园", link: "https://www.cnblogs.com/ykbb/" },
        { title: "留言", link: "https://msg.cnblogs.com/send/ykbb" },
        { title: "GitHub", link: "https://github.com/yikuaibaiban/chinahrt-autoplay/issues" },
    ];

    for (const link of links) {
        let a = document.createElement("a");
        a.innerText = link.title;
        a.target = "_blank";
        a.href = link.link;
        a.className = "link";
        box.appendChild(a);
    }

    return box;
}
function createMultiSegmentBox() {
    let box = document.createElement("div");
    box.className = "multiSegmentBox";
    document.body.appendChild(box);

    let tip = document.createElement("div");
    tip.innerText = "此功能只适用个别地区。无法使用的就不要使用了。";
    tip.className = "tip";
    box.appendChild(tip);

    let options = [
        { text: "正常", value: 0 },
        { text: "二段播放", value: 3, title: "将视频分为二段：开始，结束各播放90秒" },
        { text: "三段播放", value: 1, title: "将视频分为三段：开始，中间，结束各播放90秒" },
        { text: "秒播", value: 2, title: "将视频分为两段:开始，结束各播放一秒" }
    ];

    options.forEach(option => {
        let label = document.createElement('label');
        label.innerText = option.text;
        box.appendChild(label);
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'playMode';
        input.value = option.value;
        input.checked = mute() === option.value;
        input.onclick = function () {
            playMode(option.value);
        };
        label.appendChild(input);
    });
}

function timeHandler(t) {
    if (player !== undefined) {
        let videoDuration = parseInt(player.getMetaDate().duration);

        // 三段播放模式
        if (General.playModel() === 1) {
            // 时长不足
            if (videoDuration <= 270) {
                return;
            }

            // 中段范围
            var videoMiddleStart = (videoDuration / 2) - 45;
            var videoMiddleEnd = (videoDuration / 2) + 45;

            // 后段开始
            var videoEndStart = videoDuration - 90;

            // 跳转到中段
            if (t > 90 && t < videoMiddleStart) {
                player.videoSeek(videoMiddleStart);
                return;
            }

            // 跳转到后段
            if (t > videoMiddleEnd && t < videoEndStart) {
                player.videoSeek(videoEndStart);
                return;
            }
            return;
        }

        // 秒播模式
        if (playModel() === 2) {
            // 跳转到后段
            if (t > 1 && t < videoDuration - 1) {
                player.videoSeek(videoDuration - 1);
            }
            return;
        }

        if (General.playModel() === 3) {
            if (videoDuration <= 180) {
                return;
            }

            // 跳转到后段
            if (t > 90 && t < videoDuration - 90) {
                player.videoSeek(videoDuration - 90);
            }
        }
    } else {
        notification("找不到播放器");
    }
}
function createMuteOption() {
    let box = document.createElement('div');
    box.classList.add('muteBox');

    let title = document.createElement('p');
    title.classList.add('.title');
    title.innerText = '静音';
    box.appendChild(title);

    let options = [
        { text: "是", value: true },
        { text: "否", value: false }
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
    remark.classList.add('.remark');
    remark.innerText = '注意：不静音，视频可能会出现不会自动播放';
    box.appendChild(remark);

    return box;
}
function createControllerBox() {
    let controllerBox = document.createElement("div");
    controllerBox.id = "controllerBox";
    controllerBox.className = "controllerBox"
    document.body.appendChild(controllerBox);

    let title = document.createElement("div");
    title.innerText = "视频控制配置";
    title.className = "title";
    controllerBox.appendChild(title);

    controllerBox.appendChild(createAutoPlayOption());
    controllerBox.appendChild(createDragOption());
    controllerBox.appendChild(createMuteOption());
    controllerBox.appendChild(createSpeedOption());

    return controllerBox
}

function playerInit() {
    // 总是显示播放进度
    player.changeControlBarShow(true);

    // 拖动开关
    player.changeConfig('config', 'timeScheduleAdjust', General.drag());

    // 静音
    if (General.mute()) {
        player.videoMute();
    } else {
        player.videoEscMute();
    }

    // 播放速度
    player.changePlaybackRate(General.speed());

    // 自动播放
    if (General.autoPlay()) {
        player.videoPlay();
    }
}

function playInit(){
     // 移除鼠标焦点事件
        // 此方法为官方自带方法。
        removePauseBlur();

        // 初始化播放窗口
        PlayPage.createConfigBox();
        PlayPage.createPlaylistBox();
        PlayPage.createFeedbackBox();

        experimentalHandler.createExperimentalBox();

        // 检测播放列表变更
        GM_addValueChangeListener(General.coursesKey, function (name, oldValue, newValue, remote) {
            PlayPage.removePlaylistBox();
            PlayPage.createPlaylistBox();
        });

        playerInit();
        player.addListener('loadedmetadata', PlayPage.playerInit);

        // 播放结束
        player.addListener('ended', function () {
            General.removeCourse(window.location.href);
            let courses = General.courses();
            if (courses.length === 0) {
                General.notification("所有视频已经播放完毕");
            } else {
                General.notification("即将播放下一个视频:" + courses[0].title);
                window.top.location.href = courses[0].url;
            }
        });

        player.addListener('time', function (t) {
            experimentalHandler.timeHandler(t);
        });
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
            General.courses([]);
        }
    };
    playlistBox.appendChild(oneClear);

    let title = document.createElement("div");
    title.innerText = "视频列表";
    title.className = "title";
    playlistBox.appendChild(title);

    const courses = General.courses();
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
                General.removeCourse(this.getAttribute("data"));
            }
        };
        playlistBox.appendChild(childBtn);
    }
}
function createSpeedOption() {
    let box = document.createElement('div');
    box.classList.add('speedBox');

    let title = document.createElement('p');
    title.classList.add('.title');
    title.innerText = '播放速度';
    box.appendChild(title);

    let options = [
        { text: "0.5x", value: 0.5 },
        { text: "1x", value: 1 },
        { text: "1.25x", value: 2 },
        { text: "1.5x", value: 3 },
        { text: "2x", value: 4 }
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
    remark.classList.add('.remark');
    remark.innerText = '注意：慎用此功能，后台可能会检测播放数据。';
    box.appendChild(remark);

    return box;
}
let isVue = false;

function initRouter(href) {
    try {
        isVue = isVue();
        console.log("当前模式：Vue", window.location.href);
    } catch (e) {
        isVue = false;
        console.log("当前模式：JQuery", window.location.href);
    }

    if (!isVue) {
        if (href.indexOf("/course/play_video") > -1 || href.indexOf("/videoPlay/play") > -1) {
            let playTimer = setInterval(function () {
                try {
                    if (player) {
                        PlayPage.init();
                        clearInterval(playTimer);
                    }
                } catch (error) {
                    console.log("未获取到播放器", error);
                }
            }, 500);
        }
        if (href.indexOf("/course/preview") > -1) {
            DetailPage.createCanPlaylist();
            if (isVue) {
                let checkTimer = setInterval(function () {
                    if (getVueInstance()) {
                        // 注册路由变更监听器
                        VueHandler.registerRouterChange();
                        DetailPage.appendToCanPlaylist(getVueCourses());
                        clearInterval(checkTimer);
                    }
                }, 500);
            } else {
                appendToCanPlaylist(getJQueryCourses());
            }
        }
    }

    if (isVue) {
        const path = getVueInstance()?.$route?.path;
        if (path === "/v_courseDetails") {
            DetailPage.createCanPlaylist();
            if (isVue) {
                let checkTimer = setInterval(function () {
                    if (getVueInstance()) {
                        // 注册路由变更监听器
                        registerRouterChange();
                        appendToCanPlaylist(getVueCourses());
                        clearInterval(checkTimer);
                    }
                }, 500);
            } else {
                appendToCanPlaylist(getJQueryCourses());
            }
        }
    }
}


(async function () {
    setTimeout(function () {
        initRouter(window.location.href);
    }, 1000);
})();