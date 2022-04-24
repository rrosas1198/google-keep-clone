import { execaCommand } from "execa";
import fkill from "fkill";

const processes = new Set<number>();

export function runNpmScript(name: string, rootDir = process.cwd()) {
    const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
    const command = [npmCmd, "run", name].join(" ");
    const subProcess = execaCommand(command, { cwd: rootDir, stdio: "inherit" });
    processes.add(subProcess.pid as number);
    return subProcess;
}

export async function killActiveProcesses() {
    const processesPids = [...processes];

    try {
        await fkill(processesPids, { force: true });
        processesPids.forEach(pid => processes.delete(pid));
    } catch {
        //
    }
}
