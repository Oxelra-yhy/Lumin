const nodes = {
  bookGrid: document.querySelector("#bookGrid"),
  bookCount: document.querySelector("#bookCount")
};

const DATA_VERSION = "2026-06-26-card-actions";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function localDetailUrl(book) {
  return `books/${book.id}/`;
}

function bookCard(book, index) {
  const titleId = `book-title-${escapeHtml(book.id)}`;
  const pdfDownload = book.pdfFileName ? ` download="${escapeHtml(book.pdfFileName)}"` : "";

  return `
    <article class="book-index-card" aria-labelledby="${titleId}">
      <span class="book-index-card__number">${String(index + 1).padStart(2, "0")}</span>
      <span class="book-index-card__domain">${escapeHtml(book.domain)}</span>
      <h3 class="book-index-card__title" id="${titleId}">${escapeHtml(book.title)}</h3>
      <span class="book-index-card__summary">${escapeHtml(book.summary)}</span>
      <div class="book-index-card__actions">
        <a href="${escapeHtml(localDetailUrl(book))}">View index</a>
        <span>
          <a href="${escapeHtml(book.pdfUrl)}"${pdfDownload}>下载</a>
          <a href="${escapeHtml(book.sourceUrl)}" target="_blank" rel="noreferrer">仓库</a>
        </span>
      </div>
    </article>
  `;
}

async function init() {
  const booksResponse = await fetch(`data/books.json?v=${DATA_VERSION}`);

  if (!booksResponse.ok) {
    throw new Error("无法读取平台数据。请通过本地服务器或 GitHub Pages 打开站点。");
  }

  const books = (await booksResponse.json()).books || [];

  nodes.bookGrid.innerHTML = books.map(bookCard).join("");

  if (nodes.bookCount) {
    nodes.bookCount.textContent = String(books.length);
  }
}

init().catch((error) => {
  nodes.bookGrid.innerHTML = `<p class="notice">${escapeHtml(error.message)}</p>`;
});
