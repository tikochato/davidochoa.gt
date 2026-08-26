import { readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");

const junk = new Set(["index.txt", "__next._full.txt", "__next.__PAGE__.txt", "__next._tree.txt"]);

for (const name of readdirSync(outDir)) {
  if (junk.has(name) || name.startsWith("__next.")) {
    rmSync(join(outDir, name), { recursive: true, force: true });
  }
}
