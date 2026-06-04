/* ===== MARRICK Portfolio — script ===== */

const WATERMARK = "MARRICK";

// image sets
const tank400 = ["0.1.jpg","0.2.jpg","0.3.jpg","0.4.jpg"];
const edg = ["1.1.jpg","1.2.jpg","1.3.jpg","1.4.jpg","1.5.jpg","1.6.jpg","1.7.jpg","1.8.jpg","1.9.jpg",
             "2.1.jpg","2.2.jpg","2.3.jpg","2.4.jpg","2.5.jpg","2.6.jpg","2.7.jpg","2.8.jpg","2.9.jpg"];

function buildGallery(containerId, folder, files) {
  const wrap = document.getElementById(containerId);
  files.forEach(f => {
    const fig = document.createElement("div");
    fig.className = "photo";

    const img = document.createElement("img");
    img.src = `images/${folder}/${f}`;
    img.alt = "MARRICK custom vehicle design";
    img.loading = "lazy";
    img.draggable = false;

    // watermark layer with repeated text
    const wm = document.createElement("div");
    wm.className = "wm";
    for (let i = 0; i < 6; i++) {
      const s = document.createElement("span");
      s.textContent = WATERMARK;
      s.style.top = (8 + i * 16) + "%";
      s.style.left = ((i % 2) * 40 + 8) + "%";
      wm.appendChild(s);
    }

    fig.appendChild(img);
    fig.appendChild(wm);
    wrap.appendChild(fig);
  });
}

buildGallery("gallery-tank400", "tank400", tank400);
buildGallery("gallery-edg", "edg", edg);

// ===== language toggle =====
let lang = "zh";
const btn = document.getElementById("langToggle");

function applyLang() {
  document.querySelectorAll("[data-zh]").forEach(el => {
    el.textContent = lang === "zh" ? el.dataset.zh : el.dataset.en;
  });
  document.documentElement.lang = lang;
  btn.textContent = lang === "zh" ? "EN" : "中";
}
btn.addEventListener("click", () => {
  lang = lang === "zh" ? "en" : "zh";
  applyLang();
});
applyLang();

// ===== copyright year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== anti-theft: block context menu, drag, key shortcuts =====
const tip = document.getElementById("watermark-tip");
let tipTimer = null;
function showTip() {
  tip.classList.add("show");
  clearTimeout(tipTimer);
  tipTimer = setTimeout(() => tip.classList.remove("show"), 1800);
}

document.addEventListener("contextmenu", e => { e.preventDefault(); showTip(); });
document.addEventListener("dragstart", e => { e.preventDefault(); });

// block common save/print/devtools shortcuts (soft deterrent only)
document.addEventListener("keydown", e => {
  const k = e.key.toLowerCase();
  if ((e.ctrlKey || e.metaKey) && ["s","u","p"].includes(k)) { e.preventDefault(); showTip(); }
  if (e.key === "F12") { e.preventDefault(); showTip(); }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i","j","c"].includes(k)) { e.preventDefault(); showTip(); }
});
