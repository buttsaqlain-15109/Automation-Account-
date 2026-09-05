const fs = require('fs');

console.log('====================================================');
console.log('  BADEN BOWER & DIGITAL-PR.AI VERIFICATION SUITE');
console.log('====================================================\n');

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    passed++;
    console.log(`  [PASS] ${message}`);
  } else {
    console.error(`  [FAIL] ${message}`);
  }
}

// 1. Files
console.log('--- 1. File Integrity & Asset Sizes ---');
const files = ['index.html', 'css/style.css', 'css/tailwind.css', 'js/app.js', 'package.json', 'src/input.css'];
files.forEach(f => {
  const exists = fs.existsSync(f);
  const size = exists ? fs.statSync(f).size : 0;
  assert(exists && size > 0, `${f} exists (${(size/1024).toFixed(1)} KB)`);
});

// 2. HTML Sections
console.log('\n--- 2. Required DOM Sections ---');
const html = fs.readFileSync('index.html', 'utf8');
const sections = [
  'site-header',
  'hero',
  'hero-webgl-canvas',
  'marquee-wrapper',
  'stats-section',
  'how-it-works',
  'goals',
  'comparison',
  'publications',
  'roi-calculator',
  'pricing',
  'concierge-section',
  'authority',
  'case-studies',
  'faq',
  'cta-banner-section',
  'site-footer',
  'consultationModal'
];
sections.forEach(sec => {
  assert(html.includes(sec), `Section '${sec}' present in HTML`);
});

// 3. Digital-PR.ai Copy and Headings
console.log('\n--- 3. Digital-PR.ai Headings & Guarantees ---');
const phrases = [
  'Stop explaining who you are',
  'Guaranteed Media Placements, or No Fee',
  '2,125 vetted media outlets',
  'How We Get You Published',
  'Select Outlet',
  'Approve Angle',
  'Final Sign-Off',
  'Live in 72h',
  'What do you want to achieve?',
  'I want to be famous',
  'I want to rank on Google',
  'I want AI engines to cite me',
  'I want a Wikipedia page',
  'I want people talking about me',
  'I want control of my search results',
  'Retainers. Newswires. Or just the coverage',
  'Our 90-Day Money-Back Guarantee',
  'Unlisted Media Concierge',
  'Questions? We operate on full transparency'
];
phrases.forEach(p => {
  assert(html.includes(p), `Refactored heading/text: "${p}"`);
});

// 4. JS Engine
console.log('\n--- 4. Interactive JavaScript Engine ---');
const js = fs.readFileSync('js/app.js', 'utf8');
const jsFunctions = [
  'initNavbar',
  'initHeroThreeShader',
  'initPublicationsExplorer',
  'initRoiCalculator',
  'initPricingToggle',
  'initFaqAccordion',
  'initConsultationModal',
  'initStatsCounter',
  'initWorldClocks',
  'filterByGoal',
  'PUBLICATIONS_DATA'
];
jsFunctions.forEach(fn => {
  assert(js.includes(fn), `JavaScript feature: ${fn}`);
});

console.log('\n====================================================');
console.log(`  VERIFICATION RESULTS: ${passed}/${total} TESTS PASSED (${((passed/total)*100).toFixed(0)}%)`);
console.log('====================================================\n');

process.exit(passed === total ? 0 : 1);
