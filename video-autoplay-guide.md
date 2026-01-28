# 视频自动播放功能说明

## 🎬 功能特性

### 已实现的功能

1. **视频预加载**
   - 使用 `preload="auto"` 属性
   - 浏览器会在页面加载时预先下载视频
   - 滚动到视频位置时可以立即播放

2. **视频比例保持**
   - 使用 `aspect-ratio: 16 / 9` CSS属性
   - 视频容器始终保持16:9比例
   - 视频内容居中显示（object-fit: contain）

3. **可视区域自动播放**
   - 检测视频是否进入可视区域
   - 视频完全可见时自动播放
   - 不静音播放（保留原声）

4. **浏览器兼容**
   - 考虑浏览器自动播放策略限制
   - 需要用户首次交互后才能自动播放
   - 播放失败时有错误提示

## 🔧 技术实现

### HTML代码

```html
<video id="inheritorVideo" preload="auto" poster="../images/modules/module1/视频封面-传承人谈起源.jpg">
    <source src="../media/video/performance/百年文脉传承人谈起源.mp4" type="video/mp4">
    您的浏览器不支持视频播放。
</video>
```

**关键属性说明**：
- `id="inheritorVideo"`：视频唯一标识符，供JavaScript调用
- `preload="auto"`：预加载视频元数据和部分内容
- `poster="..."`：视频封面图

### CSS代码

```css
.video-wrapper video {
    width: 100%;
    aspect-ratio: 16 / 9;  /* 保持16:9比例 */
    display: block;
    background: #000;
    object-fit: contain;    /* 视频内容居中显示 */
}
```

**关键属性说明**：
- `aspect-ratio: 16 / 9`：视频容器保持16:9比例
- `object-fit: contain`：视频内容完整显示，保持原始比例

### JavaScript代码

```javascript
// 检测元素是否在可视区域内
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 自动播放视频
let hasInteracted = false;

// 监听用户的首次交互
document.addEventListener('click', function() {
    hasInteracted = true;
}, { once: true });

document.addEventListener('scroll', function() {
    const video = document.getElementById('inheritorVideo');

    if (video && hasInteracted && !video.playing && isElementInViewport(video)) {
        // 检查视频是否已准备好播放
        if (video.readyState >= 2) {
            video.play().catch(error => {
                console.log('自动播放失败，可能需要用户点击：', error);
            });
            video.playing = true;
        }
    }
}, { passive: true });

// 视频播放状态标记
const video = document.getElementById('inheritorVideo');
if (video) {
    video.playing = false;
    video.addEventListener('playing', () => {
        video.playing = true;
    });
    video.addEventListener('pause', () => {
        video.playing = false;
    });
}
```

**功能说明**：
- `isElementInViewport()`：检测元素是否完全在可视区域内
- `hasInteracted`：记录用户是否已与页面交互
- `video.readyState >= 2`：检查视频是否已加载足够数据
- `video.play().catch()`：尝试播放，失败时捕获错误
- `{ passive: true }`：优化滚动性能

## 📊 浏览器自动播放策略

### Chrome/Edge

**自动播放规则**：
- 静音视频：始终可以自动播放
- 非静音视频：需要用户与页面交互后才能自动播放

**触发条件**：
- 用户点击页面任意位置
- 用户触摸屏幕
- 用户按键

### Firefox

**自动播放规则**：
- 默认与Chrome相同
- 可在 `about:config` 中修改设置

**设置方法**：
```
media.autoplay.default = 0 (允许所有)
media.autoplay.default = 1 (阻止所有)
media.autoplay.default = 2 (阻止有声，允许无声)
```

### Safari

**自动播放规则**：
- 与Chrome/Edge相同
- iOS Safari更严格

**触发条件**：
- 用户点击页面
- 视频在首屏加载

## 🎯 使用场景

### 场景1：用户点击后滚动
1. 用户在页面任意位置点击
2. 向下滚动到视频位置
3. 视频自动开始播放

### 场景2：视频在首屏
1. 页面加载时视频已在可视区域
2. 用户点击页面
3. 视频自动开始播放

### 场景3：用户手动控制
1. 用户可以点击播放/暂停按钮
2. 视频控件始终可见
3. 不影响自动播放逻辑

## ⚠️ 注意事项

### 1. 首次交互要求
- 现代浏览器要求用户先与页面交互
- 页面加载后不会自动播放
- 用户点击任意位置后，滚动时自动播放生效

### 2. 网络条件
- 视频预加载需要网络支持
- 网络慢时可能无法及时加载
- 建议优化视频文件大小

### 3. 性能考虑
- 滚动事件使用 `{ passive: true }` 优化
- 检查 `video.readyState` 避免频繁调用
- 标记播放状态防止重复播放

### 4. 移动端优化
- 移动网络环境下建议降低码率
- 可考虑使用自适应码率
- 提供不同分辨率版本

## 🔍 调试方法

### 检查视频状态

在浏览器控制台执行：
```javascript
const video = document.getElementById('inheritorVideo');
console.log('就绪状态:', video.readyState);
console.log('播放状态:', video.playing);
console.log('当前时间:', video.currentTime);
console.log('总时长:', video.duration);
```

### 查看自动播放错误

在浏览器控制台查看日志：
```javascript
// 自动播放失败时会显示错误信息
console.log('自动播放失败，可能需要用户点击：', error);
```

### 测试可视区域检测

```javascript
console.log('视频在可视区域内:', isElementInViewport(video));
```

## 🎨 自定义配置

### 修改视频比例

如果视频不是16:9，修改CSS：
```css
.video-wrapper video {
    aspect-ratio: 4 / 3;  /* 4:3比例 */
    /* 或 */
    aspect-ratio: 21 / 9; /* 超宽屏 */
}
```

### 调整预加载行为

修改HTML：
```html
<!-- 不预加载 -->
<video preload="none">
<!-- 仅预加载元数据 -->
<video preload="metadata">
<!-- 预加载全部（默认）-->
<video preload="auto">
```

### 改为静音自动播放

```html
<video id="inheritorVideo" preload="auto" muted>
```

或JavaScript中：
```javascript
video.muted = true;
video.play();
```

### 调整可视区域触发条件

修改 `isElementInViewport()` 函数：
```javascript
// 只要部分可见就触发
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right > 0
    );
}
```

## 📱 兼容性

### CSS aspect-ratio

- Chrome 88+
- Firefox 89+
- Safari 15+
- Edge 88+

**降级方案**：
```css
.video-wrapper video {
    width: 100%;
    height: auto;
    /* 不支持的浏览器会忽略 aspect-ratio */
}
```

### video preload

- 所有现代浏览器
- 部分旧浏览器可能不遵循设置

## 🚀 性能优化建议

1. **视频压缩**
   - 使用H.264编码
   - 合理码率（1080p: 5-8Mbps）
   - 音频AAC 128kbps

2. **CDN加速**
   - 将视频托管在CDN
   - 使用HTTPS协议

3. **自适应码率**
   - 提供多个分辨率版本
   - 根据网络条件选择

4. **懒加载**
   - 非首屏视频延迟加载
   - 使用Intersection Observer API

## 💡 常见问题

### Q1: 视频不自动播放？
A: 需要用户先与页面交互（点击任意位置）

### Q2: 视频比例不对？
A: 检查 `aspect-ratio` 设置，确保与视频源一致

### Q3: 视频加载慢？
A: 检查网络，考虑压缩视频或使用CDN

### Q4: 移动端不播放？
A: 移动浏览器限制更严格，建议改为静音自动播放

---

**最后更新**：2026-01-26
