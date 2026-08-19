const featured = [
  {
    name: "Semaglutide+",
    img: "./assets/peakcare/semaglutide.png",
    href: "./semaglutide.html",
  },
  {
    name: "Sermorelin",
    img: "./assets/peakcare/sermorelin-brand.png",
    href: "./sermorelin.html",
  },
  {
    name: "Tirzepatide (GLP-1) Therapy",
    img: "./assets/peakcare/tirzepatide.png",
    href: "./tirzepatide.html",
  },
];

const protocols = [
  {
    name: "Tirzepatide (GLP-1) Therapy",
    price: "$499.00/mo",
    copy: "Compounded Tirzepatide with Vitamin B12. Designed for monthly weight management.",
    img: "./assets/peakcare/tirzepatide.png",
    href: "./tirzepatide.html",
  },
  {
    name: "Semaglutide (GLP-1) Therapy",
    price: "$399.00/mo",
    copy: "Physician-prescribed GLP-1 weight management program. Includes clinical review, medication, and cold-chain shipping.",
    img: "./assets/peakcare/semaglutide.png",
    href: "./semaglutide.html",
  },
  {
    name: "NAD+ Therapy (Cellular Rejuvenation)",
    price: "$199.00/mo",
    copy: "Rejuvenate your cellular health, boost mental clarity, and increase energy levels.",
    img: "./assets/peakcare/nad.png",
    href: "./nad.html",
  },
];

function logo() {
  return `<a class="logo" href="./index.html" aria-label="Peakcare home"><img src="./assets/peakcare/logo.png" alt="Peakcare" /></a>`;
}

function header(page) {
  return `
    <div class="ticker">
      <div class="ticker-track">
        ${tickerRow()}${tickerRow()}${tickerRow()}${tickerRow()}
      </div>
    </div>
    <header class="header">
      <button class="menu-btn" type="button" aria-label="Open menu" data-menu-toggle>
        <span></span><span></span><span></span>
      </button>
      ${logo()}
      <nav class="nav">
        <a href="./shop.html">TREATMENTS</a>
        <a href="./shop.html">SHOP</a>
      </nav>
    </header>
    <div class="menu" data-menu>
      <button class="menu-backdrop" type="button" aria-label="Close menu" data-menu-toggle></button>
      <aside class="menu-panel">
        <a href="./shop.html">Treatments</a>
        <a href="./shop.html">Shop</a>
        <a href="./index.html#how-it-works">How it works</a>
        <a href="./about.html">About</a>
        <a href="./contact.html">Contact</a>
        <a href="./documents.html">Documents</a>
        <a href="./index.html#faq">FAQs</a>
      </aside>
    </div>
  `;
}

function tickerRow() {
  return `<div class="ticker-row">
    <span class="ticker-item"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 5-3.4 8.4-7 9.5C8.4 20.4 5 17 5 12V6l7-3z" stroke="currentColor" stroke-width="1.5"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.5"/></svg>U.S. Licensed Pharmacies</span>
    <span class="ticker-item"><svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="2.2" stroke="currentColor" stroke-width="1.5"/></svg>Licensed Providers in all 50 States</span>
    <span class="ticker-item"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l16-7-7 16-2.2-6.8L4 12z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>Free Expedited Shipment</span>
  </div>`;
}

function footer() {
  return `
    <footer class="footer">
      <div class="wrap footer-grid">
        <div>
          <div class="wordmark">peakcare</div>
          <p>The definitive infrastructure for specialized medical care and performance protocols. HIPAA compliant, physician led, and pharmacy integrated.</p>
        </div>
        <div>
          <h5>TREATMENTS</h5>
          <a href="./shop.html">Weight Loss</a>
          <a href="./shop.html">Longevity</a>
          <a href="./shop.html">Muscle Recovery</a>
        </div>
        <div>
          <h5>COMPANY</h5>
          <a href="./index.html#how-it-works">How It Works</a>
          <a href="./about.html">About Us</a>
          <a href="./contact.html">Contact</a>
        </div>
        <div>
          <h5>SUPPORT</h5>
          <a href="./index.html#faq">FAQs</a>
          <a href="./contact.html">Support</a>
          <a href="./documents.html">Documents</a>
          <a href="./terms.html">Terms of Service</a>
          <a href="./privacy.html">Privacy Policy</a>
          <a href="./disclaimer.html">Medical Disclaimer</a>
          <a href="./consent.html">Telehealth Consent</a>
          <a href="./hipaa.html">HIPAA Notice</a>
        </div>
      </div>
      <div class="wrap">
        <p class="disclaimer-bar">Compounded medications are not FDA-approved. RSRV is a telehealth technology platform that connects patients with independently licensed clinicians and pharmacies; it does not itself practice medicine or operate a pharmacy. See the <a href="./documents.html">RSRV documents</a> for Terms, Privacy, Disclaimer, Consent, and HIPAA Notice.</p>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Peakcare. All rights reserved.</span>
          <span>
            <a href="#">LINKEDIN</a> ·
            <a href="#">INSTAGRAM</a> ·
            <a href="#">FACEBOOK</a>
          </span>
        </div>
      </div>
    </footer>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const chromeTop = document.querySelector("[data-site-header]");
  const chromeBottom = document.querySelector("[data-site-footer]");
  if (chromeTop) chromeTop.innerHTML = header();
  if (chromeBottom) chromeBottom.innerHTML = footer();

  document.querySelectorAll("[data-menu-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector("[data-menu]")?.classList.toggle("open");
    });
  });

  const featuredRoot = document.querySelector("[data-featured]");
  if (featuredRoot) {
    let i = 0;
    const slides = featuredRoot.querySelectorAll("[data-slide]");
    const dots = featuredRoot.querySelector("[data-featured-dots]");
    const render = () => {
      slides.forEach((slide, n) => slide.classList.toggle("active", n === i));
      if (dots) {
        dots.innerHTML = [...slides].map((_, n) => `<span class="${n === i ? "active" : ""}"></span>`).join("");
      }
    };
    featuredRoot.querySelector("[data-prev]")?.addEventListener("click", () => {
      i = (i + slides.length - 1) % slides.length;
      render();
    });
    featuredRoot.querySelector("[data-next]")?.addEventListener("click", () => {
      i = (i + 1) % slides.length;
      render();
    });
    render();
  }

  const proto = document.querySelector("[data-protocol]");
  if (proto) {
    let i = 0;
    const img = proto.querySelector("[data-protocol-img]");
    const name = proto.querySelector("[data-protocol-name]");
    const price = proto.querySelector("[data-protocol-price]");
    const copy = proto.querySelector("[data-protocol-copy]");
    const cta = proto.querySelector("[data-protocol-cta]");
    const thumbs = proto.querySelector("[data-protocol-thumbs]");
    const render = () => {
      const item = protocols[i];
      img.src = item.img;
      name.textContent = item.name;
      price.innerHTML = `<span>STARTING AT</span>${item.price}`;
      copy.textContent = item.copy;
      cta.href = item.href;
      thumbs.innerHTML = protocols
        .map(
          (p, n) =>
            `<button type="button" class="${n === i ? "active" : ""}" data-i="${n}"><img src="${p.img}" alt="${p.name}"></button>`,
        )
        .join("");
      thumbs.querySelectorAll("button").forEach((b) =>
        b.addEventListener("click", () => {
          i = Number(b.dataset.i);
          render();
        }),
      );
    };
    render();
  }

  document.querySelectorAll("[data-faq] .faq-item button").forEach((btn) => {
    btn.addEventListener("click", () => btn.parentElement.classList.toggle("open"));
  });
});
