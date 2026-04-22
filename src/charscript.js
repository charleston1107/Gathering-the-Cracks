
// chinese_character_puzzle/frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    // 粒子效果配置
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });

    const characters = ['爱', '和', '平', '智', '慧', '勇', '敢', '诚', '信', '礼', '义', '仁'];
    const dropZones = document.querySelectorAll('.drop-zone');
    const transitionOverlay = document.querySelector('.transition-overlay');
    let filledCount = 0;
    let ghostElement = null;
    let activeDropZone = null;

    // 创建浮动字符
    characters.forEach(char => {
        const element = document.createElement('div');
        element.className = 'character';
        element.textContent = char;
        element.draggable = true;
        
        // 随机位置
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        
        // 随机动画
        element.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        element.style.animationDelay = `${Math.random() * 2}s`;
        
        // 拖拽事件
        element.addEventListener('dragstart', dragStart);
        element.addEventListener('dragend', dragEnd);
        element.addEventListener('drag', dragMove);
        
        document.body.appendChild(element);
    });

    // 拖拽区事件
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', dragOver);
        zone.addEventListener('dragleave', dragLeave);
        zone.addEventListener('drop', drop);
        
        // 计算拖拽区中心位置
        updateDropZonePosition(zone);
    });

    function updateDropZonePosition(zone) {
        const rect = zone.getBoundingClientRect();
        zone.centerX = rect.left + rect.width / 2;
        zone.centerY = rect.top + rect.height / 2;
    }

    function dragStart(e) {
        this.classList.add('dragging');
        e.dataTransfer.setData('text/plain', this.textContent);
        setTimeout(() => this.style.display = 'none', 0);
        
        // 创建拖拽幽灵元素
        ghostElement = document.createElement('div');
        ghostElement.className = 'drag-ghost';
        ghostElement.textContent = this.textContent;
        ghostElement.style.left = `${e.clientX}px`;
        ghostElement.style.top = `${e.clientY}px`;
        document.body.appendChild(ghostElement);
    }

    function dragEnd() {
        this.classList.remove('dragging');
        this.style.display = '';
        
        // 移除幽灵元素
        if (ghostElement) {
            ghostElement.remove();
            ghostElement = null;
        }
        
        // 如果拖拽到有效区域则吸附
        if (activeDropZone && !activeDropZone.hasChildNodes()) {
            snapToDropZone(this, activeDropZone);
            activeDropZone = null;
        }
    }

    function dragMove(e) {
        // 更新幽灵元素位置
        if (ghostElement) {
            ghostElement.style.left = `${e.clientX}px`;
            ghostElement.style.top = `${e.clientY}px`;
        }
        
        // 检查是否靠近任何拖拽区
        let closestZone = null;
        let minDistance = Infinity;
        
        dropZones.forEach(zone => {
            const distance = Math.sqrt(
                Math.pow(e.clientX - zone.centerX, 2) + 
                Math.pow(e.clientY - zone.centerY, 2)
            );
            
            if (distance < 100 && distance < minDistance && !zone.hasChildNodes()) {
                minDistance = distance;
                closestZone = zone;
            } else {
                zone.classList.remove('active');
            }
        });
        
        if (closestZone) {
            closestZone.classList.add('active');
            activeDropZone = closestZone;
        } else {
            activeDropZone = null;
        }
    }

    function dragOver(e) {
        e.preventDefault();
        this.classList.add('active');
    }

    function dragLeave() {
        this.classList.remove('active');
    }

    function drop(e) {
        e.preventDefault();
        this.classList.remove('active');
        
        if (this.hasChildNodes()) return;
        
        const char = e.dataTransfer.getData('text/plain');
        const charElement = document.createElement('div');
        charElement.className = 'character';
        charElement.textContent = char;
        charElement.style.animation = 'none';
        charElement.style.position = 'static';
        charElement.style.fontSize = '2rem';
        
        this.appendChild(charElement);
        this.classList.add('filled');
        
        filledCount++;
        
        if (filledCount === 3) {
            setTimeout(() => {
                transitionOverlay.classList.add('active');
                setTimeout(() => {
                    alert('正在开发中');
                    location.reload();
                }, 2000);
            }, 500);
        }
    }

    function snapToDropZone(element, zone) {
        element.style.left = `${zone.centerX - element.offsetWidth / 2}px`;
        element.style.top = `${zone.centerY - element.offsetHeight / 2}px`;
        element.classList.add('snapping');
        
        setTimeout(() => {
            element.classList.remove('snapping');
        }, 500);
    }

    // 响应式调整
    window.addEventListener('resize', () => {
        dropZones.forEach(zone => {
            updateDropZonePosition(zone);
        });
        
        document.querySelectorAll('.character').forEach(char => {
            if (!char.parentElement.classList.contains('drop-zone')) {
                const x = Math.random() * (window.innerWidth - 100);
                const y = Math.random() * (window.innerHeight - 100);
                char.style.left = `${x}px`;
                char.style.top = `${y}px`;
            }
        });
    });
});
