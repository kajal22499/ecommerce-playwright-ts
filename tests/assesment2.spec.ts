const {test,expect}=require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

async function loginAndGoToBooking(page)
{
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill('kajalbhosle1999@gmail.com');
    await page.getByLabel('password').fill('Browntape@2026');
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link',{name:'Browse Events →'})).toBeVisible();
}

test('task 1',async ({page})=>
{
 await loginAndGoToBooking(page);
 await page.locator('[data-testid="book-now-btn"]').first().click();
 await page.getByPlaceholder('Your full name').fill('kajal');
 await page.getByPlaceholder('you@email.com').fill('kajalbhosle1999@gmail.com');
 await page.getByPlaceholder('+91 98765 43210').fill('8999990078');
 await page.locator('.confirm-booking-btn').click();
 await page.locator('[href="/bookings"]',{hasText:'View My Bookings'}).click();
 await page.locator('a[href="/bookings/82722"]',{hasText:'View Details'}).click();
 await expect(page.locator('h2',{hasText:'Booking Information'})).toContainText();
 const bookingreference = await page.locator('.booking-ref').first();
 await expect(bookingreference).toBeVisible();
 const bookref = (await bookingreference.innerText()).trim();



});