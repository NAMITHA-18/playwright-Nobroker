import { expect } from '@playwright/test';

export class NoBrokerSearchPage {
    constructor(page, locality) {
        this.page = page;
        this.locality = locality;

        // Define locators for various UI elements on the NoBroker search page
        this.rentLink = this.page.getByRole('link', { name: 'Rent', exact: true });
        this.localitySearchBox = this.page.getByRole('textbox', { name: 'Search upto 3 localities or' });
        this.localitySuggestion = this.page.getByText(this.locality, { exact: true });
        this.flatmatesRadio = this.page.getByRole('radio', { name: 'Flatmates' });
        this.searchButton = this.page.getByRole('button', { name: 'searchIcon Search' });
    }

    // Clicks the "Rent" link and attaches a screenshot for reporting
    async clickRentLink(testInfo) {
        await this.rentLink.click();
        await this.page.waitForTimeout(3000); // Wait for page transition
        const clickRentScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Rent Page", { body: clickRentScreenshot, contentType: 'image/png' });
    }

    // Searches for the specified locality and attaches a screenshot
    async searchLocality(testInfo) {
        await this.localitySearchBox.click();
        await this.localitySearchBox.fill(this.locality); // Fill in the locality
        await this.localitySuggestion.click(); // Select the suggested locality
        const searchLocalityScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Search Locality Page", { body: searchLocalityScreenshot, contentType: 'image/png' });
    }

    // Selects the "Flatmates" option and attaches a screenshot
    async selectFlatmatesOption(testInfo) {
        await this.flatmatesRadio.click();
        const selectFlatmatesScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Flatmates Page", { body: selectFlatmatesScreenshot, contentType: 'image/png' });
    }

    // Clicks the search button and waits for results to load, then attaches a screenshot
    async clickSearchButton(testInfo) {
        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle'); // Wait for network to be idle
        const clickSearchScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Search Page", { body: clickSearchScreenshot, contentType: 'image/png' });
    }

    // Verifies that the URL contains the locality and attaches a screenshot
    async expectResult(locality, testInfo) {
        await expect(this.page).toHaveURL(new RegExp(locality, 'i')); // Case-insensitive match
        const expectResultScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Result Page", { body: expectResultScreenshot, contentType: 'image/png' });
    }
}
