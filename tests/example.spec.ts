const { test, expect } = require("@playwright/test");

test('login page',async({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const products = page.locator('.card-body');
    const productName = 'ZARA COAT 3'; 
    const userEmail = page.locator('#userEmail');
    const userPassword = page.locator('#userPassword');
    const login = page.locator('#login'); 


    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());

    await userEmail.fill("kajal2023@gmail.com");
    await userPassword.fill("Learning@23");
    await page.click('#login');

    //await page.waitForLoadState('networkidle'); works sometime
    await page.locator('.card-body b').first().waitFor(); //--- waitfor wont work if dont define for which item ur waiting 
    const title = await page.locator('.card-body b').allTextContents();
    console.log(title);

   const count = await products.count();
   for(let i=0;i<count;++i)
   {
    if (await products.nth(i).locator("b").textContent()=== 'productName')
    {
        await products.nth(i).locator(" Add To Cart").click();
        break;
    }
   }


});
test('ui controls',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    const userName = page.locator('#username').inputValue();
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");


    
});
test.only('child window handler', async ({ browser }) => {
    // Step 1 — Create an isolated browser context
    const context = await browser.newContext();
    
    // Step 2 — Open a new page inside that context
    const page = await context.newPage();
    
    // Step 3 — Navigate to the page
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    
    // Step 4 — Locate the link that opens a new tab
    const documentLink = page.locator("[href*='documents-request']");

    // Step 5 — Capture the new page BEFORE clicking
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),  // listens for new tab
        documentLink.click(),          // triggers the new tab
    ]);

    // Step 6 — Wait for new page to load, then read content
    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator('#username').fill(domain);
    await page.pause();
    console.log(await page.locator("#username").inputValue());

});


