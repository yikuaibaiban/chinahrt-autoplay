// ==UserScript==
// @name         chinahrt继续教育；chinahrt全自动刷课；解除系统限制；
// @version      3.1.3-Preview
// @namespace    https://github.com/yikuaibaiban/chinahrt
// @description  【❤全自动刷课❤】功能可自由配置，只需将视频添加到播放列表，后续刷课由系统自动完成；使用教程：https://www.cnblogs.com/ykbb/p/16695563.html
// @author       yikuaibaiban;https://www.cnblogs.com/ykbb/;https://github.com/yikuaibaiban
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAArFJREFUWEftlttPE0EUxr+9ddtdYOXSSmmlFFoasSFemmg0qYkIMfGF/9J/wTeN0cSYGBHEBBIoLSIU0VrKpe1eagaySWVmutu+GJPO4+5cfvOdc745wkGl3sI/HEIf4L9ToHrqoHLi4LTRgmm1IAhAMCDgmi4ibEgQhe4SyncOFA9tFMoWaucO9wRJFDAZlpCeUKAq/kA8AY7PHKwWmqic+i8WRRaQTciIj8qeFB0Bjo4dvN9ooOX/7L8OnLshYybaWQouALn5m/XeD3dJ5qcCSEQkrhJcgLfrdabshV8mvtdsPEoEPeV1JzzOqhjSROZ8JsBO2cJa0WQueLFSQ6lqYWpYQT4ZQnSQfzt3g+iwhFw64B/g9VqDm+0uANlNkYB8UkMupnqqkc+qMBgqUAqQOiex5412AHdOJhzAUlqDpvBNIBOXMTtBJyQF0El+ciALgHwfUEUspjTMjrGzPmKIuJ+hlaIA1ksmtg+srhRon7wwE0IuTieoHhTwZJ7+TgGsbDexe2T3DJAdV/E8o1HriTMu3QlR3ymAz4UmSj96A1AkActzOqZH6DD4BtjYM7G5130IYkMynmV0jHHqfXRQxMObPnKg/NvGh81mVyG4HQ1gcVYH22out5oel3Fr0kcVOC3g5cdz2JxH72oVPE1ruDfh7QMPMirCBo3IdMIvRfPi6WUNF2BMl0Aynjii1yAGRIyINZgADRN4tVa/aDiujnfFOg5PbCykNAyp/roPYsPEjn0DkInfflr4tMV+D7xu3P4/eV1GNsFXqWM/sLVv4usuvyK8QGIjEu6m2I+Qu9azIyKt2OoOvyp4EF439w1AJpLmhHjDfoVvUO6GJOHSMZkb86vAngq0L6ieOSA+UalddsWWfZmkA0ERhi4iYkjMUusUqq4AvGLey/8+QF+BP0npcPDdfTv7AAAAAElFTkSuQmCC
// @match        http://*.chinahrt.com/*
// @match        https://*.chinahrt.com/*
// @match        http://videoadmin.chinahrt.com.cn/videoPlay/play*
// @match        http://videoadmin.chinahrt.com/videoPlay/play*
// @match        https://videoadmin.chinahrt.com.cn/videoPlay/play*
// @match        https://videoadmin.chinahrt.com/videoPlay/play*
// @resource     customCss file:///E:/confidential/chinahrt-autoplay/src/chinahrt-autoplay.css
//
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        GM_notification
// @grant        GM_addStyle
// @grant        GM_getResourceText
//
// @license      GPL
// ==/UserScript==

class VueHandler {
    /**
     * 获取Vue实例
     * @returns {*}
     */
    static getInstance() {
        // todo: 好像有一个地区不是通过 article 标签获取的
        return document.querySelector("article")?.__vue__;
    }

    /**
     * 获取页面类型
     * @returns {number}
     */
    static pageCategory() {
        const path = this.getInstance()?.$route?.path;
        if (path === "/v_courseDetails") {
            return General.pageCategory.detail;
        }
        // todo: 缺少play
        return General.pageCategory.other;
    }

