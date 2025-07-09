import {expect, Page, Locator} from '@playwright/test';
import wrapper from '../helper/wrapper';


export default class Header{
    private base : wrapper;
    constructor(private page: Page) {
        this.base = new wrapper(page);
    }

    private headerpageElements = {
        searchInput : "Search books or authors ",
        cartbtn : "button-mat-focus-indicator .mat-icon-button",
        cartValue : "#mat-badge-content-0",
        usermenu: "//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]",
        myOrder: "//button[text()='My Orders' and @role='menuitem']",
        logout: "//button[text()='Logout' and @role='menuitem']"

    }
    private get loginlink(): Locator{
        return this.page.getByRole('button', { name: 'Login' });
    }
    async  enterbookName(bookName: string) {
        await this.page.getByPlaceholder(this.headerpageElements.searchInput).fill(bookName);
        await this.base.waitAndClick("mat-option[role'option]");
    }
    async clickCartButton() {
        await this.base.waitAndClick(this.headerpageElements.cartbtn);
    }

    async clickonUserMenu() {
        await this.clickCartButton();
        await this.base.navigateTo(this.headerpageElements.usermenu);
    }
    async clickMyOrders() {
        await this.clickonUserMenu();
        await this.base.navigateTo(this.headerpageElements.myOrder);
    }
    async clickLogout() {
        await this.clickonUserMenu();
        await this.base.navigateTo(this.headerpageElements.logout);
    }

    async verifyLoginSuccess(username: string) {
        await expect (this.page.locator(this.headerpageElements.usermenu)).toBeVisible(); 
}

}