import { readFileSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const indexHtml = readFileSync(join(root, "docs", "index.html"), "utf8");
const stylesCss = readFileSync(join(root, "docs", "styles.css"), "utf8");

const requiredText = [
  "面向人类研究人员和 Agent 的",
  "Open Knowledge Books",
  "Human-readable",
  "Agent-ready",
  "Topological Photonics from Maxwell's Equations",
  "Non-Hermitian Photonics",
  "Open Source, Open Review, Continuous Revision",
  "Evidence-based Feedback",
  "Versioned Releases",
];

for (const text of requiredText) {
  assert.ok(indexHtml.includes(text), `Expected homepage to include: ${text}`);
}

const sectionOrder = [
  'id="project"',
  'id="books"',
  'id="review"',
];

let lastIndex = -1;
for (const marker of sectionOrder) {
  const currentIndex = indexHtml.indexOf(marker);
  assert.notEqual(currentIndex, -1, `Expected section marker: ${marker}`);
  assert.ok(currentIndex > lastIndex, `Expected ${marker} to appear after previous section`);
  lastIndex = currentIndex;
}

assert.match(stylesCss, /--color-ink:\s*#111827;/);
assert.match(stylesCss, /--color-accent:\s*#1f6f78;/);
assert.doesNotMatch(stylesCss, /radial-gradient\(circle at 86% 18%/);