    /**
     * 注册路由变更监听器
     */
    static registerRouterChange() {
        this.getInstance().$router.afterEach((to, from, failure) => {
            PlayPage.removeConfigBox();
            PlayPage.removePlaylistBox();
            PlayPage.removeFeedbackBox();
            PlayPage.removeNoticeBox();
            experimentalHandler.removeExperimentalBox();
            DetailPage.removeCanPlaylist();

            if (to.path === "/v_courseDetails") {
                DetailPage.appendToCanPlaylist(this.getCourses())
            }
            // todo: 缺少播放页面
        });
    }

    /**
     * 获取课程列表
     * @returns {[]}
     */
    static getCourses() {
        let results = [];

        let query = this.getInstance()?.$route?.query;

        const chapters = this.getInstance()?._data?.pageData?.course?.chapter_list;
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
}

class BasicHandler {
    /**
     * 获取页面类型
     * @returns {number}
     */
    static pageCategory() {
        const href = window.location.href;
        if (href.indexOf("/course/play_video") > -1 || href.indexOf("/videoPlay/play") > -1) {
            return General.pageCategory.play;
        }
        if (href.indexOf("/course/preview") > -1) {
            return General.pageCategory.detail;
        }
        return General.pageCategory.other;
    }

    /**
     * 查找页面课程章节信息
     * @returns {[]}
     */
    static findPageCourses() {
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

    /**
     * 生成窗口子项
     * @param item 项目
     * @param parent 窗口
     */
    static generateBoxItem(item, parent) {
        let box = document.createElement("div");
        box.className = "item";

        let title = document.createElement("p");
        title.innerText = item.title;
        title.className = "title";
        box.appendChild(title);

        for (let i = 0; i < item.options.length; i++) {
            const option = item.options[i];
            let label = document.createElement("label");
            label.innerText = option.text;
            box.appendChild(label);
            let input = document.createElement("input");
            input.type = "radio";
            input.name = item.name;
            input.value = option.value;
            input.checked = item.action() === option.value;
            input.onclick = function () {
                item.action(option.value);
            };
            label.appendChild(input);
        }

        if (item.remark) {
            let remark = document.createElement("p");
            remark.innerText = item.remark;
            remark.className = "remark";
            box.appendChild(remark);
        }
        parent.appendChild(box);
    }
}

class General {
    static coursesKey = "courses";

    /**
     * 页面类型
     * @type {{play: number, other: number, detail: number}}
     */
    static pageCategory = {
        play: 0,
        detail: 1,
        other: 99
    }

    /**
     * 添加课程到播放列表
     * @param value 课程数据
     * @returns {boolean} 添加成功
     */
    static addCourse(value) {
        if (!value.title || !value.url) {
            this.notification("课程添加失败，缺少必要参数。");
            return false;
        }

        let courses = this.courses();
        if (this.courseAdded(courses, value.url)) {
            this.notification("课程已经在播放列表中。")
            return false;
        }
        courses.push({title: value.title, url: value.url});
        this.courses(courses);
        return true;
    }

    /**
     * 从课程列表移除课程
     * @param index 待移除序号
     */
    static removeCourse(index) {
        let courses = this.courses();

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

        this.courses(courses);
    }

    /**
     * 检测课程是否已经添加
     * @param courses 课程列表
     * @param url 课程地址
     * @returns {boolean} 是否已经添加
     */
    static courseAdded(courses, url) {
        if (courses && Array.isArray(courses)) {
            return courses.findIndex(value => value.url === url) > -1;
        }
        return this.courses().findIndex(value => value.url === url) > -1;
    }

    /**
     * 获取配置值
     * @param key 配置项
     * @param defaultValue 默认值
     * @returns {*} 配置值
     */
    static getValue(key, defaultValue) {
        return GM_getValue(key, defaultValue);
    }

    /**
     * 保存配置值
     * @param key 配置项
     * @param value 值
     * @returns {*} 配置值
     */
    static setValue(key, value) {
        GM_setValue(key, value);
        return value;
    }

    /**
     * 自动播放配置
     * @param value 配置值
     * @returns {*} 配置值
     */
    static autoPlay(value) {
        if (value !== undefined) {
            General.setValue("autoPlay", value);
            if (value) {
                if (player) {
                    player.videoPlay();
                }
            }
            return value;
        } else {
            return General.getValue("autoPlay", true);
        }
    }

    /**
     * 静音播放配置
     * @param value 配置值
     * @returns {*} 配置值
     */
    static mute(value) {
        if (value !== undefined) {
            General.setValue("mute", value);
            if (player) {
                if (value) {
                    player.videoMute();
                } else {
                    player.videoEscMute();
                }
            }
            return value
        } else {
            return General.getValue("mute", true);
        }
    }

