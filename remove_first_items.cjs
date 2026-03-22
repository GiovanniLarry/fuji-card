const fs = require('fs');
const path = require('path');

const targetRegexes = [
  { name: 'UNION ARENA', regex: /UNION ARENA/i },
  { name: 'hololive', regex: /hololive/i },
  { name: 'Lycee', regex: /Lycee/i },
  { name: 'Gundam', regex: /Gundam/i },
  { name: 'Dragon Ball', regex: /Dragon Ball/i },
  { name: 'Disney/Lorcana', regex: /Lorcana|Disney/i }
];

const filesToUpdate = [
  { path: 'client/src/data/products.js', varNames: ['localProductStore'] },
  { path: 'api/data/flagship_products.js', varNames: ['localProductStore'] },
  { path: 'api/data/store.js', varNames: ['products', 'categories'] }
];

function findMatchingBracket(text, startPos) {
  let depth = 0;
  for (let i = startPos; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

filesToUpdate.forEach(fileInfo => {
  const absolutePath = path.resolve(fileInfo.path);
  if (!fs.existsSync(absolutePath)) return;

  let content = fs.readFileSync(absolutePath, 'utf8');
  const removedTypesGlobal = new Set();

  fileInfo.varNames.forEach(varName => {
    const startRegex = new RegExp(`${varName}\\s*=\\s*\\[`, 's');
    const match = content.match(startRegex);
    if (!match) return;

    const arrayStart = match.index + match[0].length - 1;
    const arrayEnd = findMatchingBracket(content, arrayStart);
    if (arrayEnd === -1) return;

    const arrayStr = content.substring(arrayStart, arrayEnd + 1);
    let products;
    try {
      products = eval(`(${arrayStr})`);
    } catch (e) { return; }

    if (!Array.isArray(products)) return;

    const removedIdxs = new Set();
    for (let i = 0; i < products.length; i++) {
        const combined = JSON.stringify(products[i]).toLowerCase();
        for (let rIdx = 0; rIdx < targetRegexes.length; rIdx++) {
            if (!removedTypesGlobal.has(rIdx) && targetRegexes[rIdx].regex.test(combined)) {
                removedTypesGlobal.add(rIdx);
                removedIdxs.add(i);
                console.log(`[${fileInfo.path}:${varName}] REMOVED ${targetRegexes[rIdx].name}: ${products[i].id || products[i].name}`);
            }
        }
    }

    const newArray = products.filter((_, idx) => !removedIdxs.has(idx));
    const newArrayStr = JSON.stringify(newArray, null, 2);
    
    // We need to update 'content' for the next varName iteration
    // And recalculate indices if necessary, but here we can just rebuild the whole thing or do it once.
    // For simplicity, I'll update it and use the NEW content's index in the NEXT iteration.
    content = content.substring(0, arrayStart) + newArrayStr + content.substring(arrayEnd + 1);
  });

  fs.writeFileSync(absolutePath, content);
});
