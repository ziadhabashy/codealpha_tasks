
# Image Gallery (HTML • CSS • JavaScript)

A responsive **Image Gallery** built with **Vanilla JavaScript**, featuring **category filters**, **search**, and a **lightbox viewer** with **next/prev navigation** and keyboard controls.

---

## ✨ Features

- Responsive grid gallery (works on mobile/tablet/desktop)
- Hover effects + smooth transitions
- Filter by category: **All / Nature / City / People**
- Search by image title
- Lightbox viewer:
  - Next / Previous buttons
  - Close button + click outside to close
  - Keyboard support: **Esc**, **←**, **→**
- “Open image in new tab” button

---

## 🧰 Tech Stack

- HTML5
- CSS3 (Grid & Flexbox)
- JavaScript (ES6, no libraries)

---

## 📁 Project Structure

```
CodeAlpha_ImageGallery/
├─ index.html
├─ styles.css
├─ main.js
└─ README.md
```

---

## 🚀 Run Locally

### Option 1: Open directly
Open `index.html` in your browser.

### Option 2 (Recommended): Live Server
If using VS Code:
1. Install **Live Server**
2. Right‑click `index.html` → **Open with Live Server**

---

## 🔧 Customize Images

Edit the `images` array in `main.js`:

```js
const images = [
  { title: "Mountain Dawn", category: "nature", url: "IMAGE_URL" }
];
```

You can also use local images:

```js
{ title: "My Photo", category: "people", url: "./images/1.jpg" }
```

---

## 📌 Notes

- Clean separation of concerns (HTML / CSS / JS)
- Suitable for internship tasks and front‑end practice

---

## 📄 License

This project is created for educational and internship purposes.
