// Shared site logic. Content lives in data.js.

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function toSeconds(t) {
  return String(t).split(":").reduce((acc, n) => acc * 60 + Number(n), 0);
}
function ytEmbed(id, start = 0, autoplay = false) {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&start=${start}${autoplay ? "&autoplay=1" : ""}`;
}

function renderChrome() {
  document.querySelectorAll("[data-site-title]").forEach(el => (el.textContent = SITE.title));
  document.querySelectorAll("[data-site-course]").forEach(el => (el.textContent = SITE.course));
  document.querySelectorAll("[data-site-subtitle]").forEach(el => (el.textContent = SITE.subtitle));
  document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
  document.querySelectorAll("[data-instructor]").forEach(el => (el.textContent = SITE.instructor));
}

/* ---------- Index page ---------- */
function renderIndex() {
  const grid = document.getElementById("grid");
  const search = document.getElementById("search");
  const chipsEl = document.getElementById("chips");
  const units = ["All", ...new Set(TUTORIALS.map(t => t.unit))];
  let unit = "All";

  chipsEl.innerHTML = units
    .map(u => `<button class="chip${u === "All" ? " active" : ""}" data-unit="${esc(u)}">${esc(u)}</button>`)
    .join("");
  chipsEl.addEventListener("click", e => {
    const b = e.target.closest(".chip");
    if (!b) return;
    unit = b.dataset.unit;
    chipsEl.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === b));
    draw();
  });
  search.addEventListener("input", draw);

  function draw() {
    const q = search.value.trim().toLowerCase();
    const list = TUTORIALS.filter(t => {
      if (unit !== "All" && t.unit !== unit) return false;
      if (!q) return true;
      return [t.title, t.description, t.unit, ...(t.skills || [])].join(" ").toLowerCase().includes(q);
    });
    if (!list.length) {
      grid.innerHTML = `<p class="empty">No tutorials match that search.</p>`;
      return;
    }
    grid.innerHTML = list.map(t => {
      const thumb = t.youtube
        ? `<img src="https://i.ytimg.com/vi/${encodeURIComponent(t.youtube)}/hqdefault.jpg" alt="" loading="lazy">`
        : `<span>▶ video coming soon</span>`;
      return `
        <a class="card" href="tutorial.html?id=${encodeURIComponent(t.id)}">
          <div class="thumb">${thumb}</div>
          <div class="body">
            <span class="tag">${esc(t.unit)}</span>
            <h3>${esc(t.title)}</h3>
            <p>${esc(t.description)}</p>
            <div class="meta"><span>${esc(t.level)}</span><span>${esc(t.duration)}</span>${t.drawing ? "<span>📐 drawing</span>" : ""}</div>
            <div class="badges">${(t.skills || []).slice(0, 4).map(s => `<span class="badge">${esc(s)}</span>`).join("")}</div>
          </div>
        </a>`;
    }).join("");
  }
  draw();
}

/* ---------- Tutorial page ---------- */
function renderTutorial() {
  const id = new URLSearchParams(location.search).get("id");
  const idx = TUTORIALS.findIndex(t => t.id === id);
  const main = document.getElementById("tutorial");
  if (idx < 0) {
    main.innerHTML = `<div class="panel"><h2>Tutorial not found</h2><p><a href="index.html">Back to all tutorials</a></p></div>`;
    return;
  }
  const t = TUTORIALS[idx];
  document.title = `${t.title} · ${SITE.title}`;

  const video = t.youtube
    ? `<div class="video"><iframe id="player" src="${ytEmbed(t.youtube)}" title="${esc(t.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`
    : `<div class="placeholder">Video coming soon</div>`;

  const chapters = (t.chapters || []).length
    ? `<div class="panel"><h2>Chapters</h2><p class="meta" style="margin:-4px 0 8px">Click to jump to that part of the video.</p>
        <ul class="chapters">${t.chapters.map(c => `<li><button data-t="${toSeconds(c.t)}"><span class="ts">${esc(c.t)}</span><span>${esc(c.label)}</span></button></li>`).join("")}</ul></div>`
    : "";

  const isPdf = /\.pdf$/i.test(t.drawing);
  const drawing = t.drawing
    ? `<div class="panel" id="drawing"><h2>The drawing</h2>
        <p class="meta" style="margin:-4px 0 10px">Study it before and after you watch. <a href="${esc(t.drawing)}" target="_blank" rel="noopener">Open full screen ↗</a></p>
        ${isPdf
          ? `<iframe class="drawing-frame" src="${esc(t.drawing)}#view=FitH" title="Drawing for ${esc(t.title)}"></iframe>`
          : `<a href="${esc(t.drawing)}" target="_blank" rel="noopener"><img class="drawing-img" src="${esc(t.drawing)}" alt="Engineering drawing for ${esc(t.title)}"></a>`}
       </div>`
    : `<div class="panel"><h2>The drawing</h2><p class="meta">Drawing coming soon.</p></div>`;

  const questions = (t.questions || []).length
    ? `<div class="panel"><h2>Read the drawing: practice</h2>
        <p class="meta" style="margin:-4px 0 12px">Answer from the drawing first, then click to check. New to drawings? See <a href="reading-drawings.html">How to read a drawing</a>.</p>
        ${t.questions.map((q, i) => `<details class="q"><summary>${i + 1}. ${esc(q.q)} <span class="reveal">show answer</span></summary><div class="a">${esc(q.a)}</div></details>`).join("")}
       </div>`
    : "";

  const challenge = t.challenge
    ? `<div class="panel challenge"><h2>Try it yourself</h2><p style="margin:0">${esc(t.challenge)}</p></div>`
    : "";

  const links = `<div class="panel links"><h2>Follow along</h2>
      ${t.onshape ? `<a href="${esc(t.onshape)}" target="_blank" rel="noopener">Open my Onshape model ↗</a>` : `<span class="na">Onshape model: coming soon</span>`}
      ${t.drawing ? `<a href="${esc(t.drawing)}" download>Download the drawing</a>` : `<span class="na">Drawing download: coming soon</span>`}
      ${t.youtube ? `<a href="https://youtu.be/${encodeURIComponent(t.youtube)}" target="_blank" rel="noopener">Watch on YouTube ↗</a>` : ""}
    </div>`;

  const skills = (t.skills || []).length
    ? `<div class="panel"><h2>Tools &amp; skills</h2><div class="badges" style="padding:0">${t.skills.map(s => `<span class="badge">${esc(s)}</span>`).join("")}</div></div>`
    : "";

  const prev = TUTORIALS[idx - 1], next = TUTORIALS[idx + 1];
  const pager = `<div class="pager">
      <span>${prev ? `<a href="tutorial.html?id=${encodeURIComponent(prev.id)}">← ${esc(prev.title)}</a>` : ""}</span>
      <span>${next ? `<a href="tutorial.html?id=${encodeURIComponent(next.id)}">${esc(next.title)} →</a>` : ""}</span>
    </div>`;

  main.innerHTML = `
    <div class="crumb"><a href="index.html">← All tutorials</a></div>
    <div class="tut-head">
      <span class="tag">${esc(t.unit)}</span>
      <h1>${esc(t.title)}</h1>
      <p>${esc(t.description)}</p>
      <div class="meta" style="margin-top:8px"><span>${esc(t.level)}</span><span>${esc(t.duration)}</span></div>
    </div>
    <div class="layout">
      <div>${video}${drawing}${questions}${challenge}</div>
      <aside>${chapters}${links}${skills}</aside>
    </div>
    ${pager}`;

  main.querySelectorAll(".chapters button").forEach(b =>
    b.addEventListener("click", () => {
      const player = document.getElementById("player");
      if (!player) return;
      player.src = ytEmbed(t.youtube, Number(b.dataset.t), true);
      player.scrollIntoView({ behavior: "smooth", block: "center" });
    })
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  const page = document.body.dataset.page;
  if (page === "index") renderIndex();
  if (page === "tutorial") renderTutorial();
});
