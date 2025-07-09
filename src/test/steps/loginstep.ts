import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pagefixture';
import LoginPage from '../../pages/login';

let loginPage: LoginPage;

Given('user navigates to the application', async function () {
  await pageFixture.page?.goto('https://bookcart.azurewebsites.net/');
  pageFixture.logger?.info('Navigated to the application');
  loginPage = new LoginPage(pageFixture.page!);
});

Given('user click on the login link', async function () {
  await pageFixture.page?.locator('//span[contains(text()," Login ")]').click();
  pageFixture.logger?.info('Clicked on the login link');
});

Given('user enters username as {string}', async function (username: string) {
  await loginPage.enterUsername(username);
  pageFixture.logger?.info(`Entered username: ${username}`);
});

Given('user enters password as {string}', async function (password: string) {
  await loginPage.enterPassword(password);
  pageFixture.logger?.info(`Entered password`);
});

When('user clicks on the login button', async function () {
  await loginPage.clickLoginButton();
  pageFixture.logger?.info('Clicked login button');
});

Then('Login should be successful', async function () {
  const userLabel = pageFixture.page!.locator("//span[contains(text(),'yuvaraj2004')]");
  await expect(userLabel).toBeVisible({ timeout: 5000 });
  await expect(userLabel).toHaveText(/yuvaraj2004/, { timeout: 5000 });
  pageFixture.logger?.info('Login was successful');
});

