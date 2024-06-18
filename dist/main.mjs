// src/main.ts
import * as core from "@actions/core";
import { getExecOutput } from "@actions/exec";
import path from "path";
async function run() {
  try {
    const test = core.getInput("test");
    const cleverPath = path.join(__dirname, "..", "node_modules", ".bin", "clever");
    const { stdout } = await getExecOutput(cleverPath, [test]);
    core.debug(`Command Output: ${stdout}`);
    core.debug(`Finding clever-tools ${test} ...`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}
export {
  run
};
