import { Page, Locator } from '@playwright/test';
import Actions from '../../../Utilities/Actions';
export  class LoginPage {
 //=====================Locators=====================
    readonly page: Page;
        readonly Actions: Actions;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly errorMessageList: Locator;
    readonly togglePasswordButton: Locator;

    //=====================Constructor=====================
    constructor(page: Page) {
        this.page = page;
        this.Actions = new Actions(page);
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByPlaceholder('Password', { exact: true });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.errorMessageList = page.locator('.error-messages');
        this.togglePasswordButton = page.locator('button.toggle-password');
    }

    //=====================Methods=====================
    async goToLoginPage() {
        await this.Actions.navigateTo('/login');
    }

    async login(email: string, password: string) {
        await this.Actions.fillInput(this.emailInput, email);
        await this.Actions.fillInput(this.passwordInput, password);
    }

    async clickSignInButton() {
        await this.Actions.clickElement(this.signInButton);
    }

    async togglePasswordVisibility() {
        await this.Actions.clickElement(this.togglePasswordButton);
    }

    async getErrorMessageText(): Promise<string> {
        await this.errorMessageList.waitFor({ state: 'visible' });
        return (await this.errorMessageList.textContent()) || '';
    }

  
}