import type { UserConfig as CommitlintConfig } from "@commitlint/types";
import merge from "lodash.merge";

export function defineCommitlintConfig(config: CommitlintConfig) {
    return config;
}

export function mergeCommitlintConfig(...configs: CommitlintConfig[]) {
    return merge({}, ...configs);
}
