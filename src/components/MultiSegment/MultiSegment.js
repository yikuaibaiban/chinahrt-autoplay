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
        if (playModel() === 1) {
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

        if (playModel() === 3) {
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