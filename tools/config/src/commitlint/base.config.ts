import { defineCommitlintConfig } from "src/utils";

export const CommitlintBaseConfig = defineCommitlintConfig({
    extends: ["@commitlint/config-conventional"],
    rules: {
        "subject-case": [
            2,
            "always",
            ["sentence-case", "start-case", "pascal-case", "upper-case", "lower-case"]
        ],
        "type-enum": [
            2,
            "always",
            [
                "build",
                "chore",
                "examples",
                "cd",
                "ci",
                "docs",
                "feat",
                "fix",
                "perf",
                "release",
                "refactor",
                "revert",
                "style",
                "test",
                "types",
                "wip",
                "workflow"
            ]
        ]
    }
});
