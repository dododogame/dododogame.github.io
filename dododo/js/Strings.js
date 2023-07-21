function Strings() {
	throw new Error("This is a static class");
}

Strings.LANGUAGES = {
	"en-US": "English (United States)",
	"zh-CN": "中文 (中国)",
	"zh-TW": "中文 (臺灣)",
	"ja-JP": "日本語 (日本)",
};

Strings["en-US"] = {
	// miscellaneous
	"gameTitle": "Dododo",
	"ok": "OK",
	"back": "Back",
	"loading": "Loading...",
	
	// title page
	"browseFiles": "Browse files",
	"browseStore": "Browse store",
	"browseHistory": "Browse history",
	"preferences": "Preferences",
	"versionFormat": "Ver. %s",
	
	// browse files
	"uploadAudio": "Upload audio",
	"uploadBeatmap": "Upload beatmap",
	"uploadRecording": "Upload replay",
	"noBeatmapWarning": "Upload a beatmap first",
	"title": "Music",
	"musicAuthor": "Artist",
	"beatmapAuthor": "Beatmapper",
	"difficulty": "Difficulty",
	"defaultDifficulty": "unknown",
	"length": "Length",
	
	// browse store
	
	// browse history
	
	// pre-game error
	"failedToLoad": "Failed to load files",
	"infoForBeatmapper": "Provide the following info for the beatmapper:",
	"copy": "Copy",
	
	// PSE warning
	"pseWarningTitle": "Seizure warning",
	"pseWarningContents": "This beatmap contains flickers, flashes, blinks, or moving geometric shapes, " +
		"which may potentially trigger seizures for people with photosensitive epilepsy. " +
		"It is recommended to turn off ornamental judgement line performances before playing this beatmap. " +
		"Immediately stop playing and consult a doctor if you experience any symptoms, such as " +
		"lightheadedness, altered vision, eye or face twitching, jerking or shaking of arms or legs, " +
		"disorientation, confusion, or momentary loss of awareness.",
	"turnOffPerformances": "Turn off judgement line performances and play",
	"playAnyway": "Play anyway",
	
	// in-game
	"quitGame": "Back",
	"restartGame": "Restart",
	"retryCounter": "%d retry(ies)",
	"perfect": "Perfect",
	"good": "Good",
	"bad": "Bad",
	"miss": "Miss",
	"excess": "Excess",
	"maxCombo": "Max combo",
	"markP": "P",
	"markS": "S",
	"markA": "A",
	"markB": "B",
	"markC": "C",
	"markD": "D",
	"markE": "E",
	"markF": "F",
	"markG": "G",
	"fullCombo": "FC",
	"viewRecording": "Watch replay",
	"saveRecording": "Save replay",
	
	// in-game display of modifiers
	"inGame_playRate": "%fx speed",
	"inGame_autoPlay": "Auto-play",
	"inGame_noFail": "No-fail",
	"inGame_noBad": "No-bad",
	"inGame_noExcess": "No-excess",
	"inGame_judgementWindow": "%fx judge",
	"inGame_autoCompleteHolds": "Auto-hold",
	
	// preferences: modifiers
	"modifiers": "Modifiers",
	"playRate": "Play rate (speed of music)",
	"autoPlay": "Auto-play mode",
	"noFail": "Never-fail mode",
	"noBad": "No-bad mode",
	"noExcess": "No-excess mode",
	"judgementWindow": "Judgement window (smaller is stricter)",
	"autoCompleteHolds": "Automatically hold for hold notes",
	
	// preferences: gameplay
	"gameplay": "Gameplay",
	"offset": "Offset (in ms)",
	"offsetWizard": "Offset wizard",
	"countdown": "Show countdown before resuming",
	"autoRestartFail": "Automatically restart when failing",
	"autoRestartGood": "Automatically restart when failing to AP",
	"autoRestartMiss": "Automatically restart when failing to FC",
	"F8Pause": "Press F8 to pause",
	"backtickRestart": "Press backtick to restart",
	"autoPause": "Automatically pause when losing focus",
	"recordVisual": "Record visual preferences to replay file",
	"pseWarning": "Show seizure warning",
	
	// preferences: visual
	"visual": "Visual",
	"FCAPIndicator": "Full combo / all perfect indicator",
	"TPSIndicator": "Taps per second indicator",
	"judgementLinePerformances": "Enable ornamental judgement line effects",
	"flashWarningGood": "Warn by flash the screen at good hits",
	"flashWarningMiss": "Warn by flash the screen at combo breaks",
	"showInaccuracyData": "Show inaccuracy data",
	"comboPopupInterval": "Interval of combo popups (set 0 to disable)",
	"fadeIn": "Fade-in (ratio to resolution, 0 to disable)",
	"fadeOut": "Fade-out (ratio to resolution, 0 to disable)",
	"reverseVoices": "Reverse voices",
	"mirror": "Mirror (flip horizontally)",
	"mirrorLowerRow": "Mirror the lower row",
	"showKeyboard": "Show keyboard pressings",
	"subtractScore": "Subtract instead of adding score",
	"numbersHUD": "Show numbers of perfect hits etc. in-game",
	
	// preferences: geometry
	"geometry": "Geometry",
	"fontSize": "Font size",
	"textHeight": "Height of text lines",
	"margin": "Margins",
	"voicesHeight": "Height of voices",
	"stemsLength": "Length of note stems",
	"headsRadius": "Radius of note heads",
	"holdWidth": "Thickness of hold notes' tails (hold bar)",
	"beamsWidth": "Thickness of note beams",
	"beamsSpacing": "Spacing between note beams",
	"unconnectedBeamsLength": "Length of unconnected note beams",
	"barLinesHeight": "Height of bar lines",
	"hitEffectRadius": "Radius of hit effects",
	"distanceBetweenRows": "Distance between beatmap rows",
	
	// preferences: colors
	"colors": "Colors",
	"notesColor": "Color of hit notes",
	"auxiliariesColor": "Color of auxiliaries (bar lines etc)",
	"perfectColor": "Color of perfect hits",
	"goodColor": "Color of good hits",
	"badColor": "Color of bad hits",
	"missColor": "Color of missed hits",
	"excessColor": "Color of excess hits",
	"hpColor": "Color of HP bar",
	"textColor": "Color of foreground (texts etc)",
	"backgroundColor": "Color of background",
	
	// preferences: graphics
	"graphics": "Graphics",
	"graphicsWidth": "Resolution (width)",
	"graphicsHeight": "Resolution (height)",
	"useWebGL": "Use WebGL to render (refresh to take effect)",
	"showFPS": "Switch view of FPS (F2)",
	"stretchGraphics": "Stretch to fit the window (F3)",
	"fullscreen": "Toggle fullscreen (F4, F11)",
	"screenshot": "Take screenshot and copy (F9)",
	
	// preferences: audio
	"audio": "Audio",
	"enableHitSound": "Enable hit sound",
	"hitSound": "Hit sound",
	"hitSoundWithMusic": "Hit sound with music instead of input",
	"countdownBeats": "Beat by hit sound when counting down",
	"musicVolume": "Volume of music",
	"hitSoundVolume": "Volume of hit sound",
	"masterVolume": "Master volume",
	
	// preferences: system
	"system": "System",
	"language": "Language",
	"reset": "Reset all preferences to default",
	"confirmReset": "Reset all preferences to default?",
	"export": "Export preferences as JSON file",
	"import": "Import JSON file as preferences",
	"importFailure": "Failed to import due to %s",
	"wiki": "Go to the wiki of Dododo",
	"github": "Go to the GitHub repo of Dododo",
	"discord": "Join the Discord server of Dododo",
	
	// hit sounds
	"agogoBells": 'Agogo bells',
	"bassDrum": 'Bass drum',
	"bellTree": 'Bell tree',
	"cabasa": "Cabasa",
	"castanets": "Castanets",
	"chineseCymbal": "Chinese cymbal",
	"chineseHandCymbals1": "Chinese hand cymbals 1",
	"chineseHandCymbals2": "Chinese hand cymbals 2",
	"clashCymbals": "Clash cymbals",
	"cowbell1": "Cowbell 1",
	"cowbell2": "Cowbell 2",
	"djembe": "Djembe",
	"djundjun": "Dunun",
	"sheepsToenails": "Chajchas",
	"sleighBells": "Sleigh bells",
	"snareDrum1": "Snare drum 1",
	"snareDrum2": "Snare drum 2",
	"springCoil": "Spring coil",
	"surdo1": "Surdo 1",
	"surdo2": "Surdo 2",
	"tambourine1": "Tambourine 1",
	"tambourine2": "Tambourine 2",
	"whip": "Whip",
	"woodblock": "Woodblock"
};

