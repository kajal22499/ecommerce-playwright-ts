const{test,expect,request}=require('@playwright/test');

const apiPayload = {userEmail: "kajal2023@gmail.com", userPassword: "Learning@23"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};

let token;
let orderId;


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
      headers:{
              'authorization': token,
              'Content-type':'application/json'
             },
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];

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
    await page.locator("button[routerlink*='/dashboard/myorders']").click();
    await page.locator('tbody').waitFor();
    const orderList = await page.locator('tbody tr');

    for(let i=0; i< await orderList.count();++i)
    {
        const roworderid = await orderList.nth(i).locator('th').textContent();
        if(orderId.includes(roworderid))
        {
            await orderList.nth(i).locator("button").first().click();
            break; 
        }
    }
    const orderdetails = await page.locator('.col-text').textContent();
    await page.pause();
    expect(orderId.includes(orderdetails)).toBeTruthy();

   
   

});
