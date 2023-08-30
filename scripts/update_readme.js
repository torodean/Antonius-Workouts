#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT_DIR = './workouts/';
const README_FILENAME = 'README.md';

function getImagesRecursive(directory, images = []) {
  fs.readdirSync(directory).forEach((item) => {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);

    if (stats.isFile() && (item.endsWith('.jpg') || item.endsWith('.png'))) {
      images.push(path.relative(ROOT_DIR, itemPath));
    } else if (stats.isDirectory()) {
      getImagesRecursive(itemPath, images);
    }
  });

  return images;
}

const imageList = getImagesRecursive(ROOT_DIR);
const mdContent = imageList.map((image) => {
  return `![${image}](${image})`;
}).join('\n');

fs.writeFileSync(path.join(ROOT_DIR, README_FILENAME), mdContent);

