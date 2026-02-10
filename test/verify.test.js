const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should assign 50 to a variable addition', async function() {
    const addition = await page.evaluate(() => addition);
    expect(addition).toBeDefined();
  });

  it('should use compound assignment to add 5 to the addition', async function() {
    const addition = await page.evaluate(() => addition);
    expect(addition).toBe(55);
  });

  it('should assign 40 to a variable subtraction', async function() {
    const subtraction = await page.evaluate(() => subtraction);
    expect(subtraction).toBeDefined();
  });

  it('should use compound assignment to subtract 1 from the subtraction', async function() {
    const subtraction = await page.evaluate(() => subtraction);
    expect(subtraction).toBe(39);
  });

  it('should assign 5 to a variable multiplication', async function() {
    const multiplication = await page.evaluate(() => multiplication);
    expect(multiplication).toBeDefined();
  });

  it('should use compound assignment to multiply the multiplication by 7', async function() {
    const multiplication = await page.evaluate(() => multiplication);
    expect(multiplication).toBe(35);
  });

  it('should assign 6 to a variable division', async function() {
    const division = await page.evaluate(() => division);
    expect(division).toBeDefined();
  });

  it('should use compound assignment to divide the division by 2', async function() {
    const division = await page.evaluate(() => division);
    expect(division).toBe(3);
  });

  it('should assign the innerHTML of the HTML element with the id result to the multiplication', async function() {
     const innerHtml = await page.$eval("#result", (result) => {
      return result.innerHTML;
    });
      
    expect(innerHtml).toBe('35');
  });
});
