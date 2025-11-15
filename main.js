// =============================================================================
// Cookies 个人博客 - 主要 JavaScript 功能
// =============================================================================
// 主要功能包括：
// 1. 标签页切换系统
// 2. 图片画廊筛选
// 3. 背景音乐控制
// 4. 暗黑模式切换
// 5. 平滑滚动和动画效果
// 6. 移动端菜单管理
// 7. 技能条动画
// 8. 联系表单处理
// =============================================================================

// =============================================================================
// 全局变量和配置
// =============================================================================
let currentTab = 'home'; // 当前激活的标签页
let isMusicPlaying = false; // 背景音乐播放状态
let skillBarsAnimated = false; // 技能条动画状态

// =============================================================================
// 标签页切换系统
// =============================================================================

/**
 * 初始化标签页系统
 * 为所有标签页按钮添加点击事件监听器
 */
function initTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

/**
 * 切换标签页
 * @param {string} tabName - 要切换到的标签页名称
 */
function switchTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // 移除所有活动状态
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // 激活目标标签页
    const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
    const targetContent = document.getElementById(tabName);
    
    if (targetButton && targetContent) {
        targetButton.classList.add('active');
        targetContent.classList.add('active');
        currentTab = tabName;
        
        // 如果是技能页面，触发技能条动画
        if (tabName === 'skills' && !skillBarsAnimated) {
            setTimeout(() => {
                animateSkillBars();
                skillBarsAnimated = true;
            }, 500);
        }
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // 关闭移动端菜单
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    }
}

// =============================================================================
// 图片画廊功能
// =============================================================================

/**
 * 初始化图片画廊筛选功能
 */
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // 更新按钮状态
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white');
                btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            });
            
            this.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            this.classList.add('active', 'bg-primary', 'text-white');
            
            // 筛选图片项目
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    anime({
                        targets: item,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 500,
                        easing: 'easeOutCubic'
                    });
                } else {
                    anime({
                        targets: item,
                        opacity: [1, 0],
                        scale: [1, 0.8],
                        duration: 300,
                        easing: 'easeInCubic',
                        complete: function() {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// =============================================================================
// 背景音乐控制
// =============================================================================

/**
 * 初始化背景音乐控制
 */
function initMusicControl() {
    const musicController = document.getElementById('musicController');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (!musicController || !backgroundMusic) {
        console.warn('音乐控制元素未找到');
        return;
    }
    
    // 音乐控制器点击事件
    musicController.addEventListener('click', function() {
        toggleMusic();
    });
    
    // 导航栏音乐按钮点击事件
    if (musicToggle) {
        musicToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMusic();
        });
    }
    
    /**
     * 切换音乐播放状态
     */
    function toggleMusic() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicController.classList.remove('playing');
            musicController.innerHTML = '<i class="fas fa-music"></i>';
            if (musicToggle) {
                musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            }
            isMusicPlaying = false;
            showNotification('背景音乐已暂停', 'info');
        } else {
            backgroundMusic.play().then(() => {
                musicController.classList.add('playing');
                musicController.innerHTML = '<i class="fas fa-pause"></i>';
                if (musicToggle) {
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                }
                isMusicPlaying = true;
                showNotification('背景音乐已播放', 'success');
            }).catch(error => {
                console.error('音乐播放失败:', error);
                showNotification('音乐播放失败，请检查浏览器设置', 'error');
            });
        }
    }
}

// =============================================================================
// 通知系统
// =============================================================================

