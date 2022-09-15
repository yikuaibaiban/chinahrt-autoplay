// ==UserScript==
// @name         chinahrt继续教育；chinahrt全自动刷课；解除系统限制；
// @version      3.0.0
// @namespace    https://github.com/yikuaibaiban/chinahrt
// @description  【❤全自动刷课❤】功能可自由配置，只需将视频添加到播放列表，后续刷课由系统自动完成；使用教程：https://www.cnblogs.com/ykbb/p/16695563.html
// @author       yikuaibaiban;https://www.cnblogs.com/ykbb/;https://github.com/yikuaibaiban
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAArFJREFUWEftlttPE0EUxr+9ddtdYOXSSmmlFFoasSFemmg0qYkIMfGF/9J/wTeN0cSYGBHEBBIoLSIU0VrKpe1eagaySWVmutu+GJPO4+5cfvOdc745wkGl3sI/HEIf4L9ToHrqoHLi4LTRgmm1IAhAMCDgmi4ibEgQhe4SyncOFA9tFMoWaucO9wRJFDAZlpCeUKAq/kA8AY7PHKwWmqic+i8WRRaQTciIj8qeFB0Bjo4dvN9ooOX/7L8OnLshYybaWQouALn5m/XeD3dJ5qcCSEQkrhJcgLfrdabshV8mvtdsPEoEPeV1JzzOqhjSROZ8JsBO2cJa0WQueLFSQ6lqYWpYQT4ZQnSQfzt3g+iwhFw64B/g9VqDm+0uANlNkYB8UkMupnqqkc+qMBgqUAqQOiex5412AHdOJhzAUlqDpvBNIBOXMTtBJyQF0El+ciALgHwfUEUspjTMjrGzPmKIuJ+hlaIA1ksmtg+srhRon7wwE0IuTieoHhTwZJ7+TgGsbDexe2T3DJAdV/E8o1HriTMu3QlR3ymAz4UmSj96A1AkActzOqZH6DD4BtjYM7G5130IYkMynmV0jHHqfXRQxMObPnKg/NvGh81mVyG4HQ1gcVYH22out5oel3Fr0kcVOC3g5cdz2JxH72oVPE1ruDfh7QMPMirCBo3IdMIvRfPi6WUNF2BMl0Aynjii1yAGRIyINZgADRN4tVa/aDiujnfFOg5PbCykNAyp/roPYsPEjn0DkInfflr4tMV+D7xu3P4/eV1GNsFXqWM/sLVv4usuvyK8QGIjEu6m2I+Qu9azIyKt2OoOvyp4EF439w1AJpLmhHjDfoVvUO6GJOHSMZkb86vAngq0L6ieOSA+UalddsWWfZmkA0ERhi4iYkjMUusUqq4AvGLey/8+QF+BP0npcPDdfTv7AAAAAElFTkSuQmCC
// @match        http://*.chinahrt.com/*
// @match        https://*.chinahrt.com/*
// @match        http://videoadmin.chinahrt.com.cn/videoPlay/play*
// @match        http://videoadmin.chinahrt.com/videoPlay/play*
// @match        https://videoadmin.chinahrt.com.cn/videoPlay/play*
// @match        https://videoadmin.chinahrt.com/videoPlay/play*
//
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        GM_notification
//
// @license      GPL
// ==/UserScript==

// 课程预览页面
const COURSE_PREVIEW = 0;
// 课程播放页面
const COURSE_PALY = 1;
// 视频播放页面
const VIDEO_PALY = 2;
// 未知页面
const UNKOWN_PAGE = 9999;
// 课程存储关键字
const COURSES = "courses";
// 自动播放
const AUTOPLAY = "autoPlay";
// 静音
const MUTE = "mute";
// 拖动
const DRAG = "drag";
// 播放速度
const SPEED = "speed";

// 获取自动播放
function getAutoPlay() {
  return GM_getValue(AUTOPLAY, true);
}
// 获取静音
function getMute() {
  return GM_getValue(MUTE, true);
}
// 获取拖动
function getDrag() {
  return GM_getValue(DRAG, 5);
}
// 获取播放速度
function getSpeed() {
  return GM_getValue(SPEED, 1);
}

// 获取播放列表
function getCourses() {
  var value = GM_getValue(COURSES, []);
  if (Array.isArray(value)) {
    return value;
  }
  return [];
}

