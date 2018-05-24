require(["config"],function(){
	require(["jquery","load"],function($){
		$(function(){
			$.ajax({
				type:"get",
				url:"../mock/list.json",
				dataType:"json",
				success: function(responseData){
					var i = 1;
					responseData.res_body.list.forEach(function(products){
						if (i%3 == 0) {
							var pro = $(".template").clone().removeClass("template").addClass("list-pro")
							.css({display:"block",margin:"10px 0 0 0"}).appendTo(".big-listbox>ul");
							pro.children(".id").text(products.id);
							pro.children(".zstu").children("a").children("img").attr("src",products.img);
							pro.children(".xq").children("a").children("p").text(products.desc)
							.next("b").text(products.price);
						}
						if (i%3 != 0) {
							var pro = $(".template").clone().removeClass("template").addClass("list-pro")
							.css({display:"block"}).appendTo(".big-listbox>ul");
							pro.children(".id").text(products.id);
							pro.children(".zstu").children("a").children("img").attr("src",products.img);
							pro.children(".xq").children("a").children("p").text(products.desc)
							.next("b").text(products.price);
						}
						i++;
					});
				}
			});
		});
	});
});
