import { chromium, defineConfig, devices } from '@playwright/test';


const config = ({
  testDir: './tests',
  timeout : 30 * 1000,
  expect : {
    timeout : 5000,
  },
  reporter : 'html',
  
  use: {
    browserName : 'chromium',
    headless : false
  },

  
});
module.exports = config