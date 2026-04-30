import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const cwd = process.cwd();

async function removeDir(name) {
  const dir = join(cwd, name);
  if (!existsSync(dir)) {
    return;
  }

  const maxAttempts = 4;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      rmSync(dir, { recursive: true, force: true });
      console.log(`Removed ${name}`);
      return;
    } catch (err) {
      if (attempt === maxAttempts) {
        console.error(`Failed to remove ${name} after ${maxAttempts} attempts:`, err);
        process.exitCode = 1;
        throw err;
      }
      await delay(350 * attempt);
    }
  }
}

await removeDir(".next");
await removeDir(".turbo");
