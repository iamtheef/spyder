const axios = require("axios");

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
  const revisionInfo = await browserFetcher.download("884014");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: revisionInfo.executablePath,
    args: ["--no-sandbox", "--disabled-setupid-sandbox"],
  });

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
