export function parseStack(root: string, stack: string) {
    const lines = stack.split("\n").splice(1);
    return lines.map(line => line.trim().replace("file://", "").replace(root, ""));
}
