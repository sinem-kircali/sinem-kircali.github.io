/* =========================================================
   notes.js
   Renders post cards from data/posts.js (POSTS array) on notes.html
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
});

function renderPosts() {
  const list = document.getElementById("posts-list");
  if (!list || typeof POSTS === "undefined") return;

  list.innerHTML = POSTS.map((p) => postCardHTML(p)).join("");
}

function postCardHTML(p) {
  const tags = (p.tags || []).map((t) => `<li>${escapeHTML(t)}</li>`).join("");
  const body = (p.body || [])
    .map((para) => `<p>${escapeHTML(para)}</p>`)
    .join("");

  const source = p.source
    ? `
      <p class="post-source">
        Source:
        <a href="${escapeHTML(p.source.url)}" target="_blank" rel="noopener">
          ${escapeHTML(p.source.label)}
        </a>
        — ${escapeHTML(p.source.publication)}, ${escapeHTML(p.source.date)}
      </p>
    `
    : "";

  const resource = p.resource
    ? `
      <a class="post-resource-link" href="${escapeHTML(p.resource.url)}" target="_blank" rel="noopener">
        ${escapeHTML(p.resource.label)} &rarr;
      </a>
    `
    : "";

  return `
    <article class="post-card">
      <p class="post-date">${escapeHTML(formatDate(p.date))}</p>
      <h2>${escapeHTML(p.title)}</h2>
      <ul class="tag-list post-tags">${tags}</ul>
      <div class="post-body">${body}</div>
      ${resource}
      ${source}
    </article>
  `;
}

function formatDate(isoDate) {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}
