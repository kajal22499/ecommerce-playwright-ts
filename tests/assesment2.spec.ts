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
 const bookableEvent = page.locator('[data-testid="book-now-btn"]').filter({hasNotText:'Sold Out'}).first();
 await bookableEvent.click();
 await page.getByPlaceholder('Your full name').fill('kajal');
 await page.getByPlaceholder('you@email.com').fill('kajalbhosle1999@gmail.com');
 await page.getByPlaceholder('+91 98765 43210').fill('8999990078');
 await page.locator('.confirm-booking-btn').click();
 await page.locator('[href="/bookings"]',{hasText:'View My Bookings'}).click();
 await page.locator('a[href*="/bookings/"]',{hasText:'View Details'}).first().click();
 await expect(page.locator('h2',{hasText:'Booking Information'})).toBeVisible();
 const bookingreference = await page.locator('span.font-mono').first();
 await expect(bookingreference).toBeVisible();
 const bookref = (await bookingreference.innerText()).trim();
 const eventTitleFromPage = (await page.locator('h1').innerText()).trim();
 expect(bookref[0]).toBe(eventTitleFromPage[0]);
 await page.locator('#check-refund-btn').click();
 await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 1000 });
 await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });
 const refundResult = await (page.locator('#refund-result'));
 await expect(refundResult).toBeVisible();
 await expect(refundResult).toContainText('Eligible for refund.');
 await expect(refundResult).toContainText('Single-ticket bookings qualify for a full refund.');
 



});
test.only('task 2',async({page})=>
    {
      await loginAndGoToBooking(page);
      const bookableEvent = page.locator('[data-testid="book-now-btn"]').filter({hasNotText:'Sold Out'}).nth(1);
      await bookableEvent.click();
      const increaseQty = page.getByRole('button',{name:'+',exact:true});
      await increaseQty.click();
      await increaseQty.click();
      await expect(page.locator('#ticket-count')).toHaveText('3');
      await page.getByPlaceholder('Your full name').fill('kajal');
      await page.getByPlaceholder('you@email.com').fill('kajalbhosle1999@gmail.com');
      await page.getByPlaceholder('+91 98765 43210').fill('8999990078');
      await page.locator('.confirm-booking-btn').click();
      await page.locator('[href="/bookings"]',{hasText:'View My Bookings'}).click();
      await page.locator('a[href*="/bookings/"]',{hasText:'View Details'}).first().click();
      await expect(page.locator('h2',{hasText:'Booking Information'})).toBeVisible();
      const bookingreference = await page.locator('span.font-mono').first();
      await expect(bookingreference).toBeVisible();
     const bookref = (await bookingreference.innerText()).trim();
     const eventTitleFromPage = (await page.locator('h1').innerText()).trim();
     expect(bookref[0]).toBe(eventTitleFromPage[0]);
     await page.locator('#check-refund-btn').click();
     await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 1000 });
     await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });
     const refundResult = await (page.locator('#refund-result'));
     await expect(refundResult).toBeVisible();
     await expect(refundResult).toContainText('Not eligible for refund.');
     await expect(refundResult).toContainText(' Group bookings (3 tickets) are non-refundable.');
    });