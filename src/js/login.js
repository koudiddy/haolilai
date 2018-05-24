//依赖配置
require(["config"],function(){
	require(["jquery","load","cookie"],function($){
		$(function(){
			$("#user").on("focus",function(){
				$(".log-user .prompt").css({display:"block"});
			});
			$("#password").on("focus",function(){
				$(".log-pwd .prompt").css({display:"block"});
			});
			$("#user").on("blur",function(){
				$(".log-user .prompt").css({display:"none"});
			});
			$("#password").on("blur",function(){
				$(".log-pwd .prompt").css({display:"none"});
			});
			
			$.cookie.json = true;
			var _users = $.cookie("users");
			
			$(".log-btn").on("click",function(){
				_users.forEach(function(user){
					if ($("#user").val() == user.username && $("#password").val() == user.password) {
						window.location.href = "/index.html";
					}
					else{
						if ($("#user").val() != user.username) {
							alert("请检查用户名是否正确");
						}
						if ($("#password").val() != user.password) {
							alert("请检查密码是否正确");
						}
					}
				});
			});
		});
	});
});
