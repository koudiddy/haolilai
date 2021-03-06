require.config({
	baseUrl: "/",
	paths: {
		jquery:"/lib/jquery/jquery-1.12.4.min",
		artTemplate:"/lib/artTemplate/template-web",
		cookie:"/lib/jquery-plugins/jquery.cookie",
		zoom:"/lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
		fly:"/lib/jquery-plugins/jquery.fly.min",
		load:"/js/headFooter"
	},
	shim: {
		fly : {
			deps : ["jquery"]
		},
		zoom : {
			deps: ["jquery"]
		}
	}
});