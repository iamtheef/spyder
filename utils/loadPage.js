const axios = require("axios");
const { sleep } = require("./sleep");

const loadPage = async (link, isSPA) => {
  if (isSPA) {
    return await loadWithPuppeteer(link);
  } else {
    let r = await axios.get(link);
    return r.data;
  }
};

const loadWithPuppeteer = async (link) => {
  const puppeteer = require("puppeteer-core");
  const browserFetcher = puppeteer.createBrowserFetcher();
  const revisionInfo = await browserFetcher.download("901912");

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: revisionInfo.executablePath,
    args: [
      "--disabled-setupid-sandbox",
      "'--proxy-server=socks5://127.0.0.1:9050'",
    ],
  });

  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
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
