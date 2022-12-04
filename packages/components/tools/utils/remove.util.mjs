import { rm } from "node:fs/promises";

export function remove(path) {
    return rm(path, { force: true, recursive: true });
}
