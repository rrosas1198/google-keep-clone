import { clientPlugin, defineConfig } from "@vitebook/client/node";
import { DefaultThemeConfig, defaultThemePlugin } from "@vitebook/theme-default/node";
import { vuePlugin } from "@vitebook/vue/node";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig<DefaultThemeConfig>({
    include: ["src/**/*.story.vue"],
    plugins: [
        vuePlugin({ appFile: "App.vue" }),
        clientPlugin(),
        defaultThemePlugin(),
        vue(),
        vueJsx()
    ],
    site: {
        title: "Components",
        theme: {
            remoteGitRepo: {
                url: "vitebook/vitebook"
            }
        }
    }
});
