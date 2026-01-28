# 音视频素材文件夹说明

## 📁 文件夹结构

```
d:/projects/南曲/media/
├── audio/               # 音频文件
│   ├── background/      # 背景音乐
│   │   ├── 南曲背景音乐.mp3
│   │   └── 环境音效.mp3
│   └── performance/     # 演奏音频
│       ├── 曲段1.mp3
│       ├── 曲段2.mp3
│       └── 伴奏.mp3
└── video/              # 视频文件
    ├── background/     # 背景视频
    │   ├── 演出现场.mp4
    │   └── 风景背景.mp4
    ├── performance/    # 演奏视频
    │   ├── 完整演奏.mp4
    │   ├── 曲段演示.mp4
    │   └── 乐器展示.mp4
    └── tutorial/       # 教学视频
        ├── 学唱教学.mp4
        └── 乐器讲解.mp4
```

## 📋 文件夹用途

### audio/ 音频文件夹

#### background/ 背景音乐
存放用于页面背景的音频文件：
- 南曲背景音乐
- 淡雅环境音效
- 主题音乐

**文件格式**：MP3, OGG, WAV
**推荐规格**：
- 比特率：128kbps - 320kbps
- 采样率：44.1kHz 或 48kHz
- 时长：循环播放

#### performance/ 演奏音频
存放南曲演奏录音：
- 完整曲段
- 经典唱段
- 乐器独奏

**文件格式**：MP3, WAV
**推荐规格**：
- 比特率：192kbps - 320kbps
- 采样率：44.1kHz 或 48kHz

### video/ 视频文件夹

#### background/ 背景视频
存放用于页面背景或装饰的视频：
- 演出现场录像
- 风景背景视频
- 文化氛围视频

**文件格式**：MP4 (H.264编码)
**推荐规格**：
- 分辨率：1920x1080 (1080p) 或 1280x720 (720p)
- 码率：3-5 Mbps (1080p)
- 帧率：24fps 或 30fps

#### performance/ 演奏视频
存放南曲演奏视频：
- 完整演奏录像
- 曲段演示
- 乐器展示

**文件格式**：MP4 (H.264编码)
**推荐规格**：
- 分辨率：1920x1080 (1080p)
- 码率：5-8 Mbps (1080p)
- 帧率：30fps
- 音频：AAC, 128kbps

#### tutorial/ 教学视频
存放教学和讲解视频：
- 学唱教程
- 乐器讲解
- 曲谱演示

**文件格式**：MP4 (H.264编码)
**推荐规格**：
- 分辨率：1280x720 (720p) 或 1920x1080 (1080p)
- 码率：3-5 Mbps (720p)
- 帧率：30fps
- 时长：5-30分钟

## 📝 命名规范

### 音频文件命名
```
南曲背景音乐.mp3
曲段1-月下独酌.mp3
曲段2-高山流水.mp3
演奏录音-张三.mp3
```

### 视频文件命名
```
演出现场-音乐会.mp4
学唱教学-第一章.mp4
乐器展示-三弦讲解.mp4
```

**命名规则**：
- 使用中文或拼音
- 包含内容描述
- 避免特殊字符
- 使用下划线或连字符分隔

## 🎨 使用场景

### 背景音乐
- 首页横幅背景音乐
- 各模块页面氛围音乐
- 互动页面背景音效

### 演奏音频
- 曲段学唱模块
- 音频播放器
- 伴奏下载

### 背景视频
- 首页背景视频（可选）
- 页面装饰视频
- 氛围营造

### 演奏视频
- 视频播放器
- 表演展示
- 精彩片段

### 教学视频
- 学唱教学
- 乐器讲解
- 曲谱演示

## 💾 文件大小建议

| 类型 | 最大文件大小 | 推荐文件大小 |
|------|------------|------------|
| 背景音乐 | 10MB | 2-5MB |
| 演奏音频 | 20MB | 5-15MB |
| 背景视频 | 50MB | 10-30MB |
| 演奏视频 | 200MB | 50-150MB |
| 教学视频 | 500MB | 100-300MB |

## 🌐 HTML引用示例

### 音频播放
```html
<!-- 背景音乐 -->
<audio id="bgMusic" loop>
    <source src="media/audio/background/南曲背景音乐.mp3" type="audio/mpeg">
</audio>

<!-- 演奏音频 -->
<audio controls>
    <source src="media/audio/performance/曲段1.mp3" type="audio/mpeg">
</audio>
```

### 视频播放
```html
<!-- 演奏视频 -->
<video controls width="800">
    <source src="media/video/performance/完整演奏.mp4" type="video/mp4">
</video>

<!-- 背景视频（ muted 静音 autoplay 自动播放） -->
<video muted loop autoplay class="bg-video">
    <source src="media/video/background/演出现场.mp4" type="video/mp4">
</video>
```

## ⚙️ 压缩优化建议

### 音频压缩
- 使用工具：Audacity, FFmpeg
- 格式：MP3 (LAME编码器)
- 比特率：128kbps-192kbps（平衡质量和大小）

### 视频压缩
- 使用工具：HandBrake, FFmpeg, Adobe Media Encoder
- 格式：MP4 (H.264编码)
- 码率控制：VBR 2-pass

## 📊 文件清单

### 需要准备的文件

#### 必需文件
- [ ] media/audio/background/南曲背景音乐.mp3
- [ ] media/audio/performance/曲段1.mp3
- [ ] media/video/performance/完整演奏.mp4

#### 可选文件
- [ ] media/audio/background/环境音效.mp3
- [ ] media/video/background/演出现场.mp4
- [ ] media/video/tutorial/学唱教学.mp4

## 🔧 技术说明

### 浏览器兼容性

#### 音频格式
- **MP3**：所有现代浏览器
- **OGG**：Firefox, Chrome
- **WAV**：所有浏览器（文件较大）

#### 视频格式
- **MP4 (H.264)**：所有现代浏览器
- **WebM**：Firefox, Chrome
- **Ogg**：Firefox, Chrome

### 自动播放限制
现代浏览器（Chrome, Safari等）禁止音频自动播放，除非：
1. 用户先与页面交互
2. 视频静音（muted）
3. 用户设置了自动播放权限

### 懒加载
对于大文件，建议使用懒加载：
```javascript
const video = document.querySelector('video');
video.addEventListener('click', () => {
    video.load();
});
```

## 📝 注意事项

1. **版权问题**：确保使用的音视频素材有合法使用权
2. **文件大小**：大文件会影响页面加载速度
3. **格式选择**：使用兼容性好的格式（MP3, MP4）
4. **备选格式**：提供多种格式以确保兼容性
5. **加载优化**：考虑使用CDN加速大文件下载
6. **移动端**：移动网络环境下自动播放可能受限

## 🚀 快速开始

1. 准备音视频素材文件
2. 按照文件夹结构分类存放
3. 按命名规范重命名文件
4. 压缩优化文件大小
5. 在HTML中引用使用

---

**最后更新**：2026-01-26
