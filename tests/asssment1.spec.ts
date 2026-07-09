const {test , expect} = require('@playwright/test');

test('booking form', async({page})=>
{
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder('you@email.com').fill('kajalbhosle1999@gmail.com');
    await page.getByLabel('password').fill('Browntape@2026');
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link',{name:'Browse Events →'})).isVisible();

});