    /**
     * 拖动配置
     * @param value 配置值
     * @returns {*} 配置值
     */
    static drag(value) {
        // 强制跳过拖拽检测
        if (attrset) {
            attrset.ifCanDrag = 1;
        }

        if (value !== undefined) {
            General.setValue("drag", value);
            if (player) {
                player.changeConfig('config', 'timeScheduleAdjust', value);
            }
            return value;
        } else {
            return General.getValue("drag", 5);
        }
    }

    /**
     * 播放速度配置
     * @param value 配置值
     * @returns {*} 配置值
     */
    static speed(value) {
        // 强制跳过倍速播放检测
        if (attrset) {
            attrset.playbackRate = 1;
        }

        if (value !== undefined) {
            General.setValue("speed", value);
            if (player) {
                player.changePlaybackRate(value);
            }
            return value;
        } else {
            return General.getValue("speed", 1);
        }
    }

    /**
     * 播放模式配置
     * @param value 配置值
     * @returns {*} 配置值
     */
    static playModel(value) {
        return value !== undefined ? General.setValue("play_mode", value) : General.getValue("play_mode", 0);
    }

    /**
     * 消息推送
     * @param content
     */
    static notification(content) {
        GM_notification({
            text: content,
            title: "Chinahrt自动刷课",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAArFJREFUWEftlttPE0EUxr+9ddtdYOXSSmmlFFoasSFemmg0qYkIMfGF/9J/wTeN0cSYGBHEBBIoLSIU0VrKpe1eagaySWVmutu+GJPO4+5cfvOdc745wkGl3sI/HEIf4L9ToHrqoHLi4LTRgmm1IAhAMCDgmi4ibEgQhe4SyncOFA9tFMoWaucO9wRJFDAZlpCeUKAq/kA8AY7PHKwWmqic+i8WRRaQTciIj8qeFB0Bjo4dvN9ooOX/7L8OnLshYybaWQouALn5m/XeD3dJ5qcCSEQkrhJcgLfrdabshV8mvtdsPEoEPeV1JzzOqhjSROZ8JsBO2cJa0WQueLFSQ6lqYWpYQT4ZQnSQfzt3g+iwhFw64B/g9VqDm+0uANlNkYB8UkMupnqqkc+qMBgqUAqQOiex5412AHdOJhzAUlqDpvBNIBOXMTtBJyQF0El+ciALgHwfUEUspjTMjrGzPmKIuJ+hlaIA1ksmtg+srhRon7wwE0IuTieoHhTwZJ7+TgGsbDexe2T3DJAdV/E8o1HriTMu3QlR3ymAz4UmSj96A1AkActzOqZH6DD4BtjYM7G5130IYkMynmV0jHHqfXRQxMObPnKg/NvGh81mVyG4HQ1gcVYH22out5oel3Fr0kcVOC3g5cdz2JxH72oVPE1ruDfh7QMPMirCBo3IdMIvRfPi6WUNF2BMl0Aynjii1yAGRIyINZgADRN4tVa/aDiujnfFOg5PbCykNAyp/roPYsPEjn0DkInfflr4tMV+D7xu3P4/eV1GNsFXqWM/sLVv4usuvyK8QGIjEu6m2I+Qu9azIyKt2OoOvyp4EF439w1AJpLmhHjDfoVvUO6GJOHSMZkb86vAngq0L6ieOSA+UalddsWWfZmkA0ERhi4iYkjMUusUqq4AvGLey/8+QF+BP0npcPDdfTv7AAAAAElFTkSuQmCC",
        });
    }

    /**
     * 课程列表
     * @param value 课程列表数据
     * @returns {*|*[]} 课程列表
     */
    static courses(value) {
        if (value) {
            if (!Array.isArray(value)) {
                this.notification("保存课程数据失败，数据格式异常。");
                return [];
            }
            return General.setValue(this.coursesKey, value);
        }

        let courses = General.getValue(this.coursesKey, []);
        if (!Array.isArray(courses)) {
            return [];
        }

        return courses;
    }
}

class PlayPage {
    static #configBoxId = "configBox";
    static #playlistBoxId = "playlistBox";
    static #feedbackBoxId = "feedbackBox";
    // static #noticeBoxId = "noticeBox";

