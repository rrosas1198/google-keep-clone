import { defineBauenConfig } from "../../tools/define-bauen-config";

export default defineBauenConfig(__dirname, {
    entries: ["./src/index.ts"],
    externals: ["tslib"],
    preserveModules: true
});
