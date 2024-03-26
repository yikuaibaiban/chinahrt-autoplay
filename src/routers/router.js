let isVue = false;

function initRouter(href) {
    try {
        isVue = getVueInstance() !== undefined;
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
                        playInit();
                        clearInterval(playTimer);
                    }
                } catch (error) {
                    console.log("未获取到播放器", error);
                }
            }, 500);
        }
        if (href.indexOf("/course/preview") > -1) {
            createCanPlaylist();
            appendToCanPlaylist(getJQueryCourses());
        }
    }

    if (isVue) {
        const path = getVueInstance()?.$route?.path;
        if (path === "/v_courseDetails") {
            createCanPlaylist();
            let checkTimer = setInterval(function () {
                if (getVueInstance()) {
                    // 注册路由变更监听器
                    VueHandler.registerRouterChange();
                    appendToCanPlaylist(getVueCourses());
                    clearInterval(checkTimer);
                }
            }, 500);
        }
    }
}