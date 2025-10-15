import { expect } from "@playwright/test";

export class NobrokerMenuPage {
    constructor(page) {
        this.page = page;

        // Locators for menu navigation options under the Profile section
        this.profileMenu = page.getByText('Profile');              // Profile menu trigger
        this.shortlists = page.getByText('Your Shortlists');       // Link to user's shortlisted properties
        this.flatmates = page.getByText('Flatmates').first();      // Link to Flatmates section
        this.pgHostel = page.getByText('PG/Hostel');                // Link to PG/Hostel section

        // Locator for all result headings (used for validation)
        this.resultHeadings = page.locator('h2');
    }

    // Navigates through multiple options in the Profile menu:

    async navigateMenuOptions(testInfo) {
        await this.profileMenu.click(); // Open Profile menu
        const profileMenuScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Profile Menu Page", { body: profileMenuScreenshot, contentType: 'image/png' });

        await this.shortlists.click(); // Navigate to 'Your Shortlists'
        const shortlistScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Shortlist Page", { body: shortlistScreenshot, contentType: 'image/png' });

        await this.flatmates.click(); // Navigate to 'Flatmates'
        //await this.page.waitForTimeout(3000); // Wait for content to load
        await this.page.waitForLoadState('domcontentloaded');
        const selectFlatmatesScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Flatmates Navigation Page", { body: selectFlatmatesScreenshot, contentType: 'image/png' });

        await this.pgHostel.click(); // Navigate to 'PG/Hostel'
        const selectPGHostelScreenshot = await this.page.screenshot();
        testInfo?.attach?.("PG Hostel Navigation Page", { body: selectPGHostelScreenshot, contentType: 'image/png' });
    }

    // Waits for result headings to appear and returns their text content.

    async getAllResultHeadings() {
        await this.page.waitForSelector('h2'); // Ensure headings are loaded
        return await this.resultHeadings.allTextContents(); // Return all heading texts
    }

    //Asserts that each heading starts with the expected keyword.

    async assertHeadingsShorlist(key) {
        const receivedText = await this.getAllResultHeadings();

        for (let i = 0; i < receivedText.length; i++) {
            const heading = receivedText[i].trim(); // Clean up whitespace
            // Assertion: each heading should start with the expected keyword
            expect(heading.slice(0, 2)).toContain(key);
        }
    }
}
