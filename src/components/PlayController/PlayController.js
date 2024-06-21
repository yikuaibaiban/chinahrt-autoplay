function createControllerBox() {
	let controllerBox = document.createElement('div');
	controllerBox.id = 'controllerBox';
	controllerBox.className = 'controllerBox';
	document.body.appendChild(controllerBox);

	let linksBox = document.createElement('div');
	linksBox.className = 'linksBox';
	controllerBox.appendChild(linksBox);

	const links = [
		{
			title: '使用教程',
			link: 'https://yikuaibaiban.github.io/chinahrt-autoplay-docs/',
		},
		{ title: '留言', link: 'https://msg.cnblogs.com/send/ykbb' },
		{ title: '博客园', link: 'https://www.cnblogs.com/ykbb/' },
		{
			title: 'Gitee',
			link: 'https://gitee.com/yikuaibaiban/chinahrt-autoplay/issues',
		},
		{
			title: 'GitHub',
			link: 'https://github.com/yikuaibaiban/chinahrt-autoplay/issues',
		},
	];

	for (const link of links) {
		let a = document.createElement('a');
		a.innerText = link.title;
		a.target = '_blank';
		a.href = link.link;
		linksBox.appendChild(a);
	}

	controllerBox.appendChild(createAutoPlayOption());
	controllerBox.appendChild(createDragOption());
	controllerBox.appendChild(createMuteOption());
	controllerBox.appendChild(createSpeedOption());

	return controllerBox;
}

function playerInit() {
	if (player.V.ended || (!player.V.ended && !player.V.paused)) {
		return;
	}

	player.changeControlBarShow(true);
	player.changeConfig('config', 'timeScheduleAdjust', drag());
	if (mute()) {
		player.videoMute();
	} else {
		player.videoEscMute();
	}
	player.changePlaybackRate(speed());
	if (autoPlay()) {
		player.videoPlay();
	}

	player.removeListener('ended', endedHandler);
	player.addListener('ended', function (event) {
		courseyunRecord();
		player.videoClear();
		$.ajax({
			url: '/videoPlay/takeRecord',
			data: {
				studyCode: attrset.studyCode,
				recordUrl: attrset.recordUrl,
				updateRedisMap: attrset.updateRedisMap,
				recordId: attrset.recordId,
				sectionId: attrset.sectionId,
				signId: attrset.signId,
				isEnd: true,
				businessId: attrset.businessId,
			},
			dataType: 'json',
			type: 'post',
			success: function (data) {
				console.log('提交学习记录', data);
				removeCourse(attrset.sectionId);
				let courses = coursesList();
				if (courses.length === 0) {
					notification('所有视频已经播放完毕');
				} else {
					notification('即将播放下一个视频:' + courses[0].sectionName);
					window.top.location.href = courses[0].url;
				}
			},
		});
	});

	player.addListener('time', timeHandler);
}

function playInit() {
	removePauseBlur();
	createPlaylistBox();
	createControllerBox();
	createMultiSegmentBox();

	GM_addValueChangeListener(
		'courses',
		function (name, oldValue, newValue, remote) {
			removePlaylistBox();
			createPlaylistBox();
		}
	);

	let checkPlayerTimer = setInterval(function () {
		if (!player) return;
		clearInterval(checkPlayerTimer);
		setTimeout(function () {
			GM_addValueChangeListener(
				'autoPlay',
				function (name, oldValue, newValue, remote) {
					if (newValue) {
						player.videoPlay();
					}
				}
			);
			GM_addValueChangeListener(
				'mute',
				function (name, oldValue, newValue, remote) {
					if (newValue) {
						player.videoMute();
					} else {
						player.videoEscMute();
					}
				}
			);
			GM_addValueChangeListener(
				'drag',
				function (name, oldValue, newValue, remote) {
					player.changeConfig('config', 'timeScheduleAdjust', newValue);
				}
			);
			GM_addValueChangeListener(
				'speed',
				function (name, oldValue, newValue, remote) {
					player.changePlaybackRate(newValue);
				}
			);

			playerInit();

			setInterval(playerInit, 1000);
		}, 1000);
	}, 500);
}
