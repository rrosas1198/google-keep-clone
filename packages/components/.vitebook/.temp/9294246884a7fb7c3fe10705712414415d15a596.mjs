// FILE: C:/Users/rrosa/Desktop/Github/Personal/google-keep-clone/packages/components/.vitebook/config.ts

import __vitebook__path from 'path';
import { fileURLToPath as __vitebook__fileURLToPath } from 'url';
import { createRequire as __vitebook__createRequire } from 'module';
const require = __vitebook__createRequire(import.meta.url);
var __require = function(x) { return require(x); };
__require.__proto__.resolve = require.resolve;
const __filename = __vitebook__fileURLToPath(import.meta.url);
const __dirname = __vitebook__path.dirname(__filename);

// .vitebook/config.ts
import { clientPlugin, defineConfig } from "@vitebook/client/node";
import { defaultThemePlugin } from "@vitebook/theme-default/node";
import { vuePlugin } from "@vitebook/vue/node";
import vue from "@vitejs/plugin-vue";
var config_default = defineConfig({
  include: ["src/**/*.md", "src/**/*.story.vue"],
  plugins: [
    vuePlugin({ appFile: "App.vue" }),
    clientPlugin(),
    defaultThemePlugin(),
    vue({ include: /\.(md|vue)/ })
  ],
  site: {
    title: "Vitebook",
    description: "Blazing fast Storybook alternative.",
    theme: {
      remoteGitRepo: {
        url: "vitebook/vitebook"
      }
    }
  }
});
export {
  config_default as default
};
