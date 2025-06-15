$(document).ready(function() {
    const canvas = $('#gameCanvas');
    const player = $('#player');
    let missiles = [];
    let score = 0; // 初始得分
    let health = 3; // 初始血量
    let missileCount = 0; // 当前导弹数量

    // 定义导弹生成的x轴位置
    const missilePositions = [canvas.width() * 0.05,canvas.width() * 0.15, canvas.width() * 0.3,canvas.width() * 0.45,canvas.width() * 0.6, canvas.width() * 0.75, canvas.width()*0.9];

    function spawnMissile() {
        if (missileCount >= 100) return; // 限制导弹数量不超过100

        const missile = $('<div class="missile"></div>');
        const position = missilePositions[Math.floor(Math.random() * missilePositions.length)];
        missile.css({
            left: position - 10, // 确保导弹在画布内
            top: '-50px' // 初始位置在屏幕顶部之外
        });
        canvas.append(missile);
        missiles.push(missile);
        missileCount++;

        missile.animate({
            top: canvas.height() + 50 // 移动到屏幕底部
        }, 3000, 'linear', function() {
            $(this).remove();
            const index = missiles.indexOf(missile);
            if (index > -1) {
                missiles.splice(index, 1);
            }
            missileCount--;
            // 导弹到达底部，增加得分
            score++;
            updateScore();
        });
    }

    function movePlayer(event) {
        // 判断事件类型，处理触摸事件和键盘事件
        let moveX;
        if (event.type === 'touchmove') {
            moveX = event.originalEvent.touches[0].clientX - canvas.offset().left - player.width() / 2;
        } else {
            moveX = event.keyCode === 37 ? player.position().left - 5 : player.position().left + 5;
        }

        // 限制玩家飞机不超过画布边界
        const newLeft = Math.max(0, Math.min(moveX, canvas.width() - player.width()));
        player.css({'left': newLeft + 'px'});
    }

    function checkCollision() {
        missiles.forEach(missile => {
            const missileRect = missile[0].getBoundingClientRect();
            const playerRect = player[0].getBoundingClientRect();
            if (missileRect.left < playerRect.right && missileRect.right > playerRect.left &&
                missileRect.top < playerRect.bottom && missileRect.top + missileRect.height > playerRect.top) {
                health--;
                missile.remove();
                const index = missiles.indexOf(missile);
                if (index > -1) {
                    missiles.splice(index, 1);
                }
                missileCount--;
                if (health <= 0) {
                    alert('游戏结束！你的得分是：' + score);
                    console.log('游戏结束！你的得分是' + score);
                    window.location.reload();
                }
            }
        });
    }

    function updateScore() {
        // 更新得分显示，这里需要一个元素来显示得分
        $('#score').text('Score: ' + score);
    }

    function gameLoop() {
        spawnMissile();
        checkCollision();
        setTimeout(gameLoop, 100); // 每100毫秒生成一个导弹
    }

    $(document).keydown(movePlayer);
    $(document).on('touchmove', movePlayer); // 为触摸屏设备添加触摸事件

    gameLoop();
});