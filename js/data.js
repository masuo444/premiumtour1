// 仮想日本酒データベース
const sakeData = [
    {
        id: 1,
        name: {
            ja: "龍神の雫",
            en: "Dragon's Tears",
            fr: "Larmes du Dragon",
            zh: "龙神之滴"
        },
        brewery: {
            ja: "天龍酒造",
            en: "Tenryu Brewery",
            fr: "Brasserie Tenryu",
            zh: "天龙酒造"
        },
        type: {
            ja: "純米大吟醸",
            en: "Junmai Daiginjo",
            fr: "Junmai Daiginjo",
            zh: "纯米大吟酿"
        },
        price: 25000,
        alcohol: 16.5,
        ricePalish: 23,
        riceType: {
            ja: "山田錦",
            en: "Yamada Nishiki",
            fr: "Yamada Nishiki",
            zh: "山田锦"
        },
        description: {
            ja: "最高級の山田錦を23%まで磨き上げた、まさに芸術品と言える逸品。龍神の伝説が息づく清らかな湧き水で仕込まれた、気品ある香りと深い味わいが特徴。",
            en: "A masterpiece crafted from the finest Yamada Nishiki rice polished to 23%. Brewed with pristine spring water from the legendary Dragon God's mountain, offering elegant aroma and profound depth.",
            fr: "Chef-d'œuvre élaboré à partir du meilleur riz Yamada Nishiki poli à 23%. Brassé avec l'eau de source pure de la montagne légendaire du Dieu Dragon, offrant un arôme élégant et une profondeur remarquable.",
            zh: "采用最上等的山田锦精米至23%，堪称艺术品。用传说中龙神山的清澈泉水酿造，香气典雅，口感深邃。"
        },
        tastingNotes: {
            ja: "上品な花の香り、絹のような口当たり、長い余韻",
            en: "Elegant floral aroma, silky mouthfeel, lingering finish",
            fr: "Arôme floral élégant, texture soyeuse, finale persistante",
            zh: "优雅花香，丝滑口感，余韵悠长"
        },
        awards: {
            ja: "国際酒類品評会 最高金賞受賞",
            en: "Supreme Gold Medal - International Wine & Spirit Competition",
            fr: "Médaille d'Or Suprême - Concours International des Vins et Spiritueux",
            zh: "国际酒类品评会最高金奖"
        },
        region: {
            ja: "兵庫県",
            en: "Hyogo Prefecture",
            fr: "Préfecture de Hyogo",
            zh: "兵库县"
        },
        limited: true,
        inStock: 12
    },
    {
        id: 2,
        name: {
            ja: "月光美人",
            en: "Moonlight Beauty",
            fr: "Beauté Clair de Lune",
            zh: "月光美人"
        },
        brewery: {
            ja: "月輪酒造",
            en: "Getsurin Brewery",
            fr: "Brasserie Getsurin",
            zh: "月轮酒造"
        },
        type: {
            ja: "純米大吟醸",
            en: "Junmai Daiginjo",
            fr: "Junmai Daiginjo",
            zh: "纯米大吟酿"
        },
        price: 18000,
        alcohol: 15.8,
        ricePalish: 35,
        riceType: {
            ja: "雄町",
            en: "Omachi",
            fr: "Omachi",
            zh: "雄町"
        },
        description: {
            ja: "満月の夜にのみ仕込まれる神秘的な日本酒。希少な雄町米を使用し、月光のように透明で美しい味わいを実現。女性杜氏による繊細な技術が光る。",
            en: "A mystical sake brewed only on full moon nights. Made with rare Omachi rice, achieving a transparent and beautiful taste like moonlight. Crafted by a female toji with delicate techniques.",
            fr: "Un saké mystique brassé uniquement les nuits de pleine lune. Fait avec du riz Omachi rare, obtenant un goût transparent et beau comme la lumière de la lune. Élaboré par une toji féminine avec des techniques délicates.",
            zh: "仅在满月之夜酿造的神秘日本酒。使用稀有的雄町米，呈现如月光般透明美丽的口感。由女性杜氏以精湛技艺酿造。"
        },
        tastingNotes: {
            ja: "白桃の香り、優しい甘み、爽やかな酸味",
            en: "White peach aroma, gentle sweetness, refreshing acidity",
            fr: "Arôme de pêche blanche, douceur délicate, acidité rafraîchissante",
            zh: "白桃香气，温和甜味，清爽酸度"
        },
        awards: {
            ja: "全国新酒鑑評会 金賞受賞",
            en: "Gold Medal - National New Sake Competition",
            fr: "Médaille d'Or - Concours National des Nouveaux Sakés",
            zh: "全国新酒鉴评会金奖"
        },
        region: {
            ja: "岡山県",
            en: "Okayama Prefecture",
            fr: "Préfecture d'Okayama",
            zh: "冈山县"
        },
        limited: true,
        inStock: 25
    },
    {
        id: 3,
        name: {
            ja: "武士の誉",
            en: "Samurai's Honor",
            fr: "Honneur du Samouraï",
            zh: "武士之荣"
        },
        brewery: {
            ja: "武蔵野酒造",
            en: "Musashino Brewery",
            fr: "Brasserie Musashino",
            zh: "武藏野酒造"
        },
        type: {
            ja: "純米吟醸",
            en: "Junmai Ginjo",
            fr: "Junmai Ginjo",
            zh: "纯米吟酿"
        },
        price: 12000,
        alcohol: 16.2,
        ricePalish: 50,
        riceType: {
            ja: "五百万石",
            en: "Gohyakumangoku",
            fr: "Gohyakumangoku",
            zh: "五百万石"
        },
        description: {
            ja: "400年の歴史を持つ名門酒蔵が誇る伝統の味。武士道精神を体現する力強く潔い味わい。厳選された五百万石を使用し、男らしい骨格と上品な香りを併せ持つ。",
            en: "Traditional taste from a prestigious brewery with 400 years of history. Embodies the bushido spirit with a strong and clean flavor. Made with carefully selected Gohyakumangoku rice, combining masculine structure with elegant aroma.",
            fr: "Goût traditionnel d'une brasserie prestigieuse avec 400 ans d'histoire. Incarne l'esprit bushido avec une saveur forte et pure. Fait avec du riz Gohyakumangoku soigneusement sélectionné, combinant structure masculine et arôme élégant.",
            zh: "拥有400年历史的名门酒造的传统口味。体现武士道精神，口感强劲纯净。使用精选五百万石米，兼具男性化结构和优雅香气。"
        },
        tastingNotes: {
            ja: "力強い米の香り、辛口でキレの良い味わい",
            en: "Powerful rice aroma, dry and crisp taste",
            fr: "Arôme de riz puissant, goût sec et vif",
            zh: "浓郁米香，辛口爽脆"
        },
        awards: {
            ja: "IWC SAKE部門 ブロンズ賞",
            en: "Bronze Medal - IWC SAKE Division",
            fr: "Médaille de Bronze - Division SAKE IWC",
            zh: "IWC清酒部门铜奖"
        },
        region: {
            ja: "新潟県",
            en: "Niigata Prefecture",
            fr: "Préfecture de Niigata",
            zh: "新潟县"
        },
        limited: false,
        inStock: 50
    },
    {
        id: 4,
        name: {
            ja: "桜舞",
            en: "Cherry Blossom Dance",
            fr: "Danse des Fleurs de Cerisier",
            zh: "樱花舞"
        },
        brewery: {
            ja: "桜山酒造",
            en: "Sakurayama Brewery",
            fr: "Brasserie Sakurayama",
            zh: "樱山酒造"
        },
        type: {
            ja: "純米",
            en: "Junmai",
            fr: "Junmai",
            zh: "纯米"
        },
        price: 8000,
        alcohol: 15.5,
        ricePalish: 60,
        riceType: {
            ja: "コシヒカリ",
            en: "Koshihikari",
            fr: "Koshihikari",
            zh: "越光米"
        },
        description: {
            ja: "桜の名所として知られる地域の酒蔵が、春の訪れを表現した季節限定酒。桜の花びらのような淡いピンクの色合いと、花のような華やかな香りが特徴。",
            en: "A seasonal limited sake expressing the arrival of spring by a brewery in a region famous for cherry blossoms. Features a pale pink hue like cherry petals and floral fragrance.",
            fr: "Un saké saisonnier limité exprimant l'arrivée du printemps par une brasserie dans une région célèbre pour les fleurs de cerisier. Présente une teinte rose pâle comme les pétales de cerisier et un parfum floral.",
            zh: "位于樱花名胜地区的酒造表现春天到来的季节限定酒。具有樱花花瓣般的淡粉色调和花香。"
        },
        tastingNotes: {
            ja: "桜の花の香り、まろやかな甘み、上品な余韻",
            en: "Cherry blossom aroma, mellow sweetness, elegant finish",
            fr: "Arôme de fleur de cerisier, douceur moelleuse, finale élégante",
            zh: "樱花香气，温和甜味，优雅余韵"
        },
        awards: {
            ja: "地域酒類品評会 特別賞",
            en: "Special Award - Regional Sake Competition",
            fr: "Prix Spécial - Concours Régional de Saké",
            zh: "地区酒类品评会特别奖"
        },
        region: {
            ja: "京都府",
            en: "Kyoto Prefecture",
            fr: "Préfecture de Kyoto",
            zh: "京都府"
        },
        limited: true,
        inStock: 30,
        seasonal: "spring"
    },
    {
        id: 5,
        name: {
            ja: "雪国の詩",
            en: "Snow Country Poem",
            fr: "Poème du Pays des Neiges",
            zh: "雪国之诗"
        },
        brewery: {
            ja: "雪見酒造",
            en: "Yukimi Brewery",
            fr: "Brasserie Yukimi",
            zh: "雪见酒造"
        },
        type: {
            ja: "大吟醸",
            en: "Daiginjo",
            fr: "Daiginjo",
            zh: "大吟酿"
        },
        price: 15000,
        alcohol: 17.0,
        ricePalish: 40,
        riceType: {
            ja: "美山錦",
            en: "Miyama Nishiki",
            fr: "Miyama Nishiki",
            zh: "美山锦"
        },
        description: {
            ja: "雪深い山間の蔵で、雪解け水を使って仕込まれる純白の大吟醸。極寒の中で長期間発酵させることで生まれる、透明感のある味わいと高貴な香り。",
            en: "A pure white daiginjo brewed with snowmelt water in a deep mountain brewery. Created through long fermentation in extreme cold, producing transparent taste and noble aroma.",
            fr: "Un daiginjo blanc pur brassé avec l'eau de fonte des neiges dans une brasserie de montagne profonde. Créé par une fermentation longue dans un froid extrême, produisant un goût transparent et un arôme noble.",
            zh: "在深山酒造用雪融水酿造的纯白大吟酿。通过在极寒中长期发酵，产生透明的口感和高贵的香气。"
        },
        tastingNotes: {
            ja: "雪のような清涼感、繊細な甘み、凛とした後味",
            en: "Snow-like freshness, delicate sweetness, crisp aftertaste",
            fr: "Fraîcheur semblable à la neige, douceur délicate, arrière-goût vif",
            zh: "雪般清爽，精致甜味，清冽回味"
        },
        awards: {
            ja: "雪国酒類コンクール 最優秀賞",
            en: "Excellence Award - Snow Country Sake Contest",
            fr: "Prix d'Excellence - Concours de Saké du Pays des Neiges",
            zh: "雪国酒类竞赛最优秀奖"
        },
        region: {
            ja: "山形県",
            en: "Yamagata Prefecture",
            fr: "Préfecture de Yamagata",
            zh: "山形县"
        },
        limited: false,
        inStock: 40
    },
    {
        id: 6,
        name: {
            ja: "海神の恵み",
            en: "Ocean God's Blessing",
            fr: "Bénédiction du Dieu des Océans",
            zh: "海神之恩"
        },
        brewery: {
            ja: "潮風酒造",
            en: "Shiokaze Brewery",
            fr: "Brasserie Shiokaze",
            zh: "潮风酒造"
        },
        type: {
            ja: "純米大吟醸",
            en: "Junmai Daiginjo",
            fr: "Junmai Daiginjo",
            zh: "纯米大吟酿"
        },
        price: 22000,
        alcohol: 16.8,
        ricePalish: 30,
        riceType: {
            ja: "亀の尾",
            en: "Kame no O",
            fr: "Kame no O",
            zh: "龟尾"
        },
        description: {
            ja: "海辺の蔵で潮風を受けながら熟成される希少な日本酒。古代米「亀の尾」を使用し、海の恵みを表現した深みのある味わい。ミネラル豊富な地下水が決め手。",
            en: "A rare sake aged in a seaside brewery while receiving ocean breezes. Made with ancient rice 'Kame no O', expressing the ocean's blessing with deep flavor. Mineral-rich groundwater is the key.",
            fr: "Un saké rare vieilli dans une brasserie en bord de mer tout en recevant les brises océaniques. Fait avec du riz ancien 'Kame no O', exprimant la bénédiction de l'océan avec une saveur profonde. L'eau souterraine riche en minéraux est la clé.",
            zh: "在海边酒造接受海风熟成的稀有日本酒。使用古代米'龟尾'，表现海之恩惠的深邃口感。富含矿物质的地下水是关键。"
        },
        tastingNotes: {
            ja: "潮の香り、深いコク、ミネラル感",
            en: "Ocean aroma, deep richness, mineral notes",
            fr: "Arôme océanique, richesse profonde, notes minérales",
            zh: "海潮香气，深邃浓郁，矿物质感"
        },
        awards: {
            ja: "海外酒類コンペティション グランプリ",
            en: "Grand Prix - International Sake Competition",
            fr: "Grand Prix - Compétition Internationale de Saké",
            zh: "海外酒类竞赛大奖"
        },
        region: {
            ja: "石川県",
            en: "Ishikawa Prefecture",
            fr: "Préfecture d'Ishikawa",
            zh: "石川县"
        },
        limited: true,
        inStock: 18
    },
    {
        id: 7,
        name: {
            ja: "金閣雅",
            en: "Golden Pavilion Elegance",
            fr: "Élégance du Pavillon Doré",
            zh: "金阁雅致"
        },
        brewery: {
            ja: "金閣酒造",
            en: "Kinkaku Brewery",
            fr: "Brasserie Kinkaku",
            zh: "金阁酒造"
        },
        type: {
            ja: "純米大吟醸",
            en: "Junmai Daiginjo",
            fr: "Junmai Daiginjo",
            zh: "纯米大吟酿"
        },
        price: 30000,
        alcohol: 16.0,
        ricePalish: 18,
        riceType: {
            ja: "特A山田錦",
            en: "Special A Yamada Nishiki",
            fr: "Yamada Nishiki Spécial A",
            zh: "特A级山田锦"
        },
        description: {
            ja: "金閣寺の近くに位置する老舗酒蔵の最高峰。特A地区の山田錦を18%まで磨き上げ、金箔を浮かべた豪華絢爛な逸品。皇室御用達の格式高い味わい。",
            en: "The pinnacle creation from a historic brewery near Kinkaku-ji Temple. Made with Special A grade Yamada Nishiki polished to 18%, this luxurious masterpiece floats with gold leaf. A dignified taste approved by the Imperial Family.",
            fr: "La création ultime d'une brasserie historique près du temple Kinkaku-ji. Fait avec du riz Yamada Nishiki grade A spécial poli à 18%, ce chef-d'œuvre luxueux flotte avec des feuilles d'or. Un goût digne approuvé par la Famille Impériale.",
            zh: "位于金阁寺附近的老字号酒造的巅峰之作。使用特A级山田锦精米至18%，飘浮金箔的豪华杰作。皇室御用的高格调口感。"
        },
        tastingNotes: {
            ja: "華やかな吟醸香、極上の甘み、黄金のような余韻",
            en: "Gorgeous ginjo aroma, supreme sweetness, golden aftertaste",
            fr: "Arôme ginjo somptueux, douceur suprême, arrière-goût doré",
            zh: "华丽吟酿香，极致甜味，黄金般余韵"
        },
        awards: {
            ja: "皇室献上酒認定、世界酒類品評会 プラチナ賞",
            en: "Imperial Dedication Sake Certified, Platinum Award - World Sake Awards",
            fr: "Saké de Dédicace Impériale Certifié, Prix Platine - Prix Mondial du Saké",
            zh: "皇室献上酒认定，世界酒类品评会白金奖"
        },
        region: {
            ja: "京都府",
            en: "Kyoto Prefecture",
            fr: "Préfecture de Kyoto",
            zh: "京都府"
        },
        limited: true,
        inStock: 8
    },
    {
        id: 8,
        name: {
            ja: "森の囁き",
            en: "Forest Whisper",
            fr: "Murmure de la Forêt",
            zh: "森林低语"
        },
        brewery: {
            ja: "深山酒造",
            en: "Miyama Brewery",
            fr: "Brasserie Miyama",
            zh: "深山酒造"
        },
        type: {
            ja: "純米吟醸",
            en: "Junmai Ginjo",
            fr: "Junmai Ginjo",
            zh: "纯米吟酿"
        },
        price: 10000,
        alcohol: 15.2,
        ricePalish: 55,
        riceType: {
            ja: "出羽燦々",
            en: "Dewa Sansan",
            fr: "Dewa Sansan",
            zh: "出羽灿灿"
        },
        description: {
            ja: "原生林に囲まれた山奥の蔵で、自然の恵みを受けて醸される神秘的な日本酒。樹齢100年を超える杉の木桶で仕込まれ、森の香りが漂う独特の風味。",
            en: "A mystical sake brewed in a mountain brewery surrounded by primeval forest, blessed by nature's gifts. Fermented in century-old cedar wooden vats, offering unique flavors with forest aromas.",
            fr: "Un saké mystique brassé dans une brasserie de montagne entourée de forêt primitive, béni par les dons de la nature. Fermenté dans des cuves en cèdre centenaires, offrant des saveurs uniques avec des arômes de forêt.",
            zh: "在被原始森林包围的深山酒造，受自然恩惠酿造的神秘日本酒。在树龄超过100年的杉木桶中发酵，带有森林香气的独特风味。"
        },
        tastingNotes: {
            ja: "木の香り、自然な甘み、大地の力強さ",
            en: "Woody aroma, natural sweetness, earthy strength",
            fr: "Arôme boisé, douceur naturelle, force terrienne",
            zh: "木香，自然甜味，大地力量"
        },
        awards: {
            ja: "エコ酒類コンテスト 最優秀賞",
            en: "Excellence Award - Eco Sake Contest",
            fr: "Prix d'Excellence - Concours de Saké Écologique",
            zh: "生态酒类竞赛最优秀奖"
        },
        region: {
            ja: "秋田県",
            en: "Akita Prefecture",
            fr: "Préfecture d'Akita",
            zh: "秋田县"
        },
        limited: false,
        inStock: 35
    },
    {
        id: 9,
        name: {
            ja: "天空の舞",
            en: "Celestial Dance",
            fr: "Danse Céleste",
            zh: "天空之舞"
        },
        brewery: {
            ja: "雲上酒造",
            en: "Unjo Brewery",
            fr: "Brasserie Unjo",
            zh: "云上酒造"
        },
        type: {
            ja: "純米大吟醸",
            en: "Junmai Daiginjo",
            fr: "Junmai Daiginjo",
            zh: "纯米大吟酿"
        },
        price: 20000,
        alcohol: 16.5,
        ricePalish: 35,
        riceType: {
            ja: "祭り晴",
            en: "Matsuri Bare",
            fr: "Matsuri Bare",
            zh: "祭晴"
        },
        description: {
            ja: "標高1000メートルの高地にある蔵で、雲海を望みながら醸される幻想的な日本酒。希少な酒米「祭り晴」を使用し、天空の清らかさを表現した透明感のある味わい。",
            en: "A fantastical sake brewed at 1000 meters altitude, overlooking a sea of clouds. Made with rare sake rice 'Matsuri Bare', expressing the purity of heaven with transparent taste.",
            fr: "Un saké fantastique brassé à 1000 mètres d'altitude, surplombant une mer de nuages. Fait avec du riz à saké rare 'Matsuri Bare', exprimant la pureté du ciel avec un goût transparent.",
            zh: "在海拔1000米的高地酒造，俯瞰云海酿造的幻想日本酒。使用稀有酒米'祭晴'，表现天空纯净的透明口感。"
        },
        tastingNotes: {
            ja: "高原の風の香り、軽やかな甘み、雲のような柔らかさ",
            en: "Highland breeze aroma, light sweetness, cloud-like softness",
            fr: "Arôme de brise des hautes terres, douceur légère, douceur comme un nuage",
            zh: "高原微风香气，轻盈甜味，云朵般柔和"
        },
        awards: {
            ja: "高地酒類品評会 特別功労賞",
            en: "Special Merit Award - Highland Sake Competition",
            fr: "Prix de Mérite Spécial - Concours de Saké des Hautes Terres",
            zh: "高地酒类品评会特别功劳奖"
        },
        region: {
            ja: "長野県",
            en: "Nagano Prefecture",
            fr: "Préfecture de Nagano",
            zh: "长野县"
        },
        limited: true,
        inStock: 22
    },
    {
        id: 10,
        name: {
            ja: "紅葉の舞",
            en: "Autumn Leaves Dance",
            fr: "Danse des Feuilles d'Automne",
            zh: "红叶之舞"
        },
        brewery: {
            ja: "紅葉谷酒造",
            en: "Momijidani Brewery",
            fr: "Brasserie Momijidani",
            zh: "红叶谷酒造"
        },
        type: {
            ja: "純米",
            en: "Junmai",
            fr: "Junmai",
            zh: "纯米"
        },
        price: 9000,
        alcohol: 15.8,
        ricePalish: 65,
        riceType: {
            ja: "ひとごこち",
            en: "Hitogokochi",
            fr: "Hitogokochi",
            zh: "一心"
        },
        description: {
            ja: "紅葉の名所で有名な渓谷にある蔵で、秋の深まりとともに醸される季節の日本酒。紅葉のように美しい琥珀色と、秋の実りを表現した豊かな味わいが特徴。",
            en: "A seasonal sake brewed in a brewery located in a valley famous for autumn leaves, crafted as autumn deepens. Features beautiful amber color like autumn leaves and rich flavor expressing autumn's bounty.",
            fr: "Un saké saisonnier brassé dans une brasserie située dans une vallée célèbre pour ses feuilles d'automne, élaboré à mesure que l'automne s'approfondit. Présente une belle couleur ambrée comme les feuilles d'automne et une saveur riche exprimant l'abondance de l'automne.",
            zh: "位于红叶名胜峡谷的酒造，随着秋意渐浓酿造的季节日本酒。具有红叶般美丽的琥珀色和表现秋收的丰富口感。"
        },
        tastingNotes: {
            ja: "栗の香り、深い旨み、温かみのある後味",
            en: "Chestnut aroma, deep umami, warm aftertaste",
            fr: "Arôme de châtaigne, umami profond, arrière-goût chaleureux",
            zh: "栗子香气，深邃鲜味，温暖回味"
        },
        awards: {
            ja: "秋季酒類フェスティバル 人気投票1位",
            en: "1st Place Popular Vote - Autumn Sake Festival",
            fr: "1ère Place Vote Populaire - Festival d'Automne du Saké",
            zh: "秋季酒类节人气投票第一名"
        },
        region: {
            ja: "群馬県",
            en: "Gunma Prefecture",
            fr: "Préfecture de Gunma",
            zh: "群马县"
        },
        limited: true,
        inStock: 45,
        seasonal: "autumn"
    }
];

