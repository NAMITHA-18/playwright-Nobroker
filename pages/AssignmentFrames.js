import { expect } from "@playwright/test";
export class Frames
{
  constructor(page) {
    this.page = page;
    this.switch=this.page.locator('a[href="SwitchTo.html"]').first()
    this.frames=this.page.locator('a[href="Frames.html"]')
    this.alerts=this.page.locator('a[href="Alerts.html"]')
 
    // Tabs
    this.singleFrameTab = 'a[href="#Single"]';
    this.nestedFrameTab = 'a[href="#Multiple"]';
 
    // Frames
    this.singleFrame = page.frameLocator('iframe[src="SingleFrame.html"]');
    this.outerFrame = page.frameLocator('iframe[src="MultipleFrames.html"]');
    this.innerFrame = this.outerFrame.frameLocator('iframe');
 
    this.fileInput= this.page.locator('#imagesrc')
    this.AlertWithOK=page.getByRole('link',{name:'Alert with OK', exact: true })
    this.AlertWithOkAndCancel=page.getByRole('link',{name:'Alert with OK & Cancel ', exact: true })
    this.AlertWithTextBox=page.getByRole('link',{name:'Alert with Textbox ', exact: true })
    this.okButton = page.getByRole('button', { name: 'click the button to display an alert box' });
    this.cancelButton = page.getByRole('button', { name: 'click the button to display a confirm box'});
    this.textboxButton = page.getByRole('button', { name: 'click the button to demonstrate the prompt box' });
    this.confirmText=page.locator('#demo')
    this.promptText=page.locator('#demo1')
 }
 
  async gotoFramePage() {
    await this.page.goto('https://demo.automationtesting.in/Register.html')
    await this.switch.click()
    await this.frames.click()
   
  }
 
  async enterTextInSingleFrame(text) {
    await this.page.click(this.singleFrameTab);
    const input = this.singleFrame.locator('input[type="text"]');
    await input.fill(text);
    await expect(input).toHaveValue(text);
  }
 
  async enterTextInNestedFrame(text) {
    await this.page.click(this.nestedFrameTab);
    const input = this.innerFrame.locator('input[type="text"]');
    await input.fill(text);
    await expect(input).toHaveValue(text);
  }
 
  async gotoRegisterPage(){
    await this.page.goto('https://demo.automationtesting.in/Register.html')
  }
 
  async fileUpload(filePath){
    await this.fileInput.setInputFiles(filePath)
 
  }
  async verifyUpload(){
   
    const fileName = await this.fileInput.evaluate(input => input.files[0]?.name);
    expect(fileName).toBe('picture.png');
 
  }
 
  async allalerts(){
    await this.page.goto('https://demo.automationtesting.in/Register.html')
    await this.switch.click()
    await this.alerts.click()
    }
    async displayalertbox(){
        await this.AlertWithOK.click()
        this.page.once('dialog', async dialog => {
            console.log('OK Alert:', dialog.message());
            await dialog.accept();
        });
        await this.okButton.click()
    }
 
    async displayconfirmbox(){
        await this.AlertWithOkAndCancel.click()
        this.page.once('dialog', async dialog => {
            console.log('cancel Alert:', dialog.message());
            await dialog.dismiss();
        });
   
        await this.cancelButton.click()
    }
    async verifyconfirmbox(){
        const result = await this.confirmText.textContent()
        expect(result).toContain('You pressed Ok');
    }
    async displaypromptbox(name){
        await this.AlertWithTextBox.click()
        this.page.once('dialog', async dialog => {
            console.log('prompt Alert:', dialog.message());
            await dialog.accept(name);
        });
   
        await this.textboxButton.click()
    }
    async verifypromptbox(name){
   
        const result = await this.promptText.textContent()
        expect(result).toContain(`Hello ${name} How are you today`);
    }
}