    static #configContent = [
        {
            title: "自动播放",
            name: "autoPlay",
            action: General.autoPlay,
            remark: "",
            options: [
                {
                    text: "是",
                    value: true
                },
                {
                    text: "否",
                    value: false
                }
            ]
        },
        {
            title: "静音",
            name: "mute",
            action: General.mute,
            remark: "注意：不静音，视频可能会出现不会自动播放",
            options: [
                {
                    text: "是",
                    value: true
                },
                {
                    text: "否",
                    value: false
                }
            ]
        },
        {
            title: "拖放",
            name: "drag",
            action: General.drag,
            remark: "注意：慎用此功能，后台可能会检测播放数据。",
            options: [
                {
                    text: "还原",
                    value: 5
                },
                {
                    text: "启用",
                    value: 1
                }
            ]
        },
        {
            title: "播放速度",
            name: "speed",
            action: General.speed,
            remark: "注意：慎用此功能，后台可能会检测播放数据。",
            options: [
                {
                    text: "0.5倍",
                    value: 0
                },
                {
                    text: "正常",
                    value: 1
                },
                {
                    text: "1.25倍",
                    value: 2
                },
                {
                    text: "1.5倍",
                    value: 3
                },
                {
                    text: "2倍",
                    value: 4
                }
            ]
        },
    ];

    /**
     * 播放器初始化
     */
    static playerInit() {
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
            // const executeFn = async () => {
            //     try {
            //         await player.videoPlay();
            //     } catch (e) {
            //         console.log('拦截到错误', e)
            //     }
            // }
            //
            // executeFn().catch(() => {
            //     alert("无法自动播放，请设置为静音后，再刷新页面尝试。")
            // });
        }
    }

