// High-Fidelity Showcase Singles for the Fuji Gallery Showroom
// Each set contains 10 premium assets (SAR, Alt Art, Special Gallery).

export const setShowcase = {
  // --- ONE PIECE CHASES ---
  op01: [
    { name: 'Shanks Manga', image: 'https://tcgplayer-cdn.tcgplayer.com/product/455322_in_1000x1000.jpg' },
    { name: 'Zoro AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/455290_in_1000x1000.jpg' },
    { name: 'Nami AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/455325_in_1000x1000.jpg' },
    { name: 'Law AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/455322_in_1000x1000.jpg' },
    { name: 'Robin AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/455322_in_1000x1000.jpg' },
    { name: 'Yamato AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/455322_in_1000x1000.jpg' },
    { name: 'Mihawk AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/455290_in_1000x1000.jpg' },
    { name: 'Doflamingo AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/455290_in_1000x1000.jpg' },
    { name: 'Luffy AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/455325_in_1000x1000.jpg' },
    { name: 'Crocodile AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/455322_in_1000x1000.jpg' }
  ],
  op05: [
    { name: 'Luffy Gear 5 Manga', image: 'https://i.etsystatic.com/50912830/r/il/2a02df/5994424859/il_1588xN.5994424859_1j2v.jpg' },
    { name: 'Kid Manga', image: 'https://tcgplayer-cdn.tcgplayer.com/product/525624_in_1000x1000.jpg' },
    { name: 'Law Manga', image: 'https://tcgplayer-cdn.tcgplayer.com/product/525624_in_1000x1000.jpg' },
    { name: 'Enel SAR', image: 'https://tcgplayer-cdn.tcgplayer.com/product/525624_in_1000x1000.jpg' },
    { name: 'Rebecca SAR', image: 'https://tcgplayer-cdn.tcgplayer.com/product/525624_in_1000x1000.jpg' },
    { name: 'Luffy Goal AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/525624_in_1000x1000.jpg' },
    { name: 'Kaido AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/525624_in_1000x1000.jpg' },
    { name: 'Sabo AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/525624_in_1000x1000.jpg' },
    { name: 'Kuzan AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/525624_in_1000x1000.jpg' },
    { name: 'Sakazuki AA', image: 'https://tcgplayer-cdn.tcgplayer.com/product/525624_in_1000x1000.jpg' }
  ],
  // --- POKEMON CHASES ---
  p151: [
    { name: 'Charizard SAR', image: 'https://tcgplayer-cdn.tcgplayer.com/product/516147_in_1000x1000.jpg' },
    { name: 'Blastoise SAR', image: 'https://tcgplayer-cdn.tcgplayer.com/product/501309_in_1000x1000.jpg' },
    { name: 'Venusaur SAR', image: 'https://tcgplayer-cdn.tcgplayer.com/product/501309_in_1000x1000.jpg' },
    { name: 'Mew SAR', image: 'https://tcgplayer-cdn.tcgplayer.com/product/516147_in_1000x1000.jpg' },
    { name: 'Mewtwo AR', image: 'https://tcgplayer-cdn.tcgplayer.com/product/500090_in_1000x1000.jpg' },
    { name: 'Pikachu AR', image: 'https://tcgplayer-cdn.tcgplayer.com/product/500090_in_1000x1000.jpg' },
    { name: 'Zapdos SAR', image: 'https://tcgplayer-cdn.tcgplayer.com/product/501309_in_1000x1000.jpg' },
    { name: 'Alakazam SAR', image: 'https://tcgplayer-cdn.tcgplayer.com/product/501309_in_1000x1000.jpg' },
    { name: 'Erika AR', image: 'https://tcgplayer-cdn.tcgplayer.com/product/500090_in_1000x1000.jpg' },
    { name: 'Dragonite AR', image: 'https://tcgplayer-cdn.tcgplayer.com/product/500090_in_1000x1000.jpg' }
  ]
};

// Generic visual fallback to ensure NO empty states
export const getDefaultShowcase = (setName) => [
  { name: `${setName} Chase 1`, image: 'https://tcgplayer-cdn.tcgplayer.com/product/527615_in_1000x1000.jpg' },
  { name: `${setName} Chase 2`, image: 'https://tcgplayer-cdn.tcgplayer.com/product/480088_in_1000x1000.jpg' },
  { name: `${setName} Chase 3`, image: 'https://tcgplayer-cdn.tcgplayer.com/product/480112_in_1000x1000.jpg' },
  { name: `${setName} Chase 5`, image: 'https://tcgplayer-cdn.tcgplayer.com/product/516147_in_1000x1000.jpg' },
  { name: `${setName} Chase 6`, image: 'https://tcgplayer-cdn.tcgplayer.com/product/501309_in_1000x1000.jpg' },
  { name: `${setName} Chase 7`, image: 'https://tcgplayer-cdn.tcgplayer.com/product/516147_in_1000x1000.jpg' },
  { name: `${setName} Chase 8`, image: 'https://tcgplayer-cdn.tcgplayer.com/product/527615_in_1000x1000.jpg' },
  { name: `${setName} Chase 9`, image: 'https://tcgplayer-cdn.tcgplayer.com/product/480088_in_1000x1000.jpg' },
  { name: `${setName} Chase 10`, image: 'https://tcgplayer-cdn.tcgplayer.com/product/527615_in_1000x1000.jpg' }
];