/**
 * 显示通知消息
 * @param {string} message - 通知消息
 * @param {string} type - 通知类型 (success, error, info)
 */
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // 根据类型设置样式
    const styles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${styles[type] || styles.info}`;
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// =============================================================================
// 暗黑模式切换
// =============================================================================

/**
 * 初始化暗黑模式
 */
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    if (!darkModeToggle) {
        console.warn('暗黑模式切换按钮未找到');
        return;
    }
    
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
        
        showNotification(`已切换到${theme === 'dark' ? '暗黑' : '明亮'}模式`, 'info');
    });
}

// =============================================================================
// 移动端菜单管理
// =============================================================================

/**
 * 初始化移动端菜单
 */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuToggle || !mobileMenu) {
        console.warn('移动端菜单元素未找到');
        return;
    }
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // 点击菜单项后自动关闭菜单
    const mobileTabButtons = mobileMenu.querySelectorAll('.tab-button');
    mobileTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
}

// =============================================================================
// 平滑滚动功能
// =============================================================================

/**
 * 初始化平滑滚动
 */
function initSmoothScroll() {
    // 为所有锚链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            switchTab(targetId);
        });
    });
}

// =============================================================================
// 导航栏滚动效果
// =============================================================================

/**
 * 初始化导航栏滚动效果
 */
function initNavbarScroll() {
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    
    if (!nav) {
        console.warn('导航栏元素未找到');
        return;
    }
    
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
}

// =============================================================================
// 技能条动画
// =============================================================================

/**
 * 初始化技能条动画
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // 初始化所有技能条宽度为0
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

/**
 * 触发技能条动画
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const originalWidth = bar.getAttribute('style').match(/width:\s*(\d+%)/);
        if (originalWidth && originalWidth[1]) {
            setTimeout(() => {
                anime({
                    targets: bar,
                    width: originalWidth[1],
                    duration: 1500,
                    delay: index * 200,
                    easing: 'easeOutCubic'
                });
            }, 500);
        }
    });
}

// =============================================================================
// 项目卡片动画
// =============================================================================

/**
 * 初始化项目卡片悬停效果
 */
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
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
}

// =============================================================================
// 联系表单处理
// =============================================================================

/**
 * 初始化联系表单
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.warn('联系表单未找到');
        return;
    }
    
    contactForm.addEventListener('submit', function(e) {
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
            showNotification('消息发送成功！我会尽快回复您。', 'success');
            
            // 重置表单
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('bg-green-500');
            }, 2000);
        }, 1500);
    });
}

// =============================================================================
// 页面加载动画
// =============================================================================

/**
 * 初始化页面加载动画
 */
function initPageAnimations() {
    // 页面加载完成后的动画
    anime({
        targets: 'section',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(200),
        duration: 800,
        easing: 'easeOutCubic'
    });
}

// =============================================================================
// 鼠标交互效果
// =============================================================================

/**
 * 初始化鼠标交互效果
 */
function initMouseEffects() {
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
}

// =============================================================================
// 键盘快捷键
// =============================================================================

/**
 * 初始化键盘快捷键
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + B 切换暗黑模式
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            const darkModeToggle = document.getElementById('darkModeToggle');
            if (darkModeToggle) {
                darkModeToggle.click();
            }
        }
        
        // Ctrl/Cmd + M 切换音乐
        if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
            e.preventDefault();
            const musicController = document.getElementById('musicController');
            if (musicController) {
                musicController.click();
            }
        }
        
        // 数字键 1-7 快速切换标签页
        if (e.key >= '1' && e.key <= '7') {
            e.preventDefault();
            const tabNames = ['home', 'about', 'skills', 'gallery', 'projects', 'timeline', 'contact'];
            const tabIndex = parseInt(e.key) - 1;
            if (tabNames[tabIndex]) {
                switchTab(tabNames[tabIndex]);
            }
        }
    });
}

// =============================================================================
// 性能监控和错误处理
// =============================================================================

/**
 * 初始化性能监控
 */
function initPerformanceMonitoring() {
    // 页面性能监控
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
    
    // 错误处理
    window.addEventListener('error', function(e) {
        console.error('❌ 页面错误:', e.error);
        showNotification('页面出现错误，请刷新页面重试', 'error');
    });
    
    // 离线检测
    window.addEventListener('online', function() {
        showNotification('🌐 网络已连接', 'success');
    });
    
    window.addEventListener('offline', function() {
        showNotification('📵 网络已断开，部分功能可能无法使用', 'error');
    });
}

// =============================================================================
// 主初始化函数
// =============================================================================

/**
 * 页面加载完成后初始化所有功能
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Cookies的个人博客初始化中...');
    
    try {
        // 初始化各个功能模块
        initTabSystem();
        initGalleryFilter();
        initMusicControl();
        initDarkMode();
        initMobileMenu();
        initSmoothScroll();
        initNavbarScroll();
        initSkillBars();
        initProjectCards();
        initContactForm();
        initPageAnimations();
        initMouseEffects();
        initKeyboardShortcuts();
        initPerformanceMonitoring();
        
        console.log('✅ 所有功能初始化完成！');
        console.log('💡 快捷键提示：');
        console.log('   Ctrl/Cmd + B: 切换暗黑模式');
        console.log('   Ctrl/Cmd + M: 切换背景音乐');
        console.log('   数字键 1-7: 快速切换标签页');
        
        // 显示欢迎消息
        setTimeout(() => {
            showNotification('🎉 欢迎来到Cookies的个人博客！', 'success');
        }, 1000);
        
    } catch (error) {
        console.error('❌ 初始化失败:', error);
        showNotification('网站初始化失败，请刷新页面重试', 'error');
    }
});

// =============================================================================
// 导出全局函数供其他脚本使用
// =============================================================================

window.CookiesBlog = {
    switchTab,
    showNotification,
    toggleMusic: function() {
        const musicController = document.getElementById('musicController');
        if (musicController) {
            musicController.click();
        }
    },
    scrollToSection: function(sectionId) {
        switchTab(sectionId);
    }
};