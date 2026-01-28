// 导航栏下拉菜单脚本
document.addEventListener('DOMContentLoaded', function() {
    // 为所有模块链接添加下拉菜单
    const navItems = document.querySelectorAll('.nav-menu a[href$="/index.html"], .nav-menu a[href="../index.html"]');
    
    navItems.forEach(link => {
        const href = link.getAttribute('href');
        const moduleName = link.textContent.trim();
        
        // 判断是否是模块首页
        if (href.includes('module')) {
            const parentLi = link.parentElement;
            if (parentLi.tagName === 'DIV' || parentLi.tagName === 'LI') {
                // 创建下拉菜单
                const dropdown = document.createElement('div');
                dropdown.className = 'dropdown';
                
                // 提取模块编号
                const moduleNum = href.match(/module(\d+)/);
                if (moduleNum) {
                    const num = moduleNum[1];
                    const subPages = {
                        '1': [
                            { name: '百年文脉', url: href.replace('index.html', 'page1.html') },
                            { name: '雅韵特质', url: href.replace('index.html', 'page2.html') },
                            { name: '文化密码', url: href.replace('index.html', 'page3.html') }
                        ],
                        '2': [
                            { name: '匠人守艺', url: href.replace('index.html', 'page1.html') },
                            { name: '文旅共生', url: href.replace('index.html', 'page2.html') },
                            { name: '薪火相传', url: href.replace('index.html', 'page3.html') }
                        ],
                        '3': [
                            { name: '政策解读', url: href.replace('index.html', 'page1.html') },
                            { name: '数据透视', url: href.replace('index.html', 'page2.html') },
                            { name: '民间心声', url: href.replace('index.html', 'page3.html') }
                        ],
                        '4': [
                            { name: '曲段学唱', url: href.replace('index.html', 'page1.html') },
                            { name: '非遗打卡', url: href.replace('index.html', 'page2.html') },
                            { name: '在线问答', url: href.replace('index.html', 'page3.html') }
                        ]
                    };
                    
                    if (subPages[num]) {
                        link.textContent = moduleName + ' ▼';
                        parentLi.classList.add('nav-item');
                        
                        subPages[num].forEach(page => {
                            const pageLink = document.createElement('a');
                            pageLink.href = page.url;
                            pageLink.textContent = page.name;
                            dropdown.appendChild(pageLink);
                        });
                        
                        parentLi.appendChild(dropdown);
                    }
                }
            }
        }
    });
});