// 添加到播放列表
function addCourse(element) {
  if (!element.title || !element.url) {
    console.error(element);
    alert("添加失败,缺少必要参数");
    return false;
  }

  var oldValue = getCourses();

  if (oldValue.findIndex(value => value.url == element.url) > -1) {
    alert("已经存在播放列表中");
    return false;
  }

  oldValue.push({ title: element.title, url: element.url });

  GM_setValue(COURSES, oldValue);

  return true;
}

// 从播放列表移除
function removeCourse(index) {
  var courses = getCourses();

  if (Number.isNaN(index)) {
    for (let i = courses.length; i >= 0; i--) {
      const element = courses[i];
      // 正则提取 href 中  sectionId courseId trainplanId
      var jsonHref = element.url;
      var jsonSectionId = jsonHref.match(/sectionId=([^&]*)/)[1];
      var jsonCourseId = jsonHref.match(/courseId=([^&]*)/)[1];
      var jsonTrainplanId = jsonHref.match(/trainplanId=([^&]*)/)[1];

      // 正则提取 window.location.href 中  sectionId courseId trainplanId
      var href = window.location.href;
      var sectionId = href.match(/sectionId=([^&]*)/)[1];
      var courseId = href.match(/courseId=([^&]*)/)[1];
      var trainplanId = href.match(/trainplanId=([^&]*)/)[1];

      if (jsonCourseId == courseId && jsonSectionId == sectionId && jsonTrainplanId == trainplanId) {
        courses.splice(i, 1);
      }
    }
  } else {
    courses.splice(index, 1);
  }

  GM_setValue(COURSES, courses);
}

// 生成可以添加到播放列表的容器
function createCanPlayList() {
  // 生成容器
  var playListBox = $("<div>", {
    id: "canPlayBox",
    css: {
      width: "300px",
      height: "500px",
      position: "fixed",
      top: "100px",
      background: "rgba(255,255,255,1)",
      right: "20px",
      border: "1px solid #c1c1c1",
      "overflow-y": "auto"
    }
  });

  // 添加绑定事件
  playListBox.on("bind", function (e, data) {
    var box = $("<div>", {
      css: {
        "border-bottom": "1px solid #c1c1c1",
        "padding": "8px",
        "line-height": "150%",
        "border-bottom": "1px solid #c1c1c1",
        "margin-bottom": "3px"
      }
    });

    var ptitle = $("<p>", {
      text: data.title,
      title: data.title,
      css: {
        "font-size": "13px",
        "white-space": "nowrap",
        "overflow": "hidden",
        "text-overflow": "ellipsis",
      }
    });
    ptitle.appendTo(box);

    var pstatus = $("<p>", {
      text: "学习状态: " + data.status,
      title: "学习状态: " + data.status,
      css: {
        "font-size": "12px",
        "white-space": "nowrap",
        "overflow": "hidden",
        "text-overflow": "ellipsis",
        "color": "#c1c1c1"
      }
    });
    pstatus.appendTo(box);

    var disabled = getCourses().findIndex(value => value.url == data.url) > -1;
    var button = $("<button>", {
      text: disabled ? "已在列表中" : "添加到播放列表",
      type: "button",
      disabled: disabled,
      css: {
        color: disabled ? "#000" : "#FFF",
        backgroundColor: disabled ? "#c3c3c3" : "#4bccf2",
        border: "none",
        padding: "5px 10px",
        "margin-top": "4px"
      },
      click: function () {
        if (addCourse({ title: data.title, url: data.url })) {
          $(this).attr("disabled", true);
          $(this).css({
            color: "#000",
            backgroundColor: "#c3c3c3",
          }).text("已在列表中");
        }
      }
    });
    button.appendTo(box);

    box.appendTo(playListBox);
  });

  playListBox.appendTo('body');

  return playListBox;
}

