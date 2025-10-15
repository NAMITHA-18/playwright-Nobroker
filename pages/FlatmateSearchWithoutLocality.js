import { expect } from "@playwright/test"

export class NoBrokerPageSearch {

    constructor(page) {
        this.page = page;

        // Locator for the 'Rent' link in the navigation bar
        this.rentLink = page.getByRole('link', { name: 'Rent', exact: true });

        // Locator for the 'Flatmates' radio button option
        this.flatmatesRadio = page.getByRole('radio', { name: 'Flatmates' });

        // Locator for the 'Search' button
        this.searchButton = page.getByRole('button', { name: 'searchIcon Search' });

        // Locator for the error message displayed when no locality is selected
        this.messageText = page.locator('.messageText');
    }

    //Performs the search flow without selecting a locality.
    async performSearchWithoutLocality(testInfo) {
        await this.rentLink.click(); // Navigate to the Rent section
        const clickRentScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Rent Page", { body: clickRentScreenshot, contentType: 'image/png' });

        await this.flatmatesRadio.click(); // Select the Flatmates option
        const selectFlatmatesScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Flatmates Page", { body: selectFlatmatesScreenshot, contentType: 'image/png' });

        await this.searchButton.click(); // Attempt to search without selecting locality
        //await this.page.waitForTimeout(2000); // Wait for error message to appear
        await this.messageText.waitFor({ state: 'visible' });
        const searchButtonScreenshot = await this.page.screenshot();
        testInfo?.attach?.("Search Without Locality Page", { body: searchButtonScreenshot, contentType: 'image/png' });
    }

    // Retrieves the error message text shown on the page.
    async getErrorMessage() {
        return await this.messageText.textContent(); // Extract error message text
    }

    // Asserts that the error message matches the expected value.
    async assertErrorMessage(expected) {
        const receivedText = await this.getErrorMessage();
        expect(receivedText?.trim()).toBe(expected); // Compare actual vs expected message
    }
}