Strings["zh-CN"] = {
	// miscellaneous
	"gameTitle": "Dododo",
	"ok": "确定",
	"back": "返回",
	"loading": "加载中...",
	
	// title page
	"browseFiles": "浏览文件",
	"browseStore": "浏览商店",
	"browseHistory": "浏览历史",
	"preferences": "设置",
	"versionFormat": "版本 %s",
	
	// browse files
	"uploadAudio": "上传音频文件",
	"uploadBeatmap": "上传谱面文件",
	"uploadRecording": "上传回放",
	"noBeatmapWarning": "请先上传谱面文件",
	"title": "曲目",
	"musicAuthor": "曲师",
	"beatmapAuthor": "谱师",
	"difficulty": "难度",
	"defaultDifficulty": "未知",
	"length": "长度",
	
	// browse store
	
	// browse history
	
	// pre-game error
	"failedToLoad": "加载文件失败",
	"infoForBeatmapper": "向谱师提供下列信息:",
	"copy": "复制",
	
	// PSE warning
	"pseWarningTitle": "癫痫发作警告",
	"pseWarningContents": "该谱面包含画面闪烁或移动的几何形状, 这可能会引发光敏性癫痫患者的癫痫发作. " +
		"建议在观看或游玩此谱面之前关闭装饰性判定线表演. " +
		"如果您出现任何症状, 例如头晕, 视力下降, 面部抽搐, 四肢抽搐, 迷失方向, 慌乱, 或暂时失去意识, " +
		"请立即停止游戏并咨询医生.",
	"turnOffPerformances": "关闭装饰性判定线表演并游玩",
	"playAnyway": "直接游玩",
	
	// in-game
	"quitGame": "返回",
	"restartGame": "重开",
	"retryCounter": "%d 次重开",
	"perfect": "完美",
	"good": "好",
	"bad": "坏",
	"miss": "小姐",
	"excess": "多余",
	"maxCombo": "最大连击数",
	"markP": "触",
	"markS": "优",
	"markA": "甲",
	"markB": "乙",
	"markC": "丙",
	"markD": "丁",
	"markE": "戊",
	"markF": "拉",
	"markG": "败",
	"fullCombo": "全连",
	"viewRecording": "看回放",
	"saveRecording": "保存回放",
	
	// in-game display of modifiers
	"inGame_playRate": "%fx 速",
	"inGame_autoPlay": "自动",
	"inGame_noFail": "不败",
	"inGame_noBad": "无坏",
	"inGame_noExcess": "无多余",
	"inGame_judgementWindow": "%fx 判",
	"inGame_autoCompleteHolds": "自动长押",
	
	// preferences: modifiers
	"modifiers": "模式",
	"playRate": "倍速",
	"autoPlay": "自动",
	"noFail": "不败模式",
	"noBad": "无坏模式",
	"noExcess": "无多余模式",
	"judgementWindow": "判定区间 (越小越严格)",
	"autoCompleteHolds": "自动长押",
	
	// preferences: gameplay
	"gameplay": "游戏",
	"offset": "音频延迟 (毫秒)",
	"offsetWizard": "调延迟工具",
	"countdown": "继续前倒计时",
	"autoRestartFail": "失败自动重开",
	"autoRestartGood": "全完美失败时自动重开",
	"autoRestartMiss": "全连失败时自动重开",
	"F8Pause": "按 F8 暂停",
	"backtickRestart": "按反引号重开",
	"autoPause": "失焦时自动暂停",
	"recordVisual": "在回放中记录视觉设置",
	"pseWarning": "显示癫痫发作警告",
	
	// preferences: visual
	"visual": "视觉",
	"FCAPIndicator": "全连/全完美指示器",
	"TPSIndicator": "每秒点击数指示器",
	"judgementLinePerformances": "启用装饰性判定线演出",
	"flashWarningGood": "爆好时闪屏警告",
	"flashWarningMiss": "断连时闪屏警告",
	"showInaccuracyData": "显示误差数据",
	"comboPopupInterval": "连击数弹出间隔 (0 为不弹出)",
	"fadeIn": "上隐距离 (与分辨率的比值, 0 为不上隐)",
	"fadeOut": "下隐距离 (与分辨率的比值, 0 为不下隐)",
	"reverseVoices": "声部反转",
	"mirror": "镜像 (左右反转)",
	"mirrorLowerRow": "镜像下方的行",
	"showKeyboard": "显示按键情况",
	"subtractScore": "从满分减分代替从零分加分",
	"numbersHUD": "在游戏中显示完美等的数量",
	
	// preferences: geometry
	"geometry": "几何",
	"fontSize": "字体大小",
	"textHeight": "行高",
	"margin": "页边距",
	"voicesHeight": "声部的高度",
	"stemsLength": "符杆的长度",
	"headsRadius": "符头的半径",
	"holdWidth": "面条的粗细度",
	"beamsWidth": "符杠的粗细度",
	"beamsSpacing": "符杠的间距",
	"unconnectedBeamsLength": "孤符杠的长度",
	"barLinesHeight": "小节线的长度",
	"hitEffectRadius": "打击效果的半径",
	"distanceBetweenRows": "谱面行间距",
	
	// preferences: colors
	"colors": "颜色",
	"notesColor": "打击音符的颜色",
	"auxiliariesColor": "辅助物件 (小节线等) 的颜色",
	"perfectColor": "完美的颜色",
	"goodColor": "好的颜色",
	"badColor": "坏的颜色",
	"missColor": "漏失的颜色",
	"excessColor": "多余的颜色",
	"hpColor": "血条的颜色",
	"textColor": "前景色 (应用于文字等)",
	"backgroundColor": "背景色",
	
	// preferences: graphics
	"graphics": "图像",
	"graphicsWidth": "分辨率 (宽)",
	"graphicsHeight": "分辨率 (高)",
	"useWebGL": "使用 WebGL 渲染 (刷新生效)",
	"showFPS": "切换 FPS 显示 (F2)",
	"stretchGraphics": "缩放以适配窗口 (F3)",
	"fullscreen": "切换全屏 (F4, F11)",
	"screenshot": "截屏并复制 (F9)",
	
	// preferences: audio
	"audio": "音频",
	"enableHitSound": "启用打击音",
	"hitSound": "打击音",
	"hitSoundWithMusic": "打击音跟随音乐而非输入",
	"countdownBeats": "倒数时用打击音提示节拍",
	"musicVolume": "音乐的音量",
	"hitSoundVolume": "打击音的音量",
	"masterVolume": "音量总控",
	
	// preferences: system
	"system": "系统",
	"language": "语言",
	"reset": "将所有设置项重设为默认状态",
	"confirmReset": "将所有设置项重设为默认状态?",
	"export": "导出设置为文件",
	"import": "导入设置",
	"importFailure": "导入失败, 由于 %s",
	"wiki": "打开 Dododo 的 wiki (英文网页)",
	"github": "打开 Dododo 的 GitHub 仓库",
	"discord": "加入 Dododo 的 Discord 服务器",
	
	// hit sounds
	"agogoBells": '阿哥哥铃',
	"bassDrum": '大鼓',
	"bellTree": '树铃',
	"cabasa": "铁沙铃",
	"castanets": "响板",
	"chineseCymbal": "中国钹",
	"chineseHandCymbals1": "中国手钹 1",
	"chineseHandCymbals2": "中国手钹 2",
	"clashCymbals": "手钹",
	"cowbell1": "牛铃 1",
	"cowbell2": "牛铃 2",
	"djembe": "非洲鼓 1",
	"djundjun": "非洲鼓 2",
	"sheepsToenails": "羊脚趾",
	"sleighBells": "马铃",
	"snareDrum1": "小鼓 1",
	"snareDrum2": "小鼓 2",
	"springCoil": "弹簧线圈",
	"surdo1": "巴西低音鼓 1",
	"surdo2": "巴西低音鼓 2",
	"tambourine1": "铃鼓 1",
	"tambourine2": "铃鼓 2",
	"whip": "鞭",
	"woodblock": "响木"
};

