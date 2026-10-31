/* =========================================================
   main.js
   - Renders project cards from data/projects.js (PROJECTS array)
   - Scroll-reveal for timeline entries
   - Hero "signal" animation: scattered points resolve into a
     trend line. Respects prefers-reduced-motion.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderHobbies();
  initTimelineReveal();
  initSignalCanvas();
});

/* ---------------------------------------------------------
   Projects
   --------------------------------------------------------- */
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid || typeof PROJECTS === "undefined") return;

  grid.innerHTML = PROJECTS.map((p) => projectCardHTML(p)).join("");
  tryLoadComingSoonGif();
  initProjectFilters(grid);
}

/* ---------------------------------------------------------
   Project filters: "Featured" by default, "All", then one chip per theme.
   Cards are hidden with the `hidden` attribute rather than removed, so in-page
   links (e.g. from the timeline) can still point at them.
   --------------------------------------------------------- */
const PROJECT_FILTERS = [
  { key: "featured", label: "Featured" },
  { key: "all", label: "All" },
  { key: "ml", label: "ML & prediction" },
  { key: "nlp", label: "NLP & LLMs" },
  { key: "marketing", label: "Marketing & pricing" },
  { key: "ops", label: "Operations & simulation" },
  { key: "stats", label: "Statistics & econometrics" },
  { key: "data", label: "Data engineering" },
];
const DEFAULT_PROJECT_FILTER = "featured";

function projectInFilter(p, key) {
  if (key === "all") return true;
  if (key === "featured") return Boolean(p.featured);
  return (p.themes || []).includes(key);
}

function initProjectFilters(grid) {
  const bar = document.getElementById("projects-filters");
  const status = document.getElementById("projects-status");
  const cards = Array.from(grid.querySelectorAll(".project-card"));
  if (!bar || cards.length !== PROJECTS.length) return;

  const counts = {};
  PROJECT_FILTERS.forEach((f) => {
    counts[f.key] = PROJECTS.filter((p) => projectInFilter(p, f.key)).length;
  });
  const filters = PROJECT_FILTERS.filter((f) => counts[f.key] > 0);
  const startKey = counts[DEFAULT_PROJECT_FILTER] > 0 ? DEFAULT_PROJECT_FILTER : "all";

  bar.innerHTML = filters
    .map(
      (f) =>
        `<button type="button" class="filter-chip" data-filter="${f.key}" aria-pressed="false">${escapeHTML(f.label)}<span class="filter-count">${counts[f.key]}</span></button>`
    )
    .join("");

  function setFilter(key) {
    let shown = 0;
    cards.forEach((card, i) => {
      const match = projectInFilter(PROJECTS[i], key);
      card.hidden = !match;
      if (match) shown++;
    });
    bar.querySelectorAll(".filter-chip").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.filter === key));
    });
    if (status) {
      status.textContent =
        key === "all" ? `Showing all ${shown} projects` : `Showing ${shown} of ${PROJECTS.length} projects`;
    }
  }

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-chip");
    if (btn) setFilter(btn.dataset.filter);
  });

  /* A link to a project card (e.g. from the timeline) has to work even if a filter hides it. */
  function revealCard(id) {
    const el = id ? document.getElementById(id) : null;
    if (el && el.classList.contains("project-card") && el.hidden) {
      setFilter("all");
      return el;
    }
    return null;
  }
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#project-"]');
    if (link) revealCard(link.getAttribute("href").slice(1));
  });
  window.addEventListener("hashchange", () => {
    const el = revealCard(decodeURIComponent(location.hash.slice(1)));
    if (el) el.scrollIntoView();
  });

  setFilter(startKey);
  const fromHash = revealCard(decodeURIComponent(location.hash.slice(1)));
  if (fromHash) fromHash.scrollIntoView();
}

/* One list item in a card's extra detail sections: a plain string, or a [bold lead, rest] pair. */
function detailItemHTML(item) {
  return Array.isArray(item)
    ? `<li><strong>${escapeHTML(item[0])}</strong> ${escapeHTML(item[1])}</li>`
    : `<li>${escapeHTML(item)}</li>`;
}

