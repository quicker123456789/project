const browserSync = require('browser-sync');

browserSync({
	server: "app",
	files: ["app/*.html","app/bin/*.html","app/catalog/*.html","app/css/*.css","app/js/*.js"]
});