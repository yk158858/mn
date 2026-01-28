/**
 * 用户互动功能增强脚本
 * 包含：作品上传、留言板、问答系统等功能
 */

// ========== 全局工具函数 ==========

/**
 * 显示提示消息
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型 success/error/warning
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️'
    };
    
    const colors = {
        success: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
        error: 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
        warning: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)'
    };
    
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: ${type === 'error' ? '#721c24' : '#155724'};
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    toast.innerHTML = `<span style="font-size: 1.2rem; margin-right: 0.5rem;">${icons[type]}</span>${message}`;
    
    document.body.appendChild(toast);
    
    // 添加动画样式
    if (!document.getElementById('toastStyles')) {
        const style = document.createElement('style');
        style.id = 'toastStyles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes fadeOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

/**
 * 格式化日期时间
 * @param {Date} date - 日期对象
 * @returns {string} 格式化的日期时间字符串
 */
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hour}:${minute}`;
}

/**
 * 格式化相对时间
 * @param {Date} date - 日期对象
 * @returns {string} 相对时间字符串
 */
function formatRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    
    return formatDateTime(date);
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            func.apply(this, args);
            lastCall = now;
        }
    };
}

// ========== 作品上传功能 ==========

class FileUploader {
    constructor(options = {}) {
        this.uploadArea = options.uploadArea;
        this.fileInput = options.fileInput;
        this.previewContainer = options.previewContainer;
        this.maxFiles = options.maxFiles || 5;
        this.maxSize = options.maxSize || 50 * 1024 * 1024; // 50MB
        this.acceptedTypes = options.acceptedTypes || ['image/jpeg', 'image/png', 'video/mp4'];
        this.files = [];
        this.onFileSelect = options.onFileSelect || (() => {});
        this.onFileRemove = options.onFileRemove || (() => {});
        
        this.init();
    }
    
    init() {
        if (!this.uploadArea || !this.fileInput) return;
        
        // 点击上传
        this.uploadArea.addEventListener('click', () => {
            this.fileInput.click();
        });
        
        // 文件选择
        this.fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
        
        // 拖拽上传
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });
        
        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });
        
        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });
    }
    
    handleFiles(fileList) {
        const files = Array.from(fileList);
        let validFiles = [];
        
        // 验证文件
        files.forEach(file => {
            // 检查文件类型
            if (!this.acceptedTypes.includes(file.type)) {
                showToast(`文件 "${file.name}" 格式不支持`, 'error');
                return;
            }
            
            // 检查文件大小
            if (file.size > this.maxSize) {
                showToast(`文件 "${file.name}" 超过${this.maxSize / 1024 / 1024}MB限制`, 'error');
                return;
            }
            
            // 检查文件数量
            if (this.files.length + validFiles.length >= this.maxFiles) {
                showToast(`最多只能上传${this.maxFiles}个文件`, 'warning');
                return;
            }
            
            validFiles.push(file);
        });
        
        // 添加到文件列表
        this.files = [...this.files, ...validFiles];
        this.renderPreview();
        this.onFileSelect(validFiles);
    }
    
    renderPreview() {
        if (!this.previewContainer) return;
        
        this.previewContainer.innerHTML = '';
        
        if (this.files.length === 0) {
            this.previewContainer.classList.remove('active');
            return;
        }
        
        this.previewContainer.classList.add('active');
        
        this.files.forEach((file, index) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <span class="preview-icon">${this.getFileIcon(file.type)}</span>
                <div class="preview-info">
                    <div class="preview-name">${file.name}</div>
                    <div class="preview-size">${this.formatFileSize(file.size)}</div>
                </div>
                <span class="preview-remove" data-index="${index}">✕</span>
            `;
            
            // 移除按钮事件
            previewItem.querySelector('.preview-remove').addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeFile(index);
            });
            
            this.previewContainer.appendChild(previewItem);
        });
    }
    
    removeFile(index) {
        const removedFile = this.files[index];
        this.files.splice(index, 1);
        this.renderPreview();
        this.onFileRemove(removedFile);
    }
    
    getFileIcon(type) {
        if (type.includes('image')) return '📷';
        if (type.includes('video')) return '📹';
        return '📄';
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    getFiles() {
        return this.files;
    }
    
    clear() {
        this.files = [];
        this.fileInput.value = '';
        this.renderPreview();
    }
}

// ========== 留言板功能 ==========

