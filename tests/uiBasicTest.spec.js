const { test, expect } = require("@playwright/test");

test.only('browser context first playwright',async ({browser})=> //asynch is needed in the typescript to run the steps squ and to work with the await 
{
 const context = await browser.newContext();
 const page = await context.newPage();
 const userName = page.locator('#username');
 const signIn = page.locator('#signInBtn');
 const cardTitles = page.locator(".card-body a");
 
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 console.log(await page.title());

 await userName.fill("rahulshettyacademy");
 await page.locator("[type = 'password']").fill("Learning@830$3mK2");
 
 await page.click('#signInBtn');

 await page.waitForSelector('.alert-danger',{state : 'attached'});
 const errorMessage = page.locator('.alert-danger');

 console.log(await errorMessage.textContent());
 await expect(errorMessage).toContainText('Incorrect');

//  console.log(await cardTitles.nth(2).textContent());
//  console.log(await cardTitles.first().textContent());
 const allTitles = await cardTitles.allTextContents();

 console.log(allTitles);
 await expect(cardTitles).toContainText(['iphone X']);

});

test('page first playwright',async ({page})=> //asynch is needed in the typescript to run the steps squ and to work with the await 
{
 
 await page.goto("https://google.com/");
 console.log(await page.title());
 await expect(page).toHaveTitle("Google");
 //https://rahulshettyacademy.com/client/#/auth/login
});
