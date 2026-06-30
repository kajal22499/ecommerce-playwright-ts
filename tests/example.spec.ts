const { test, expect } = require("@playwright/test");

test('login page',async({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
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


});
test.only('ui controls',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    const userName = page.locator('#username').inputValue();
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");
    const doucmentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(doucmentLink).toHaveAttribute("class","blinkingText");


    
});

