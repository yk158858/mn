# 图片文件夹说明

本文件夹用于存放南曲非遗文化专题网站的所有图片资源。

## 📁 文件夹结构

```
images/
├── hero/           # 首页横幅图片
├── modules/        # 模块相关图片
│   ├── module1/    # 模块一：丝弦溯古
│   ├── module2/    # 模块二：现代弦歌
│   ├── module3/    # 模块三：雅韵思辨
│   └── module4/    # 模块四：弦音互动
├── banners/        # 各页面横幅图片
├── content/        # 内容页面图片
│   ├── photos/     # 照片素材
│   ├── videos/     # 视频封面
│   └── historical/ # 历史资料图片
└── icons/         # 图标和UI元素
```

## 📂 各文件夹用途

### hero/ - 首页横幅图片
存放首页横幅区域使用的背景图片、装饰图片等。

**建议图片规格：**
- 背景图：1920x1080px 或更大
- 装饰元素：PNG格式，透明背景
- 横幅横图：1600x600px

**命名规范：**
- `hero-bg.jpg` - 主背景图
- `hero-decoration-1.png` - 装饰元素1
- `hero-decoration-2.png` - 装饰元素2

### modules/ - 模块相关图片
各模块的代表性图片，用于模块卡片展示。

**建议图片规格：**
- 模块卡片：400x300px
- 模块横幅：1920x400px

**命名规范：**
```
modules/
├── module1/
│   ├── card-photo.jpg       # 模块卡片图
│   ├── banner.jpg         # 模块横幅
│   └── content-01.jpg    # 内容图片
```

### banners/ - 各页面横幅图片
子页面顶部横幅图片。

**建议图片规格：**
- 页面横幅：1920x300px 或 1920x400px

**命名规范：**
- `banner-module1-index.jpg` - 模块一首页横幅
- `banner-module1-page1.jpg` - 模块一页面1横幅

### content/ - 内容页面图片
各模块内容页面使用的图片素材。

#### photos/ - 照片素材
- 表演现场照片
- 文物照片
- 人物照片
- 景点照片

#### videos/ - 视频封面
- 视频播放器封面图
- 视频缩略图

#### historical/ - 历史资料图片
- 历史文献图片
- 老照片
- 乐谱图片

**命名规范：**
```
content/
├── photos/
│   ├── performance-01.jpg    # 表演照片1
│   ├── heritage-01.jpg       # 文物照片1
│   └── scenery-01.jpg       # 景点照片1
├── videos/
│   ├── video-thumb-01.jpg    # 视频封面1
│   └── video-thumb-02.jpg    # 视频封面2
└── historical/
    ├── score-01.jpg         # 乐谱图片1
    └── old-photo-01.jpg     # 老照片1
```

### icons/ - 图标和UI元素
网站使用的图标、按钮、装饰元素等。

**命名规范：**
- `icon-upload.png` - 上传图标
- `btn-submit.png` - 提交按钮
- `separator.png` - 分隔线
- `decoration-leaf.png` - 叶片装饰

## 📐 图片规格建议

### 首页横幅 (hero/)
- **背景图**：1920x1080px 或更大，JPG格式
- **装饰图**：PNG格式，透明背景

### 模块卡片 (modules/)
- **卡片图**：400x300px 或 800x600px
- **横幅图**：1920x400px 或 1600x500px

### 页面横幅 (banners/)
- **横幅图**：1920x300px 或 1920x400px

### 内容图片 (content/)
- **大图**：1200x800px 或更大
- **中图**：800x600px
- **小图**：400x300px
- **缩略图**：200x150px

### 图标 (icons/)
- **大图标**：64x64px 或 128x128px
- **小图标**：32x32px 或 48x48px
- **按钮图**：根据实际尺寸

## 🎨 图片格式建议

| 用途 | 推荐格式 | 说明 |
|------|---------|------|
| 照片 | JPG/JPEG | 高质量，文件较小 |
| 图标/Logo | PNG/SVG | 支持透明背景 |
| 插画 | PNG/SVG | 保证清晰度 |
| 视频封面 | JPG | 兼容性好 |
| 装饰元素 | PNG | 透明背景 |

## 📝 图片命名规范

### 通用规则
- 使用英文或拼音，避免中文
- 使用连字符 `-` 或下划线 `_`
- 使用小写字母
- 数字从01开始编号

### 推荐格式
```
类型-编号-描述.扩展名

示例：
performance-01-stage.jpg
photo-02-hall.jpg
banner-module1-index.jpg
```

### 避免的命名
```
❌ 图片1.jpg
❌ 表演照片.jpg
❌ IMG_20260123.jpg
✅ performance-01-stage.jpg
```

## 🎯 使用场景示例

### 首页
```html
<img src="../images/hero/hero-bg.jpg" alt="南曲横幅">
```

### 模块页面
```html
<img src="../images/modules/module1/banner.jpg" alt="丝弦溯古">
```

### 内容图片
```html
<img src="../images/content/photos/performance-01.jpg" alt="南曲表演">
```

### 图标
```html
<img src="../images/icons/icon-upload.png" alt="上传">
```

## 📊 图片优化建议

### 1. 文件大小控制
- 照片类：每张不超过 500KB
- 横幅图：每张不超过 800KB
- 图标类：每张不超过 50KB

### 2. 压缩工具推荐
- 在线工具：TinyPNG, Squoosh
- 本地工具：ImageOptim, FileOptimizer
- Photoshop："存储为Web格式"

### 3. 多尺寸准备
准备多个尺寸版本：
- 大图（@2x, @3x）用于高清屏
- 中图用于普通显示
- 小图用于缩略图

### 4. 懒加载
大图使用懒加载技术：
```html
<img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy">
```

## 🚀 快速开始

### 1. 准备图片
按照上述规范准备图片素材。

### 2. 放置图片
将图片放入对应的文件夹中。

### 3. 引用图片
在HTML中使用相对路径引用：
```html
<img src="../images/文件夹/文件名.扩展名" alt="描述">
```

### 4. 测试显示
在浏览器中检查图片是否正确加载和显示。

## 📌 注意事项

1. **版权**：确保使用的图片有合法使用权
2. **质量**：保证图片清晰度，避免模糊
3. **格式**：选择合适的格式，注意兼容性
4. **命名**：按照规范命名，方便管理和维护
5. **备份**：重要图片建议备份到云端
6. **描述**：添加有意义的 alt 文本，利于SEO和无障碍访问

## 📞 联系方式

如有图片相关问题，请联系：
- 邮箱：contact@nanqu.com

---

*文档最后更新时间：2026年1月23日*
