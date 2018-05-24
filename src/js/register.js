//依赖配置
require(["config"],function(){
	require(["jquery","load","cookie"],function($){
		$(function(){
			$("#user").on("focus",function(){
				$(".reg-numb .prompt").css({display:"block"});
			});
			$("#password").on("focus",function(){
				$(".reg-pwd .prompt").css({display:"block"});
				$(".conf-mm").css({display:"block"});
			});
			$("#rePassword").on("focus",function(){
				$(".reg-repwd .prompt").css({display:"block"});
			});
			$("#user").on("blur",function(){
				$(".reg-numb .prompt").css({display:"none"});
			});
			$("#password").on("blur",function(){
				$(".reg-pwd .prompt").css({display:"none"});
				$(".conf-mm").css({display:"none"});
			});
			$("#rePassword").on("blur",function(){
				$(".reg-repwd .prompt").css({display:"none"});
			});
			//密码长度
			$("#password").keydown(function(){
				if ($("#password").val().length <= 20) {
					switch ($("#password").val().length){
						case 1:
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
							$(".conf-mm .qd-box span").css({width:"33%",background:"#87d0e3"});
							break;
						case 7:
						case 8:
						case 9:
						case 10:
						case 11:
						case 12:
							$(".conf-mm .qd-box span").css({width:"66%",background:"#87d0e3"});
							break;
						case 13:
						case 14:
						case 15:
						case 16:
						case 17:
						case 18:
							$(".conf-mm .qd-box span").css({width:"90%",background:"#87d0e3"});
							break;
						case 19:
						case 20:
							$(".conf-mm .qd-box span").css({width:"100%",background:"#87d0e3"});
							break;
					}
				}
			});
			
			$(".reg-sub").on("click",function(){
				$.cookie.json = true;
				var _users = $.cookie("users") || [];
				var reg = /^[1]\d{10}$/;
				//验证
				if ($("#user").val() != "" && $("#password").val() != "" && $("rePassword").val() != "") {
					if (!reg.test($("#user").val())) {
						$(".reg-numb .prompt").css({display:"block"});
						$(".reg-numb .prompt span").text("请正确填写您手机号");
						return;
					}
					else{
						if ($("#user").val() == _users.username) {
							$(".reg-numb .prompt").css({display:"block"});
							$(".reg-numb .prompt span").text("用户已存在");
							return;
						}
					}
					if ($("#password").val() != $("#rePassword").val()) {
						$(".reg-repwd .prompt").css({display:"block"});
						return;
					}
				}
				//同意协议
				if (!$("#check").prop("checked")) {
					$(".term .prompt").css({display:"block"});
					return;
				}else{
					$(".term .prompt").css({display:"none"});
				}
				
				//存入cookie
				var users = {
					username:$("#user").val(),
					password:$("#password").val()
				};
				_users.push(users);
				$.cookie("users",_users,{expires:10,path:"/"});
				window.location.href = "../index.html";
			});
		});
	});
});
