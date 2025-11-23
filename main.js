// =============================================================================
// Cookies 个人博客 - 优化版 JavaScript 功能
// =============================================================================
// 主要功能包括：
// 1. 标签页切换系统
// 2. 图片画廊筛选和懒加载
// 3. 背景音乐控制
// 4. 暗黑模式切换
// 5. 平滑滚动和动画效果
// 6. 移动端菜单管理
// 7. 技能条动画
// 8. 联系表单处理
// 9. 性能优化和图片加载策略
// =============================================================================

// =============================================================================
// 全局变量和配置
// =============================================================================
let currentTab = 'home';
let isMusicPlaying = false;
let skillBarsAnimated = false;
let imageLoadAttempts = {};
let lazyImageObserver;

// CDN配置
const CDN_CONFIG = {
    primary: 'https://images.unsplash.com',
    fallback: 'https://picsum.photos',
    timeout: 5000
};

// =============================================================================
// 初始化函数
// =============================================================================
document.addEventListener('DOMContentLoaded', function() {
    initTabSystem();
    initGalleryFilter();
    initMusicPlayer();
    initDarkMode();
    initMobileMenu();
    initScrollEffects();
    initLazyLoading();
    initImageModal();
    initContactForm();
    initBackToTop();
    initPerformanceMonitoring();
    
    // 预加载关键资源
    preloadCriticalResources();
});

// =============================================================================
// 标签页切换系统
// =============================================================================

/**
 * 初始化标签页系统
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
        
        // 如果是相册页面，初始化懒加载
        if (tabName === 'gallery') {
            setTimeout(() => {
                initializeLazyImages();
            }, 300);
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
            
            // 筛选图片
            filterGallery(filter);
        });
    });
}

/**
 * 筛选图片
 * @param {string} filter - 筛选条件
 */
function filterGallery(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            // 添加淡入动画
            anime({
                targets: item,
                opacity: [0, 1],
                translateY: [20, 0],
                delay: index * 100,
                duration: 500,
                easing: 'easeOutQuart'
            });
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * 初始化懒加载
 */
function initLazyLoading() {
    // 检查浏览器是否支持 Intersection Observer
    if ('IntersectionObserver' in window) {
        lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadLazyImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
    }
}

/**
 * 初始化懒加载图片
 */
function initializeLazyImages() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    lazyImages.forEach(img => {
        if (lazyImageObserver) {
            lazyImageObserver.observe(img);
        } else {
            // 降级方案：直接加载图片
            loadLazyImage(img);
        }
    });
}

/**
 * 加载懒加载图片
 * @param {HTMLImageElement} img - 图片元素
 */
function loadLazyImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;
    
    // 创建图片加载指示器
    const loadingIndicator = createLoadingIndicator();
    img.parentNode.appendChild(loadingIndicator);
    
    // 尝试加载图片
    loadImageWithFallback(src, img)
        .then(() => {
            img.classList.add('loaded');
            loadingIndicator.remove();
        })
        .catch(() => {
            loadingIndicator.remove();
            handleImageError(img);
        });
}

/**
 * 带备用方案的图片加载
 * @param {string} src - 图片源
 * @param {HTMLImageElement} img - 图片元素
 */
function loadImageWithFallback(src, img) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        let timeout;
        
        // 设置超时
        timeout = setTimeout(() => {
            image.src = '';
            reject(new Error('Image load timeout'));
        }, CDN_CONFIG.timeout);
        
        // 图片加载成功
        image.onload = () => {
            clearTimeout(timeout);
            img.src = src;
            resolve();
        };
        
        // 图片加载失败
        image.onerror = () => {
            clearTimeout(timeout);
            
            // 尝试备用CDN
            if (src.includes(CDN_CONFIG.primary)) {
                const fallbackSrc = src.replace(CDN_CONFIG.primary, CDN_CONFIG.fallback);
                loadImageWithFallback(fallbackSrc, img)
                    .then(resolve)
                    .catch(reject);
            } else {
                reject(new Error('Image load failed'));
            }
        };
        
        image.src = src;
    });
}

/**
 * 处理图片加载错误
 * @param {HTMLImageElement} img - 图片元素
 */
function handleImageError(img) {
    img.classList.add('image-error');
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWbvueJh+aaguaXtuWKoOi9vTwvdGV4dD48L3N2Zz4=';
    
    // 添加点击重试功能
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        const originalSrc = img.getAttribute('data-src');
        if (originalSrc) {
            img.classList.remove('image-error');
            loadImageWithFallback(originalSrc, img);
        }
    });
}

/**
 * 创建加载指示器
 */
function createLoadingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800';
    indicator.innerHTML = '<div class="loading-spinner"></div>';
    return indicator;
}

// =============================================================================
// 图片模态框功能
// =============================================================================

