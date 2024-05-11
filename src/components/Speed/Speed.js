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