function projectCardHTML(p) {
  const tools = (p.tools || [])
    .map((t) => `<li>${escapeHTML(t)}</li>`)
    .join("");

  const hasRepo = Boolean(p.github) && !p.github.startsWith("[");
  const githubIsPlaceholder = Boolean(p.github) && p.github.startsWith("[");
  let githubLink;
  if (hasRepo) {
    githubLink = `<a href="${escapeHTML(p.github)}" target="_blank" rel="noopener">View on GitHub</a>`;
  } else if (githubIsPlaceholder) {
    githubLink = `<a href="#" target="_blank" rel="noopener">GitHub (coming soon)<span class="placeholder-tag">PLACEHOLDER</span></a>`;
  } else {
    githubLink = `<span class="project-link-muted">Repository coming soon</span>`;
  }

  const caseStudyLink = p.caseStudyUrl
    ? `<a href="${escapeHTML(p.caseStudyUrl)}" target="_blank" rel="noopener">Case study &rarr;</a>`
    : "";

  const outcomeBlock = p.comingSoon
    ? comingSoonBadgeHTML()
    : `<p class="project-outcome">${escapeHTML(p.outcome)}</p>`;

  const metricBlock = p.metric
    ? `<span class="project-metric">${escapeHTML(p.metric)}</span>`
    : "";

  const anchorId = "project-" + (p.id || slugify(p.title));

  const detailBlock = (label, body) => `
          <div>
            <dt>${escapeHTML(label)}</dt>
            <dd>${body}</dd>
          </div>`;
  const detailBlocks = [
    detailBlock("Problem", escapeHTML(p.problem)),
    detailBlock("Approach", escapeHTML(p.approach)),
    ...(p.details || []).map((d) =>
      detailBlock(d.label, d.items ? `<ul>${d.items.map(detailItemHTML).join("")}</ul>` : escapeHTML(d.text))
    ),
  ].join("");

  const cardClass =
    "project-card" + (p.details ? " project-card-wide" : "") + (p.comingSoon ? " project-card-coming-soon" : "");

  return `
    <article id="${escapeHTML(anchorId)}" class="${cardClass}">
      <div class="project-card-head">
        <span class="project-icon" aria-hidden="true">${projectIconSVG(p.icon)}</span>
        <div>
          ${p.context ? `<p class="project-context">${escapeHTML(p.context)}</p>` : ""}
          <h3>${escapeHTML(p.title)}</h3>
          <p class="project-summary">${escapeHTML(p.summary)}</p>
        </div>
      </div>

      ${metricBlock}

      <ul class="tag-list">${tools}</ul>

      ${outcomeBlock}

      <details class="project-details">
        <summary>${escapeHTML(p.detailsLabel || "Details")}</summary>
        <dl>${detailBlocks}
        </dl>
      </details>

      <div class="project-links">
        ${githubLink}
        ${caseStudyLink}
      </div>
    </article>
  `;
}

/*
 * Small decorative SVG motifs for project cards, keyed by the `icon` field
 * in data/projects.js. Kept intentionally simple/geometric — stroke-only,
 * currentColor — so they read as data marks rather than illustrations.
 */
