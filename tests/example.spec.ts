const { test, expect } = require("@playwright/test");

test('login page automation',async({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const userEmail = page.locator('#userEmail');
    const userMobile = page.locator('#userMobile');
    const occupation = page.locator('[formcontrolname="occupation"]');
    const userPassword = page.locator('#userPassword');
    const confirmPassword = page.locator('#confirmPassword');
    const login = page.locator('#login'); 


    await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
    console.log(await page.title());

    await firstName.fill("kajal");
    await lastName.fill("bhosle");
    await userEmail.fill("kajal2023@gmail.com");
    await userMobile.fill("8888888888");
    await occupation.selectOption("Doctor");
    await userPassword.fill("Learning@23");
    await confirmPassword.fill("Learning@23");
    await page.click('#login');


});
test.only('login page',async({browser}) =>
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
