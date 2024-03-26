function autoPlay(value) {
    if (value) {
        GM_setValue('autoPlay', value);
        if (value) {
            if (player) {
                player.videoPlay();
            }
        }
        return value;
    }

    return GM_getValue('autoPlay', true);
}

function mute(value) {
    if (value) {
        GM_setValue('mute', value);
        if (player) {
            if (value) {
                player.videoMute();
            } else {
                player.videoEscMute();
            }
        }
        return value;
    }

    return GM_getValue('mute', true);
}

function drag(value) {
    // 强制跳过拖拽检测
    if (attrset) {
        attrset.ifCanDrag = 1;
    }

    if (value) {
        GM_setValue('drag', value);
        if (player) {
            player.changeConfig('config', 'timeScheduleAdjust', value);
        }
        return value;
    }

    return GM_getValue('drag', 5);
}

function speed(value) {
    // 强制跳过倍速播放检测
    if (attrset) {
        attrset.playbackRate = 1;
    }

    if (value) {
        GM_setValue('speed', value);
        if (player) {
            player.changePlaybackRate(value);
        }
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