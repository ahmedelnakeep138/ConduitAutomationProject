import { test as base } from '@playwright/test';
import { LoginPage } from "../Pages/LoginPage";
import { RegisterPage } from "../Pages/Register";

type MyFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
};
export const test = base.extend<MyFixtures>({
    
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },


});

// Export 'expect' and 'request' to use them in test files.
export { expect } from '@playwright/test';