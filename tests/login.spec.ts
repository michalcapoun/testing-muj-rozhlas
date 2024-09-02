import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/login_page";

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

if (!email || !password) {
  throw new Error("Environment variables EMAIL and PASSWORD must be set.");
}

test("Login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.openMujRozhlas();
  await loginPage.fillUsername(email);
  await loginPage.fillPassword(password);
  await loginPage.clickLogin();
});

test("Succesful logout", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(email, password);
  await page.locator('a[href="/user/logout"]').click();
  await expect(page).toHaveURL("https://www.mujrozhlas.cz/user/logout/confirm");
  await page.locator('//button[@type="submit"]').click();
});

test("Cancelled logout", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(email, password);
  await page.locator('a[href="/user/logout"]').click();
  await expect(page).toHaveURL("https://www.mujrozhlas.cz/user/logout/confirm");
  await page.locator("#edit-cancel").click();
  await expect(page).toHaveURL("https://www.mujrozhlas.cz/");
});
