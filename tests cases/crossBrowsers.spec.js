import { test, expect } from '@playwright/test';
import { NoBrokerSearchPage } from '../pages/FlatmateSearch.js';
import { NoBrokerPageFilters } from '../pages/FlatmateSearchFilters.js';
import { NoBrokerPageSearch } from '../pages/FlatmateSearchWithoutLocality.js';
import { localityReader, loginReader } from '../utils/excelReader.js';
import { localityName, keywordName, messageText, headingName, shortlist } from '../data/assertionData.json';
import { NobrokerLoginPage } from '../pages/login.js';
import { NobrokerContactPage } from '../pages/FlatmateContact.js';
import { NobrokerMenuPage } from '../pages/FlatmateShortlistMenu.js';
import { BrowserUtils } from '../utils/BrowserUtils.js';


const browsers = ['chromium', 'firefox', 'webkit'];

for (const browser of browsers) {
  test.describe(`Cross-Browser Tests on ${browser}`, () => {
    //const localities = localityReader();
    //const loginDataList = loginReader();

    for (const localityData of localityReader()) {
      test(`${browser} - Search for flatmates in ${localityData.Locality}`, async (testInfo) => {
        const browserUtils = new BrowserUtils();
        const page = await browserUtils.launchBrowser(browser);
        await page.goto('https://www.nobroker.in/real-estate-in-bangalore');

        const noBrokerSearch = new NoBrokerSearchPage(page);
        await noBrokerSearch.clickRentLink(testInfo);
        await noBrokerSearch.searchLocality(String(localityData.Locality), testInfo);
        await noBrokerSearch.selectFlatmatesOption(testInfo);
        await noBrokerSearch.clickSearchButton(testInfo);
        await noBrokerSearch.expectResult(localityName.locality, testInfo);

        await browserUtils.closeBrowser();
      });

      test(`${browser} - Search with filters in ${localityData.Locality}`, async (testInfo) => {
        const browserUtils = new BrowserUtils();
        const page = await browserUtils.launchBrowser(browser);
        await page.goto('https://www.nobroker.in/real-estate-in-bangalore');

        const searchFilters = new NoBrokerPageFilters(page);
        await searchFilters.clickRentLink(testInfo);
        await searchFilters.searchLocality(String(localityData.Locality), testInfo);
        await searchFilters.selectFlatmatesOption(testInfo);
        await searchFilters.clickSearchButton(testInfo);
        await searchFilters.applyFilters(testInfo);
        await searchFilters.assertHeadingsContain(keywordName.keyword);

        await browserUtils.closeBrowser();
      });
    }

    test(`${browser} - Should show error when locality is not selected`, async (testInfo) => {
      const browserUtils = new BrowserUtils();
      const page = await browserUtils.launchBrowser(browser);
      await page.goto('https://www.nobroker.in/real-estate-in-bangalore');

      const noBrokerPage = new NoBrokerPageSearch(page);
      await noBrokerPage.performSearchWithoutLocality(testInfo);
      await noBrokerPage.assertErrorMessage(messageText.expectedMessage);

      await browserUtils.closeBrowser();
    });

    for (const loginData of loginReader()) {
      
      	test(`${browser} - Navigate to 'Owners you contacted' after login for ${loginData.MobileNumber}`, async (testInfo) => {
        const browserUtils = new BrowserUtils();
        const page = await browserUtils.launchBrowser(browser);
        await page.goto('https://www.nobroker.in/real-estate-in-bangalore');

        const loginPage = new NobrokerLoginPage(page);
        await loginPage.clickLogin();
        await loginPage.enterMobileNumber(String(loginData.MobileNumber));
        await page.waitForTimeout(15000); // Manual OTP
        await loginPage.clickContinue();

        for (const localityData of localityReader()) {
        const ownersContactPage = new NobrokerContactPage(page);
        await ownersContactPage.searchFlatmatesByLocality(localityData.Locality, testInfo);
        await ownersContactPage.assertHeadingMatch(headingName.Heading);
        await ownersContactPage.goToOwnersContacted(testInfo);

        await browserUtils.closeBrowser();
        }
      });


      test(`${browser} - Navigate menu options after login for ${loginData.MobileNumber}`, async (testInfo) => {
        const browserUtils = new BrowserUtils();
        const page = await browserUtils.launchBrowser(browser);
        await page.goto('https://www.nobroker.in/real-estate-in-bangalore');

        const loginPage = new NobrokerLoginPage(page);
        await loginPage.clickLogin();
        await loginPage.enterMobileNumber(String(loginData.MobileNumber));
        await page.waitForTimeout(15000); // Manual OTP
        await loginPage.clickContinue();

        const shortlistMenuPage = new NobrokerMenuPage(page);
        await shortlistMenuPage.navigateMenuOptions(testInfo);
        await shortlistMenuPage.assertHeadingsShorlist(shortlist.shortlistWord);

        await browserUtils.closeBrowser();
      });
    }
  });
}
