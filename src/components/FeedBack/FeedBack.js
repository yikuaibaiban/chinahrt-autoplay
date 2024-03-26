function createFeedbackBox() {
    let box = document.createElement("div");
    box.className = "feedbackBox";
    document.body.appendChild(box);

    let changelog = document.createElement("div");
    changelog.className = "changelog";
    changelog.innerHTML = "1.本次重构了所有代码。<br/>" +
        "2.修复了鼠标移出视频会暂停的问题。<br/>" +
        "3.增加了'一键添加'到播放列表与'一键清空'的功能。<br/>" +
        "4.修复一些已知错误。<br/>";
    box.appendChild(changelog);

    let notice = document.createElement("div");
    notice.innerHTML = "点击课程详情页中的插件提供的【添加到播放列表】按钮添加需要自动播放的课程。<br/>受到浏览器策略影响第一次可能无法自动播放，请手动点击播放或在控制配置中设置为静音，再刷新。";
    notice.className = "notice";
    box.appendChild(notice);

    const links = [
        { title: "使用教程", link: "https://www.cnblogs.com/ykbb/p/16695563.html" },
        { title: "博客园", link: "https://www.cnblogs.com/ykbb/" },
        { title: "留言", link: "https://msg.cnblogs.com/send/ykbb" },
        { title: "GitHub", link: "https://github.com/yikuaibaiban/chinahrt-autoplay/issues" },
    ];

    for (const link of links) {
        let a = document.createElement("a");
        a.innerText = link.title;
        a.target = "_blank";
        a.href = link.link;
        a.className = "link";
        box.appendChild(a);
    }

    return box;
}