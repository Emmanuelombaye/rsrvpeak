const https = require("https");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "assets", "peakcare");
fs.mkdirSync(dir, { recursive: true });

const files = {
  "logo.png": "https://www.peakcare.health/images/logo.png",
  "lifestyle-slider-1.png": "https://www.peakcare.health/images/lifestyle-slider-1.png",
  "sermorelin-brand.png": "https://www.peakcare.health/images/sermorelin-brand.png",
  "lifestyle-hero.png": "https://www.peakcare.health/images/lifestyle-hero.png",
  "avatar-team-1.png": "https://www.peakcare.health/images/avatar-team-1.png",
  "avatar-team-2.png": "https://www.peakcare.health/images/avatar-team-2.png",
  "avatar-team-3.png": "https://www.peakcare.health/images/avatar-team-3.png",
  "product-delivery-box.png": "https://www.peakcare.health/images/product-delivery-box.png",
  "avatar-doctor.png": "https://www.peakcare.health/images/avatar-doctor.png",
  "lifestyle-footer.png": "https://www.peakcare.health/images/lifestyle-footer.png",
  "tirzepatide.png":
    "https://qetoshtvhrmbxehxgvje.supabase.co/storage/v1/object/public/tenant-assets/58f6187c-0c0b-4a54-b4c8-741f9aa60469/commerce-media/1786576533526-tirzepatide-no-brand.png",
  "semaglutide.png":
    "https://qetoshtvhrmbxehxgvje.supabase.co/storage/v1/object/public/tenant-assets/58f6187c-0c0b-4a54-b4c8-741f9aa60469/commerce-media/1786576558883-semaglutide-no-brand.png",
  "nad.png":
    "https://qetoshtvhrmbxehxgvje.supabase.co/storage/v1/object/public/tenant-assets/58f6187c-0c0b-4a54-b4c8-741f9aa60469/commerce-media/1786576547603-nad-no-brand.png",
};

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(url + " -> " + res.statusCode));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

(async () => {
  for (const [name, url] of Object.entries(files)) {
    try {
      const buf = await get(url);
      fs.writeFileSync(path.join(dir, name), buf);
      console.log("ok", name, buf.length);
    } catch (err) {
      console.error("fail", name, err.message);
    }
  }
})();
