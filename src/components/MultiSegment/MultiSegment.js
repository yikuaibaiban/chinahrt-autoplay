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