import { test} from '@playwright/test';
import { Frames } from '../pages/AssignmentFrames.js';
import { UploadFiles } from '../pages/AssignmentUploads.js';
 
test('Interact with single and nested frames', async ({ page }) => {
  const framesPage = new Frames(page);
  await framesPage.gotoFramePage();
  await framesPage.enterTextInSingleFrame('Hello from Single Frame');
  await framesPage.enterTextInNestedFrame('Hello from Nested Frame');
});
 
test('Upload a file', async({page})=>{
    const registerPage=new UploadFiles(page);
    await registerPage.gotoRegisterPage();
    await registerPage.fileUpload("data/picture.png")
    await registerPage.verifyUpload()
})
test('Alert handling',async({page})=>{
    const alertPage=new UploadFiles(page);
    const value="Vuyyuru Namitha"
    await alertPage.allalerts()
    await alertPage.displayalertbox()
    await alertPage.displayconfirmbox()
    await alertPage.verifyconfirmbox()
    await alertPage.displaypromptbox(value)
    await alertPage.verifypromptbox(value)
})