class MessageBoard {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            maxLength: options.maxLength || 500,
            minLength: options.minLength || 10,
            maxReplies: options.maxReplies || 10
        };
        
        this.messages = [];
        this.init();
    }
    
    init() {
        this.loadMessages();
        this.bindEvents();
    }
    
    loadMessages() {
        // 从localStorage加载留言
        const saved = localStorage.getItem('nanqu_messages');
        if (saved) {
            this.messages = JSON.parse(saved);
            this.render();
        }
    }
    
    saveMessages() {
        localStorage.setItem('nanqu_messages', JSON.stringify(this.messages));
    }
    
    bindEvents() {
        // 表单提交事件
        const form = this.container.querySelector('.message-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.postMessage();
            });
        }
    }
    
    postMessage() {
        const nameInput = document.getElementById('msgName');
        const typeSelect = document.getElementById('msgType');
        const contentInput = document.getElementById('msgContent');
        
        const name = nameInput.value.trim();
        const type = typeSelect.value;
        const content = contentInput.value.trim();
        
        // 验证
        if (!name) {
            showToast('请填写您的昵称', 'error');
            return;
        }
        
        if (!content) {
            showToast('请填写留言内容', 'error');
            return;
        }
        
        if (content.length < this.options.minLength) {
            showToast(`留言内容至少${this.options.minLength}个字`, 'error');
            return;
        }
        
        if (content.length > this.options.maxLength) {
            showToast(`留言内容不能超过${this.options.maxLength}个字`, 'error');
            return;
        }
        
        // 创建留言
        const message = {
            id: Date.now(),
            name: name,
            type: type,
            content: content,
            date: new Date().toISOString(),
            likes: 0,
            liked: false,
            replies: []
        };
        
        this.messages.unshift(message);
        this.saveMessages();
        this.render();
        
        // 清空表单
        nameInput.value = '';
        contentInput.value = '';
        
        showToast('留言发布成功！');
    }
    
    addReply(messageId, replyContent) {
        const message = this.messages.find(m => m.id === messageId);
        if (!message) return;
        
        const reply = {
            id: Date.now(),
            content: replyContent,
            date: new Date().toISOString()
        };
        
        message.replies.push(reply);
        this.saveMessages();
        this.render();
        
        showToast('回复成功！');
    }
    
    toggleLike(messageId) {
        const message = this.messages.find(m => m.id === messageId);
        if (!message) return;
        
        if (message.liked) {
            message.likes--;
            message.liked = false;
        } else {
            message.likes++;
            message.liked = true;
        }
        
        this.saveMessages();
        this.render();
    }
    
    deleteMessage(messageId) {
        if (!confirm('确定要删除这条留言吗？')) return;
        
        this.messages = this.messages.filter(m => m.id !== messageId);
        this.saveMessages();
        this.render();
        
        showToast('留言已删除');
    }
    
    render(filter = 'all') {
        const listContainer = document.getElementById('messageList');
        if (!listContainer) return;
        
        // 筛选
        let filteredMessages = this.messages;
        if (filter !== 'all') {
            filteredMessages = this.messages.filter(m => m.type === filter);
        }
        
        // 渲染
        listContainer.innerHTML = filteredMessages.map(msg => this.renderMessage(msg)).join('');
        
        // 绑定事件
        this.bindMessageEvents();
    }
    
    renderMessage(msg) {
        const typeLabels = {
            'question': '提问',
            'share': '分享',
            'feedback': '建议'
        };
        
        const date = new Date(msg.date);
        const dateStr = formatDateTime(date);
        
        return `
            <div class="message-item" data-id="${msg.id}" data-type="${msg.type}">
                <div class="message-header">
                    <span class="message-author">
                        👤 ${this.escapeHtml(msg.name)}
                        <span class="message-badge">${typeLabels[msg.type]}</span>
                    </span>
                    <span class="message-date">${dateStr}</span>
                </div>
                <div class="message-content">${this.escapeHtml(msg.content)}</div>
                <div class="message-actions">
                    <span class="message-action action-reply">💬 回复</span>
                    <span class="message-action action-like ${msg.liked ? 'active' : ''}">
                        ❤️ ${msg.likes}
                    </span>
                    <span class="message-action action-delete" style="color: #e63946;">🗑️ 删除</span>
                </div>
                <div class="reply-list">
                    ${msg.replies.map(reply => `
                        <div class="reply-item">
                            <div class="reply-date">${formatRelativeTime(new Date(reply.date))}</div>
                            <div class="reply-content">${this.escapeHtml(reply.content)}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="reply-form">
                    <textarea class="reply-input" placeholder="输入回复内容..." maxlength="${this.options.maxLength}"></textarea>
                    <button class="reply-btn">回复</button>
                </div>
            </div>
        `;
    }
    
    bindMessageEvents() {
        const listContainer = document.getElementById('messageList');
        if (!listContainer) return;
        
        listContainer.querySelectorAll('.message-item').forEach(item => {
            const messageId = parseInt(item.dataset.id);
            
            // 回复按钮
            item.querySelector('.action-reply').addEventListener('click', () => {
                item.querySelector('.reply-form').classList.toggle('active');
            });
            
            // 点赞按钮
            item.querySelector('.action-like').addEventListener('click', () => {
                this.toggleLike(messageId);
            });
            
            // 删除按钮
            item.querySelector('.action-delete').addEventListener('click', () => {
                this.deleteMessage(messageId);
            });
            
            // 回复提交
            item.querySelector('.reply-btn').addEventListener('click', () => {
                const input = item.querySelector('.reply-input');
                const content = input.value.trim();
                
                if (!content) {
                    showToast('请输入回复内容', 'error');
                    return;
                }
                
                this.addReply(messageId, content);
            });
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ========== 知识测验系统 ==========

class QuizSystem {
    constructor(questions, options = {}) {
        this.questions = questions;
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = {};
        this.isCompleted = false;
        this.options = {
            showImmediateFeedback: options.showImmediateFeedback || false,
            allowReview: options.allowReview || false
        };
        
        this.init();
    }
    
    init() {
        this.renderQuestion();
        this.bindEvents();
    }
    
    renderQuestion() {
        const question = this.questions[this.currentQuestion];
        const container = document.getElementById('questionCards');
        if (!container) return;
        
        // 隐藏所有题目
        container.querySelectorAll('.question-card').forEach(card => {
            card.style.display = 'none';
        });
        
        // 显示当前题目
        const currentCard = container.querySelector(`[data-question="${this.currentQuestion + 1}"]`);
        if (currentCard) {
            currentCard.style.display = 'block';
        }
        
        // 更新进度
        this.updateProgress();
    }
    
    updateProgress() {
        const currentQ = document.getElementById('currentQ');
        const progressFill = document.getElementById('progressFill');
        const scoreDisplay = document.getElementById('scoreDisplay');
        
        if (currentQ) {
            currentQ.textContent = `题目 ${this.currentQuestion + 1}/${this.questions.length}`;
        }
        
        if (progressFill) {
            const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        if (scoreDisplay) {
            scoreDisplay.textContent = `得分: ${this.score}`;
        }
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.renderQuestion();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.renderQuestion();
        }
    }
    
    selectAnswer(option) {
        this.answers[this.currentQuestion] = option;
        
        if (this.options.showImmediateFeedback) {
            this.showFeedback();
        }
    }
    
    showFeedback() {
        const question = this.questions[this.currentQuestion];
        const container = document.getElementById('questionCards');
        const currentCard = container.querySelector(`[data-question="${this.currentQuestion + 1}"]`);
        const options = currentCard.querySelectorAll('.option-item');
        
        options.forEach(opt => {
            const optValue = opt.dataset.option;
            if (optValue === question.correctAnswer) {
                opt.classList.add('correct');
            } else if (optValue === this.answers[this.currentQuestion]) {
                opt.classList.add('wrong');
            }
        });
    }
    
    submitQuiz() {
        this.score = 0;
        
        this.questions.forEach((question, index) => {
            if (this.answers[index] === question.correctAnswer) {
                this.score++;
            }
        });
        
        this.isCompleted = true;
        this.showResult();
    }
    
    showResult() {
        const quizArea = document.getElementById('quizArea');
        const quizResult = document.getElementById('quizResult');
        const finalScore = document.getElementById('finalScore');
        const resultMessage = document.getElementById('resultMessage');
        
        if (quizArea) quizArea.style.display = 'none';
        
        if (quizResult) {
            quizResult.classList.add('active');
        }
        
        if (finalScore) {
            finalScore.textContent = `${this.score}/${this.questions.length}`;
        }
        
        if (resultMessage) {
            const percentage = (this.score / this.questions.length) * 100;
            let message = '';
            
            if (percentage === 100) {
                message = '🎉 太棒了！您对南曲文化非常了解！';
            } else if (percentage >= 80) {
                message = '👍 优秀！您对南曲有很好的认知！';
            } else if (percentage >= 60) {
                message = '📚 不错！继续深入学习吧！';
            } else {
                message = '💪 加油！多了解南曲文化！';
            }
            
            resultMessage.textContent = message;
        }
    }
    
    restart() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = {};
        this.isCompleted = false;
        
        const quizArea = document.getElementById('quizArea');
        const quizResult = document.getElementById('quizResult');
        
        if (quizArea) quizArea.style.display = 'block';
        if (quizResult) quizResult.classList.remove('active');
        
        // 重置选项状态
        const container = document.getElementById('questionCards');
        container.querySelectorAll('.option-item').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'wrong');
        });
        
        this.renderQuestion();
    }
}

// ========== 页面初始化 ==========

document.addEventListener('DOMContentLoaded', function() {
    // 初始化作品上传功能
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const filePreview = document.getElementById('filePreview');
    
    if (uploadArea && fileInput) {
        window.fileUploader = new FileUploader({
            uploadArea: uploadArea,
            fileInput: fileInput,
            previewContainer: filePreview,
            onFileSelect: (files) => {
                document.getElementById('uploadForm').classList.add('active');
            }
        });
    }
    
    // 初始化留言板
    const messageList = document.getElementById('messageList');
    if (messageList) {
        window.messageBoard = new MessageBoard('messageList');
    }
});
