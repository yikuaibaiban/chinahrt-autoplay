function createAutoPlayOption() {
    let box = document.createElement('div');
    box.classList.add('autoPlayBox');

    let title = document.createElement('p');
    title.classList.add('.title');
    title.innerText = '自动播放';
    box.appendChild(title);

    let options = [
        { text: "是", value: true },
        { text: "否", value: false }
    ]

    options.forEach(option => {
        let label = document.createElement('label');
        label.innerText = option.text;
        box.appendChild(label);
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'autoPlay';
        input.value = option.value;
        input.checked = autoPlay() === option.value;
        input.onclick = function () {
            autoPlay(option.value);
        };
        label.appendChild(input);
    });

    return box;
}