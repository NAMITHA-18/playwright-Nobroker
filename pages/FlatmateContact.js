import { expect } from '@playwright/test';

export class NobrokerContactPage {
    constructor(page, locality) {
        this.locality = locality;
        this.page = page;

        // Locator for the 'Rent' link in the top navigation
        this.rentLink = page.getByRole('link', { name: 'Rent', exact: true });

        // Locator for the locality search textbox
        this.localityTextbox = page.getByRole('textbox', { name: 'Search upto 3 localities or' });

        // Locator for the specific locality suggestion (based on input locality)
        this.localitySuggestion = page.getByText(this.locality, { exact: true });

        // Locator for the 'Flatmates' radio button
        this.flatmatesRadio = page.getByRole('radio', { name: 'Flatmates' });

        // Locator for the 'Search' button
        this.searchButton = page.getByRole('button', { name: 'searchIcon Search' });

        // Locator for all result headings (e.g., listing titles)
        this.resultHeadings = page.locator('h2');

        // Locator for the 'Profile' menu
        this.profileMenu = page.getByText('Profile');

        // Locator for the 'Owners you Contacted' option under Profile
        this.ownersContacted = page.getByText('Owners you Contacted', { exact: true });
    }

    // Performs a flatmates search for the given locality.

    async searchFlatmatesByLocality(testInfo) {
        await this.rentLink.click(); // Navigate to Rent section
        //await this.page.waitForTimeout(3000); // Wait for page transition
        await this.page.waitForLoadState('domcontentloaded');
        const clickRentScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Rent Page", { body: clickRentScreenshot, contentType: 'image/png' });

        await this.localityTextbox.click(); // Focus on locality input
        await this.localityTextbox.fill(this.locality); // Enter locality name

        await this.localitySuggestion.click(); // Select suggested locality
        const searchLocalityScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Search Locality Page", { body: searchLocalityScreenshot, contentType: 'image/png' });

        await this.flatmatesRadio.click(); // Select Flatmates option
        const selectFlatmatesScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Flatmates Page", { body: selectFlatmatesScreenshot, contentType: 'image/png' });

        await this.searchButton.click(); // Click Search
        await this.page.waitForLoadState('networkidle'); // Wait for results to load
        const clickSearchScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Search Page", { body: clickSearchScreenshot, contentType: 'image/png' });
    }

    //Retrieves all listing headings from the search results.

    async getAllResultHeadings() {
        await this.page.waitForSelector('h2'); // Ensure headings are loaded
        return await this.resultHeadings.allTextContents(); // Return all heading texts
    }

    // Asserts that at least one heading matches the expected listing message.

    async assertHeadingMatch(expected) {
        console.log(expected);
        const allHeadings = await this.getAllResultHeadings();
        for (let i = 0; i < allHeadings.length; i++) {
            const receivedText = allHeadings[i].trim(); // Remove extra whitespace
            if (receivedText === expected) {
                expect(receivedText).toBe(expected); // Assert match
                //console.log(`Match found: ${receivedText}`);
                return; // Exit after first match
            }
        }
    }

    // Navigates to the 'Owners you Contacted' section via the Profile menu.

    async goToOwnersContacted(testInfo) {
        await this.profileMenu.click(); // Open Profile menu
        const profileMenuScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Profile Menu Page", { body: profileMenuScreenshot, contentType: 'image/png' });

        await this.ownersContacted.click(); // Navigate to 'Owners you Contacted'
        //await this.page.waitForTimeout(3000); // Wait for content to load
        await this.page.waitForLoadState('domcontentloaded');
        const ownersContactedScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Search Page", { body: ownersContactedScreenshot, contentType: 'image/png' });
    }
}



