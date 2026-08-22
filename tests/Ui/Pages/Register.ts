import { Page, Locator } from '@playwright/test';
import Actions from '../../../Utilities/Actions';
export  class RegisterPage {

    //=====================Locators=====================
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signUpButton: Locator;
    readonly errorMessageList: Locator;
    readonly successMessage: Locator;
    readonly Actions: Actions;


    //=====================Constructor=====================
    constructor(page: Page) {
        this.page = page;
        this.Actions = new Actions(page);
        this.usernameInput =  page.getByRole('textbox', { name: 'Username' });
        this.emailInput =  page.getByRole('textbox', { name: 'Email' })
        this.passwordInput = page.getByPlaceholder('Password', { exact: true });
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
        this.errorMessageList =  page.locator('.error-messages');
        this.successMessage = page.getByText('Your registration was successful!', { exact: true });
    }

    //=====================Methods=====================
    async goToRegisterPage() {
        await this.Actions.navigateTo('/register');
    }
    async register(username: string, email: string, password: string) {
        await this.Actions.fillInput(this.usernameInput, username);
        await this.Actions.fillInput(this.emailInput, email);
        await this.Actions.fillInput(this.passwordInput, password);
    }
    async clickSignUpButton() {
        await this.Actions.clickElement(this.signUpButton);
    }
    async getErrorMessageText(): Promise<string> {
  await this.errorMessageList.waitFor({ state: 'visible' });
       return (await this.errorMessageList.textContent()) || '';
    }

    
}