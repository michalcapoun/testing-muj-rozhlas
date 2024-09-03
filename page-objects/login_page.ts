import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://www.mujrozhlas.cz/user/login";
  readonly registerLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgottenPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerLink = page.locator('a.u-font-bold[href="/user/register"]');
    this.usernameInput = page.locator("#edit-name");
    this.passwordInput = page.locator("#edit-pass");
    this.loginButton = page.locator("//button[@type='submit']");
    this.forgottenPasswordLink = page.locator(".f-login__link");
  }

  async openMujRozhlas() {
    await this.page.goto(this.url);
  }

  async clickRegister() {
    await this.registerLink.click();
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async clickForgottenPassword() {
    await this.forgottenPasswordLink.click();
  }

  async login(username: string, password: string) {
    await this.page.goto(this.url);
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}
