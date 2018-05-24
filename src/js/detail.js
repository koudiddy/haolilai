require(["config"],function(){
	require(["jquery","load","cookie"],function($){
		$(function(){
			/*----------------------------------------------------------------*/
			//商品小轮播
			/*----------------------------------------------------------------*/
			var duration = 3000,
				lis = $("#banner-box li"),
				len = lis.length,
				nowIndex = 0,
				nextIndex = 1,
				dian = $("#dian i"),
				timer = null;
				
			timer = setInterval(move,duration);
			
			function move(){
				//当前图片淡出
				$("#banner-box li").eq(nowIndex).fadeOut(600);
				//下一张图片淡入
				$("#banner-box li").eq(nextIndex).fadeIn(600);
				
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
			$(".s-banner").mouseenter(function(){
				clearInterval(timer);
			});
			//鼠标移出,继续
			$(".s-banner").mouseleave(function(){
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
			/*----------------------------------------------------------------*/
			//放大镜
			/*----------------------------------------------------------------*/
			$(".s-banner").mouseenter(function(){
				$(".bigger").css({display:"block"});
				$(".mirror").css({display:"block"});
			});
			$(".s-banner").mouseleave(function(){
				$(".bigger").css({display:"none"});
				$(".mirror").css({display:"none"});
			});
			var sban = $(".s-banner").offset();
			$(".s-banner").mousemove(function(e){
				// 镜头坐标
				var _top = e.pageY - sban.top - 225,
					_left = e.pageX - sban.left - 100;
				// 判断镜头是否在.s-banner中图范围内移动
				if (_top < 0)
					_top = 0;
				else if (_top > 285)
					_top = 285;
				if (_left < 0)
					_left = 0;
				else if (_left > 285)
					_left = 285;
				// 设置镜头定位CSS
				$(".mirror").css({
					top : _top + "px",
					left : _left + "px"
				});
	
				// 设置放大图片定位
				$(".bigger img").css({
					top : -0.4*_top + "px",
					left : -0.4*_left + "px"
				});
			});
			
			/*----------------------------------------------------------------*/
			//选择规格、餐具、数量
			/*----------------------------------------------------------------*/
			$(".guige").mouseenter(function(){
				$(".guige .h-size").css({display:"block"});
			});
			$(".guige").mouseleave(function(){
				$(".guige .h-size").css({display:"none"});
			});
			$(".canju").mouseenter(function(){
				$(".canju .c-size").css({display:"block"});
			});
			$(".canju").mouseleave(function(){
				$(".canju .c-size").css({display:"none"});
			});
			
			$.cookie.json = true;
			var _products = $.cookie("products") || [];
			
			$(".h-size").on("click","p",function(){
				$(".guige b").text($(this).children("label").text());
			});
			//选择规格、餐具
			$(".c-size").on("click","p",function(){
				$(".canju b").text($(this).children("font").text());
			});
			//检测输入数字
			var nowproduct = {
				id:1,
				img:$(".prod").attr("src"),
				desc:$(".desc").text().slice(0,4),
				score:$(".showprice").text().slice(1),
				price:$(".showprice").text().slice(1),
				amount:$("#cake-num").val(),
			};
			$("#cake-num").blur(function(){
				var index = exist(nowproduct.id, _products);
				var reg = /^\d\d$/;
				if (!reg.test($("#cake-num").val())) {
					alert("请输入有效数字");
					_products[index].amount = 1;
					$("#cake-num").val(_products[index].amount);
				}
			});
			$(".minus").click(function(){
				var index = exist(nowproduct.id, _products);
				if (_products[index].amount > 0) {
					_products[index].amount--;
				}else{
					return;
				}
				$("#cake-num").val(_products[index].amount);
			});
			$(".add").click(function(){
				var index = exist(nowproduct.id, _products);
				_products[index].amount++;
				console.log(_products[index]);
				$("#cake-num").val(_products[index].amount);
			});
			$.cookie("products",_products,{expires:10,path:"/"});

			/*----------------------------------------------------------------*/
			//加入购物车
			/*----------------------------------------------------------------*/
			$(".addCart").click(function(){
				$.cookie.json = true;
				// 先读取已有的购物车 cookie
				var products = $.cookie("products") || [];
				var index = exist(nowproduct.id, products);
				if (index !== -1) {
					products[index].amount++;
				} else{
					products.push(nowproduct);
				}
				$.cookie("products",products,{expires:10,path:"/"});
			});
			// 判断某id商品是否已选购
			function exist(id, products) {
				for (var i = 0, len = products.length; i < len; i++) {
					if (products[i].id == id) {
						return i;
					}
				}
				return -1;
			}
			/*----------------------------------------------------------------*/
			//更多精彩
			/*----------------------------------------------------------------*/
			var timer2 = null,
				duration2 = 2000;
			timer2 = setInterval(lmove,duration2);
			function lmove(){
				var _left = $("#l-banner ul").offset().left - 133.5;
				if (_left > -2010) {
					$("#l-banner ul").css({left: _left - 335 + "px"});
				}
				else{
					$("#l-banner ul").css({left: 0 + "px"});
				}
			}
			
			$("#l-banner ul").mouseenter(function(){
				clearInterval(timer2);
			});
			
			$(".buy").click(function(){
				window.location.href = "../html/cofirm.html";
			});
		});
	});
});
