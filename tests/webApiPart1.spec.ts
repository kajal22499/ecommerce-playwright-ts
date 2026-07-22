const{test,expect,request}=require('@playwright/test');

const apiPayload = {userEmail: "kajal2023@gmail.com", userPassword: "Learning@23"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}

let token;
const orderId;


test.beforeAll(async()=>
{
   const apiContext = await request.newContext();
   const ApiResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
   {
     data : apiPayload
   })

   expect(ApiResponse.ok()).toBeTruthy()
   const apiResponseJson = await ApiResponse.json();
    token =  apiResponseJson.token;
   console.log(token);

  const orderResponse =  await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data : orderPayload,
      Headers:{
              'authorization': token,
              'Content-type':'application/json'
             },
    })
    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0]

});
test.beforeEach(()=>
{

})



test('login page',async ({page}) =>
{
    await page.addInitScript(value =>
    {
       window.localStorage.setItem('token',value);

    },token);

    await page.goto("https://rahulshettyacademy.com/client/");
   
   

});
test('ui controls',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    const userName = page.locator('#username').inputValue();
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");


    
});
test('child window handler', async ({ browser }) => {
    // Step 1 — Create an isolated browser context
    const context = await browser.newContext();
    
    // Step 2 — Open a new page inside that context
    const page = await context.newPage();
    
    // Step 3 — Navigate to the page
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    
    // Step 4 — Locate the link that opens a new tab
    const documentLink = page.locator("[href*='documents-request']");

    // Step 5 — Capture the new page BEFORE clicking
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),  // listens for new tab
        documentLink.click(),          // triggers the new tab
    ]);

    // Step 6 — Wait for new page to load, then read content
    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator('#username').fill(domain);
    console.log(await page.locator("#username").inputValue());

});

test('special locatorss',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Student").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder('Password').fill('abc236');
    await page.getByRole('button',{name : 'submit'}).click();
    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible();
    await page.getByRole('link',{name:'Shop'}).click();
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRoled("button").click();
});



