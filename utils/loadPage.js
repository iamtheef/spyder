const puppeteer = require("puppeteer");
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
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
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
