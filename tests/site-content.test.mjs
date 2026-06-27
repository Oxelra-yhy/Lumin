import { readFileSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const indexHtml = readFileSync(join(root, "docs", "index.html"), "utf8");
const topologicalHtml = readFileSync(join(root, "docs", "books", "topological-photonics", "index.html"), "utf8");
const nonHermitianHtml = readFileSync(join(root, "docs", "books", "non-hermitian", "index.html"), "utf8");
const stylesCss = readFileSync(join(root, "docs", "styles.css"), "utf8");
const appJs = readFileSync(join(root, "docs", "app.js"), "utf8");

const requiredText = [
  "面向人类研究人员和 Agent 的 Open Knowledge Books",
  "开源书籍，知识共议",
  "公开审议",
  "智能体写作",
  "可追踪修订",
  "Topological Photonics from Maxwell's Equations",
  "Non-Hermitian Photonics",
  "开源审议，持续修订",
  "问题反馈",
  "版本归档",
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

for (const html of [indexHtml, topologicalHtml, nonHermitianHtml]) {
  assert.ok(html.includes('data-lang-option="zh"'), "Expected Chinese language toggle");
  assert.ok(html.includes('data-lang-option="en"'), "Expected English language toggle");
  assert.ok(html.includes('data-lang="zh"'), "Expected Chinese content blocks");
  assert.ok(html.includes('data-lang="en"'), "Expected English content blocks");
  assert.ok(html.includes("app.js"), "Expected language script on every page");
  assert.ok(html.includes('class="site-mark-oxelra" href="https://oxelra.com/"'), "Expected Oxelra header link");
  assert.ok(html.includes('class="header-link__icon"'), "Expected GitHub icon in header link");
  assert.ok(!html.includes("<small>"), "Expected header subtitle to be removed");
}

assert.ok(indexHtml.includes("Open Knowledge Books for Human Researchers and Agents"));
assert.ok(indexHtml.includes("Open Source, Open Review, Continuous Revision"));
assert.ok(indexHtml.includes("Issue Feedback"));
assert.ok(indexHtml.includes("Versioned Releases"));
assert.ok(indexHtml.includes("面向人类研究人员和 Agent 的"));
assert.ok(indexHtml.includes("开源书籍，知识共议"));
assert.ok(indexHtml.includes("由智能体参与写作"));
assert.ok(indexHtml.includes("Lumin 以专著体量组织每个由智能体生成并持续修订的研究主题。每本书都保留源稿、PDF、目录、版本记录和公开反馈入口，让阅读、引用与复核都有清晰路径。"));
assert.ok(indexHtml.includes('class="book-card-body"'));
assert.ok(indexHtml.includes('class="book-cover"'));
assert.ok(indexHtml.includes('assets/covers/topological-photonics.png'));
assert.ok(indexHtml.includes('assets/covers/non-hermitian-photonics.png'));
assert.ok(indexHtml.includes('class="revision-grid"'));
assert.ok(indexHtml.includes('class="revision-card"'));
assert.ok(indexHtml.includes("拓扑光子学 · 反馈"));
assert.ok(indexHtml.includes("非厄米光子学 · 版本"));
assert.ok(!indexHtml.includes('class="review-steps"'));
assert.ok(topologicalHtml.includes("拓扑光子学"));
assert.ok(topologicalHtml.includes("Topological Photonics"));
assert.ok(topologicalHtml.includes("书稿状态"));
assert.ok(topologicalHtml.includes("草稿 / 待公开审议"));
assert.ok(topologicalHtml.includes("版本发布"));
assert.doesNotMatch(topologicalHtml, /(?:chapters|appendices)\/[^<]+\.tex/);
assert.ok(nonHermitianHtml.includes("非厄米光子学"));
assert.ok(nonHermitianHtml.includes("Non-Hermitian Photonics"));
assert.ok(nonHermitianHtml.includes("书稿状态"));
assert.ok(nonHermitianHtml.includes("草稿 / 待公开审议"));
assert.ok(nonHermitianHtml.includes("版本发布"));
assert.doesNotMatch(nonHermitianHtml, /(?:chapters|appendices)\/[^<]+\.tex/);
assert.match(stylesCss, /\[data-lang\]/);
assert.match(stylesCss, /\.language-switch/);
assert.match(stylesCss, /\.header-link__icon/);
assert.match(stylesCss, /\.revision-card__links\s*{[^}]*display:\s*grid;/);
assert.match(stylesCss, /font-size:\s*14px;/);
assert.match(stylesCss, /\.site-header\s*{[^}]*position:\s*fixed;/);
assert.match(stylesCss, /padding-top:\s*var\(--header-height\);/);
assert.match(stylesCss, /min-height:\s*var\(--page-height\);/);
assert.match(appJs, /localStorage/);
assert.match(appJs, /URLSearchParams/);
