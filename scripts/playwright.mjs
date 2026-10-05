// Loads Playwright for the browser test and the preview image. Playwright is a dev dependency only;
// the site build itself has no dependencies. Falls back to a global install when one exists.
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

export function loadPlaywright() {
  try {
    return require('playwright');
  } catch {
    try {
      return require(path.join(process.env.NODE_PATH || '/opt/node22/lib/node_modules', 'playwright'));
    } catch {
      console.error('Playwright is not installed. Run `npm install` and `npx playwright install chromium` first.');
      process.exit(1);
    }
  }
}

export async function launch(playwright) {
  try {
    return await playwright.chromium.launch();
  } catch (error) {
    // Some sandboxes ship a Chromium build at a fixed path instead of Playwright's download.
    const fallback = '/opt/pw-browsers/chromium';
    try {
      return await playwright.chromium.launch({ executablePath: fallback });
    } catch {
      throw error;
    }
  }
}
