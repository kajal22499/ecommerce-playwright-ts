const { test, expect } = require("@playwright/test");

test('login page automation',async({browser})) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    
}