Strings["zh-TW"] = {
	// miscellaneous
	"gameTitle": "Dododo",
	"ok": "確認",
	"back": "返回",
	"loading": "載入中...",
	
	// title page
	"browseFiles": "瀏覽文件",
	"browseStore": "瀏覽商店",
	"browseHistory": "瀏覽歷史",
	"preferences": "設定",
	"versionFormat": "版本 %s",
	
	// browse files
	"uploadAudio": "上載音頻文件",
	"uploadBeatmap": "上載譜面文件",
	"uploadRecording": "上載回放",
	"noBeatmapWarning": "請先上載譜面文件",
	"title": "曲目",
	"musicAuthor": "曲師",
	"beatmapAuthor": "譜師",
	"difficulty": "難度",
	"defaultDifficulty": "未知",
	"length": "長度",
	
	// browse store
	
	// browse history
	
	// pre-game error
	"failedToLoad": "載入文件失敗",
	"infoForBeatmapper": "向譜師提供下列信息:",
	"copy": "複刻",
	
	// PSE warning
	"pseWarningTitle": "癲癇發作警告",
	"pseWarningContents": "該譜麵包含畫面閃爍或移動的幾何形狀, 這可能會引發光敏性癲癇患者的癲癇發作. " +
		"建議在觀看或遊玩此譜面之前關閉裝飾性判定線表演. " +
		"如果您出現任何症狀, 例如頭暈, 視力下降, 面部抽搐, 四肢抽搐, 迷失方向, 慌亂, 或暫時失去意識, " +
		"請立即停止遊戲並諮詢醫生.",
	"turnOffPerformances": "關閉裝飾性判定線表演並遊玩",
	"playAnyway": "直接遊玩",
	
	// in-game
	"quitGame": "返回",
	"restartGame": "重開",
	"retryCounter": "%d 次重開",
	"perfect": "完美",
	"good": "好",
	"bad": "壞",
	"miss": "小姐",
	"excess": "多餘",
	"maxCombo": "最大連擊數",
	"markP": "觸",
	"markS": "優",
	"markA": "甲",
	"markB": "乙",
	"markC": "丙",
	"markD": "丁",
	"markE": "戊",
	"markF": "拉",
	"markG": "敗",
	"fullCombo": "全連",
	"viewRecording": "看回放",
	"saveRecording": "保存回放",
	
	// in-game display of modifiers
	"inGame_playRate": "%fx 速",
	"inGame_autoPlay": "自動",
	"inGame_noFail": "不敗",
	"inGame_noBad": "無壞",
	"inGame_noExcess": "無多餘",
	"inGame_judgementWindow": "%fx 判",
	"inGame_autoCompleteHolds": "自動長押",
	
	// preferences: modifiers
	"modifiers": "模式",
	"playRate": "倍速",
	"autoPlay": "自動",
	"noFail": "不敗模式",
	"noBad": "無壞模式",
	"noExcess": "無多餘模式",
	"judgementWindow": "判定區間 (越小越嚴格)",
	"autoCompleteHolds": "自動長押",
	
	// preferences: gameplay
	"gameplay": "遊戲",
	"offset": "音頻延遲 (毫秒)",
	"offsetWizard": "調延遲工具",
	"countdown": "繼續前倒計時",
	"autoRestartFail": "失敗自動重開",
	"autoRestartGood": "全完美失敗時自動重開",
	"autoRestartMiss": "全連失敗時自動重開",
	"F8Pause": "按 F8 暫停",
	"backtickRestart": "按反引號重開",
	"autoPause": "失焦時自動暫停",
	"recordVisual": "在回放中記錄視覺設定",
	"pseWarning": "顯示癲癇發作警告",
	
	// preferences: visual
	"visual": "視覺",
	"FCAPIndicator": "全連/全完美指示器",
	"TPSIndicator": "每秒點擊數指示器",
	"judgementLinePerformances": "啟用裝飾性判定線演出",
	"flashWarningGood": "爆好時閃屏警告",
	"flashWarningMiss": "斷連時閃屏警告",
	"showInaccuracyData": "顯示誤差數據",
	"comboPopupInterval": "連擊數彈出間隔 (0 為不彈出)",
	"fadeIn": "上隱距離 (與分辨率的比值, 0 爲不上隱)",
	"fadeOut": "下隱距離 (與分辨率的比值, 0 爲不下隱)",
	"reverseVoices": "聲部反轉",
	"mirror": "鏡像 (左右反轉)",
	"mirrorLowerRow": "鏡像下方的行",
	"showKeyboard": "顯示按鍵情況",
	"subtractScore": "從滿分減分代替從零分加分",
	"numbersHUD": "在遊戲中顯示完美等的數量",
	
	// preferences: geometry
	"geometry": "幾何",
	"fontSize": "字體大小",
	"textHeight": "行高",
	"margin": "頁邊距",
	"voicesHeight": "聲部的高度",
	"stemsLength": "符桿的長度",
	"headsRadius": "符頭的半徑",
	"holdWidth": "麵條的粗細度",
	"beamsWidth": "符槓的粗細度",
	"beamsSpacing": "符槓的間距",
	"unconnectedBeamsLength": "孤符槓的長度",
	"barLinesHeight": "小節線的長度",
	"hitEffectRadius": "打擊效果的半徑",
	"distanceBetweenRows": "譜面行間距",
	
	// preferences: colors
	"colors": "顏色",
	"notesColor": "打擊音符的顏色",
	"auxiliariesColor": "輔助物件 (小節線等) 的顏色",
	"perfectColor": "完美的顏色",
	"goodColor": "好的顏色",
	"badColor": "壞的顏色",
	"missColor": "漏失的顏色",
	"excessColor": "多餘的顏色",
	"hpColor": "血條的顏色",
	"textColor": "前景色 (應用於文字等)",
	"backgroundColor": "背景色",
	
	// preferences: graphics
	"graphics": "圖像",
	"graphicsWidth": "分辨率 (寬)",
	"graphicsHeight": "分辨率 (高)",
	"useWebGL": "使用 WebGL 渲染 (刷新生效)",
	"showFPS": "切換 FPS 顯示 (F2)",
	"stretchGraphics": "縮放以適配窗口 (F3)",
	"fullscreen": "切換全屏 (F4, F11)",
	"screenshot": "截屏並複製 (F9)",
	
	// preferences: audio
	"audio": "音頻",
	"enableHitSound": "啟用打擊音",
	"hitSound": "打擊音",
	"hitSoundWithMusic": "打擊音跟隨音樂而非輸入",
	"countdownBeats": "倒數時用打擊音提示節拍",
	"musicVolume": "音樂的音量",
	"hitSoundVolume": "打擊音的音量",
	"masterVolume": "音量總控",
	
	// preferences: system
	"system": "系統",
	"language": "語言",
	"reset": "將所有設定項重設為默認狀態",
	"confirmReset": "將所有設定項重設為默認狀態?",
	"export": "導出設定為文件",
	"import": "導入設定",
	"importFailure": "導入失敗, 由於 %s",
	"wiki": "打開 Dododo 的 wiki (英文網頁)",
	"github": "打開 Dododo 的 GitHub 倉庫",
	"discord": "加入 Dododo 的 Discord 伺服器",
	
	// hit sounds
	"agogoBells": '阿哥哥鈴',
	"bassDrum": '大鼓',
	"bellTree": '樹鈴',
	"cabasa": "鐵沙鈴",
	"castanets": "響板",
	"chineseCymbal": "中國鈸",
	"chineseHandCymbals1": "中國手鈸 1",
	"chineseHandCymbals2": "中國手鈸 2",
	"clashCymbals": "手鈸",
	"cowbell1": "牛鈴 1",
	"cowbell2": "牛鈴 2",
	"djembe": "非洲鼓 1",
	"djundjun": "非洲鼓 2",
	"sheepsToenails": "羊腳趾",
	"sleighBells": "馬鈴",
	"snareDrum1": "小鼓 1",
	"snareDrum2": "小鼓 2",
	"springCoil": "彈簧線圈",
	"surdo1": "巴西低音鼓 1",
	"surdo2": "巴西低音鼓 2",
	"tambourine1": "鈴鼓 1",
	"tambourine2": "鈴鼓 2",
	"whip": "樂鞭",
	"woodblock": "響木"
};

