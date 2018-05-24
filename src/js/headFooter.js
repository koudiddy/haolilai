define(["jquery","cookie"],function($){
	$(function(){
		//头部
		$("header").load("/html/hf/header.html",function(){
			$(".city").hover(
				function(){
					$(".newProvince").css({"display":"block"});
				},
				function(){
					$(".newProvince").css({"display":"none"});
				}
			);
			// 加载省份数据
			$.ajax({
				type:"get",
				url:"http://route.showapi.com/268-2?showapi_appid=63663&showapi_sign=957024657c21436182c7fd8cb48a1905",
				dataType:"json",
				success:function(responseData){
					responseData.showapi_res_body.list.forEach(function(province){
						var b = $(".cityshow").clone().removeClass("cityshow").addClass("cityshow1")
						.css({display:"block"}).appendTo(".newProvince");
						b.children("span").text(province.name);
						b.children("font").text(province.id);
					});
				}
			});
			
			// 加载城市数据
			$(".city").on("mouseenter", "li.cityshow1", function(){
				$.ajax({
					type:"get",
					url:"http://route.showapi.com/268-3?showapi_appid=63663&showapi_sign=957024657c21436182c7fd8cb48a1905&proId="+$(this).find("font").text(),
					dataType:"json",
					success:function(responseData){
						var cities = responseData.showapi_res_body.list;
//						console.log(cities);
						// 遍历数组，显示所有城市
						var html = "";
						cities.forEach((city)=>{
							html += `<li>${city.name}</li>`;
						});
						// 显示
						$(".newCity").css({display:"block"}).html(html);
					}
				});
			});
			
			$(".city").on("mouseleave", ".newProvince", function(){
				$(".newCity").on("mouseleave",function(){
					$(".newCity").css({"display":"none"});
					$(".newProvince").css({"display":"none"});
				});
			});
						
			//替换
			$(".newCity").on("click","li",function(){
				$(".city>font").text($(this).text());
			});
			//确定进入
			$(".yes").click(function(){
				var addresses = $(".city>font").text();
				$(".addr a").text(addresses);
				$.cookie("address",addresses,{expires:10,path:"/"});
				$(".masterdiv").css({"display":"none"});
				$(".dizhi").css({"display":"none"});
				$(".dizhi .address").css({"display":"none"});
			});
			
			//点击地址弹出遮罩层
			$(".addr").on("click",function(){
				$(".masterdiv").css({"display":"block"});
				$(".dizhi").css({"display":"block"});
				$(".dizhi .address").css({"display":"block"});
			});
			//判断是否选择地址
			var addresses = $.cookie("address");
			if (addresses) {
				var dizhi = addresses.slice(1,-1);
				$(".addr a").text(dizhi);
				$(".masterdiv").css({"display":"none"});
				$(".dizhi").css({"display":"none"});
				$(".dizhi .address").css({"display":"none"});
			}
			else{
				$(".masterdiv").css({"display":"block"});
				$(".dizhi").css({"display":"block"});
				$(".dizhi .address").css({"display":"block"});
			}
			
			//判断cookie中是否有用户登录
			$.cookie.json = true;
			let user = $.cookie("users");
			if (user) {
				$(".login").html(
					`<a href="javascript:;">${user.username}</a>`
				);
				$(".register").html(
					`<a href="javascript:;">[退出]</a>`
				);
				$(".register").on("click",function(){
					$(".login").html(
						`<a href="/html/login.html">登录</a>`
					);
					$(".register").html(
						`<a href="/html/register.html">注册</a>`
					);
				});
			}
		});
				
				
			//尾部
		$("footer").load("/html/hf/footer.html",function(){
			var i = 1;
			$(".help").click(function(e){
				var src = e.target;
				if (src.className === "top") {
					if (i%2 == 0) {
						$(".top span").css({"background":"url(img/bj_4.png) no-repeat -3px -81px"});
					}else{
						$(".top span").css({"background":"url(img/bj_4.png) no-repeat -23px -81px"});
					}
					$(".help .bottom").toggle(500);
				}
				i++;
			});
		});
	});
});