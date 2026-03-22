const fs = require('fs');

const dragonBall = [
  {"id": "product_page_2000350776", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/664/360664.jpg.l2_thumbnail.jpg", "name": "Son Goku PUMS12-SEC", "price": "$89.75", "rarity": "SEC", "set_code": "PUMS12"},
  {"id": "product_page_2000501212", "imageUrl": "https://tcgrepublic.com/media/binary/000/521/121/521121.jpg.l2_thumbnail.jpg", "name": "Son Goku PUMS13-SEC", "price": "$46.00", "rarity": "SEC", "set_code": "PUMS13"},
  {"id": "product_page_2000351449", "imageUrl": "https://tcgrepublic.com/media/binary/000/361/333/361333.jpg.l2_thumbnail.jpg", "name": "Gogeta PUMS11-SEC", "price": "$42.50", "rarity": "SEC", "set_code": "PUMS11"},
  {"id": "product_page_2000576518", "imageUrl": "https://tcgrepublic.com/media/binary/000/596/809/596809.jpg.l2_thumbnail.jpg", "name": "Gogeta: UM PUMS7-10 Parallel", "price": "$17.48", "rarity": "10 Parallel", "set_code": "Parallel"},
  {"id": "product_page_2000350777", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/665/360665.jpg.l2_thumbnail.jpg", "name": "Son Goten PUMS12-19", "price": "$14.99", "rarity": "19", "set_code": "PUMS12"},
  {"id": "product_page_2000350784", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/672/360672.jpg.l2_thumbnail.jpg", "name": "Son Goku PUMS11-01", "price": "$13.50", "rarity": "01", "set_code": "PUMS11"},
  {"id": "product_page_2000350830", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/718/360718.jpg.l2_thumbnail.jpg", "name": "Son Goku PUMS4-07 Stamped", "price": "$12.00", "rarity": "07 Stamped", "set_code": "Stamped"},
  {"id": "product_page_2000350790", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/678/360678.jpg.l2_thumbnail.jpg", "name": "Vegetto: Xeno PUMS9-01 Parallel", "price": "$11.50", "rarity": "01 Parallel", "set_code": "Parallel"},
  {"id": "product_page_2000350791", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/679/360679.jpg.l2_thumbnail.jpg", "name": "Vegetto: Xeno PUMS9-01", "price": "$10.88", "rarity": "01", "set_code": "PUMS9"},
  {"id": "product_page_2000350798", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/686/360686.jpg.l2_thumbnail.jpg", "name": "Son Goku: Xeno PUMS8-03 Parallel", "price": "$10.83", "rarity": "03 Parallel", "set_code": "Parallel"},
  {"id": "product_page_2000501185", "imageUrl": "https://tcgrepublic.com/media/binary/000/521/148/521148.jpg.l2_thumbnail.jpg", "name": "Gogeta: GT PUMS13-09", "price": "$10.25", "rarity": "09", "set_code": "PUMS13"},
  {"id": "product_page_2000350804", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/692/360692.jpg.l2_thumbnail.jpg", "name": "Gogeta: GT PUMS6-28 Stamped", "price": "$10.00", "rarity": "28 Stamped", "set_code": "Stamped"},
  {"id": "product_page_2000350840", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/728/360728.jpg.l2_thumbnail.jpg", "name": "Freeza: Reborn PUMS2-07 Stamped", "price": "$9.00", "rarity": "07 Stamped", "set_code": "Stamped"},
  {"id": "product_page_2000351448", "imageUrl": "https://tcgrepublic.com/media/binary/000/361/332/361332.jpg.l2_thumbnail.jpg", "name": "Son Gohan: SH PUMS12-01", "price": "$9.00", "rarity": "01", "set_code": "PUMS12"},
  {"id": "product_page_2000351919", "imageUrl": "https://tcgrepublic.com/media/binary/000/361/803/361803.jpg.l2_thumbnail.jpg", "name": "Vegeta PUMS4-10 Stamped", "price": "$8.81", "rarity": "10 Stamped", "set_code": "Stamped"},
  {"id": "product_page_2000501758", "imageUrl": "https://tcgrepublic.com/media/binary/000/520/573/520573.jpg.l2_thumbnail.jpg", "name": "超フュー PUMS9-02 Reprint", "price": "$8.50", "rarity": "02 Reprint", "set_code": "Reprint"},
  {"id": "product_page_2000351736", "imageUrl": "https://tcgrepublic.com/media/binary/000/361/620/361620.jpg.l2_thumbnail.jpg", "name": "Vegetto PUMS7-03 Stamped", "price": "$8.50", "rarity": "03 Stamped", "set_code": "Stamped"},
  {"id": "product_page_2000350821", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/709/360709.jpg.l2_thumbnail.jpg", "name": "人造人間２１号 PUMS5-10 Stamped", "price": "$8.00", "rarity": "10 Stamped", "set_code": "Stamped"},
  {"id": "product_page_2000351615", "imageUrl": "https://tcgrepublic.com/media/binary/000/361/499/361499.jpg.l2_thumbnail.jpg", "name": "Son Goku: GT PUMS9-26", "price": "$7.78", "rarity": "26", "set_code": "PUMS9"},
  {"id": "product_page_2000350826", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/714/360714.jpg.l2_thumbnail.jpg", "name": "人造人間２１号 PUMS4-22 Stamped", "price": "$7.70", "rarity": "22 Stamped", "set_code": "Stamped"},
  {"id": "product_page_2000501229", "imageUrl": "https://tcgrepublic.com/media/binary/000/521/104/521104.jpg.l2_thumbnail.jpg", "name": "Gogeta PUMS13-23", "price": "$7.25", "rarity": "23", "set_code": "PUMS13"},
  {"id": "product_page_2000351932", "imageUrl": "https://tcgrepublic.com/media/binary/000/361/816/361816.jpg.l2_thumbnail.jpg", "name": "Vegetto PUMS3-28 Stamped", "price": "$7.00", "rarity": "28 Stamped", "set_code": "Stamped"},
  {"id": "product_page_2000350779", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/667/360667.jpg.l2_thumbnail.jpg", "name": "Son Goku PUMS12-06", "price": "$6.75", "rarity": "06", "set_code": "PUMS12"},
  {"id": "product_page_2000350809", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/697/360697.jpg.l2_thumbnail.jpg", "name": "Broly: BR PUMS6-19 Stamped", "price": "$6.60", "rarity": "19 Stamped", "set_code": "Stamped"},
  {"id": "product_page_2000350781", "imageUrl": "https://tcgrepublic.com/media/binary/000/360/669/360669.jpg.l2_thumbnail.jpg", "name": "Piccolo: SH PUMS12-02", "price": "$6.25", "rarity": "02", "set_code": "PUMS12"}
];

const gundam = [
  {"id": "2000601506", "name": "Overflowing Affection GD01-118 Foil", "price": "$1906.48", "imageUrl": "https://tcgrepublic.com/media/binary/000/624/325/624325.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000665122", "name": "Overflowing Affection GD01-118 Foil", "price": "$122.25", "imageUrl": "https://tcgrepublic.com/media/binary/000/693/978/693978.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000717761", "name": "GFreD GD03-035 Foil", "price": "$300.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/751/282/751282.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000601526", "name": "Wing Gundam [XXXG-01W] ST02-001 Foil", "price": "$2477.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/624/302/624302.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000717590", "name": "致命の一撃 ST05-014 SP Foil", "price": "$152.95", "imageUrl": "https://tcgrepublic.com/media/binary/000/751/273/751273.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000665190", "name": "Wing Gundam Zero GD01-024 Foil", "price": "$77.25", "imageUrl": "https://tcgrepublic.com/media/binary/000/693/582/693582.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000660832", "name": "Close Combat ST03-013 C", "price": "$4.75", "imageUrl": "https://tcgrepublic.com/media/binary/000/688/893/688893.webp.l2_thumbnail.jpg", "rarity": "C", "set": "Gundam Card Game"},
  {"id": "2000688343", "name": "GQuuuuuuX(オメガ・サイコミュ起動時) GD02-038 Foil", "price": "$360.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/718/584/718584.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000688333", "name": "ガンダム・バルバトス(第1形態) GD02-054 Foil", "price": "$89.75", "imageUrl": "https://tcgrepublic.com/media/binary/000/718/297/718297.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000717594", "name": "エースの戦い GD01-111 SP Foil", "price": "$127.25", "imageUrl": "https://tcgrepublic.com/media/binary/000/751/267/751267.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000665160", "name": "Marida Cruz GD01-093 Foil", "price": "$77.25", "imageUrl": "https://tcgrepublic.com/media/binary/000/693/552/693552.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000601489", "name": "Suletta Mercury ST01-011 Foil", "price": "$666.67", "imageUrl": "https://tcgrepublic.com/media/binary/000/624/343/624343.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000665185", "name": "Freedom Gundam GD01-065 Foil", "price": "$44.75", "imageUrl": "https://tcgrepublic.com/media/binary/000/693/577/693577.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000665176", "name": "Kshatriya GD01-044 LR Foil", "price": "$24.75", "imageUrl": "https://tcgrepublic.com/media/binary/000/693/568/693568.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000717742", "name": "GQuuuuuuX(オメガ・サイコミュ起動時) GD03-034 LR Foil", "price": "$37.25", "imageUrl": "https://tcgrepublic.com/media/binary/000/751/243/751243.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000665173", "name": "Freedom Gundam GD01-065 LR Foil", "price": "$12.25", "imageUrl": "https://tcgrepublic.com/media/binary/000/693/565/693565.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000717718", "name": "能力の覚醒 GD03-118 Foil", "price": "$52.25", "imageUrl": "https://tcgrepublic.com/media/binary/000/751/219/751219.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000660858", "name": "Sinanju [MSN-06S] ST03-001 LR Foil", "price": "$5.25", "imageUrl": "https://tcgrepublic.com/media/binary/000/688/915/688915.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000717720", "name": "戦技の向上 GD03-109 Foil", "price": "$102.25", "imageUrl": "https://tcgrepublic.com/media/binary/000/751/221/751221.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000665123", "name": "A Show of Resolve GD01-100 Foil", "price": "$64.75", "imageUrl": "https://tcgrepublic.com/media/binary/000/693/781/693781.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000688341", "name": "サイコ・ガンダム GD02-001 Foil", "price": "$18.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/718/305/718305.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000717762", "name": "ケンプファー GD03-017 Foil", "price": "$177.78", "imageUrl": "https://tcgrepublic.com/media/binary/000/751/269/751269.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000665167", "name": "Shenlong Gundam GD01-029 Foil", "price": "$24.75", "imageUrl": "https://tcgrepublic.com/media/binary/000/693/559/693559.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000688332", "name": "ガンダム・グシオンリベイク GD02-055 Foil", "price": "$64.75", "imageUrl": "https://tcgrepublic.com/media/binary/000/718/296/718296.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"},
  {"id": "2000688321", "name": "ガンダム・バルバトス(第1形態) GD02-054 LR Foil", "price": "$46.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/718/285/718285.webp.l2_thumbnail.jpg", "rarity": "Foil", "set": "Gundam Card Game"}
];

const mtg = [
  {"id": "2000655291", "name": "Traveling Chocobo Borderless", "price": "$3752.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/682/377/682377.jpg.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"},
  {"id": "2000277887", "name": "Liliana, Dreadhorde General Foil JPN Alternate Art", "price": "$2355.30", "imageUrl": "https://tcgrepublic.com/media/binary/000/283/704/283704.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000277211", "name": "Time Warp Foil JPN Alternate Art", "price": "$752.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/283/010/283010.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000366187", "name": "Chrome Mox Foil", "price": "$627.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/378/083/378083.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000655049", "name": "Sephiroth, Fabled SOLDIER Foil Borderless", "price": "$449.42", "imageUrl": "https://tcgrepublic.com/media/binary/000/682/697/682697.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000277120", "name": "Counterspell Foil JPN Alternate Art", "price": "$377.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/282/919/282919.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000277428", "name": "Karn, the Great Creator Foil JPN Alternate Art", "price": "$377.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/283/228/283228.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000456255", "name": "Doubling Season Borderless", "price": "$352.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/474/868/474868.jpg.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"},
  {"id": "2000277286", "name": "Tainted Pact Foil JPN Alternate Art", "price": "$315.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/283/085/283085.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000456260", "name": "Doubling Season Borderless (JP)", "price": "$315.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/474/873/474873.jpg.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"},
  {"id": "2000281153", "name": "Demonic Tutor Foil", "price": "$252.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/286/996/286996.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000290937", "name": "Force of Negation Foil Retro Frame", "price": "$252.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/297/053/297053.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000372098", "name": "Sheoldred, the Apocalypse Foil Step-and-Compleat", "price": "$252.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/384/709/384709.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000279478", "name": "Ellywick Tumblestrum Foil Ampersand Card", "price": "$249.14", "imageUrl": "https://tcgrepublic.com/media/binary/000/285/322/285322.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000655620", "name": "Buster Sword Foil Borderless", "price": "$202.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/683/398/683398.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000365844", "name": "Old Gnawbone Foil", "price": "$190.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/377/747/377747.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000455484", "name": "Agatha's Soul Cauldron Foil Extended Art", "price": "$190.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/474/077/474077.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000655114", "name": "Clive, Ifrit's Dominant Foil Surge Foil", "price": "$190.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/682/587/682587.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000655503", "name": "Lightning, Army of One Foil Borderless", "price": "$190.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/683/545/683545.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000268908", "name": "Boseiju, Who Endures Borderless", "price": "$177.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/274/026/274026.png.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"},
  {"id": "2000654997", "name": "Gogo, Master of Mimicry Foil Surge Foil", "price": "$177.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/682/769/682769.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000372099", "name": "Sheoldred, the Apocalypse", "price": "$168.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/384/710/384710.jpg.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"},
  {"id": "2000306855", "name": "Ancient Copper Dragon Foil Showcase", "price": "$152.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/313/170/313170.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000372316", "name": "Atraxa, Grand Unifier Foil Step-and-Compleat", "price": "$152.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/384/927/384927.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000654970", "name": "Y'shtola Rhul Foil Borderless", "price": "$152.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/682/801/682801.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000655464", "name": "Emet-Selch, Unsundered Foil Surge Foil", "price": "$152.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/683/601/683601.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000655661", "name": "Vivi Ornitier Borderless", "price": "$152.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/683/351/683351.jpg.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"},
  {"id": "2000277231", "name": "Mind's Desire Foil JPN Alternate Art", "price": "$127.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/283/030/283030.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000455485", "name": "Agatha's Soul Cauldron Extended Art", "price": "$127.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/474/078/474078.jpg.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"},
  {"id": "2000655110", "name": "Kefka, Court Mage Foil Surge Foil", "price": "$127.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/683/534/683534.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000277162", "name": "Ephemerate Foil JPN Alternate Art", "price": "$115.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/282/961/282961.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000277197", "name": "Dark Ritual Foil JPN Alternate Art", "price": "$115.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/282/996/282996.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000655614", "name": "Yuna, Hope of Spira Foil Borderless", "price": "$108.75", "imageUrl": "https://tcgrepublic.com/media/binary/000/683/404/683404.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000286991", "name": "Ragavan, Nimble Pilferer Foil", "price": "$102.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/282/919/282919.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000288959", "name": "Urza's Saga Sketch", "price": "$102.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/295/076/295076.png.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"},
  {"id": "2000290341", "name": "Gemstone Caverns", "price": "$102.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/296/457/296457.png.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"},
  {"id": "2000654906", "name": "Summon: Bahamut Borderless", "price": "$102.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/682/185/682185.jpg.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"},
  {"id": "2000287674", "name": "Urza's Saga", "price": "$93.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/293/791/293791.png.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"},
  {"id": "2000268890", "name": "Otawara, Soaring City Foil Extended Art", "price": "$90.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/274/008/274008.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000277139", "name": "Teferi's Protection JPN Alternate Art", "price": "$90.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/282/938/282938.png.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"},
  {"id": "2000277363", "name": "Lightning Helix Foil JPN Alternate Art", "price": "$90.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/283/162/283162.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000293265", "name": "The Ozolith", "price": "$90.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/299/462/299462.png.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"},
  {"id": "2000365726", "name": "Purphoros, God of the Forge Foil", "price": "$90.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/377/629/377629.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000655275", "name": "Traveling Chocobo Foil Borderless", "price": "$90.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/682/397/682397.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000365957", "name": "Athreos, God of Passage Foil", "price": "$83.75", "imageUrl": "https://tcgrepublic.com/media/binary/000/377/858/377858.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000366040", "name": "Iroas, God of Victory Foil", "price": "$83.75", "imageUrl": "https://tcgrepublic.com/media/binary/000/377/939/377939.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000655613", "name": "Yuna, Hope of Spira Foil Borderless (EN)", "price": "$83.75", "imageUrl": "https://tcgrepublic.com/media/binary/000/683/405/683405.jpg.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000293667", "name": "Biollante, Plant Beast Form Foil", "price": "$80.00", "imageUrl": "https://tcgrepublic.com/media/binary/000/299/866/299866.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000277414", "name": "Ugin, the Ineffable Foil JPN Alternate Art", "price": "$77.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/283/214/283214.png.l2_thumbnail.jpg", "rarity": "Foil", "set": "Magic: The Gathering"},
  {"id": "2000289126", "name": "Solitude", "price": "$77.50", "imageUrl": "https://tcgrepublic.com/media/binary/000/295/243/295243.png.l2_thumbnail.jpg", "rarity": "Normal", "set": "Magic: The Gathering"}
];

function transform(card, category) {
  let priceStr = card.price.replace('$', '').replace(',', '');
  let price = parseFloat(priceStr);
  return {
    id: card.id.startsWith('product_page_') ? card.id.replace('product_page_', 'tcg-') : `tcg-${card.id}`,
    name: card.name,
    category: 'other',
    price: price,
    image: card.imageUrl,
    description: `${card.name} - Official ${category} TCG card from TCGRepublic. High-fidelity collectable.`,
    stock: Math.floor(Math.random() * 10) + 1,
    set: card.set || card.set_code || 'TCGRepublic Import',
    rarity: card.rarity || 'Super Rare',
    condition: 'NM',
    language: 'Japanese',
    cardType: category,
    featured: price > 500
  };
}

const finalDragonBall = dragonBall.map(c => transform(c, 'Dragon Ball'));
const finalGundam = gundam.map(c => transform(c, 'Gundam'));
const finalMTG = mtg.map(c => transform(c, 'Magic: The Gathering'));

fs.writeFileSync('cards_output.json', JSON.stringify({
  dragonBall: finalDragonBall,
  gundam: finalGundam,
  mtg: finalMTG
}, null, 2));