const PROJECT_ICONS = {
  trend: `<svg viewBox="0 0 32 32" fill="none"><path d="M5 24 12 15 17 19 27 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="27" cy="7" r="2" fill="currentColor" stroke="none"/></svg>`,
  scatter: `<svg viewBox="0 0 32 32" fill="none"><circle cx="7" cy="9" r="1.6" fill="currentColor" stroke="none"/><circle cx="13" cy="19" r="1.6" fill="currentColor" stroke="none"/><circle cx="20" cy="10" r="1.6" fill="currentColor" stroke="none"/><circle cx="24" cy="22" r="1.6" fill="currentColor" stroke="none"/><circle cx="10" cy="24" r="1.6" fill="currentColor" stroke="none"/><circle cx="26" cy="6" r="1.6" fill="currentColor" stroke="none"/></svg>`,
  bars: `<svg viewBox="0 0 32 32" fill="none"><rect x="5" y="18" width="4" height="9" rx="0.5" fill="currentColor" stroke="none"/><rect x="13" y="12" width="4" height="15" rx="0.5" fill="currentColor" stroke="none"/><rect x="21" y="6" width="4" height="21" rx="0.5" fill="currentColor" stroke="none"/></svg>`,
  network: `<svg viewBox="0 0 32 32" fill="none"><circle cx="8" cy="9" r="2.2" stroke-width="2"/><circle cx="24" cy="10" r="2.2" stroke-width="2"/><circle cx="15" cy="24" r="2.2" stroke-width="2"/><path d="M10 10.5 13 22M22 11.5 17 22.5M10.2 8 21.8 9.5" stroke-width="1.5"/></svg>`,
  waves: `<svg viewBox="0 0 32 32" fill="none"><path d="M4 12c3 0 3 6 6 6s3-10 6-10 3 12 6 12 3-6 6-6" stroke-width="2" stroke-linecap="round"/></svg>`,
  pulse: `<svg viewBox="0 0 32 32" fill="none"><path d="M4 17h5l3-9 5 17 3-12 2 4h6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  cluster: `<svg viewBox="0 0 32 32" fill="none"><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="16" cy="9" r="1.6" fill="currentColor" stroke="none"/><circle cx="10" cy="17" r="1.6" fill="currentColor" stroke="none"/><circle cx="15" cy="16" r="1.6" fill="currentColor" stroke="none"/><circle cx="24" cy="22" r="2.3" fill="none" stroke-width="2"/></svg>`,
  grid: `<svg viewBox="0 0 32 32" fill="none"><rect x="5" y="5" width="22" height="22" rx="1" stroke-width="1.5"/><path d="M5 13h22M5 21h22M13 5v22M21 5v22" stroke-width="1.5"/></svg>`,
  flow: `<svg viewBox="0 0 32 32" fill="none"><circle cx="6" cy="16" r="2" stroke-width="2"/><path d="M8 16h6" stroke-width="2"/><circle cx="16" cy="16" r="2" stroke-width="2"/><path d="M18 16h6" stroke-width="2"/><circle cx="26" cy="16" r="2" stroke-width="2"/></svg>`,
};

function projectIconSVG(type) {
  return PROJECT_ICONS[type] || PROJECT_ICONS.trend;
}

/*
 * "Coming soon" badge for projects whose write-up isn't published yet (no card uses it right now).
 * Tries to load a GIF from assets/coming-soon.gif; if that file doesn't
 * exist yet, falls back to a small CSS dot-loader so nothing looks broken.
 * Drop a GIF at that path any time — no code changes needed.
 */
function comingSoonBadgeHTML() {
  return `
    <div class="coming-soon">
      <span class="coming-soon-visual" data-gif-fallback>
        <span class="dot-loader" role="img" aria-label="Write-up and repository coming soon">
          <span></span><span></span><span></span>
        </span>
      </span>
      <span class="coming-soon-text">Training finished. Write-up and repository coming soon.</span>
    </div>
  `;
}

/* After render, swap in a real GIF if one exists at assets/coming-soon.gif */
function tryLoadComingSoonGif() {
  const slots = document.querySelectorAll("[data-gif-fallback]");
  slots.forEach((slot) => {
    const img = new Image();
    img.src = "assets/coming-soon.gif";
    img.alt = "";
    img.onload = () => {
      slot.innerHTML = "";
      slot.appendChild(img);
    };
    // onerror: silently keep the CSS dot-loader fallback already in the DOM.
  });
}

/* ---------------------------------------------------------
   Hobbies + photo collage (data/hobbies.js)
   --------------------------------------------------------- */
function renderHobbies() {
  const grid = document.getElementById("hobbies-grid");
  if (grid && typeof HOBBIES !== "undefined") {
    grid.innerHTML = HOBBIES.map((h) => hobbyCardHTML(h)).join("");
  }

  const collage = document.getElementById("hobbies-collage");
  if (collage && typeof COLLAGE !== "undefined") {
    collage.innerHTML = COLLAGE.map((c) => collageTileHTML(c)).join("");
  }

  wirePhotoFallbacks(document.getElementById("hobbies"));
}

function photoHTML(src, alt) {
  return `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt || "")}" loading="lazy" decoding="async" data-photo />`;
}

function hobbyCardHTML(h) {
  return `
    <figure class="hobby-card">
      <div class="hobby-photo">${photoHTML(h.image, h.alt)}</div>
      <figcaption>
        <span class="hobby-name">${escapeHTML(h.name)}</span>
        <span class="hobby-caption">${escapeHTML(h.caption)}</span>
      </figcaption>
    </figure>
  `;
}

function collageTileHTML(c) {
  const ratio = Number(c.ratio) > 0 ? Number(c.ratio) : 0.75;
  return `<figure class="collage-tile" style="--ar: ${ratio}">${photoHTML(c.image, c.alt)}</figure>`;
}

