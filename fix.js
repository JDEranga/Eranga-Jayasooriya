const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

content = content.replace(
  /style=\{\{ backgroundImage: 'url\("Data:image\/svg\+xml,%3Csvg viewbox='0 0 200 200'[\s\S]*?"\)' \}\}/,
  \style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E")' }}\
);

fs.writeFileSync('app/page.tsx', content);
