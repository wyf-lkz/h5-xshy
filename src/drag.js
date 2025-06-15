/***
 * 1.功能名称：拖拽属性赋予drag
 * 2.功能说明：可以使dom元素变成可拖拽的
 * 3.需要的html结构：
    .dragable 可拖拽类名
 * 4.功能是否需要传入参数：不需要
 * 5.功能是否需要返回值：不需要
 */
function drag() {
    // 初始化变量
    var isDragging = false;
    var startPos = { x: 0, y: 0 };
    var currentPos = { x: 0, y: 0 };
    
    // 获取拖拽元素
    var dragpic = document.querySelector('.dragable');
    
    // 触摸开始事件
    dragpic.addEventListener('touchstart', function(e) {
        isDragging = true;
        console.log(e);
        startPos.x = e.touches[0].clientX - currentPos.x;
        startPos.y = e.touches[0].clientY - currentPos.y;
    });
    
    function changePos() {
        dragpic.style.transform = "translate3d(" + currentPos.x + "px, " + currentPos.y + "px, 0)";
    }
    
    // 触摸移动事件
    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
        e.preventDefault();
        currentPos.x = e.touches[0].clientX - startPos.x;
        currentPos.y = e.touches[0].clientY - startPos.y;
        changePos();
        }
    });
    
    // 触摸结束事件
    document.addEventListener('touchend', function() {
        isDragging = false;
    });
}
export default drag;