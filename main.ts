import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Error 404: patience not found. I have printed 12,847 pages for you and kept every jam as evidence — thump me once more and your report comes out in Comic Sans.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

// Self-checking gate: single line, 1-240 chars, non-blank UTF-8 text.
const chars = [...ENTRY].length;
if (ENTRY.trim().length === 0) throw new Error("gate: entry is blank");
if (chars < 1 || chars > 240) throw new Error(`gate: entry is ${chars} chars, must be 1-240`);
if (ENTRY.includes("\n")) throw new Error("gate: entry must be a single line");

writeFileSync(outPath, ENTRY, "utf8");

// Read-back re-gate: what landed on disk must be byte-identical to ENTRY.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== ENTRY) throw new Error("re-gate: entry.txt on disk differs from ENTRY");
if ([...onDisk].length !== chars) throw new Error("re-gate: entry.txt char count mismatch");

console.log(ENTRY);
console.log(`wrote ${outPath} (${chars} chars)`);
