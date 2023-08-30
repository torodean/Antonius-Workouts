#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of directories to process
const ROOT_DIR = './workouts';

const README_FILENAME = 'README.md';
const NB_IMAGES_PER_LINE = 4;

let nbImages = 0;
let mdContent = '# Workout Images\n\n<table><tr>';

function processDirectory(directory) {
  fs.readdirSync(directory).forEach((entry) => {
    const entryPath = path.join(directory, entry);
    const stats = fs.statSync(entryPath);

    if (stats.isDirectory()) {
      processDirectory(entryPath);
    } else if (stats.isFile() && /\.(jpg|png)$/i.test(entry)) {
      if (!(nbImages % NB_IMAGES_PER_LINE)) {
        if (nbImages > 0) {
          mdContent += '</tr>';
        }
        mdContent += '<tr>';
      }
      nbImages++;
      mdContent += `
<td valign="bottom">
<img src="${path.relative(ROOT_DIR, entryPath)}" width="200"><br>
${entry}
</td>
`;
    }
  });
}

processDirectory(ROOT_DIR);

mdContent += '</tr></table>';

fs.writeFileSync(README_FILENAME, mdContent);
