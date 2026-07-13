const {test , expect} = require('@playwright/test');

test.only('booking form', async({page})=>
{
    const eventTitle = `Test Event ${Date.now()}`;
    const futureDateValue = '2027-01-15T10:00';
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder('you@email.com').fill('kajalbhosle1999@gmail.com');
    await page.getByLabel('password').fill('Browntape@2026');
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link',{name:'Browse Events →'})).toBeVisible();
    await page.goto("https://eventhub.rahulshettyacademy.com/admin/events");

    // FIX: was hardcoded as 'Birthday Party' — changed to eventTitle so the
    // created event's title actually matches what we filter/assert on later
    await page.locator('#event-title-input').fill(eventTitle);

    await page.locator("#admin-event-form textarea").fill('birthday will soon start please be prepared for the party');
    await page.getByLabel('city').fill('banglore');
    await page.getByLabel('Venue').fill('karapur tiskar banglore');
    await page.getByLabel('Event Date & Time').fill(futureDateValue);
    await page.getByLabel('Price ($)').fill('100');
    await page.getByLabel('Total Seats').fill('50');
    await page.locator('#add-event-btn').click();
    await expect(page.getByText('Event created')).toBeVisible();
    await page.goto("https://eventhub.rahulshettyacademy.com/events");
    const eventCards = page.locator('[data-testid="event-card"]');
    await expect(eventCards.first()).toBeVisible();
    const targetaCard = eventCards.filter({has:page.locator('h3',{hasText: eventTitle})});
    await expect(targetaCard).toBeVisible({timeout:5000});
    const seatElement = targetaCard.getByText(/seat/i);
    const seatText = await seatElement.innerText();
    const seatBeforeBooking = parseInt(seatText,10);
    console.log(seatBeforeBooking);
    await targetaCard.locator('[data-testid="book-now-btn"]').click();
    await expect(page.locator('#ticket-count')).toHaveText('1');
    await page.getByLabel('Full Name').fill('kajal');
    await page.locator('#customer-email').fill('kajal23@gmail.com');
    await page.getByPlaceholder('+91 98765 43210').fill('8899889977');
    await page.locator('.confirm-booking-btn').click();
    const bookingRef =  await page.locator('.booking-ref').first();
    await expect(bookingRef).toBeVisible();
    const bookingreference = (await bookingRef.innerText()).trim();
    await page.locator('a[href*="/bookings"]',{hasText:'View My Bookings'}).click();
    const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await expect (page.locator('#booking-card').first()).toBeVisible();
    const bookingCard = page.locator('#booking-card').filter({has: page.locator('.booking-ref',{hasText:bookingreference})});
    await expect(bookingCard).toBeVisible();
    await expect(bookingCard).toContainText(eventTitle);
    await page.goto("https://eventhub.rahulshettyacademy.com/events");
    const EventKard =  page.locator('#event-card');
    await expect(EventKard.first()).toBeVisible();
    const targetaCards = EventKard.filter({has:page.locator('h3',{hasText: eventTitle})});
    await expect(targetaCards).toBeVisible();
    const seatElementAfter = targetaCards.getByText(/seat/i);
    const seatTextAfter = await seatElementAfter.innerText();
    const seatAfterBooking = parseInt(seatTextAfter,10);
    expect(seatAfterBooking).toBe(seatBeforeBooking - 1);



});