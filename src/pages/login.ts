import {expect, Page, Locator} from '@playwright/test';
import wrapper from '../helper/wrapper';

export default class LoginPage {
    private base : wrapper;
    private loginbtn : Locator;
       constructor(private page: Page) {
           this.base = new wrapper(page);
           this.loginbtn = this.page.locator("(//button[@color='primary'])[3]");
       }

       private Elements ={
        userinput : "Username",
        passinput : "Password",
        errormsgfe: "alert"
       };


       async enterUsername(username: string) {
           await this.page.getByLabel(this.Elements.userinput).fill(username);
       }

       async enterPassword(password: string){
        await this.page.getByLabel(this.Elements.passinput).fill(password);
       }

       async clickLoginButton() {
           await this.loginbtn.click();
       }    


       async getErrorMessage(){
        return this.page.getByRole("alert");
       }

       async loginuser(username: string, password: string) {
           await this.enterUsername(username);
           await this.enterPassword(password);
           await this.clickLoginButton();
       }
}