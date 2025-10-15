export class NobrokerLoginPage {
  constructor(page) {
    this.page = page;
    this.loginButton = page.locator("//div[contains(text(),'Log in')]");
    this.mobileInput = page.getByRole('textbox', { name: 'Enter Mobile Number' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async clickLogin() {
    await this.loginButton.first().click();
  }

  async enterMobileNumber(mobileNumber) {
    await this.mobileInput.fill(mobileNumber);
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}