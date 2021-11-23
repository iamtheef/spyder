const axios = require("axios");
// const puppeteer = require("puppeteer-core");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const loadPage = async (link, isSPA) => {
  if (isSPA) {
    return await loadWithPuppeteer(link);
  } else {
    let r = await axios.get(link);
    return r.data;
  }
};

const loadWithPuppeteer = async (link) => {
  const browserFetcher = puppeteer.createBrowserFetcher();
  const revisionInfo = await browserFetcher.download("901912");

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: revisionInfo.executablePath,
    args: ["--incognito"],
  });

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36"
  );

  await page.setJavaScriptEnabled(true);

  const page = await browser.newPage();

  await page.goto(link, {
    waitUntil: "networkidle2",
  });
  let content = await page.evaluate(() => document.body.innerHTML);
  await browser.close();
  return content;
};

module.exports = {
  loadPage,
};
