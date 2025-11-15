# Cookies 个人博客 - 使用说明

## 🎉 功能介绍

这个个人博客网站包含了以下主要功能：

### ✅ 已实现的功能

1. **可点击的标签页导航**
   - 修复了原有的锚点链接问题
   - 实现了真正的标签页切换功能
   - 支持键盘快捷键 (数字键 1-7)

2. **图片展示版块 (相册)**
   - 分类筛选功能 (全部、生活、工作、旅行、美食)
   - 响应式网格布局
   - 悬停动画效果
   - 无限滚动画廊

3. **背景音乐系统**
   - 自动播放背景音乐
   - 可视化控制按钮
   - 播放/暂停切换
   - 键盘快捷键 (Ctrl/Cmd + M)

4. **新增内容板块**
   - **成长历程**: 时间轴展示个人发展轨迹
   - **图片画廊**: 分类展示生活照片
   - **技能展示**: 动态技能条展示

5. **完善的代码注释**
   - 详细的函数说明
   - 功能模块划分清晰
   - 便于二次开发

## 🖼️ 如何导入和添加图片

### 方法 1: 使用在线图片链接 (推荐)

在 `index.html` 的图片画廊部分，找到对应的图片项目，修改如下：

```html
<!-- 原代码 -->
<div class="aspect-square bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center">
    <i class="fas fa-home text-white text-4xl"></i>
</div>

<!-- 修改为使用在线图片 -->
<div class="aspect-square">
    <img src="https://your-image-url.com/image.jpg" 
         alt="图片描述" 
         class="w-full h-full object-cover">
</div>
```

### 方法 2: 使用本地图片文件

1. **创建图片文件夹**
   在项目根目录创建 `images` 文件夹：
   ```
   /mnt/okcomputer/output/
   ├── index.html
   ├── main.js
   ├── README.md
   └── images/
       ├── life1.jpg
       ├── work1.jpg
       ├── travel1.jpg
       └── food1.jpg
   ```

2. **修改 HTML 代码**
   ```html
   <!-- 使用本地图片 -->
   <div class="aspect-square">
       <img src="images/life1.jpg" 
            alt="温馨家居" 
            class="w-full h-full object-cover">
   </div>
   ```

### 方法 3: 使用占位图片服务 (测试用)

```html
<!-- 使用 placeholder 服务 -->
<div class="aspect-square">
    <img src="https://picsum.photos/400/400?random=1" 
         alt="随机图片" 
         class="w-full h-full object-cover">
</div>
```

## 🎵 如何更换背景音乐

### 步骤 1: 准备音频文件

1. 将音频文件放入项目文件夹
2. 支持的格式：MP3, WAV, OGG
3. 推荐文件大小：< 5MB

### 步骤 2: 修改音频源

在 `index.html` 中找到音频标签：

```html
<audio id="backgroundMusic" loop>
    <!-- 修改为本地文件 -->
    <source src="music/background.mp3" type="audio/mpeg">
    
    <!-- 或使用在线音频 -->
    <source src="https://example.com/background.mp3" type="audio/mpeg">
    
    您的浏览器不支持音频播放。
</audio>
```

### 步骤 3: 自定义音乐控制

在 `main.js` 中可以修改音乐控制逻辑：

```javascript
// 修改音乐播放逻辑
function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        // 自定义暂停时的操作
    } else {
        backgroundMusic.play().then(() => {
            // 自定义播放成功时的操作
        }).catch(error => {
            // 自定义播放失败时的操作
        });
    }
}
```

## 🎨 自定义样式

### 修改主题颜色

在 `index.html` 的 `<style>` 部分：

```css
:root {
    --primary-color: #3b82f6;    /* 主色调 */
    --secondary-color: #8b5cf6;  /* 辅助色 */
    --accent-color: #06b6d4;     /* 强调色 */
}
```

### 修改动画效果

在 `main.js` 中可以调整动画参数：

```javascript
// 修改页面加载动画
anime({
    targets: 'section',
    opacity: [0, 1],
    translateY: [50, 0],
    delay: anime.stagger(200),  // 调整延迟
    duration: 800,              // 调整持续时间
    easing: 'easeOutCubic'      // 修改缓动函数
});
```

## ⌨️ 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl/Cmd + B` | 切换暗黑模式 |
| `Ctrl/Cmd + M` | 切换背景音乐 |
| `数字键 1` | 切换到首页 |
| `数字键 2` | 切换到关于页面 |
| `数字键 3` | 切换到技能页面 |
| `数字键 4` | 切换到相册页面 |
| `数字键 5` | 切换到项目页面 |
| `数字键 6` | 切换到历程页面 |
| `数字键 7` | 切换到联系页面 |

## 📱 响应式设计

网站支持以下设备：
- 📱 手机 (320px - 768px)
- 📱 平板 (768px - 1024px)
- 💻 桌面 (1024px+)

## 🚀 部署建议

### 部署到 GitHub Pages

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings
   - 找到 Pages 选项
   - 选择部署源为 main 分支

3. **访问网站**
   - 网站地址：`https://yourusername.github.io/your-repo/`

### 部署到其他平台

- **Netlify**: 拖拽文件夹即可部署
- **Vercel**: 连接 GitHub 自动部署
- **腾讯云静态网站**: 支持自定义域名

## 🛠️ 技术栈

- **前端**: HTML5 + CSS3 + JavaScript (ES6+)
- **样式框架**: Tailwind CSS
- **动画库**: Anime.js
- **图标库**: Font Awesome 6
- **字体**: Inter + Orbitron

## 📞 技术支持

如果您在使用过程中遇到问题：

1. 检查浏览器控制台错误信息
2. 确保所有文件路径正确
3. 验证网络连接正常
4. 尝试清除浏览器缓存

## 📝 更新日志

### v2.0.0 (2025-11-13)
- ✅ 修复标签页点击功能
- ✅ 添加图片画廊版块
- ✅ 实现背景音乐控制
- ✅ 新增成长历程页面
- ✅ 完善代码注释
- ✅ 添加键盘快捷键
- ✅ 优化移动端体验

---

**享受您的个人博客！🎉**