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