// 显示通知
function showNotification(content) {
  GM_notification({
    text: content,
    title: "Chinahrt自动刷课",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAArFJREFUWEftlttPE0EUxr+9ddtdYOXSSmmlFFoasSFemmg0qYkIMfGF/9J/wTeN0cSYGBHEBBIoLSIU0VrKpe1eagaySWVmutu+GJPO4+5cfvOdc745wkGl3sI/HEIf4L9ToHrqoHLi4LTRgmm1IAhAMCDgmi4ibEgQhe4SyncOFA9tFMoWaucO9wRJFDAZlpCeUKAq/kA8AY7PHKwWmqic+i8WRRaQTciIj8qeFB0Bjo4dvN9ooOX/7L8OnLshYybaWQouALn5m/XeD3dJ5qcCSEQkrhJcgLfrdabshV8mvtdsPEoEPeV1JzzOqhjSROZ8JsBO2cJa0WQueLFSQ6lqYWpYQT4ZQnSQfzt3g+iwhFw64B/g9VqDm+0uANlNkYB8UkMupnqqkc+qMBgqUAqQOiex5412AHdOJhzAUlqDpvBNIBOXMTtBJyQF0El+ciALgHwfUEUspjTMjrGzPmKIuJ+hlaIA1ksmtg+srhRon7wwE0IuTieoHhTwZJ7+TgGsbDexe2T3DJAdV/E8o1HriTMu3QlR3ymAz4UmSj96A1AkActzOqZH6DD4BtjYM7G5130IYkMynmV0jHHqfXRQxMObPnKg/NvGh81mVyG4HQ1gcVYH22out5oel3Fr0kcVOC3g5cdz2JxH72oVPE1ruDfh7QMPMirCBo3IdMIvRfPi6WUNF2BMl0Aynjii1yAGRIyINZgADRN4tVa/aDiujnfFOg5PbCykNAyp/roPYsPEjn0DkInfflr4tMV+D7xu3P4/eV1GNsFXqWM/sLVv4usuvyK8QGIjEu6m2I+Qu9azIyKt2OoOvyp4EF439w1AJpLmhHjDfoVvUO6GJOHSMZkb86vAngq0L6ieOSA+UalddsWWfZmkA0ERhi4iYkjMUusUqq4AvGLey/8+QF+BP0npcPDdfTv7AAAAAElFTkSuQmCC",
  });
}

// 创建配置窗口
function createConfigBox() {
  var box = $("<div>", {
    css: {
      position: "fixed",
      right: 0,
      top: 0,
      width: "250px",
      height: "280px",
      "background-color": "#FFF",
      "z-index": 9999,
      border: "1px solid #ccc"
    }
  });

  $("<div>", {
    text: "视频控制配置",
    css: {
      "border-bottom": "1px solid #ccc",
      padding: "5px",
      "font-weight": "bold"
    }
  }).appendTo(box);

  var configBox = $("<div>", { css: { padding: "5px", "padding-bottom": "5px", "font-size": "12px", "line-height": "150%" } });

  // 自动播放
  var autoPlayBox = $("<div>", { css: { "border-bottom": "1px dotted #ccc", "padding-bottom": "5px" } });
  $("<p>", { text: "是否自动播放：" }).appendTo(autoPlayBox);
  $("<input>", { type: "radio", name: "autoPlay", value: true, checked: getAutoPlay(), click: function () { GM_setValue(AUTOPLAY, true); } }).appendTo(autoPlayBox);
  $("<label>", { text: "是" }).appendTo(autoPlayBox);
  $("<input>", { type: "radio", name: "autoPlay", value: false, checked: !getAutoPlay(), click: function () { GM_setValue(AUTOPLAY, false); } }).appendTo(autoPlayBox);
  $("<label>", { text: "否" }).appendTo(autoPlayBox);
  autoPlayBox.appendTo(configBox);

  // 是否静音
  var mutePlayBox = $("<div>", { css: { "border-bottom": "1px dotted #ccc", "padding-bottom": "5px" } });
  $("<p>", { text: "是否静音：" }).appendTo(mutePlayBox);
  $("<input>", { type: "radio", name: "mute", value: true, checked: getMute(), click: function () { GM_setValue(MUTE, true); } }).appendTo(mutePlayBox);
  $("<label>", { text: "是" }).appendTo(mutePlayBox);
  $("<input>", { type: "radio", name: "mute", value: false, checked: !getMute(), click: function () { GM_setValue(MUTE, false); } }).appendTo(mutePlayBox);
  $("<label>", { text: "否" }).appendTo(mutePlayBox);
  $("<p>", { text: "注意：不静音，视频可能会出现不会自动播放", css: { "font-size": "13px", "font-weight": "bold" } }).appendTo(mutePlayBox);
  mutePlayBox.appendTo(configBox);

  // 启用拖放
  var dragPlayBox = $("<div>", { css: { "border-bottom": "1px dotted #ccc", "padding-bottom": "5px" } });
  $("<p>", { text: "启用拖放（慎用）：" }).appendTo(dragPlayBox);
  $("<input>", { type: "radio", name: "drag", value: 5, checked: getDrag() == 5, click: function () { GM_setValue(DRAG, 5); } }).appendTo(dragPlayBox);
  $("<label>", { text: "还原" }).appendTo(dragPlayBox);
  $("<input>", { type: "radio", name: "drag", value: 1, checked: getDrag() == 1, click: function () { GM_setValue(DRAG, 1); } }).appendTo(dragPlayBox);
  $("<label>", { text: "启用" }).appendTo(dragPlayBox);
  dragPlayBox.appendTo(configBox);

  // 是否静音
  var speedPlayBox = $("<div>", { css: { "border-bottom": "1px dotted #ccc", "padding-bottom": "5px" } });
  $("<p>", { text: "播放速度调整（慎用，不知后台是否检测）：" }).appendTo(speedPlayBox);
  $("<input>", { type: "radio", name: "speed", value: 0, checked: getSpeed() == 0, click: function () { GM_setValue(SPEED, 0); } }).appendTo(speedPlayBox);
  $("<label>", { text: "0.5倍" }).appendTo(speedPlayBox);
  $("<input>", { type: "radio", name: "speed", value: 1, checked: getSpeed() == 1, click: function () { GM_setValue(SPEED, 1); } }).appendTo(speedPlayBox);
  $("<label>", { text: "正常" }).appendTo(speedPlayBox);
  $("<input>", { type: "radio", name: "speed", value: 2, checked: getSpeed() == 2, click: function () { GM_setValue(SPEED, 2); } }).appendTo(speedPlayBox);
  $("<label>", { text: "1.25倍" }).appendTo(speedPlayBox);
  $("<input>", { type: "radio", name: "speed", value: 3, checked: getSpeed() == 3, click: function () { GM_setValue(SPEED, 3); } }).appendTo(speedPlayBox);
  $("<label>", { text: "1.5倍" }).appendTo(speedPlayBox);
  $("<input>", { type: "radio", name: "speed", value: 4, checked: getSpeed() == 4, click: function () { GM_setValue(SPEED, 4); } }).appendTo(speedPlayBox);
  $("<label>", { text: "2倍" }).appendTo(speedPlayBox);
  speedPlayBox.appendTo(configBox);

  configBox.appendTo(box);

  box.appendTo("body");
}

