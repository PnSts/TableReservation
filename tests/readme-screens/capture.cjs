// Captures the README screenshots into docs/images/ (see docs/images/SCREENSHOTS.md).
//
// 1. Start the development server:  npm start   (http://localhost:3000)
// 2. In another terminal, with Playwright available (npm i -D playwright, or a global install):
//      node tests/readme-screens/capture.cjs
//    Set BASE_URL to capture from another address, e.g. the GitHub Pages demo:
//      BASE_URL=https://pnsts.github.io/TableReservation node tests/readme-screens/capture.cjs

const path = require("path");
const { chromium } = require("playwright");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT = path.join(__dirname, "..", "..", "docs", "images");

const DESKTOP = { viewport: { width: 1280, height: 1000 } };
const PHONE = {
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
};

// Invented guest; nothing here belongs to a real person.
const GUEST = {
  lastname: "Carter",
  firstname: "Emma",
  mail: "emma@example.test",
  phone: "5550100123",
  guests: "4",
  occasion: "Anniversary",
  info: "A table by the window, if possible.",
};

async function openHome(page) {
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
}

async function fillReservation(page) {
  await page.goto(`${BASE_URL}/#/reservations`, { waitUntil: "networkidle" });
  await page.fill("#reservation-number-guests", GUEST.guests);
  await page.selectOption("#reservation-occasion", GUEST.occasion);
  await page.fill("#reservation-info", GUEST.info);
  await page.fill("#reservation-lastname", GUEST.lastname);
  await page.fill("#reservation-firstname", GUEST.firstname);
  await page.fill("#reservation-mail", GUEST.mail);
  await page.fill("#reservation-phone", GUEST.phone);
  await page.locator("#reservation-phone").blur();
  await page.evaluate(() => window.scrollTo(0, 0));
}

(async () => {
  const browser = await chromium.launch();

  const desktop = await browser.newPage(DESKTOP);
  await openHome(desktop);
  await desktop.screenshot({ path: path.join(OUT, "home-desktop.png") });

  await fillReservation(desktop);
  await desktop.screenshot({ path: path.join(OUT, "reservation-desktop.png") });

  await desktop.click('[data-testid="next"]');
  await desktop.waitForSelector(".review-grid");
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await desktop.screenshot({ path: path.join(OUT, "review-desktop.png") });

  const phone = await browser.newPage(PHONE);
  await openHome(phone);
  await phone.screenshot({ path: path.join(OUT, "home-phone.png") });

  await browser.close();
})();