Strings["ja-JP"] = {
	// miscellaneous
	"gameTitle": "ドドド",
	"ok": "確認",
	"back": "戻る",
	"loading": "ロード中...",
	
	// title page
	"browseFiles": "ファイル",
	"browseStore": "ストアー",
	"browseHistory": "履歴",
	"preferences": "設定",
	"versionFormat": "バージョン %s",
	
	// browse files
	"uploadAudio": "音声ファイルをアップロードする",
	"uploadBeatmap": "譜面ファイルをアップロードする",
	"uploadRecording": "リプレイをアップロードする",
	"noBeatmapWarning": "最初に譜面ファイルをアップロードしてください",
	"title": "曲名",
	"musicAuthor": "作曲家",
	"beatmapAuthor": "譜面制作者",
	"difficulty": "難易度",
	"defaultDifficulty": "未知",
	"length": "長さ",
	
	// browse store
	
	// browse history
	
	// pre-game error
	"failedToLoad": "データの読み込みに失敗しました",
	"infoForBeatmapper": "譜面制作者に次の情報を提供する:",
	"copy": "コピー",
	
	// PSE warning
	"pseWarningTitle": "光過敏性てんかん警告",
	"pseWarningContents": "このビートマップには, 光過敏性てんかんを持つ人々の発作を引き起こす可能性の " +
		"あるちらつき, フラッシュ, まばたき, または移動する幾何学的形状が含まれています. " +
		"このビートマップを再生する前に, 装飾判定ラインのパフォーマンスをオフにすることをお勧めします. " +
		"立ちくらみ, 視力の変化, 目や顔のけいれん, 腕や脚のけいれんや震え, 見当識障害, 混乱, 一時的な意識喪失などの症状が見られた場合は, " +
		"すぐにプレイを中止して医師に相談してください. ",
	"turnOffPerformances": "装飾判定ライン演出をオフにしてプレイ",
	"playAnyway": "直接でプレイ",
	
	// in-game
	"quitGame": "戻る",
	"restartGame": "リスタート",
	"perfect": "Perfect",
	"good": "Good",
	"bad": "Bad",
	"miss": "Miss",
	"excess": "Excess",
	"maxCombo": "最大コンボ数",
	"markP": "P",
	"markS": "S",
	"markA": "A",
	"markB": "B",
	"markC": "C",
	"markD": "D",
	"markE": "E",
	"markF": "F",
	"fullCombo": "FC",
	"viewRecording": "リプレイを見る",
	"saveRecording": "リプレイを保存する",
	
	// in-game display of modifiers
	"inGame_playRate": "%fx スピード",
	"inGame_autoPlay": "オートプレイ",
	"inGame_noFail": "No-fail",
	"inGame_noBad": "No-bad",
	"inGame_noExcess": "No-excess",
	"inGame_judgementWindow": "%fx 判",
	"inGame_autoCompleteHolds": "Auto-hold",
	
	// preferences: modifiers
	"modifiers": "モード",
	"playRate": "倍速",
	"autoPlay": "オートプレイ",
	"noFail": "No-fail モード",
	"noBad": "No-Bad モード",
	"noExcess": "No-excess モード",
	"judgementWindow": "判定幅 (小さいほど厳しい)",
	"autoCompleteHolds": "Hold ノートを自動的にコンボする",
	
	// preferences: gameplay
	"gameplay": "ゲームプレイ",
	"offset": "オフセット (ms)",
	"offsetWizard": "オフセットウィザード",
	"countdown": "ゲームに戻る前にカウントダウンを表示する",
	"autoRestartFail": "Failは自動的にリスタートする",
	"autoRestartGood": "APに失敗すると自動的にリスタートする",
	"autoRestartMiss": "FCに失敗すると自動的にリスタートする",
	"F8Pause": "F8 で一時停止する",
	"backtickRestart": "バックティックでリスタートする",
	"autoPause": "フォーカスを失うと自動的に一時停止する",
	"recordVisual": "ビジュアル設定をリプレイファイルに記録する",
	
	// preferences: visual
	"visual": "ビジュアル",
	"FCAPIndicator": "Full combo / all perfect インジケータ",
	"TPSIndicator": "Taps per second インジケータ",
	"judgementLinePerformances": "装飾判定ライン効果を有効にする",
	"flashWarningGood": "Good ヒットで画面をフラッシュして警告する",
	"flashWarningMiss": "コンボブレイク時に画面をフラッシュして警告する",
	"showInaccuracyData": "不正確なデータを表示する",
	"comboPopupInterval": "コンボ数を表示する間隔 (0は無効にする)",
	"fadeIn": "フェードイン (解像度比 0は無効にする)",
	"fadeOut": "フェードアウト (解像度比 0は無効にする)",
	"reverseVoices": "声部反転",
	"mirror": "ミラー (左右反転)",
	"showKeyboard": "キーボードの押下を表示する",
	"subtractScore": "スコアを追加する代わりに減算する",
	"numbersHUD": "ゲーム内の Perfect ヒット数などを表示する",
	
	// preferences: geometry
	"geometry": "ジオメトリ",
	"fontSize": "フォントサイズ",
	"textHeight": "テキストの高さ",
	"margin": "マージン",
	"voicesHeight": "声部の高さ",
	"stemsLength": "符幹の長さ",
	"headsRadius": "符頭の半径",
	"holdWidth": "Hold ノートの幅",
	"beamsWidth": "ビームの幅",
	"beamsSpacing": "ビームの間隔",
	"unconnectedBeamsLength": "孤立ビームの長さ",
	"barLinesHeight": "小節線の長さ",
	"hitEffectRadius": "ヒット効果の半径",
	"distanceBetweenRows": "譜面の行間隔",
	
	// preferences: colors
	"colors": "色",
	"notesColor": "ノートの色",
	"auxiliariesColor": "マイナーパート (小節線など) の色",
	"perfectColor": "Perfect の色",
	"goodColor": "Good の色",
	"badColor": "Bad の色",
	"missColor": "Miss の色",
	"excessColor": "Excess の色",
	"textColor": "前景色 (テキストなど)",
	"backgroundColor": "背景色",
	
	// preferences: graphics
	"graphics": "グラフィック",
	"graphicsWidth": "解像度 (横の長さ)",
	"graphicsHeight": "解像度 (縦の長さ)",
	"useWebGL": "WebGL でレンダリング (ページを更新する)",
	"showFPS": "FPSを表示を切り替える (F2)",
	"stretchGraphics": "ウィンドウに合わせてストレッチ (F3)",
	"fullscreen": "フルスクリーン切り替える (F4, F11)",
	"screenshot": "クリップボードへのスクリーンショット (F9)",
	
	// preferences: audio
	"audio": "オーディオ",
	"enableHitSound": "ヒットサウンドを有効にする",
	"hitSound": "ヒットサウンド",
	"hitSoundWithMusic": "音楽に合わせてヒットサウンドを鳴ります",
	"countdownBeats": "カウントダウン中にヒットサウンドを鳴ります",
	"musicVolume": "ミュージックのボリューム",
	"hitSoundVolume": "ヒットサウンドのボリューム",
	"masterVolume": "全体のボリューム",
	
	// preferences: system
	"system": "システム",
	"language": "言語",
	"reset": "リセット",
	"confirmReset": "すべての設定をデフォルトの状態にリセットしますか?",
	"export": "設定をファイルにエクスポートする",
	"import": "設定をインポートする",
	"importFailure": "インポートは次の理由で失敗しました: %s",
	"wiki": "ドドドの wiki (英語ページ) を開く",
	"github": "ドドドの GitHub リポジトリを開く",
	"discord": "ドドドの Discord サーバーに参加する",
	
	// hit sounds
	"agogoBells": 'アゴゴベル',
	"bassDrum": 'ベースドラム',
	"bellTree": 'ベルツリー',
	"cabasa": "カバサ",
	"castanets": "カスタネット",
	"chineseCymbal": "中華シンバル",
	"chineseHandCymbals1": "中華ハンドシンバル 1",
	"chineseHandCymbals2": "中華ハンドシンバル 2",
	"clashCymbals": "ハンドシンバル",
	"cowbell1": "カウベル 1",
	"cowbell2": "カウベル 2",
	"djembe": "アフリカンドラム 1",
	"djundjun": "アフリカンドラム 2",
	"sheepsToenails": "チャフチャス",
	"sleighBells": "スレイベル",
	"snareDrum1": "スネアドラム 1",
	"snareDrum2": "スネアドラム 2",
	"springCoil": "巻きばね",
	"surdo1": "スルド 1",
	"surdo2": "スルド 2",
	"tambourine1": "タンバリン 1",
	"tambourine2": "タンバリン 2",
	"whip": "むち",
	"woodblock": "ウッドブロック"
};

for (const key of Object.keys(Strings["en-US"])) {
	Object.defineProperty(Strings, key, {get: () => Strings[preferences.language][key] || Strings["en-US"][key]})
}
