# 音视频素材使用指南

## 🎯 快速开始

### 第一步：准备文件
准备南曲相关的音视频素材：
- 背景音乐（南曲主题音乐）
- 演奏录音（经典曲段）
- 演奏视频（完整表演）
- 教学视频（学唱教程）

### 第二步：文件分类
按照文件夹结构存放文件：

```
media/audio/background/    → 背景音乐
media/audio/performance/   → 演奏音频
media/video/background/     → 背景视频
media/video/performance/   → 演奏视频
media/video/tutorial/      → 教学视频
```

### 第三步：命名文件
使用清晰的中文或拼音命名：
```
南曲背景音乐.mp3
曲段1-月下独酌.mp3
完整演奏-音乐会.mp4
学唱教学-第一章.mp4
```

### 第四步：压缩优化
- 音频：128kbps-192kbps MP3格式
- 视频：H.264编码，3-8Mbps码率

### 第五步：在页面中使用
参考下方代码示例

## 📝 代码示例

### 背景音乐（循环播放）
```html
<audio id="bgMusic" loop>
    <source src="media/audio/background/南曲背景音乐.mp3" type="audio/mpeg">
</audio>

<script>
// 播放背景音乐
document.getElementById('bgMusic').play();
</script>
```

### 音频播放器（带控制）
```html
<audio controls style="width: 100%; margin: 20px 0;">
    <source src="media/audio/performance/曲段1.mp3" type="audio/mpeg">
    <source src="media/audio/performance/曲段1.ogg" type="audio/ogg">
    您的浏览器不支持音频播放。
</audio>
```

### 视频播放器（带控制）
```html
<div class="video-container">
    <h3>完整演奏</h3>
    <video controls width="100%" poster="images/videos/poster.jpg">
        <source src="media/video/performance/完整演奏.mp4" type="video/mp4">
        <source src="media/video/performance/完整演奏.webm" type="video/webm">
        您的浏览器不支持视频播放。
    </video>
</div>
```

### 背景视频（自动播放）
```html
<div class="video-background">
    <video muted loop autoplay class="bg-video">
        <source src="media/video/background/演出现场.mp4" type="video/mp4">
    </video>
    <div class="content">
        <h1>五峰南曲</h1>
        <p>传承百年的艺术瑰宝</p>
    </div>
</div>

<style>
.video-background {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.bg-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.content {
    position: relative;
    z-index: 1;
    padding: 2rem;
}
</style>
```

### 多曲目播放列表
```html
<div class="audio-player">
    <h3>曲段欣赏</h3>
    <div class="playlist">
        <button onclick="playTrack(0)">1. 月下独酌</button>
        <button onclick="playTrack(1)">2. 高山流水</button>
        <button onclick="playTrack(2)">3. 阳春白雪</button>
    </div>
    <audio id="audioPlayer" controls></audio>
</div>

<script>
const tracks = [
    'media/audio/performance/曲段1-月下独酌.mp3',
    'media/audio/performance/曲段2-高山流水.mp3',
    'media/audio/performance/曲段3-阳春白雪.mp3'
];

function playTrack(index) {
    const player = document.getElementById('audioPlayer');
    player.src = tracks[index];
    player.play();
}
</script>
```

## 🎨 样式建议

### 音频播放器样式
```css
audio {
    width: 100%;
    margin: 20px 0;
    border-radius: 10px;
}

.audio-player {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.playlist button {
    display: block;
    width: 100%;
    padding: 10px 20px;
    margin: 5px 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    text-align: left;
}

.playlist button:hover {
    background: #4a7c23;
    color: white;
}
```

### 视频播放器样式
```css
.video-container {
    max-width: 800px;
    margin: 30px auto;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.video-container h3 {
    padding: 20px;
    margin: 0;
    background: #f5f5f5;
}

video {
    display: block;
    width: 100%;
}
```

## 📊 常见问题

### 1. 音频无法自动播放？
**原因**：现代浏览器限制自动播放
**解决**：添加用户交互触发，或设置 muted

```javascript
// 用户点击后播放
document.body.addEventListener('click', () => {
    document.getElementById('bgMusic').play();
});
```

### 2. 视频加载慢？
**原因**：文件太大或网络慢
**解决**：
- 压缩视频文件
- 使用CDN加速
- 添加加载提示
- 使用视频预加载

```html
<video preload="auto">...</video>
```

### 3. 格式不兼容？
**解决**：提供多种格式

```html
<video>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <source src="video.ogv" type="video/ogg">
</video>
```

### 4. 移动端播放问题？
**解决**：
- 使用适合移动端的分辨率（720p）
- 确保支持H.264编码
- 添加poster封面图

## 🔧 工具推荐

### 音频编辑
- **Audacity**（免费）：音频编辑和转换
- **FFmpeg**：命令行音频转换
- **在线工具**：Convertio, CloudConvert

### 视频编辑
- **HandBrake**（免费）：视频压缩和转换
- **FFmpeg**：专业视频处理
- **Adobe Media Encoder**：专业编码
- **在线工具**：CloudConvert, Online-Convert

### 文件压缩
- **图片**：TinyPNG, ImageOptim
- **音频**：Audacity, FFmpeg
- **视频**：HandBrake, FFmpeg

## 📚 参考资源

- [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [MDN HTML Audio and Video](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)
- [Can I Use - Browser Support](https://caniuse.com/)

---

**最后更新**：2026-01-26
