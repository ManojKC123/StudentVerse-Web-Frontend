const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep } = require("selenium-webdriver");
const { delay } = require("../utils/delay");

//Sprint 1
Given("Test signup functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/signup");
  await driver.findElement(By.id("firstnamesignup")).sendKeys("test2");
  await driver.findElement(By.id("lastnamesignup")).sendKeys("test2");
  await driver.findElement(By.id("passwordsignup")).sendKeys("test2");
  await driver.findElement(By.id("emailsignup")).sendKeys("test2@gmail.com");
  await driver.findElement(By.id("addresssignup")).sendKeys("kathmandu");
  await driver.findElement(By.id("mobilesignup")).sendKeys("1234567");
  await driver.sleep(delay);
  await driver.findElement(By.id("signupBtn")).click();
  await driver.quit();
});

Given("Test login functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/login");
  await driver.findElement(By.id("usernamelogin")).sendKeys("test2");
  await driver.findElement(By.id("passwordlogin")).sendKeys("test2");
  await driver.sleep(delay);
  await driver.findElement(By.id("loginBtn")).click();
  await driver.quit();
});
Given("Test profile functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/profile-update");
  await driver.findElement(By.id("updateFnmae")).sendKeys("test1");
  await driver.findElement(By.id("updateLname")).sendKeys("test1");
  await driver.findElement(By.id("update-email")).sendKeys("test1@gmail.com");
  await driver.findElement(By.id("update-address")).sendKeys("test10");
  await driver.findElement(By.id("update-mobile")).sendKeys("22222222");
  await driver.findElement(By.id("update-curentpasword")).sendKeys("test1");
  await driver.sleep(delay);
  await driver.findElement(By.id("upProfileBtn")).click();
  await driver.quit();
});
//Sprint 3
Given("Test AskQuestion functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/ask-question");
  await driver.findElement(By.id("title")).sendKeys("test");
  await driver.findElement(By.id("body")).sendKeys("test");
  await driver.findElement(By.id("tag-input")).sendKeys("test");
  await driver.sleep(delay);
  await driver.findElement(By.id("submit-button")).click();
  await driver.quit();
});

Given("Test PostAnswer functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/questions/60f6ea683770120e60944e3b");
  await driver.findElement(By.id("post-answer")).sendKeys("abcd");
  await driver.sleep(delay);
  await driver.findElement(By.id("addAnswer")).click();
  await driver.quit();
});

//Sprint 4
Given("Test Comment functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/questions/60f681de79b0dd4808c76433");
  await driver
    .findElement(By.id("exampleFormControlTextarea1"))
    .sendKeys("wwww");
  await driver.sleep(delay);
  await driver.findElement(By.id("addCommentTest")).click();
  await driver.quit();
});
//Sprint 5
Given("Test subject functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/admin/Computer");
  await driver.findElement(By.id("input-topic")).sendKeys("operating system");
  await driver.sleep(delay);
  await driver.findElement(By.id("create-button")).click();
  await driver.quit();
});
//Sprint 6
Given("Test Posts functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/tag-search");
  await driver.findElement(By.id("tag")).sendKeys("science");
  await driver.sleep(delay);
  await driver.findElement(By.id("tag-button")).click();
  await driver.quit();
});
Given("Test users functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/user-search");
  await driver.findElement(By.id("profile-search")).sendKeys("test2");
  await driver.sleep(delay);
  await driver.findElement(By.id("button-search")).click();
  await driver.quit();
});
// Sprint 7
Given("Test quiz functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get(
    "http://localhost:3000/admin/quiz/Algebra/612a5a443aa9d50004b90795"
  );
  await driver.findElement(By.id("question")).sendKeys("test1");
  await driver.findElement(By.id("option1")).sendKeys("test2");
  await driver.findElement(By.id("option2")).sendKeys("test3");
  await driver.findElement(By.id("option3")).sendKeys("test4");
  await driver.findElement(By.id("option4")).sendKeys("test5");
  await driver.findElement(By.id("answer")).sendKeys("test1");
  await driver.sleep(delay);
  await driver.findElement(By.id("quiz-admin")).click();
  await driver.quit();
});
