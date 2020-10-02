const puppeteer = require("puppeteer");

let page;
let browser;
const [width, height] = [800, 1080];
const URL = "https://kodaktor.ru/g/puppetform";

const lead = {
  name: "Me =)",
  email: "me@askme.any",
  phone: "123-456-789",
  message: "Me would like to talk to Me with Me",
};

before(async () => {
  browser = await puppeteer.launch({
    waitUntil: "domcontentloaded",
    headless: false,
    slowMo: 20,
    devtools: false,
    args: [`--window-size=${width},${height}`, `--window-position=30,160`],
  });
  page = await browser.newPage();
  await page.goto(URL);
  await page.setViewport({ width, height });
});

// after(async () => {
//   await browser.close();
// });

describe("Contact form", () => {
  it("Filling form fields", async () => {
    await page.waitForSelector("[data-test=contact-form]");
    await page.click("input[name=name]");
    await page.type("input[name=name]", lead.name);
    await page.click("input[name=email]");
    await page.type("input[name=email]", lead.email);
    await page.click("input[name=tel]");
    await page.type("input[name=tel]", lead.phone);
    await page.click("textarea[name=message]");
    await page.type("textarea[name=message]", lead.message);
    await page.click("input[type=checkbox]");
    await page.click("button[type=submit]");
    await page.waitForSelector(".modal");
  });
});