/*
 * If a photo file doesn't exist yet (e.g. a hobby you haven't added a picture for),
 * swap the broken image for a labelled placeholder box — drop the file in later and
 * it just works.
 */
function wirePhotoFallbacks(root) {
  if (!root) return;
  root.querySelectorAll("img[data-photo]").forEach((img) => {
    img.addEventListener(
      "error",
      () => {
        const holder = img.parentElement;
        holder.classList.add("photo-empty");
        const box = document.createElement("span");
        box.className = "hobby-photo-placeholder";
        box.innerHTML = '<span class="placeholder-tag">PHOTO PLACEHOLDER</span>';
        img.replaceWith(box);
      },
      { once: true }
    );
  });
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ---------------------------------------------------------
   Timeline scroll-reveal
   --------------------------------------------------------- */
function initTimelineReveal() {
  const items = document.querySelectorAll(".timeline-item");
  if (!items.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   Hero signal animation: scatter -> regression line
   --------------------------------------------------------- */
function initSignalCanvas() {
  const canvas = document.getElementById("signal-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const COLOR_INK = "#1B1F2B";
  const COLOR_SIGNAL = "#2E6F6E";
  const COLOR_HIGHLIGHT = "#B8862B";
  const COLOR_GREY = "#6B7280";

  const POINT_COUNT = 42;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width, height;
  let points = [];
  let highlightIndex = 0;
  let animationStart = null;
  const DURATION = 1900; // ms

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seedPoints() {
    points = [];
    const margin = 0.12;
    for (let i = 0; i < POINT_COUNT; i++) {
      const tx = margin + Math.random() * (1 - margin * 2); // trend x [0..1]
      const trendY = 0.82 - tx * 0.62; // line from bottom-left to upper-right
      const noise = (Math.random() - 0.5) * 0.34;
      const finalY = clamp01(trendY + noise);

      const scatterX = Math.random();
      const scatterY = Math.random();

      points.push({
        sx: scatterX,
        sy: scatterY,
        fx: tx,
        fy: finalY,
        r: 3 + Math.random() * 2.4,
      });
    }
    highlightIndex = Math.floor(Math.random() * POINT_COUNT);
  }

  function clamp01(v) {
    return Math.max(0, Math.min(1, v));
  }

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function toCanvas(nx, ny) {
    const pad = 28;
    return {
      x: pad + nx * (width - pad * 2),
      y: pad + (1 - ny) * (height - pad * 2),
    };
  }

  function drawFrame(progress) {
    ctx.clearRect(0, 0, width, height);

    const eased = easeInOutCubic(progress);

    // Trend line fades/extends in during the second half
    const lineProgress = clamp01((progress - 0.45) / 0.55);
    if (lineProgress > 0) {
      const p1 = toCanvas(0.08, 0.82 - 0.08 * 0.62);
      const p2 = toCanvas(0.92, 0.82 - 0.92 * 0.62);
      const lx = p1.x + (p2.x - p1.x) * easeInOutCubic(lineProgress);
      const ly = p1.y + (p2.y - p1.y) * easeInOutCubic(lineProgress);

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(lx, ly);
      ctx.strokeStyle = COLOR_SIGNAL;
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.9;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    points.forEach((p, i) => {
      const nx = p.sx + (p.fx - p.sx) * eased;
      const ny = p.sy + (p.fy - p.sy) * eased;
      const { x, y } = toCanvas(nx, ny);

      const isHighlight = i === highlightIndex;
      ctx.beginPath();
      ctx.arc(x, y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isHighlight ? COLOR_HIGHLIGHT : COLOR_INK;
      ctx.globalAlpha = isHighlight ? 1 : 0.68;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }

  function drawResolvedState() {
    // Static end-state for reduced-motion users
    drawFrame(1);
  }

  function tick(ts) {
    if (animationStart === null) animationStart = ts;
    const elapsed = ts - animationStart;
    const progress = clamp01(elapsed / DURATION);
    drawFrame(progress);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  function start() {
    resize();
    seedPoints();
    if (reduceMotion) {
      drawResolvedState();
    } else {
      animationStart = null;
      requestAnimationFrame(tick);
    }
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      drawFrame(reduceMotion ? 1 : 1);
    }, 150);
  });

  start();
}
