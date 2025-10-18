# Cookies个人博客 - GitHub Pages部署指南

## 🚀 项目简介

这是一个现代化、响应式的个人博客网站，采用纯静态HTML/CSS/JavaScript技术栈开发，完美支持GitHub Pages部署。

### ✨ 特性
- 🎨 现代化设计，支持暗黑模式
- 📱 完全响应式布局
- ⚡ 高性能静态网站
- 🎯 平滑滚动和动画效果
- 📧 联系表单功能
- 🔧 易于定制和扩展

## 📁 项目结构

```
Cookies/
├── index.html          # 主页
├── about.html          # 关于页面
├── projects.html       # 项目展示页面
├── main.js            # 主要JavaScript文件
├── favicon.png        # 网站图标
└── README.md          # 本说明文档
```

## 🛠️ 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 现代样式和动画
- **JavaScript (ES6+)** - 交互功能
- **Tailwind CSS** - 实用优先的CSS框架
- **Anime.js** - 动画库
- **Font Awesome** - 图标库

## 📦 部署到GitHub Pages

### 方法1：直接上传文件（推荐新手）

#### 步骤1：准备文件
1. 下载本项目的所有文件
2. 确保文件结构如上图所示
3. 检查所有文件是否完整

#### 步骤2：创建GitHub仓库
1. 登录GitHub账户
2. 点击右上角的 "+" 号，选择 "New repository"
3. 仓库名称设置为：`Cookies`（或您喜欢的名称）
4. 选择 "Public"（公开仓库）
5. 不要勾选 "Initialize this repository with a README"
6. 点击 "Create repository"

#### 步骤3：上传文件
1. 在新创建的仓库页面，点击 "uploading an existing file"
2. 拖拽或选择所有项目文件（index.html, about.html, projects.html, main.js, favicon.png）
3. 在 "Commit changes" 部分，填写提交信息，如 "Initial commit"
4. 点击 "Commit changes"

#### 步骤4：启用GitHub Pages
1. 在仓库页面，点击 "Settings" 标签
2. 向下滚动到 "Pages" 部分（在左侧菜单中）
3. 在 "Source" 下拉菜单中，选择 "Deploy from a branch"
4. 在 "Branch" 下拉菜单中，选择 "main" 分支和 "/ (root)" 文件夹
5. 点击 "Save"
6. 等待几分钟，GitHub会生成您的网站URL

#### 步骤5：访问您的网站
1. 回到 "Settings" > "Pages"
2. 您会看到 "Your site is published at: [URL]"
3. 点击链接访问您的个人博客！

### 方法2：使用Git命令行（推荐开发者）

#### 步骤1：本地准备
```bash
# 克隆或下载本项目文件
cd Cookies
```

#### 步骤2：初始化Git仓库
```bash
git init
git add .
git commit -m "Initial commit"
```

#### 步骤3：连接到GitHub
```bash
# 替换为您的GitHub用户名和仓库名
git remote add origin https://github.com/YOUR_USERNAME/Cookies.git
git branch -M main
git push -u origin main
```

#### 步骤4：启用GitHub Pages
按照方法1中的步骤4操作。

## 🎨 自定义网站

### 修改个人信息
1. 打开 `index.html`
2. 找到个人信息部分（搜索 "Cookies"）
3. 替换为您的姓名、描述、联系方式等
4. 对其他HTML文件进行相同操作

### 更换头像
1. 准备一张您的照片（建议正方形，500x500像素）
2. 替换 `index.html` 中的头像部分
3. 可以使用在线图片或本地图片

### 修改项目信息
1. 打开 `projects.html`
2. 修改项目标题、描述、技术标签
3. 添加您的真实项目链接

### 调整颜色主题
1. 打开 `main.js`
2. 修改CSS变量或Tailwind配置
3. 可以创建自己的配色方案

## 🔧 高级功能

### 添加新页面
1. 创建新的HTML文件
2. 复制现有页面的导航结构
3. 在 `main.js` 中添加相应的JavaScript功能
4. 更新导航链接

### 集成评论系统
- 考虑使用 [Disqus](https://disqus.com/) 或 [Gitalk](https://github.com/gitalk/gitalk)
- 这些服务可以轻松集成到静态网站

### 添加分析工具
- Google Analytics
- 百度统计
- 其他分析服务

## 🐛 常见问题解决

### 网站无法访问
- 检查GitHub Pages是否已启用
- 确认文件已正确上传到main分支
- 等待几分钟让GitHub部署完成
- 检查仓库是否为公开状态

### 样式不显示
- 确认所有文件路径正确
- 检查浏览器控制台是否有错误
- 确保所有资源文件都已上传

### 图片不显示
- 检查图片文件是否已上传
- 确认图片路径正确
- 尝试使用绝对路径

## 📱 响应式设计

本网站采用移动优先的响应式设计：
- 📱 手机端：单列布局，大按钮
- 💻 平板端：两列布局
- 🖥️ 桌面端：多列布局，更多功能

## 🌟 性能优化

- 图片已优化，使用适当的格式
- CSS和JS文件已压缩
- 使用CDN加载第三方库
- 启用浏览器缓存

## 🔒 安全建议

- 定期更新依赖库
- 使用HTTPS（GitHub Pages自动提供）
- 不要在代码中暴露敏感信息
- 考虑添加安全头部

## 📞 联系方式

如果您在部署过程中遇到问题：
- 查看GitHub官方文档
- 搜索相关错误信息
- 在开发者社区寻求帮助

## 📄 许可证

本项目采用MIT许可证，您可以自由使用、修改和分发。

---

**祝您使用愉快！** 🎉

*最后更新：2025年1月*