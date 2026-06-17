const { test, expect } = require("@playwright/test");

test.only('browser context first playwright',async ({browser})=> //asynch is needed in the typescript to run the steps squ and to work with the await 
{
 const context = await browser.newContext();
 const page = await context.newPage();
 const userName = page.locator('#username');
 const signIn = page.locator('#signInBtn');
 
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 console.log(await page.title());

 await userName.fill("rahulshettyacademy");
 await page.locator("[type = 'password']").fill("Learning@830$3mK2");
 
 await page.click('#signInBtn');

 console.log(await page.locator("[style*= 'block']").textContent());
 await expect(page.locator("[style*= 'block']")).toContainText('Incorrect');

});

test('page first playwright',async ({page})=> //asynch is needed in the typescript to run the steps squ and to work with the await 
{
 
 await page.goto("https://google.com/");
 console.log(await page.title());
 await expect(page).toHaveTitle("Google");
});
