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
});

test("profile page has all links", async ({ page }) => {
  await expect.soft(page.locator("//a[@class='btn btn--md']")).toBeVisible();
  await expect.soft(page.locator("//a[@href='/profil/upravit']")).toBeVisible();
  await expect
    .soft(page.locator("//p[@class='f-profile__links']//a[1]"))
    .toBeVisible();
  await expect.soft(page.locator("//a[@href='/profil/zrusit']")).toBeVisible();
  await expect
    .soft(page.locator("//a[normalize-space()='Odhlásit se']"))
    .toBeVisible();
});

test("check link 'Upravit údaje' redirects to correct page and form has visible fields", async ({
  page,
}) => {
  await page.locator("//span[normalize-space()='Upravit údaje']").click();
  await expect(page).toHaveURL("https://www.mujrozhlas.cz/profil/upravit");
  await expect
    .soft(page.locator("//input[@id='edit-field-name-0-value']"))
    .toBeVisible();
  await expect
    .soft(page.locator("//input[@id='edit-field-surname-0-value']"))
    .toBeVisible();
  await expect
    .soft(page.locator("//input[@id='edit-current-pass']"))
    .toBeVisible();
  await expect
    .soft(page.locator("//input[@id='edit-pass-pass1']"))
    .toBeVisible();
  await expect
    .soft(page.locator("//input[@id='edit-pass-pass2']"))
    .toBeVisible();
  await expect.soft(page.locator("//button[@name='op']")).toBeVisible();
});

test("link 'Změnit nastavení' redirects to correct page", async ({ page }) => {
  await page
    .locator("//a[@href='/nastaveni']//span[@class='text-icon']")
    .click();
  await expect(page).toHaveURL("https://www.mujrozhlas.cz/nastaveni");
});

test("link 'Smazat účet' redirects to correct page", async ({ page }) => {
  await page
    .locator("//a[@href='/profil/zrusit']//span[@class='text-icon']")
    .click();
  await expect(page).toHaveURL("https://www.mujrozhlas.cz/profil/zrusit");
});