// 创建播放列表窗口
function createPlayListBox() {
  var box = $("<div>", {
    id: "playListBox",
    css: {
      position: "fixed",
      right: 0,
      top: 290,
      width: "250px",
      height: "450px",
      "background-color": "#FFF",
      "z-index": 9999,
      border: "1px solid #ccc",
      "overflow-y": "auto"
    }
  });

  $("<div>", {
    text: "视频列表",
    css: {
      "border-bottom": "1px solid #ccc",
      padding: "5px",
      "font-weight": "bold"
    }
  }).appendTo(box);

  // 渲染课程列表
  var courses = getCourses();
  for (let index = 0; index < courses.length; index++) {
    const element = courses[index];

    var ptitle = $("<p>", {
      text: element.title,
      title: element.title,
      css: {
        "font-size": "13px",
        "white-space": "nowrap",
        "overflow": "hidden",
        "text-overflow": "ellipsis",
      }
    });
    ptitle.appendTo(box);

    var button = $("<button>", {
      text: "移除",
      type: "button",
      data: { index: index },
      css: {
        color: "#FFF",
        backgroundColor: "#fd1952",
        border: "none",
        padding: "5px 10px",
        "margin": "4px 0 10px 0",
      },
      click: function () {
        if (confirm("确定删除这个视频么？")) {
          removeCourse($(this).data("index"));
        }
      }
    });
    button.appendTo(box);
  }

  box.appendTo("body");
}

// 获取当前页面编号
function getPageNumber() {
  var href = window.location.href;
  if (href.indexOf("/course/preview") > -1) {
    return COURSE_PREVIEW;
  }
  if (href.indexOf("/course/play_video") > -1) {
    return COURSE_PALY;
  }
  if (href.indexOf("/videoPlay/play") > -1) {
    return VIDEO_PALY;
  }
  return UNKOWN_PAGE;
}