    static init() {
        // 默认视频静音，这样才可以自动播放
        // const video = document.getElementsByTagName("video")[0];
        //
        // video.muted = true;

        // 移除鼠标焦点事件
        // 此方法为官方自带方法。
        removePauseBlur();
        // window.onblur = function () {
        //     setTimeout(() => {
        //         playHandler()
        //     }, 100);
        // };
        // window.onfocus = function () {
        // };

        // 初始化播放窗口
        PlayPage.createConfigBox();
        PlayPage.createPlaylistBox();
        PlayPage.createFeedbackBox();
        // PlayPage.createNoticeBox();

        experimentalHandler.createExperimentalBox();

        // 检测播放列表变更
        GM_addValueChangeListener(General.coursesKey, function (name, oldValue, newValue, remote) {
            PlayPage.removePlaylistBox();
            PlayPage.createPlaylistBox();
        });

        PlayPage.playerInit();
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

    /**
     * 获取配置窗口实例
     * @returns {HTMLElement}
     */
    static #getConfigBox() {
        return document.getElementById(this.#configBoxId);
    }

    /**
     * 获取播放窗口实例
     * @returns {HTMLElement}
     */
    static #getPlaylistBox() {
        return document.getElementById(this.#playlistBoxId);
    }

    /**
     * 获取反馈窗口实例
     * @returns {HTMLElement}
     */
    static #getFeedbackBox() {
        return document.getElementById(this.#feedbackBoxId);
    }

    /**
     * 获取公告窗口实例
     * @returns {HTMLElement}
     */
    // static #getNoticeBox() {
    //     return document.getElementById(this.#noticeBoxId);
    // }

    /**
     * 生成配置窗口
     * @returns {HTMLElement}
     */
    static createConfigBox() {
        const existBox = this.#getConfigBox();
        if (existBox) {
            return existBox;
        }

        let configBox = document.createElement("div");
        configBox.id = this.#configBoxId;
        configBox.className = "configBox"
        document.body.appendChild(configBox);

        let title = document.createElement("div");
        title.innerText = "视频控制配置";
        title.className = "title";
        configBox.appendChild(title);

        for (let i = 0; i < this.#configContent.length; i++) {
            const element = this.#configContent[i];
            BasicHandler.generateBoxItem(element, configBox);
        }

        return configBox;
    }

    /**
     * 移除配置列表窗口
     */
    static removeConfigBox() {
        const configBox = this.#getConfigBox();
        if (configBox) {
            configBox.remove();
        }
    }

    /**
     * 创建播放列表窗口
     * @returns {HTMLElement}
     */
    static createPlaylistBox() {
        const existBox = this.#getPlaylistBox();
        if (existBox) {
            return existBox;
        }

        let playlistBox = document.createElement("div");
        playlistBox.id = this.#playlistBoxId;
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

    /**
     * 移除播放列表窗口
     */
    static removePlaylistBox() {
        const playlistBox = this.#getPlaylistBox();
        if (playlistBox) {
            playlistBox.remove();
        }
    }

    /**
     * 创建反馈窗口
     * @returns {HTMLElement}
     */
    static createFeedbackBox() {
        const existBox = this.#getFeedbackBox();
        if (existBox) {
            return existBox;
        }

        let box = document.createElement("div");
        box.className = "feedbackBox";
        document.body.appendChild(box);

        // let title = document.createElement("p");
        // title.className = "title";
        // title.innerText = "问题反馈";
        // box.appendChild(title);

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
            {title: "使用教程", link: "https://www.cnblogs.com/ykbb/p/16695563.html"},
            {title: "博客园", link: "https://www.cnblogs.com/ykbb/"},
            {title: "留言", link: "https://msg.cnblogs.com/send/ykbb"},
            {title: "GitHub", link: "https://github.com/yikuaibaiban/chinahrt-autoplay/issues"},
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

    /**
     * 移除反馈窗口
     */
    static removeFeedbackBox() {
        this.#getFeedbackBox()?.remove();
    }

    /**
     * 创建公告窗口
     * @returns {HTMLElement}
     */
    // static createNoticeBox() {
    //     const existBox = this.#getNoticeBox();
    //     if (existBox) {
    //         return existBox;
    //     }
    //
    //     let box = document.createElement("div");
    //     box.innerHTML = "点击课程详情页中的插件提供的【添加到播放列表】按钮添加需要自动播放的课程。<br/>受到浏览器策略影响第一次可能无法自动播放，请手动点击播放或在控制配置中设置为静音，再刷新。";
    //     box.className = "notice";
    //     document.body.appendChild(box);
    // }

    /**
     * 删除公告窗口
     */
    // static removeNoticeBox() {
    //     this.#getNoticeBox()?.remove();
    // }
}

class DetailPage {
    /**
     * 可播放列表Id
     * @type {string}
     */
    static #canPlaylistId = "canPlaylist"

    /**
     * 创建可播放列表
     * @returns {HTMLDivElement}
     */
    static createCanPlaylist() {
        const existBox = document.getElementById(this.#canPlaylistId);
        if (existBox) {
            return existBox;
        }
        let playlist = document.createElement("div");
        playlist.id = this.#canPlaylistId;
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

    /**
     * 清理可播放列表
     */
    static removeCanPlaylist() {
        document.getElementById(this.#canPlaylistId)?.remove();
    }

    /**
     * 添加
     * @param box
     * @param courses
     */
    static appendToCanPlaylist(courses) {
        const box = document.getElementById(this.#canPlaylistId);
        if (Array.isArray(courses) && box) {
            for (let i = 0; i < courses.length; i++) {
                let course = courses[i];
                box.dispatchEvent(new CustomEvent("append", {detail: course}));
            }
        }
    }
}

class experimentalHandler {
    static #experimentalBoxId = "experimentalBox";

    static #experimentalContent = [
        {
            title: "播放模式",
            name: "playMode",
            action: General.playModel,
            remark: "",
            options: [
                {
                    text: "正常",
                    value: 0
                },
                {
                    text: "二段播放",
                    value: 3,
                    title: "将视频分为二段：开始，结束各播放90秒"
                },
                {
                    text: "三段播放",
                    value: 1,
                    title: "将视频分为三段：开始，中间，结束各播放90秒"
                },
                {
                    text: "秒播",
                    value: 2,
                    title: "将视频分为两段:开始，结束各播放一秒"
                }
            ]
        }
    ];

    /**
     * 获取实验功能窗口实例
     * @returns {HTMLElement}
     */
    static #getExperimentalBox() {
        return document.getElementById(this.#experimentalBoxId);
    }

    /**
     * 创建实验性功能窗口
     * @returns {HTMLElement}
     */
    static createExperimentalBox() {
        const existBox = this.#getExperimentalBox();
        if (existBox) {
            return existBox;
        }

        let box = document.createElement("div");
        box.className = "experimentalBox";
        document.body.appendChild(box);

        let tip = document.createElement("div");
        tip.innerText = "此功能只适用个别地区。无法使用的就不要使用了。";
        tip.className = "tip";
        box.appendChild(tip);

        for (let i = 0; i < this.#experimentalContent.length; i++) {
            BasicHandler.generateBoxItem(this.#experimentalContent[i], box);
        }
    }

    /**
     * 删除实验性功能窗口
     */
    static removeExperimentalBox() {
        const box = this.#getExperimentalBox();
        if (box) {
            box.remove();
        }
    }

    static timeHandler(t) {
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
            if (General.playModel() === 2) {
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
            General.notification("找不到播放器");
        }
    }
}

window.onload = function () {
    setTimeout(function () {
        let inVue;
        try {
            inVue = Vue !== undefined;
            console.log("当前模式：Vue", window.location.href);
        } catch (e) {
            inVue = false;
            console.log("当前模式：JQuery", window.location.href);
        }

        const pageCategory = inVue ? VueHandler.pageCategory() : BasicHandler.pageCategory();

        if (pageCategory === General.pageCategory.play || General.pageCategory.detail === pageCategory) {
            // 添加Css样式
            GM_addStyle(GM_getResourceText("customCss"))
            // GM_addStyle(".canPlaylist{width:300px;height:500px;position:fixed;top:100px;background:#fff;right:20px;border:1px solid #c1c1c1}.canPlaylist .item{padding:8px;line-height:150%;border-bottom:1px solid #c1c1c1;margin-bottom:3px}.canPlaylist .item .title{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#c1c1c1}.canPlaylist .item .addBtn{color:#fff;background-color:#4bccf2;border:0;padding:5px 10px;margin-top:4px}.canPlaylist .item .addBtn.disable{color:#000;background-color:#c3c3c3}.configBox{right:0;top:0;height:280px}.configBox .title{border-bottom:1px solid #ccc;padding:5px;font-weight:700}.configBox .item{border-bottom:1px dotted #ccc;padding-bottom:5px}.configBox .item .remark{font-size:13px;font-weight:700}.configBox,.experimentalBox,.playlistBox{position:fixed;width:250px;background-color:#fff;z-index:9999;border:1px solid #ccc}.playlistBox{right:0;top:290px;height:450px;overflow-y:auto}.playlistBox .title{border-bottom:1px solid #ccc;padding:5px;font-weight:700}.playlistBox .child_title{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.playlistBox .child_remove{color:#fff;background-color:#fd1952;border:0;padding:5px 10px;margin:4px 0 10px}.experimentalBox{right:255px;top:0;height:280px}.experimentalBox .tip{border-bottom:1px solid #ccc;padding:5px;font-weight:700;color:red}.feedbackBox,.notice{font-size:14px;font-weight:700;color:red;background:#fff;position:absolute;line-height:30px;z-index:99999;left:30px}.feedbackBox{padding:4px 7px;top:0;display:flex;flex-direction:column;text-align:center}.feedbackBox .title{font-size:16px;border-bottom:1px solid red}.feedbackBox .link{font-size:18px;padding:8px 0 8px 10px;color:#4bccf2}.notice{bottom:10px}");

            if (pageCategory === General.pageCategory.play) {
                let playTimer = setInterval(function () {
                    try {
                        console.log(player)
                        if (player) {
                            PlayPage.init();
                            clearInterval(playTimer);
                        }
                    } catch (error) {
                        console.log(error)
                        console.log("未获取到播放器");
                    }
                }, 500);
            } else if (pageCategory === General.pageCategory.detail) {
                // 创建课播放列表窗口
                DetailPage.createCanPlaylist();
                if (inVue) {
                    let checkTimer = setInterval(function () {
                        if (VueHandler.getInstance()) {
                            // 注册路由变更监听器
                            VueHandler.registerRouterChange();
                            DetailPage.appendToCanPlaylist(VueHandler.getCourses());
                            clearInterval(checkTimer);
                        }
                    }, 500);
                } else {
                    DetailPage.appendToCanPlaylist(BasicHandler.findPageCourses());
                }
            }
        }
    }, 1000);
}