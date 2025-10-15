// import { test, expect } from '@playwright/test';
// import { NobrokerLoginPage } from '../pages/login.js';
// import { excelReader } from '../utils/loginExcelReader.js';
// import { NobrokerContactPage } from '../pages/FlatmateContact.js';
// import { NobrokerMenuPage } from '../pages/FlatmateShortlistMenu.js';
// import { localityReader } from '../utils/localityExcelReader.js';
// import { headingName, shortlist } from '../data/assertionData.json';

// // Read login data from Excel
// const loginDataList = excelReader();

// // Loop through each login data entry
// for (const loginData of loginDataList) {
//         test.describe(`Login flow for mobile number ${loginData.MobileNumber}`, () => {

//                 test.beforeEach(async ({ page, baseURL }) => {
//                         // Navigate to the base URL
//                         await page.goto(baseURL);

//                         // Perform login before each test
//                         const loginPage = new NobrokerLoginPage(page);
//                         await loginPage.clickLogin();
//                         await loginPage.enterMobileNumber(String(loginData.MobileNumber));

//                         // Wait for manual OTP entry
//                         await page.waitForTimeout(15000);

//                         // continue after OTP is entered
//                         await loginPage.clickContinue();
//                 });


//                 // Test: Search for flatmates in a locality and verify expected listing
//                 test('should navigate to Owners you Contacted after searching ', async ({ page }) => {
//                         const ownersContactPage = new NobrokerContactPage(page);

//                         // Loop through each locality from the Excel reader
//                         for (let localityData of localityReader()) {
//                                 // Perform flatmates search using locality from Excel
//                                 await ownersContactPage.searchFlatmatesByLocality(localityData.Locality);
//                         }

//                         // Assert that one of the result headings matches the expected message
//                         //const resultHeading = readHeading();
//                         console.log(headingName.Heading)
//                         await ownersContactPage.assertHeadingMatch(headingName.Heading);

//                         // Navigate to 'Owners you Contacted' section from Profile menu
//                         await ownersContactPage.goToOwnersContacted();

//                 });



//                 // Test: Navigate through various menu options after login
//                 test('should navigate through menu options after login', async ({ page }) => {
//                         const shortlistMenuPage = new NobrokerMenuPage(page);

//                         // Perform navigation through Profile > Shortlists > Flatmates > PG/Hostel
//                         await shortlistMenuPage.navigateMenuOptions();

//                         //const resultShorlist = readShorlist()
//                         console.log(shortlist)
//                         await shortlistMenuPage.assertHeadingsShorlist(shortlist.shortlistWord);
//                 });
//         });
// }