window.onload = function () {
  if (getPageNumber() == COURSE_PREVIEW) {
    $(document).ready(function () {
      // 创建播放列表
      var playListBox = createCanPlayList();

      // 提取所有链接
      var allLinks = document.querySelectorAll("a");
      // 提取所有可以播放的数据
      for (let i = 0; i < allLinks.length; i++) {
        const element = allLinks[i];
        if (element.href.indexOf("/course/play_video") > -1) {
          playListBox.trigger("bind", { title: element.innerText, url: element.href, status: $(element).prev().text() });
        }
      }
    });
  }

  if (getPageNumber() == VIDEO_PALY) {
    $(document).ready(function () {
      // 意见反馈
      var feedback = $('<div></div>', {
        css: {
          "font-size": "14px", "font-weight": "bold", color: "red", background: "#FFF", padding: "4px 7px", position: "absolute", top: "35px", "line-height": "30px", "z-index": "99999",
          "display": "flex", "flex-direction": "column", "left": "30px", "text-align": "center"
        }
      });
      $("<p></p>", { text: "问题反馈", css: { "font-size": "16px", "border-bottom": "1px solid #F00" } }).appendTo(feedback);
      $("<a></a>", { text: "> 使用教程 <", target: "_blank", href: "https://www.cnblogs.com/ykbb/p/16695563.html", css: { "font-size": "18px", "padding": "8px 0 8px 10px", "color": "#4bccf2" } }).appendTo(feedback);
      $("<a></a>", { text: "博客园地址", target: "_blank", href: "https://www.cnblogs.com/ykbb/" }).appendTo(feedback);
      $("<a></a>", { text: "博客园留言反馈", target: "_blank", href: "https://msg.cnblogs.com/send/ykbb" }).appendTo(feedback);
      $("<a></a>", { text: "GitHub反馈", target: "_blank", href: "https://github.com/yikuaibaiban/chinahrt-autoplay/issues" }).appendTo(feedback);
      feedback.prependTo("#body");

      // 增加提示信息
      $('<div></div>', {
        html: "点击课程详情页中的插件提供的【添加到播放列表】按钮添加需要自动播放的课程。受到浏览器策略影响第一次可能无法自动播放，请手动点击播放。",
        css: {
          "font-size": "14px", "font-weight": "bold", color: "red", background: "#FFF", position: "absolute", "line-height": "30px", "z-index": "99999", "left": "30px"
        }
      }).prependTo("#body");

      $("video").prop("muted", "muted");

      // 移除讨厌的事件
      removePauseBlur();

      // 视频播放初始化
      function run() {
        // 总是显示播放进度
        player.changeControlBarShow(true);

        // 拖动开关
        player.changeConfig('config', 'timeScheduleAdjust', getDrag());

        // 静音
        if (getMute()) {
          player.videoMute();
        } else {
          +
            player.videoEscMute();
        }

        // 播放速度
        player.changePlaybackRate(getSpeed());

        // 自动播放
        if (getAutoPlay()) {
          player.videoPlay();
        }
      }

      var tmp = setInterval(function () {
        if (player != undefined) {
          player.addListener('loadedmetadata', run);
          run();
          clearInterval(tmp);

          // 移除本课程学习完毕
          attrset.proxyUrl = "";

          // 播放结束
          player.addListener('ended', function () {
            removeCourse(window.location.href);
            var courses = getCourses();
            if (courses.length == 0) {
              showNotification("所有视频已经播放完毕");
            } else {
              showNotification("即将播放下一个视频:" + courses[0].title);
              window.top.location.href = courses[0].url;
            }
          });
        }
      }, 500);

      // 创建配置窗口
      createConfigBox();

      // 创建播放列表窗口
      createPlayListBox();

      // 检测播放列表
      GM_addValueChangeListener(COURSES, function (name, oldValue, newValue, remote) {
        console.log("检测播放列表变动");
        $("#playListBox").remove();
        createPlayListBox();
      });

      // 监测自动播放
      GM_addValueChangeListener(AUTOPLAY, function (name, oldValue, newValue, remote) {
        console.log("监测自动播放变动");
        if (newValue) {
          player.videoPlay();
        }
      });

      // 检测静音
      GM_addValueChangeListener(MUTE, function (name, oldValue, newValue, remote) {
        console.log("检测静音变动");
        if (newValue) {
          player.videoMute();
        } else {
          player.videoEscMute();
        }
      });

      // 检测拖动
      GM_addValueChangeListener(DRAG, function (name, oldValue, newValue, remote) {
        console.log("检测拖动变动");
        player.changeConfig('config', 'timeScheduleAdjust', newValue);
      });

      // 检测速度
      GM_addValueChangeListener(SPEED, function (name, oldValue, newValue, remote) {
        console.log("检测速度变动");
        player.changePlaybackRate(newValue);
      });
    });
  }
}