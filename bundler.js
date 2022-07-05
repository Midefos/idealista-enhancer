import fs from 'fs';
import browserify from 'browserify';
import banner from 'browserify-banner';

const STATIC_BANNER = "// ==UserScript==\n" +
  "// @name                Idealista Enhancer\n" +
  "// @description         Just some information for idealista.com\n" +
  "// @version             0.1.0\n" +
  "// @author              Midefos\n" +
  "// @namespace           https://github.com/Midefos\n" +
  "// @match               https://www.idealista.com/*\n" +
  "// @license MIT\n" +
  "// ==/UserScript==\n" +
  "/* jshint esversion: 6 */\n\n";

browserify("./app.js")
  .transform("babelify", { presets: ["@babel/preset-env"] })
  .plugin(banner, { banner: STATIC_BANNER })
  .bundle()
  .pipe(fs.createWriteStream("app.bundle.js"));