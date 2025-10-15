import { expect } from "@playwright/test";

export class NoBrokerPageFilters {

  constructor(page, locality) {
    this.page = page;
    this.locality = locality;

    // Locator for the "Rent" link on the homepage
    this.rentLink = page.getByRole('link', { name: 'Rent', exact: true });

    // Locator for the locality search textbox
    this.searchBox = page.getByRole('textbox', { name: 'Search upto 3 localities or' });

    // Locator for the specific locality suggestion (based on input locality)
    this.localitySuggestion = page.getByText(this.locality, { exact: true });

    // Locator for the "Flatmates" radio button
    this.flatmatesRadio = page.getByRole('radio', { name: 'Flatmates' });

    // Locator for the search button
    this.searchButton = page.getByRole('button', { name: 'searchIcon Search' });

    // Locator for the "Single Room" filter checkbox
    this.singleRoomCheckbox = page.getByRole('checkbox', { name: 'Single Room' });

    // Locator for the "Semi-Furnished" filter checkbox
    this.semiFurnishedCheckbox = page.getByRole('checkbox', { name: 'Semi' });

    // Locator for headings in the search results (used to verify filtered results)
    this.resultHeadings = page.locator('h2');
  }

  // Clicks the "Rent" link and attaches a screenshot for reporting
  async clickRentLink(testInfo) {
    await this.rentLink.click();
    await this.page.waitForLoadState('domcontentloaded'); // Wait until DOM is loaded
    const clickRentScreenshot = await this.page.screenshot();
    testInfo?.attach?.("Rent Page", { body: clickRentScreenshot, contentType: 'image/png' });
  }

  // Fills in the locality search box and selects the suggested locality
  async searchLocality(testInfo) {
    await this.searchBox.click();
    await this.searchBox.fill(this.locality); // Enter locality name
    const localityScreenshot = await this.page.screenshot();
    testInfo?.attach?.("Locality Filled Page", { body: localityScreenshot, contentType: 'image/png' });

    await this.localitySuggestion.click(); // Click on the suggested locality
    const suggestionScreenshot = await this.page.screenshot();
    testInfo?.attach?.("Locality Suggestion Clicked", { body: suggestionScreenshot, contentType: 'image/png' });
  }

  // Selects the "Flatmates" option and attaches a screenshot
  async selectFlatmatesOption(testInfo) {
    await this.flatmatesRadio.click();
    const selectFlatmatesScreenshot = await this.page.screenshot();
    testInfo?.attach?.("Flatmates Page", { body: selectFlatmatesScreenshot, contentType: 'image/png' });
  }

  // Clicks the search button and waits for results to load
  async clickSearchButton(testInfo) {
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle'); // Wait until network is idle
    const searchButtonScreenshot = await this.page.screenshot();
    testInfo?.attach?.("Search Page", { body: searchButtonScreenshot, contentType: 'image/png' });
  }

  // Applies filters: "Single Room" and "Semi-Furnished", and attaches screenshots
  async applyFilters(testInfo) {
    await this.singleRoomCheckbox.check(); // Apply "Single Room" filter
    const singleRoomScreenshot = await this.page.screenshot();
    testInfo?.attach?.("SingleRoom Page", { body: singleRoomScreenshot, contentType: 'image/png' });

    await this.semiFurnishedCheckbox.check(); // Apply "Semi-Furnished" filter
    const semiFurnishedScreenshot = await this.page.screenshot();
    testInfo?.attach?.("Semi Furnished Page", { body: semiFurnishedScreenshot, contentType: 'image/png' });
  }

  // Retrieves all headings from the filtered results
  async getFilteredHeadings() {
    await this.page.waitForSelector('h2'); // Wait for headings to appear
    return await this.resultHeadings.allTextContents(); // Return all heading texts
  }

  // Asserts that each heading contains the expected keyword
  async assertHeadingsContain(key) {
    const receivedText = await this.getFilteredHeadings();
    for (let i = 0; i < receivedText.length; i++) {
      const heading = receivedText[i].trim();
      expect(heading.slice(0, 11)).toContain(key); // Check if heading starts with the keyword
    }
  }
}
