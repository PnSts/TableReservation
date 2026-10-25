// Captures the portfolio screenshot candidates (desktop 1440x900 and phone 390x844, both at
// device scale 2) into the folder given as the first argument. The portfolio's own
// SCREENSHOTS.md records which ones were chosen.
//
// 1. Start the development server:  npm start   (http://localhost:3000)
// 2. In another terminal, with Playwright available (npm i -D playwright, or a global install):
//      node tests/readme-screens/portfolio.cjs <output folder>
//    Set BASE_URL to capture from another address.

const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT = path.resolve(process.argv[2] || "portfolio-screens");

const DESKTOP = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };
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

const shot = (page, name) => page.screenshot({ path: path.join(OUT, `${name}.png`) });

// The site scrolls smoothly; instant scrolling puts every capture where it is asked.
async function open(page, route) {
  await page.goto(`${BASE_URL}/${route}`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

const openHome = (page) => open(page, "");

// Scrolls a section to the top of the viewport and brings the hidden header back.
async function showSection(page, selector) {
  await page.evaluate((sel) => {
    const top = document.querySelector(sel).getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top - 120);
  }, selector);
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    window.scrollBy(0, -1);
  });
  await page.waitForTimeout(500);
}

const openReservation = (page) => open(page, "#/reservations");

async function fillReservation(page) {
  await page.fill("#reservation-number-guests", GUEST.guests);
  await page.selectOption("#reservation-occasion", GUEST.occasion);
  await page.fill("#reservation-info", GUEST.info);
  await page.fill("#reservation-lastname", GUEST.lastname);
  await page.fill("#reservation-firstname", GUEST.firstname);
  await page.fill("#reservation-mail", GUEST.mail);
  await page.fill("#reservation-phone", GUEST.phone);
  await page.locator("#reservation-phone").blur();
}

// Leaves the names empty and the email and phone invalid, so every inline error shows.
async function showErrors(page) {
  await page.fill("#reservation-lastname", "");
  await page.locator("#reservation-lastname").blur();
  await page.fill("#reservation-firstname", "");
  await page.locator("#reservation-firstname").blur();
  await page.fill("#reservation-mail", "emma@example");
  await page.locator("#reservation-mail").blur();
  await page.fill("#reservation-phone", "555010");
  await page.locator("#reservation-phone").blur();
}

async function capture(browser, device, prefix) {
  const page = await browser.newPage(device);

  await openHome(page);
  await shot(page, `${prefix}-home`);
  if (prefix === "phone") {
    await page.click(".nav-bar-hamburger");
    await page.waitForTimeout(300);
    await shot(page, `${prefix}-menu-open`);
    await page.click(".nav-bar-hamburger");
  }
  await showSection(page, "#menu");
  await shot(page, `${prefix}-specials`);
  await showSection(page, ".testimonials");
  await shot(page, `${prefix}-testimonials`);
  await showSection(page, "#about");
  await shot(page, `${prefix}-about`);

  await openReservation(page);
  await shot(page, `${prefix}-form-empty`);
  await showErrors(page);
  if (prefix === "phone") await showSection(page, "#reservation-lastname");
  else await page.evaluate(() => window.scrollTo(0, 0));
  await shot(page, `${prefix}-form-errors`);

  await openReservation(page);
  await fillReservation(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot(page, `${prefix}-form-filled`);
  if (prefix === "phone") {
    await page.locator('[data-testid="next"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shot(page, `${prefix}-form-filled-bottom`);
  }

  await page.click('[data-testid="next"]');
  await page.waitForSelector(".review-grid");
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot(page, `${prefix}-review`);
  if (prefix === "phone") {
    await page.locator("button[type=submit]").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await shot(page, `${prefix}-review-bottom`);
  }

  await page.click("button[type=submit]");
  await page.waitForSelector(".confirmed-reservation");
  await page.evaluate(() => document.querySelector(".confirmed-reservation img").decode());
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot(page, `${prefix}-confirmation`);

  await page.close();
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  await capture(browser, DESKTOP, "desktop");
  await capture(browser, PHONE, "phone");
  await browser.close();
})();
