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