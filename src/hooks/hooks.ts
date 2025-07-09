import { Browser, BrowserContext, chromium } from 'playwright';
import { After, Before, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { pageFixture } from './pagefixture';
import { invokeBrowser } from '../helper/browsermanager';
import { getEnv } from '../env/env';
import { Logger } from 'winston';
import { options } from '../Utitity/logger';

let browser: Browser;
let context : BrowserContext;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async function ({pickle}) {
  const scenarioName = pickle.name, pickleid = pickle.id;
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
  });

After(async function () {
    // console.log(result?.status);
    // if(result?.status == Status.FAILED) {
    //   const img = await pageFixture.page?.screenshot({path: `./test-result/screenshots/${pickle.name}.png`,  type: "png"})
    //   await this.attach(img, 'image/png');
    // }
    await pageFixture.page?.close();
    
    await context.close();
  });

AfterAll(async function () {
  await browser.close();
});
