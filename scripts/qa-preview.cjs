// Local static-export browser QA. Uses an existing Playwright installation in this environment.
const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");
const handler = require("serve-handler");

const playwrightPath = process.env.FOMOLOGY_PLAYWRIGHT_PATH;
const chromePath = process.env.FOMOLOGY_CHROME_PATH;
if (!playwrightPath || !chromePath) throw new Error("Set FOMOLOGY_PLAYWRIGHT_PATH and FOMOLOGY_CHROME_PATH");
const { chromium } = require(playwrightPath);
const output = path.join(process.cwd(), "output/playwright/fomology-expansion");
fs.mkdirSync(output, { recursive: true });
const server = http.createServer((request, response) => handler(request, response, { public: "out" }));

(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ executablePath: chromePath, headless: true, args: ["--no-sandbox"] });
  try {
    for (const [label, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844], ["small-mobile", 320, 700]]) {
      const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: "reduce" });
      const page = await context.newPage();
      page.on("response", (response) => {
        if (response.url().includes("/media/work/") || response.url().includes("/editorial/")) {
          console.log(JSON.stringify({ asset: response.url(), status: response.status(), type: response.headers()["content-type"] }));
        }
      });
      for (const route of ["/", "/blog/", "/products/", "/blog/sme-chatbot/", "/products/cloud-assistant/"]) {
        const response = await page.goto(base + route, { waitUntil: "networkidle" });
        await page.evaluate(async () => {
          for (let position = 0; position < document.body.scrollHeight; position += window.innerHeight) {
            window.scrollTo(0, position);
            await new Promise((resolve) => setTimeout(resolve, 80));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(300);
        const report = await page.evaluate(() => ({
          title: document.title,
          h1: document.querySelector("h1")?.textContent?.trim(),
          overflow: document.documentElement.scrollWidth > window.innerWidth,
          bodyFont: getComputedStyle(document.body).fontFamily,
          headingFont: document.querySelector("h1") ? getComputedStyle(document.querySelector("h1")).fontFamily : "",
          brokenImages: Array.from(document.images).filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
          clientWorkCards: document.querySelectorAll(".client-work-card").length,
          clientWorkPlaying: Array.from(document.querySelectorAll(".client-work-card video")).filter((video) => !video.paused).length,
          deliveryTraces: document.querySelectorAll(".delivery-trace").length,
          learnCreateLinks: document.querySelectorAll(".learn-create a, .learn-create button").length,
          countryFraming: /SOUTH KOREA|THAILAND|เกาหลี/.test(document.body.innerText),
          servicesNav: Array.from(document.querySelectorAll("a[href^='/products']")).some((link) => link.textContent?.includes("Services")),
        }));
        console.log(JSON.stringify({ label, route, status: response.status(), ...report }));
        await page.screenshot({ path: path.join(output, `${label}-${route.replaceAll("/", "-") || "home"}.png`), fullPage: true });
        if (route === "/blog/") {
          await page.locator(".post-list").screenshot({ path: path.join(output, `${label}-blog-list.png`) });
        }
        if (route === "/products/") await page.locator(".pillar-list").screenshot({ path: path.join(output, `${label}-service-list.png`) });
        if (route === "/products/") await page.locator(".client-work-full").screenshot({ path: path.join(output, `${label}-client-work-full.png`) });
        if (route === "/") await page.locator(".client-work-compact").screenshot({ path: path.join(output, `${label}-client-work-compact.png`) });
        if (route === "/") await page.screenshot({ path: path.join(output, `${label}-home-viewport.png`) });
      }
      if (label === "mobile") {
        await page.goto(base + "/products/", { waitUntil: "networkidle" });
        await page.locator(".mobile-menu summary").click();
        console.log(JSON.stringify({ menu: await page.locator(".mobile-menu nav").isVisible(), courseVisible: await page.locator(".header-nav a[href^='/course']").isVisible() }));
        await page.screenshot({ path: path.join(output, "mobile-menu.png") });
      }
      await context.close();
    }

    const motionContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: "no-preference" });
    const motionPage = await motionContext.newPage();
    await motionPage.goto(base + "/", { waitUntil: "networkidle" });
    await motionPage.locator(".client-work-compact").scrollIntoViewIfNeeded();
    await motionPage.waitForTimeout(1800);
    const motionReport = await motionPage.evaluate(() => ({
      playing: Array.from(document.querySelectorAll(".client-work-card video")).filter((video) => !video.paused).length,
      cards: document.querySelectorAll(".client-work-card").length,
    }));
    console.log(JSON.stringify({ motionClientWork: motionReport }));
    await motionPage.locator(".client-work-media").first().click();
    console.log(JSON.stringify({ clientWorkDialog: await motionPage.locator(".media-dialog").isVisible() }));
    await motionPage.locator(".media-dialog-close").click();
    await motionPage.screenshot({ path: path.join(output, "desktop-client-work-motion.png"), fullPage: false });

    await motionPage.goto(base + "/products/", { waitUntil: "networkidle" });
    const initialVideoSources = await motionPage.locator(".client-work-card video[src]").count();
    await motionPage.locator(".client-work-section").scrollIntoViewIfNeeded();
    await motionPage.waitForTimeout(1200);
    const productsReport = await motionPage.evaluate(() => ({
      introOpacity: getComputedStyle(document.querySelector(".client-work-intro")).opacity,
      firstCardOpacity: getComputedStyle(document.querySelector(".client-work-card")).opacity,
      loadedVideoSources: document.querySelectorAll(".client-work-card video[src]").length,
    }));
    console.log(JSON.stringify({ productsClientWork: { initialVideoSources, ...productsReport } }));
    if (productsReport.introOpacity !== "1" || productsReport.firstCardOpacity !== "1") {
      throw new Error("Products client work did not reveal after scrolling into view");
    }
    if (initialVideoSources !== 0 || productsReport.loadedVideoSources > 1) {
      throw new Error("Client work previews loaded more video sources than expected");
    }
    await motionContext.close();
  } finally {
    await browser.close();
    server.close();
  }
})().catch((error) => { console.error(error); server.close(); process.exitCode = 1; });
