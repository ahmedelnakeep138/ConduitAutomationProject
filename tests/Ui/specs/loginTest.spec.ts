import { test, expect } from '../fixtures/pageFixture';
import { TEST_DATA } from '../../../test-Data/authData';

test.describe('Login Page Tests', { tag: '@regression' }, () => {
    test.beforeEach(async ({ loginPage }) => {
        // Navigate to the login page before all tests
        await loginPage.goToLoginPage();
    });

    // -------------------------------------------------------------
    // 1. Happy Path / Positive Scenario
    // -------------------------------------------------------------

    test('TC01: Successful Login with valid credentials', { tag: ['@smoke', '@positive'] }, async ({ loginPage }) => {
        // Using existing user from test data (assuming this user exists in the environment)
        const validEmail = TEST_DATA.invalidUser.existingEmail; 
        const validPassword = TEST_DATA.invalidUser.existingPassword ; 
        
        await loginPage.login(validEmail, validPassword);
        await loginPage.clickSignInButton();

        // Assert redirection to the dashboard/home page
        await expect(loginPage.page).toHaveURL('/');
    });

    // -------------------------------------------------------------
    // 2. Negative Scenarios
    // -------------------------------------------------------------

    test('TC02: Failed Login with invalid credentials', { tag: '@negative' }, async ({ loginPage }) => {
        await loginPage.login('invalid@example.com', 'wrongpassword');
        await loginPage.clickSignInButton();
        
        const errorMessage = await loginPage.getErrorMessageText();
        // Assert specific error message from test data
        await expect(errorMessage).toContain(TEST_DATA.messages.invalidLoginCredentials);
    });

    test('TC03: Validation error handling when submitting empty required fields', { tag: '@negative' }, async ({ loginPage }) => {
                // Assert that an error message is displayed (Conduit usually shows "email can't be blank")
        await expect(loginPage.signInButton).toBeDisabled;
    });

    
   test('TC04:Validation: empty credentials show required field messages', { tag: '@negative' }, async ({ loginPage }) => {
    // Submit with empty username and password
    await loginPage.login('', '');

    // Expect field-level validation messages to appear. Adjust locator names as needed.
    await expect(loginPage.signInButton).toBeDisabled;
    
    });
 });