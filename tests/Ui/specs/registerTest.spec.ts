import { test, expect } from '../fixtures/pageFixture';
import { generateRandomUser, TEST_DATA } from '../../../test-Data/authData';


test.describe('Register Page Tests' ,{ tag: '@regression' }, () => {
    test.beforeEach(async ({ registerPage }) => {
        // Navigate to the register page before all tests
       await registerPage.goToRegisterPage();    
    });

    // -------------------------------------------------------------
    // 1. Happy Path / Positive Scenario
    // -------------------------------------------------------------

    test('should register a new user successfully',{tag: ['@smoke','@positive']}, async ({ registerPage }) => {
        const user = generateRandomUser();
        await registerPage.register(user.username, user.email, user.password);
        await registerPage.clickSignUpButton();

        await expect(registerPage.page).toHaveURL('/');
    });

    // -------------------------------------------------------------
    // 2. Negative Scenarios
    // -------------------------------------------------------------    
    test('should display error message for invalid email',{tag: '@negative'}, async ({ registerPage }) => {
        await registerPage.register('testuser', TEST_DATA.invalidUser.email, 'Password123!');
        await registerPage.clickSignUpButton();
        const errorMessage = await registerPage.getErrorMessageText();
        console.log('Error Message:', errorMessage); // Log the error message for debugging
        await expect(errorMessage).toContain(TEST_DATA.messages.invalidEmail);    
    });

    test('should display error message for short password',{tag: '@negative'}, async ({ registerPage }) => {
        await registerPage.register('testuser', 'testuser@example.com', 'Pa123');
        await registerPage.clickSignUpButton();
        const errorMessage = await registerPage.getErrorMessageText();
        console.log('Error Message:', errorMessage);
        await expect(errorMessage).toContain(TEST_DATA.messages.shortPassword);
    });
    test('should display error message for long username',{tag: '@negative'}, async ({ registerPage }) => {
        const longUsername = 'a'.repeat(21); // 21 characters long
        await registerPage.register(longUsername, 'testuser@example.com', 'Password123!');
        await registerPage.clickSignUpButton();
        const errorMessage = await registerPage.getErrorMessageText();
        console.log('Error Message:', errorMessage);
        await expect(errorMessage).toContain(TEST_DATA.messages.longUsername);
    });
    test('should display error message for short username',{tag: '@negative'}, async ({ registerPage }) => {
        const shortUsername = 'ab'; // 2 characters long
        await registerPage.register(shortUsername, 'testuser@example.com', 'Password123!');
        await registerPage.clickSignUpButton();
        const errorMessage = await registerPage.getErrorMessageText();
        console.log('Error Message:', errorMessage);
        await expect(errorMessage).toContain(TEST_DATA.messages.shortUsername);
    });
    test('should display error message for existing username',{tag: '@negative'}, async ({ registerPage }) => {
        const existingUsername = TEST_DATA.invalidUser.existingUsername; 
        await registerPage.register(existingUsername, 'testuser@example.com', 'Password123!');
        await registerPage.clickSignUpButton();
        const errorMessage = await registerPage.getErrorMessageText();
        console.log('Error Message:', errorMessage);
        await expect(errorMessage).toContain(TEST_DATA.messages.existingUsername);
    });
    test('should display error message for existing email',{tag: '@negative'}, async ({ registerPage }) => {
        const existingEmail = TEST_DATA.invalidUser.existingEmail; 
        await registerPage.register('testuser', existingEmail, 'Password123!');
        await registerPage.clickSignUpButton();
        const errorMessage = await registerPage.getErrorMessageText();
        console.log('Error Message:', errorMessage);
        await expect(errorMessage).toContain(TEST_DATA.messages.existingEmail);
    });





 });    
