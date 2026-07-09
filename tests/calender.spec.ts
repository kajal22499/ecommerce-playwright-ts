const {test,expect } = require('@playwright/test');

test('calendor selection', async({page})=>
{
    const month = "6";
    const date = "15";
    const year = "2027";
    const expectedValues = [month,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();

    const inputs = await page.locator('.react-date-picker__inputGroup__input')

    for(let i=0;i< expectedValues.length;i++)
    {
       const values = await inputs.nth(i).inputValue();
       expect(values).toEqual(expectedValues[i]);
    }


   




});