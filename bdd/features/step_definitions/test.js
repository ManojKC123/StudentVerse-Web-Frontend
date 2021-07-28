const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep } = require("selenium-webdriver");
const { delay } = require("../utils/delay");

//Sprint 1
Given("Test signup functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://studentverse-6e382.web.app/signup");
  await driver.findElement(By.id("firstName")).sendKeys("mandeep");
  await driver.findElement(By.id("lastName")).sendKeys("maharzan");
  await driver.findElement(By.id("username")).sendKeys("mandeep");
  await driver.findElement(By.id("password")).sendKeys("mandeep");
  await driver.findElement(By.id("email")).sendKeys("mandeep@gmail.com");
  await driver.findElement(By.id("address")).sendKeys("kathmandu");
  await driver.findElement(By.id("mobile")).sendKeys("1234567");
  await driver.sleep(delay);
  await driver.findElement(By.id("signupBtn")).click();
  await driver.quit();
});

Given("Test login functionality", { timeout: 30000 }, async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://studentverse-6e382.web.app/login");
    await driver.findElement(By.id("username")).sendKeys("mandeep");
    await driver.findElement(By.id("password")).sendKeys("1234567");
    await driver.sleep(delay);
    await driver.findElement(By.id("loginBtn")).click();
    await driver.quit();
  });
  //Sprint 3
  Given("Test AskQuestion functionality", { timeout: 30000 }, async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://studentverse-6e382.web.app/ask-question");
    await driver.findElement(By.id("title")).sendKeys("test");
    await driver.findElement(By.id("body")).sendKeys("test");
    await driver.findElement(By.id("tagname")).sendKeys("test");
    await driver.sleep(delay);
    await driver.findElement(By.id("submit-button")).click();
    await driver.quit();
  });
  Given("Test PostAnswer functionality", { timeout: 30000 }, async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://studentverse-6e382.web.app/questions/60f681de79b0dd4808c76433");
    await driver.findElement(By.id("answers")).sendKeys("abcd");
    await driver.sleep(delay);
    await driver.findElement(By.id("addAnswerTest")).click();
    await driver.quit();
  });
  //Sprint 4
  Given("Test Comment functionality", { timeout: 30000 }, async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://studentverse-6e382.web.app/questions/60f681de79b0dd4808c76433");
    await driver.findElement(By.id("exampleFormControlTextarea1")).sendKeys("wwww");
    await driver.sleep(delay);
    await driver.findElement(By.id("addCommentTest")).click();
    await driver.quit();
  });