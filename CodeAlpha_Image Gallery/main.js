const images = [
  { title: "Mountain Dawn", category: "nature", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80" },
  { title: "Sea Breeze", category: "nature", url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80" },
  { title: "Night Skyline", category: "city", url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80" },
  { title: "Street Lights", category: "city", url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80" },
  { title: "Modern Lines", category: "city", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80" },
  { title: "Portrait Smile", category: "people", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80" },
];

const gallery = document.getElementById("gallery");
const toolbar = document.getElementById("toolbar");
const searchInput = document.getElementById("searchInput");

const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbTitle = document.getElementById("lbTitle");
const lbCategory = document.getElementById("lbCategory");
const counter = document.getElementById("counter");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const downloadBtn = document.getElementById("downloadBtn");

let activeFilter = "all";
let query = "";
let visibleIndexes = [];
let currentVisiblePos = 0;

function render() {
  gallery.innerHTML = "";

  visibleIndexes = images
    .map((img, idx) => ({ img, idx }))
    .filter(({ img }) => activeFilter === "all" || img.category === activeFilter)
    .filter(({ img }) => img.title.toLowerCase().includes(query.toLowerCase()))
    .map(({ idx }) => idx);

  visibleIndexes.forEach((idx) => {
    const item = images[idx];

    const card = document.createElement("article");
    card.className = "card";
    card.dataset.index = String(idx);

    card.innerHTML = `
      <span class="badge">${item.category.toUpperCase()}</span>
      <img class="thumb" src="${item.url}" alt="${item.title}">
      <div class="meta">
        <p class="title">${item.title}</p>
        <span class="tag">View</span>
      </div>
    `;

    card.addEventListener("click", () => openLightboxByIndex(idx));
    gallery.appendChild(card);
  });

  if (visibleIndexes.length === 0) {
    const empty = document.createElement("div");
    empty.style.gridColumn = "1 / -1";
    empty.style.padding = "18px";
    empty.style.border = "1px solid hsla(0,0%,100%,.12)";
    empty.style.borderRadius = "16px";
    empty.style.background = "hsla(0,0%,100%,.06)";
    empty.innerHTML = `<b>No results.</b> Try a different filter or search.`;
    gallery.appendChild(empty);
  }
}

function openLightboxByIndex(originalIndex) {
  visibleIndexes = visibleIndexes.length ? visibleIndexes : [originalIndex];
  currentVisiblePos = Math.max(0, visibleIndexes.indexOf(originalIndex));
  if (currentVisiblePos === -1) currentVisiblePos = 0;

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  updateLightbox();
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateLightbox() {
  const idx = visibleIndexes[currentVisiblePos];
  const item = images[idx];

  lbImg.style.opacity = "0";
  setTimeout(() => {
    lbImg.src = item.url;
    lbTitle.textContent = item.title;
    lbCategory.textContent = `Category: ${item.category}`;
    counter.textContent = `${currentVisiblePos + 1} / ${visibleIndexes.length}`;
    lbImg.onload = () => (lbImg.style.opacity = "1");
  }, 80);

  downloadBtn.onclick = () => window.open(item.url, "_blank");
}

function next() {
  if (!visibleIndexes.length) return;
  currentVisiblePos = (currentVisiblePos + 1) % visibleIndexes.length;
  updateLightbox();
}

function prev() {
  if (!visibleIndexes.length) return;
  currentVisiblePos = (currentVisiblePos - 1 + visibleIndexes.length) % visibleIndexes.length;
  updateLightbox();
}

toolbar.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;

  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");

  activeFilter = btn.dataset.filter || "all";
  render();
});


searchInput.addEventListener("input", () => {
  query = searchInput.value.trim();
  render();
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);


lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});


window.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});

render();
