//依赖配置
require(["config"],function(){
	require(["jquery","load"],function($){
		$(function(){
			var duration = 3000,
				lis = $("#box li"),
				len = lis.length,
				nowIndex = 0,
				nextIndex = 1,
				dian = $("#dian i"),
				timer = null;
				
			timer = setInterval(move,duration);
			
			function move(){
				//当前图片淡出
				$("#box li").eq(nowIndex).fadeOut(600);
				//下一张图片淡入
				$("#box li").eq(nextIndex).fadeIn(600);
				
				//小圆点
				$("#dian i").eq(nowIndex).removeClass("imgOn");
				$("#dian i").eq(nextIndex).addClass("imgOn");
				//下标增加
				nowIndex = nextIndex;
				nextIndex++;
				
				if (nextIndex >= len) {
					nextIndex = 0;
				}
			}
			//鼠标移入，停止
			$("#banner").mouseenter(function(){
				clearInterval(timer);
			});
			//鼠标移出,继续
			$("#banner").mouseleave(function(){
				timer = setInterval(move,duration);
			});
			
			$("#dian i").mouseenter(function(e){
				var _index = $(e.target).index();
				if (nowIndex == _index) {
					return;
				}
				nextIndex = _index;
				move();
			});
			
			$("#prev").click(function(){
				nextIndex = nowIndex - 1;
				if (nextIndex < 0) {
					nextIndex = len-1;
				}
				move();
			});
			$("#next").click(move);
		});
	});
});
