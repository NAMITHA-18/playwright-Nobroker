import { test, expect } from '@playwright/test';
import { NoBrokerSearchPage } from '../pages/FlatmateSearch.js';
import { NoBrokerPageFilters } from '../pages/FlatmateSearchFilters.js';
import { NoBrokerPageSearch } from '../pages/FlatmateSearchWithoutLocality.js';
import { localityReader, loginReader } from '../utils/excelReader.js';
import { localityName, keywordName, messageText, headingName, shortlist } from '../data/assertionData.json';
import { NobrokerLoginPage } from '../pages/login.js';
import { NobrokerContactPage } from '../pages/FlatmateContact.js';
import { NobrokerMenuPage } from '../pages/FlatmateShortlistMenu.js';

// Navigate to base URL before each test
test.beforeEach(async function ({ page, baseURL }) {
    await page.goto(baseURL);
});

// -------------------- Property Search Tests --------------------
test.describe('Property Tests', () => {
    // Loop through each locality from Excel and run search tests
    
        // Test 1: Search for flatmates in a given locality
        /*
            =========================================================================================
            * TestCase Number   - 1
            * Description       - Search for flatmates
            * Created By        - Vuyyuru Namitha
            * Reviewed By       - Gujjula Narasimha Reddy
            * Positive Testcase - validate
            =========================================================================================
            Steps :
            * Open website
            * Hover to rent
            * Enter Location
            * Click on Flatmates
            * Click on search bar
            * Click on submit
            * Verify results
            =========================================================================================
        */
        test(`Search for flatmates in ${localityData.Locality}`, async ({ page }, testInfo) => {
            for(let localityData of localityReader())
            {
            const noBrokerSearch = new NoBrokerSearchPage(page, String(localityData.Locality));
            await noBrokerSearch.clickRentLink(testInfo); // Click on Rent section
            await noBrokerSearch.searchLocality(testInfo); // Enter locality
            await noBrokerSearch.selectFlatmatesOption(testInfo); // Select Flatmates option
            await noBrokerSearch.clickSearchButton(testInfo); // Click Search
            await noBrokerSearch.expectResult(localityName.locality, testInfo); // Assert results
            }
        });

        // Test 2: Search with filters applied
        /*
        =========================================================================================
        * TestCase Number   - 2
        * Description       - Search for flatmates with filters
        * Created By        - Vuyyuru Namitha
        * Reviewed By       - Gujjula Narasimha Reddy
        * Positive Testcase - validate
        =========================================================================================
        Steps :
        * Open website
        * Hover to rent
        * Enter Location
        * Click on Flatmates
        * Click on search bar
        * Click on submit
        * Add filters
        * Verify results
        =========================================================================================
    */
        test(`Search for flatmates in ${localityData.Locality} with filters`, async ({ page }, testInfo) => {
            for(let localityData of localityReader())
            {
            const searchFilters = new NoBrokerPageFilters(page, String(localityData.Locality));
            await searchFilters.clickRentLink(testInfo);
            await searchFilters.searchLocality(testInfo);
            await searchFilters.selectFlatmatesOption(testInfo);
            await searchFilters.clickSearchButton(testInfo);
            await searchFilters.applyFilters(testInfo); // Apply filters like budget, gender, etc.
            await searchFilters.assertHeadingsContain(keywordName.keyword); // Validate filtered results
            }
        });

    // Test 3: Validate error message when no locality is selected
    /*
        =========================================================================================
        * TestCase Number   - 3
        * Description       - Search for flatmates without entering locality
        * Created By        - Vuyyuru Namitha
        * Reviewed By       - Gujjula Narasimha Reddy
        * Negative Testcase - validate
        =========================================================================================
        Steps :
        * Open website
        * Hover to rent
        * Click on Flatmates
        * Click on search bar
        * Click on submit
        * Verify error message
        =========================================================================================
    */
    test('Should show error when locality is not selected', async ({ page }, testInfo) => {
        const noBrokerPage = new NoBrokerPageSearch(page);
        await noBrokerPage.performSearchWithoutLocality(testInfo); // Attempt search without locality
        await noBrokerPage.assertErrorMessage(messageText.expectedMessage); // Assert error message
    });
});

// -------------------- Login and Post-login Tests --------------------
const loginDataList = loginReader();

for (const loginData of loginDataList) {
    test.describe(`Login Tests for ${loginData.MobileNumber}`, () => {

        // Login setup before each test
        test.beforeEach(async ({ page, baseURL }) => {
            await page.goto(baseURL);
            const loginPage = new NobrokerLoginPage(page);
            await loginPage.clickLogin(); // Open login modal
            await loginPage.enterMobileNumber(String(loginData.MobileNumber)); // Enter mobile number
            await page.waitForTimeout(15000); // Wait for manual OTP entry
            await loginPage.clickContinue(); // Continue after OTP
        });

        // Test 4: Navigate to "Owners you Contacted" after search
        /*
        =========================================================================================
        * TestCase Number   - 4
        * Description       - Checking the properties which are contacted
        * Created By        - Vuyyuru Namitha
        * Reviewed By       - Gujjula Narasimha Reddy
        * Positive Testcase - validate
        =========================================================================================
        Steps :
        * Open website
        * Hover to rent
        * Click on Flatmates
        * Click on search bar
        * Click on submit
        * Navigate to profile
        * Click on owners you contacted
        * verify results
        =========================================================================================
    */
        test('Should navigate to Owners you Contacted after searching', async ({ page }, testInfo) => {
            for (let localityData of localityReader()) {
                const ownersContactPage = new NobrokerContactPage(page, localityData.Locality);
                await ownersContactPage.searchFlatmatesByLocality(testInfo); // Perform search
                await ownersContactPage.assertHeadingMatch(headingName.Heading); // Validate heading
                await ownersContactPage.goToOwnersContacted(testInfo); // Navigate to contacted owners
            }
        });

        // Test 5 : Navigate through menu options after login
        /*
        =========================================================================================
        * TestCase Number   - 5
        * Description       - Checking the shorlisted properties based on menu
        * Created By        - Vuyyuru Namitha
        * Reviewed By       - Gujjula Narasimha Reddy
        * Positive Testcase - validate
        =========================================================================================
        Steps :
        * Open website
        * Navigate to profile
        * Click on your shortlist
        * Hover over the menu 
        * verify results 
        =========================================================================================
    */
        test('Should navigate through menu options after login', async ({ page }, testInfo) => {
            const shortlistMenuPage = new NobrokerMenuPage(page);
            await shortlistMenuPage.navigateMenuOptions(testInfo); // Interact with menu
            await shortlistMenuPage.assertHeadingsShorlist(shortlist.shortlistWord); // Validate shortlist page
        });
    });
}