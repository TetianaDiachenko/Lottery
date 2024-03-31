//The main module
import gulp from "gulp";

//Import paths
import { path } from "./gulp/config/path.js";

//Import generic plugins
import { plugins } from "./gulp/config/plugins.js"; 

// Transfer the value to a global variable
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins
}

// Import tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { gitHub } from "./gulp/tasks/github.js";
// import { ftp } from "./gulp/task/ftp.js";

// Watcher for changing in the files
function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}

export { svgSprive } 

//Sequential processing of fonts
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Main tasks
const mainTasks = gulp.series( fonts, gulp.parallel(copy, html, scss, js, images, svgSprive));

// Building scenarios
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployGitHub = gulp.series(reset, mainTasks, gitHub);
// const deployFTP = gulp.series(reset, mainTasks, ftp);

//Export scenarios
export { dev }
export { build } 
export { deployZIP }
export { deployGitHub }
// export { deployFTP }

// Default scenarios execution
gulp.task('default', dev);