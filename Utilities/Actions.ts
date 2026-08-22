import { Locator, Page } from '@playwright/test';
export default class Actions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

    async fillInput(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(text);
  }
    async getText(locator: Locator): Promise<string> {
        return await locator.textContent() || '';
    }
}
