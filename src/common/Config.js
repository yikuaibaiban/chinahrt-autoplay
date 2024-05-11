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