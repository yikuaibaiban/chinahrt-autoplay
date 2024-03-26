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
        createConfigBox();
        createPlaylistBox();
        createFeedbackBox();

        experimentalHandler.createExperimentalBox();

        // 检测播放列表变更
        GM_addValueChangeListener(General.coursesKey, function (name, oldValue, newValue, remote) {
            removePlaylistBox();
            createPlaylistBox();
        });

        playerInit();
        player.addListener('loadedmetadata', playerInit);

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