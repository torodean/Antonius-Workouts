#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Root directory to start processing
const ROOT_DIR = './workouts/';
const README_FILENAME = 'README.md';
const NB_IMAGES_PER_LINE = 4;

// Recursive function to process directories
function processDirectory(directory) {
  let nbImages = 0;
  let mdContent = '<table><tr>';

  fs.readdirSync(directory).forEach((item) => {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);

    if (stats.isFile() && item !== README_FILENAME) {
      if (!(nbImages % NB_IMAGES_PER_LINE)) {
        if (nbImages > 0) {
          mdContent += '</tr>';
        }
        mdContent += '<tr>';
      }
      nbImages++;
      mdContent += `
<td valign="bottom">
<img src="./${item}" width="200"><br>
${item}
</td>`;
    } else if (stats.isDirectory()) {
      processDirectory(itemPath); // Recursively process subdirectories
    }
  });

  mdContent += '</tr></table>';
  fs.writeFileSync(path.join(directory, README_FILENAME), mdContent);
}

processDirectory(ROOT_DIR);
