import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/login_page";

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

if (!email || !password) {
  throw new Error("Environment variables EMAIL and PASSWORD must be set.");
}

test("Successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const usernameError = await page
    .locator("span.inp-fix__error")
    .getByText("Pole E-mail je povinné");
  const passwordError = await page
    .locator("span.inp-fix__error")
    .getByText("Pole Heslo je povinné");

  await loginPage.openMujRozhlas();
  await loginPage.fillUsername(email);
  await loginPage.fillPassword(password);
  await expect.soft(usernameError).not.toBeVisible();
  await expect.soft(passwordError).not.toBeVisible();
  await loginPage.clickLogin();
});

test("Unsuccessful login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const usernameError = await page
    .locator("span.inp-fix__error")
    .getByText("Pole E-mail je povinné");
  const passwordError = await page
    .locator("span.inp-fix__error")
    .getByText("Pole Heslo je povinné");

  await loginPage.openMujRozhlas();
  await loginPage.clickLogin();
  await expect.soft(usernameError).toBeVisible();
  await expect.soft(passwordError).toBeVisible();
});

test("register link", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.openMujRozhlas();
  await loginPage.registerLink.click();
  await expect.soft(page).toHaveURL("https://www.mujrozhlas.cz/user/register");
});

test("forgotten password link", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.openMujRozhlas();
  await loginPage.forgottenPasswordLink.click();
  await expect.soft(page).toHaveURL("https://www.mujrozhlas.cz/user/password");
});
