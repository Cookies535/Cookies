// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // 关闭移动端菜单
            mobileMenu.classList.add('hidden');
        }
    });
});

// 移动端菜单切换
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

// 暗黑模式切换
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

// 检查本地存储的暗黑模式设置
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    html.classList.add('dark');
}

darkModeToggle.addEventListener('click', function() {
    html.classList.toggle('dark');
    
    // 保存设置到本地存储
    const theme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// 导航栏滚动效果
let lastScrollTop = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 向下滚动，隐藏导航栏
        nav.style.transform = 'translateY(-100%)';
    } else {
        // 向上滚动，显示导航栏
        nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// 导航链接高亮
document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-primary');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-primary');
        }
    });
});

// 技能条动画
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
}

// 监听滚动事件，触发技能条动画
let skillBarsAnimated = false;
window.addEventListener('scroll', function() {
    if (!skillBarsAnimated) {
        const skillsSection = document.getElementById('skills');
        const rect = skillsSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animateSkillBars();
            skillBarsAnimated = true;
        }
    }
});

// 项目卡片悬停效果
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        anime({
            targets: this,
            scale: 1.02,
            duration: 300,
            easing: 'easeOutCubic'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        anime({
            targets: this,
            scale: 1,
            duration: 300,
            easing: 'easeOutCubic'
        });
    });
});

// 联系表单处理
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 显示提交动画
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>发送中...';
    submitBtn.disabled = true;
    
    // 模拟发送过程
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>发送成功！';
        submitBtn.classList.add('bg-green-500');
        
        // 重置表单
        setTimeout(() => {
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('bg-green-500');
        }, 2000);
    }, 1500);
});

// 打字机效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    anime({
        targets: 'section',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(200),
        duration: 800,
        easing: 'easeOutCubic'
    });
    
    // 为技能条添加初始状态
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    console.log('🚀 Cookies的个人博客已加载完成！');
    console.log('💡 技术栈：HTML5 + CSS3 + JavaScript + Tailwind CSS');
    console.log('🎨 设计特色：响应式布局 + 暗黑模式 + 动画效果');
});

// 添加一些有趣的交互效果
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // 为hero区域的元素添加微妙的视差效果
    const heroElements = document.querySelectorAll('.floating');
    heroElements.forEach(element => {
        const speed = 0.05;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 30;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K 聚焦搜索框（如果有的话）
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Ctrl/Cmd + B 切换暗黑模式
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        darkModeToggle.click();
    }
});

// 添加页面性能监控
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('📊 页面性能数据：');
            console.log(`DOM加载时间: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
            console.log(`页面完全加载时间: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}

// 添加错误处理
window.addEventListener('error', function(e) {
    console.error('❌ 页面错误:', e.error);
});

// 添加离线检测
window.addEventListener('online', function() {
    console.log('🌐 网络已连接');
});

window.addEventListener('offline', function() {
    console.log('📵 网络已断开');
});

// 导出主要函数供其他脚本使用
window.CookiesBlog = {
    typeWriter,
    animateSkillBars,
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
};