/**
 * 初始化图片模态框
 */
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.getElementById('closeModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

/**
 * 打开图片模态框
 * @param {HTMLElement} element - 触发元素
 */
function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    const img = element.querySelector('img');
    const title = element.querySelector('h3');
    const description = element.querySelector('p');
    
    if (modal && modalImage && img) {
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        
        if (modalTitle && title) {
            modalTitle.textContent = title.textContent;
        }
        
        if (modalDescription && description) {
            modalDescription.textContent = description.textContent;
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * 关闭图片模态框
 */
function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// =============================================================================
// 背景音乐控制
// =============================================================================

/**
 * 初始化音乐播放器
 */
function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', toggleMusic);
    }
    
    if (volumeSlider && bgMusic) {
        volumeSlider.addEventListener('input', (e) => {
            bgMusic.volume = e.target.value / 100;
        });
    }
    
    // 设置初始音量
    if (bgMusic) {
        bgMusic.volume = 0.5;
    }
}

/**
 * 切换音乐播放状态
 */
function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const musicToggle = document.getElementById('musicToggle');
    
    if (!bgMusic) return;
    
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
        if (musicToggle) {
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        }
    } else {
        bgMusic.play().catch(e => {
            console.log('音乐播放失败:', e);
        });
        isMusicPlaying = true;
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        if (musicToggle) {
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
}

// =============================================================================
// 暗黑模式切换
// =============================================================================

/**
 * 初始化暗黑模式
 */
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // 检查本地存储的偏好
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
}

/**
 * 切换暗黑模式
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// =============================================================================
// 移动端菜单管理
// =============================================================================

/**
 * 初始化移动端菜单
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// =============================================================================
// 滚动效果
// =============================================================================

/**
 * 初始化滚动效果
 */
function initScrollEffects() {
    // 滚动时显示/隐藏返回顶部按钮
    window.addEventListener('scroll', () => {
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.remove('opacity-100');
            }
        }
    });
}

/**
 * 初始化返回顶部按钮
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// =============================================================================
// 技能条动画
// =============================================================================

/**
 * 技能条动画
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        
        anime({
            targets: bar,
            width: width + '%',
            delay: index * 200,
            duration: 1500,
            easing: 'easeOutQuart'
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
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

/**
 * 处理联系表单提交
 * @param {Event} e - 表单提交事件
 */
function handleContactSubmit(e) {
    e.preventDefault();
    
    // 显示提交中状态
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>发送中...';
    submitBtn.disabled = true;
    
    // 模拟发送过程
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>发送成功';
        submitBtn.classList.add('bg-green-500');
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('bg-green-500');
            e.target.reset();
        }, 2000);
    }, 1500);
}

// =============================================================================
// 性能监控
// =============================================================================

/**
 * 初始化性能监控
 */
function initPerformanceMonitoring() {
    // 监控页面加载性能
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('页面加载时间:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }
    });
    
    // 监控图片加载错误
    window.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            console.warn('图片加载失败:', e.target.src);
        }
    }, true);
}

/**
 * 预加载关键资源
 */
function preloadCriticalResources() {
    // 预加载关键图片
    const criticalImages = [
        'https://images.unsplash.com/photo-1616486338812-3dadae4d32ace?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// =============================================================================
// 加载更多功能
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreImages);
    }
});

/**
 * 加载更多图片
 */
function loadMoreImages() {
    const galleryGrid = document.getElementById('galleryGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!galleryGrid || !loadMoreBtn) return;
    
    // 显示加载中状态
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>加载中...';
    loadMoreBtn.disabled = true;
    
    // 模拟加载新图片
    setTimeout(() => {
        const newImages = [
            {
                category: 'life',
                src: 'https://images.unsplash.com/photo-1599388133038-f1a26a57e4e7?w=400&h=400&fit=crop',
                title: '日常生活',
                description: '记录平凡中的美好'
            },
            {
                category: 'work',
                src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop',
                title: '工作环境',
                description: '高效工作的空间'
            },
            {
                category: 'travel',
                src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
                title: '自然风光',
                description: '大自然的壮美景色'
            },
            {
                category: 'food',
                src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop',
                title: '健康美食',
                description: '营养均衡的餐点'
            }
        ];
        
        newImages.forEach((imageData, index) => {
            const imageElement = createGalleryItem(imageData);
            galleryGrid.appendChild(imageElement);
            
            // 添加淡入动画
            anime({
                targets: imageElement,
                opacity: [0, 1],
                translateY: [50, 0],
                delay: index * 100,
                duration: 500,
                easing: 'easeOutQuart'
            });
        });
        
        // 重新初始化懒加载
        setTimeout(() => {
            initializeLazyImages();
        }, 300);
        
        // 恢复按钮状态
        loadMoreBtn.innerHTML = '加载更多 <i class="fas fa-plus ml-2"></i>';
        loadMoreBtn.disabled = false;
        
        // 隐藏加载更多按钮（模拟没有更多内容）
        if (Math.random() > 0.5) {
            loadMoreBtn.style.display = 'none';
        }
    }, 1500);
}

/**
 * 创建画廊项目
 * @param {Object} imageData - 图片数据
 */
function createGalleryItem(imageData) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('data-category', imageData.category);
    
    div.innerHTML = `
        <div class="glass-effect rounded-2xl overflow-hidden hover-lift cursor-pointer" onclick="openModal(this)">
            <div class="aspect-square relative overflow-hidden">
                <img data-src="${imageData.src}" 
                     alt="${imageData.title}" 
                     class="lazy-image w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                     loading="lazy">
                <div class="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                    <i class="fas fa-expand text-sm"></i>
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-bold text-lg mb-2">${imageData.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm">${imageData.description}</p>
            </div>
        </div>
    `;
    
    return div;
}

// =============================================================================
// 工具函数
// =============================================================================

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 限制时间
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =============================================================================
// 错误处理
// =============================================================================

// 全局错误处理
window.addEventListener('error', (e) => {
    console.error('JavaScript错误:', e.error);
});

// Promise错误处理
window.addEventListener('unhandledrejection', (e) => {
    console.error('未处理的Promise错误:', e.reason);
});