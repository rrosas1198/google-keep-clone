import { clientPlugin, defineConfig } from "@vitebook/client/node";
import { DefaultThemeConfig, defaultThemePlugin } from "@vitebook/theme-default/node";
import { vuePlugin } from "@vitebook/vue/node";
import vue from "@vitejs/plugin-vue";

export default defineConfig<DefaultThemeConfig>({
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