// カテゴリとフィルタ用のデータ
const categories = {
    type: {
        ja: ["純米大吟醸", "純米吟醸", "純米", "大吟醸"],
        en: ["Junmai Daiginjo", "Junmai Ginjo", "Junmai", "Daiginjo"],
        fr: ["Junmai Daiginjo", "Junmai Ginjo", "Junmai", "Daiginjo"],
        zh: ["纯米大吟酿", "纯米吟酿", "纯米", "大吟酿"]
    },
    price: {
        ranges: [
            { min: 0, max: 10000, label: { ja: "〜¥10,000", en: "~¥10,000", fr: "~¥10,000", zh: "~¥10,000" }},
            { min: 10000, max: 20000, label: { ja: "¥10,000-¥20,000", en: "¥10,000-¥20,000", fr: "¥10,000-¥20,000", zh: "¥10,000-¥20,000" }},
            { min: 20000, max: 100000, label: { ja: "¥20,000〜", en: "¥20,000~", fr: "¥20,000~", zh: "¥20,000~" }}
        ]
    },
    region: {
        ja: ["兵庫県", "岡山県", "新潟県", "京都府", "山形県", "石川県", "秋田県", "長野県", "群馬県"],
        en: ["Hyogo", "Okayama", "Niigata", "Kyoto", "Yamagata", "Ishikawa", "Akita", "Nagano", "Gunma"],
        fr: ["Hyogo", "Okayama", "Niigata", "Kyoto", "Yamagata", "Ishikawa", "Akita", "Nagano", "Gunma"],
        zh: ["兵库", "冈山", "新潟", "京都", "山形", "石川", "秋田", "长野", "群马"]
    }
};

