const fs = require('fs');
let lines = fs.readFileSync('app/page.tsx', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Data:image/svg+xml')) {
    lines[i] = "      style={{ backgroundImage: \url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")\ }}";
  }
}

fs.writeFileSync('app/page.tsx', lines.join('\n'));
console.log('Fixed syntax error');
