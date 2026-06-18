import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

async function updateStats() {
  console.log('Launching headless Chromium...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  console.log('Navigating to profile: https://tryhackme.com/p/AmanJ24...');
  await page.goto('https://tryhackme.com/p/AmanJ24', { waitUntil: 'domcontentloaded', timeout: 30000 });

  console.log('Waiting 5 seconds for dynamic telemetry elements to render...');
  await page.waitForTimeout(5000);

  console.log('Extracting page inner text...');
  const bodyText = await page.innerText('body');
  await browser.close();

  // Parsing values using robust regex patterns
  let rank = '#7,188';
  let percentile = 'Top 1%';
  let completedRooms = 305;
  let badgesCount = 37;

  // 1. Rank Parse (e.g. Rank followed by newline then 7188)
  const rankMatch = bodyText.match(/Rank\s*\n\s*(\d+)/i);
  if (rankMatch) {
    const rankNum = parseInt(rankMatch[1], 10);
    rank = `#${rankNum.toLocaleString()}`;
    console.log('Extracted Rank:', rank);
  } else {
    console.warn('Could not extract Rank, using fallback:', rank);
  }

  // 2. Percentile Parse (e.g. top 1%)
  const percentileMatch = bodyText.match(/(top\s+\d+%\s*)/i);
  if (percentileMatch) {
    const cleanPercentile = percentileMatch[0].trim();
    // Capitalize first letter (e.g. Top 1%)
    percentile = cleanPercentile.charAt(0).toUpperCase() + cleanPercentile.slice(1);
    console.log('Extracted Percentile:', percentile);
  } else {
    console.warn('Could not extract Percentile, using fallback:', percentile);
  }

  // 3. Completed Rooms Parse (e.g. Completed rooms followed by newline then 305)
  const roomsMatch = bodyText.match(/Completed\s+rooms\s*\n\s*(\d+)/i);
  if (roomsMatch) {
    completedRooms = parseInt(roomsMatch[1], 10);
    console.log('Extracted Completed Rooms:', completedRooms);
  } else {
    console.warn('Could not extract Completed Rooms, using fallback:', completedRooms);
  }

  // 4. Badges Count Parse (e.g. Badges followed by newline then 37)
  const badgesMatch = bodyText.match(/Badges\s*\n\s*(\d+)/i);
  if (badgesMatch) {
    badgesCount = parseInt(badgesMatch[1], 10);
    console.log('Extracted Badges Count:', badgesCount);
  } else {
    console.warn('Could not extract Badges Count, using fallback:', badgesCount);
  }

  // Read content.js
  const contentPath = path.resolve('src/data/content.js');
  if (!fs.existsSync(contentPath)) {
    console.error(`content.js not found at ${contentPath}`);
    process.exit(1);
  }

  let content = fs.readFileSync(contentPath, 'utf8');

  // Replace stats in content.js using regex replacements
  content = content.replace(/rank:\s*'[^']+'/, `rank: '${rank}'`);
  content = content.replace(/percentile:\s*'[^']+'/, `percentile: '${percentile}'`);
  content = content.replace(/completedRooms:\s*\d+/, `completedRooms: ${completedRooms}`);
  content = content.replace(/badgesCount:\s*\d+/, `badgesCount: ${badgesCount}`);

  fs.writeFileSync(contentPath, content, 'utf8');
  console.log('content.js successfully updated with live TryHackMe stats!');
}

updateStats().catch(err => {
  console.error('Error during stats update:', err);
  process.exit(1);
});
