import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/login_page";

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

if (!email || !password) {
  throw new Error("Environment variables EMAIL and PASSWORD must be set.");
}

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(email, password);
  await page.waitForSelector('a[href="/user/logout"]');
  await page.locator('a[href="/user/logout"]').click();
  await expect
    .soft(page)
    .toHaveURL("https://www.mujrozhlas.cz/user/logout/confirm");
});

test("Successful logout", async ({ page }) => {
  await page.locator('//button[@type="submit"]').click();
});

test("Cancelled logout", async ({ page }) => {
  await page.locator("#edit-cancel").click();
  await expect.soft(page).toHaveURL("https://www.mujrozhlas.cz/");
});
