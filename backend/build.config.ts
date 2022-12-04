import { UnbuildBaseConfig } from "@keep/config";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    preset: UnbuildBaseConfig(__dirname),
    entries: ["src/main"]
});
