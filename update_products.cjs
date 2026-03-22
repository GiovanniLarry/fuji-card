const fs = require('fs');
const path = require('path');

const cardsOutput = JSON.parse(fs.readFileSync('cards_output.json', 'utf8'));
const allNewCards = [
  ...cardsOutput.dragonBall,
  ...cardsOutput.gundam,
  ...cardsOutput.mtg
];

const filesToUpdate = [
  'client/src/data/products.js',
  'api/data/flagship_products.js',
  'api/data/store.js'
];

filesToUpdate.forEach(filePath => {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Identify the array. In products.js it's "const localProductStore = [...]"
  // In api files it's "module.exports = [...]" or "export const flagshipProducts = [...]"
  
  // For simplicity and since these are data files, we can parse the array part if we find the brackets.
  // HOWEVER, these are .js files, not .json. They might have logic.
  
  // A safer way for this specific codebase:
  // Most cards follow the pattern { "id": "...", ... }
  // We want to REMOVE existing Dragon Ball, Gundam, and MTG cards.
  
  // Let's use a regex to extract the array content if possible, or just build a new one.
  // Looking at products.js again:
  // 1: const localProductStore = [
  // ...
  // 3614: ];
  
  const startMatch = content.indexOf('[');
  const endMatch = content.lastIndexOf(']');
  
  if (startMatch === -1 || endMatch === -1) {
    console.log(`Could not find array in ${filePath}`);
    return;
  }
  
  const prefix = content.substring(0, startMatch + 1);
  const suffix = content.substring(endMatch);
  const arrayContentStr = content.substring(startMatch + 1, endMatch);
  
  // Parsing JS array string is hard without evaluation. 
  // Let's try a different approach: Replace objects one by one or filter.
  // Actually, since these are simple data files, I can just replace the whole array with a new one 
  // that contains (Current items - (Old Gundam/DB/MTG items)) + New Items.
  
  // But wait, the user wants to REPLACE them.
  // I'll filter out any items whose cardType or category matches what we are replacing.
  
  // Let's try to parse the array using a simple JSON.parse on a cleaned string if possible, 
  // or just use line-based filtering.
  
  const lines = arrayContentStr.split('\n');
  let filteredLines = [];
  let currentObjectLines = [];
  let inObject = false;
  let currentCardType = '';
  let currentId = '';

  for (let line of lines) {
    if (line.trim().startsWith('{')) {
      inObject = true;
      currentObjectLines = [line];
      currentCardType = '';
      currentId = '';
    } else if (line.trim().startsWith('}')) {
      currentObjectLines.push(line);
      inObject = false;
      
      // Check if this object should be kept
      const objStr = currentObjectLines.join('\n');
      const isDragonBall = objStr.includes('"Dragon Ball"') || objStr.includes('dragonball_item');
      const isGundam = objStr.includes('"Gundam"') || objStr.includes('gundam_item');
      const isMTG = objStr.includes('"Magic the Gathering"') || objStr.includes('mtg_item') || objStr.includes('"Magic: The Gathering"');
      
      if (!isDragonBall && !isGundam && !isMTG) {
        filteredLines.push(...currentObjectLines);
      }
    } else if (inObject) {
      currentObjectLines.push(line);
    } else {
      filteredLines.push(line);
    }
  }

  // Now append new cards
  const newCardsStr = allNewCards.map((card, index) => {
    return '  ' + JSON.stringify(card, null, 2).split('\n').join('\n  ') + (index === allNewCards.length - 1 ? '' : ',');
  }).join('\n');

  let finalArrayContent = filteredLines.join('\n');
  if (finalArrayContent.trim().endsWith(',')) {
    finalArrayContent = finalArrayContent.trim().slice(0, -1);
  }
  
  const newContent = prefix + '\n' + finalArrayContent + ',\n' + newCardsStr + '\n' + suffix;
  
  fs.writeFileSync(fullPath, newContent);
  console.log(`Successfully updated ${filePath}`);
});
