const fs = require('fs');
const path = require('path');

const pokemonData = JSON.parse(fs.readFileSync('pokemon_fuji.json', 'utf8'));

const formattedPokemon = pokemonData.map((item, index) => ({
  id: `fuji-pokemon-${index + 1}`,
  name: item.name,
  category: "other",
  price: item.price,
  image: item.imageUrl,
  description: `${item.name} - Authentic Japanese Pokemon TCG product from FujiCardShop. Perfect for collectors.`,
  stock: Math.floor(Math.random() * 5) + 1,
  set: item.set,
  rarity: item.rarity,
  condition: "NM",
  language: "Japanese",
  cardType: "Pokemon",
  featured: item.price > 500
}));

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
  
  const endMatch = content.lastIndexOf(']');
  if (endMatch === -1) {
    console.log(`Could not find array end in ${filePath}`);
    return;
  }
  
  const prefix = content.substring(0, endMatch);
  const suffix = content.substring(endMatch);
  
  // Check if we need a comma
  const prefixTrimmed = prefix.trim();
  const needsComma = !prefixTrimmed.endsWith(',') && !prefixTrimmed.endsWith('[');
  
  const newItemsStr = (needsComma ? ',\n' : '\n') + formattedPokemon.map((item, idx) => {
    return '  ' + JSON.stringify(item, null, 2).split('\n').join('\n  ') + (idx === formattedPokemon.length - 1 ? '' : ',');
  }).join('\n');
  
  const newContent = prefix + newItemsStr + '\n' + suffix;
  
  fs.writeFileSync(fullPath, newContent);
  console.log(`Successfully appended Pokemon to ${filePath}`);
});
