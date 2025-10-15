import {test,expect} from '@playwright/test';

test("frames",async({page})=>{
    await page.goto('https://demo.automationtesting.in/Register.html');
    await page.locator(".dropdown-toggle").nth(0).click();
    const framesLink = page.getByRole('link', { name: 'Frames' });
    await framesLink.click();
    const inputField=page.frameLocator("#singleframe").locator('input[type="text"]');
    await inputField.fill("hello");
    await page.locator(".analystic").nth(1).click();
    const input2=page.frameLocator('iframe[src="MultipleFrames.html"]').frameLocator('iframe[src="SingleFrame.html"]').locator('input[type="text"]')
    await input2.fill("hellosecond");
 
})
 
test("upload", async({page})=>{
    await page.goto('https://demo.automationtesting.in/Register.html');
    await page.locator("#imagesrc").setInputFiles("data/picture.png")
 
})