// 翻訳用テキスト
const translations = {
    ja: {
        title: "プレミアム日本酒コレクション",
        subtitle: "世界最高峰の日本酒を貴方に",
        searchPlaceholder: "銘柄名・酒蔵・地域で検索",
        filterAll: "すべて",
        filterType: "種類",
        filterPrice: "価格",
        filterRegion: "地域",
        limited: "限定品",
        inStock: "在庫",
        outOfStock: "在庫切れ",
        addToCart: "カートに追加",
        viewDetails: "詳細を見る",
        aiSommelier: "AI酒ソムリエに相談",
        currency: "¥",
        bottles: "本",
        alcohol: "アルコール度数",
        ricePalish: "精米歩合",
        riceType: "使用米",
        awards: "受賞歴",
        tastingNotes: "テイスティングノート",
        brewery: "酒蔵",
        region: "地域"
    },
    en: {
        title: "Premium Sake Collection",
        subtitle: "World's Finest Sake for Connoisseurs",
        searchPlaceholder: "Search by name, brewery, or region",
        filterAll: "All",
        filterType: "Type",
        filterPrice: "Price",
        filterRegion: "Region",
        limited: "Limited Edition",
        inStock: "In Stock",
        outOfStock: "Out of Stock",
        addToCart: "Add to Cart",
        viewDetails: "View Details",
        aiSommelier: "Ask AI Sommelier",
        currency: "¥",
        bottles: "bottles",
        alcohol: "Alcohol",
        ricePalish: "Rice Polish",
        riceType: "Rice Type",
        awards: "Awards",
        tastingNotes: "Tasting Notes",
        brewery: "Brewery",
        region: "Region"
    },
    fr: {
        title: "Collection Premium de Saké",
        subtitle: "Les Meilleurs Sakés du Monde pour Connaisseurs",
        searchPlaceholder: "Rechercher par nom, brasserie ou région",
        filterAll: "Tous",
        filterType: "Type",
        filterPrice: "Prix",
        filterRegion: "Région",
        limited: "Édition Limitée",
        inStock: "En Stock",
        outOfStock: "Rupture de Stock",
        addToCart: "Ajouter au Panier",
        viewDetails: "Voir Détails",
        aiSommelier: "Demander à l'IA Sommelier",
        currency: "¥",
        bottles: "bouteilles",
        alcohol: "Alcool",
        ricePalish: "Polissage du Riz",
        riceType: "Type de Riz",
        awards: "Récompenses",
        tastingNotes: "Notes de Dégustation",
        brewery: "Brasserie",
        region: "Région"
    },
    zh: {
        title: "顶级日本酒收藏",
        subtitle: "为鉴赏家呈现世界最顶级日本酒",
        searchPlaceholder: "按名称、酒造或地区搜索",
        filterAll: "全部",
        filterType: "类型",
        filterPrice: "价格",
        filterRegion: "地区",
        limited: "限定版",
        inStock: "有库存",
        outOfStock: "缺货",
        addToCart: "加入购物车",
        viewDetails: "查看详情",
        aiSommelier: "咨询AI侍酒师",
        currency: "¥",
        bottles: "瓶",
        alcohol: "酒精度",
        ricePalish: "精米步合",
        riceType: "使用米",
        awards: "获奖记录",
        tastingNotes: "品酒笔记",
        brewery: "酒造",
        region: "地区"
    }
};