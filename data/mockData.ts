import { Listing, Garage, Article, BikeModel, Review, Tip, TechSpec } from '../types';

// --- SHARED DATA CONSTANTS ---

export const brandsMoto = [
  "Yamaha", "Honda", "Kawasaki", "BMW", "KTM", "Suzuki", "Ducati", "Triumph", 
  "Sym", "Piaggio", "Peugeot", "Aprilia", "Benelli", "Zontes", "Kymco", 
  "CF Moto", "Voge", "Keeway", "MBK", "Haojue", "Lifan", "Loncin", "Dayun", "Autre"
];

export const mockModels = [
  // Yamaha
  "MT-07", "MT-09", "TMAX 530", "TMAX 560", "XMAX 125", "XMAX 300", "R1", "R6", "Tenere 700", "Tracer 900", "NMAX", "Aerox", "BW'S", "Neo'S", "Cygnus",
  // Honda
  "X-ADV", "Forza 300", "Forza 350", "Forza 750", "Africa Twin", "CB650R", "CBR1000RR", "PCX 125", "SH 125", "SH 150", "SH 300", "Vision 110", "Hornet 750",
  // Kawasaki
  "Z900", "Z650", "Z1000", "Versys 650", "Ninja 400", "Ninja 650", "Ninja ZX-10R",
  // BMW
  "R 1200 GS", "R 1250 GS", "R 1300 GS", "F 850 GS", "S 1000 RR", "R 18", "C 400 X", "C 400 GT", "C 650 Sport", "F 900 R",
  // KTM
  "Duke 125", "Duke 390", "Duke 790", "Adventure 390", "Super Duke 1290", "RC 390",
  // Triumph
  "Street Triple 675", "Street Triple 765", "Bonneville T100", "Bonneville T120", "Tiger 800", "Tiger 900",
  // Ducati
  "Scrambler 800", "Monster 821", "Monster 937", "Panigale V4", "Multistrada V4", "Diavel",
  // Piaggio / Vespa
  "Vespa GTS 300", "Vespa Primavera", "Vespa Sprint", "Beverly 300", "Beverly 400", "Liberty 125", "Medley 125", "Zip 50", "Typhoon", "MP3 500",
  // SYM
  "Fiddle II", "Fiddle III", "Fiddle 4", "Symphony ST", "Symphony SR", "Jet 14", "Jet X", "Orbit II", "Orbit III", "Cruisym", "Joyride", "ADX 125",
  // Peugeot
  "Kisbee", "Tweet", "Django", "Metropolis", "XP400",
  // Zontes
  "350 E", "350 D", "310 M", "125 M", "ZT 310-T", "ZT 125-G1",
  // Kymco
  "Agility 125", "Agility 16+", "AK 550", "Downtown 350", "X-Town 300", "Like 125",
  // CF Moto
  "450 SR", "650 NK", "800 MT", "700 CL-X", "250 NK", "300 SR",
  // Keeway
  "RKF 125", "Superlight 125", "K-Light", "Vieste 300",
  // Voge
  "500 DS", "300 AC", "650 DSX",
  // MBK (Très populaire en Tunisie)
  "Nitro", "Booster", "Ovetto", "Stunt",
  // Haojue / Lifan / Loncin (Utilitaire)
  "Haojue KA 150", "Haojue Lindy", "Lifan KPV 150", "Loncin CR5", "Dayun 150"
];

export const modelsByBrand: Record<string, string[]> = {
  "Yamaha": ["TMAX 560", "TMAX 530", "XMAX 300", "XMAX 125", "MT-07", "MT-09", "MT-10", "R1", "R6", "Tenere 700", "Tracer 900", "NMAX", "Aerox", "BW'S", "Neo'S", "Cygnus"],
  "Honda": ["Forza 750", "Forza 350", "Forza 300", "X-ADV", "SH 300", "SH 150", "SH 125", "PCX 125", "Africa Twin", "CB650R", "CBR1000RR", "Vision 110", "Hornet 750"],
  "Kawasaki": ["Z900", "Z650", "Z1000", "Versys 650", "Ninja 400", "Ninja 650", "Ninja ZX-10R", "Vulcan S"],
  "BMW": ["R 1300 GS", "R 1250 GS", "R 1200 GS", "F 850 GS", "S 1000 RR", "C 400 GT", "C 400 X", "C 650 Sport", "F 900 R", "R 18"],
  "KTM": ["Duke 390", "Duke 125", "Duke 790", "Super Duke 1290", "Adventure 390", "Adventure 790", "RC 390"],
  "Suzuki": ["GSX-R 1000", "GSX-R 600", "V-Strom 650", "Burgman 400", "Burgman 650", "SV 650", "Hayabusa"],
  "Ducati": ["Monster 937", "Monster 821", "Scrambler 800", "Panigale V4", "Multistrada V4", "Diavel", "Hypermotard"],
  "Triumph": ["Street Triple 765", "Street Triple 675", "Bonneville T120", "Bonneville T100", "Tiger 900", "Tiger 800", "Speed Triple"],
  "Sym": ["Fiddle 4", "Fiddle III", "Fiddle II", "Symphony ST", "Symphony SR", "Orbit III", "Orbit II", "Jet 14", "Jet X", "Cruisym", "ADX 125", "Joyride", "Maxsym TL"],
  "Piaggio": ["Beverly 400", "Beverly 300", "Liberty 125", "Medley 125", "Zip 50", "Typhoon", "MP3 500", "Fly 125"],
  "Peugeot": ["Kisbee", "Tweet", "Django", "Metropolis", "XP400", "Citystar", "Speedfight"],
  "Aprilia": ["SR GT 200", "RS 660", "RSV4", "Tuono V4", "Tuareg 660", "SR 50"],
  "Benelli": ["TRK 502", "Leoncino 500", "BN 125", "TNT 125", "752 S"],
  "Zontes": ["350 E", "350 D", "310 M", "125 M", "ZT 310-T", "ZT 125-G1", "ZT 310-V"],
  "Kymco": ["AK 550", "Downtown 350", "X-Town 300", "Agility 125", "Agility 16+", "Like 125", "People S"],
  "CF Moto": ["450 SR", "650 NK", "800 MT", "700 CL-X", "250 NK", "300 SR", "400 NK"],
  "Voge": ["500 DS", "300 AC", "650 DSX", "500 R", "SR4 Max"],
  "Keeway": ["RKF 125", "Superlight 125", "K-Light", "Vieste 300", "Cityblade"],
  "MBK": ["Nitro", "Booster", "Ovetto", "Stunt", "Mach G", "Skycruiser"],
  "Haojue": ["KA 150", "Lindy", "VS 125", "TR 150"],
  "Lifan": ["KPV 150", "KPR 200", "LF 150"],
  "Loncin": ["CR5", "GP250", "VOGE Series"],
  "Dayun": ["Dayun 150", "Dayun 200"],
  "Autre": []
};

export const equipmentOptions = [
  "ABS", "Contrôle traction", "Éclairage LED", "Tableau de bord TFT", "Bluetooth", 
  "Quickshifter", "Modes de conduite", "Régulateur de vitesse", "Poignées chauffantes", 
  "Selle chauffante", "Anti-wheelie", "Suspension électronique", "Freinage d'urgence auto",
  "Système de navigation", "Prise USB", "Alarme", "Top case", "Sacoches latérales", 
  "Bulle haute", "Protège-mains", "Sabot moteur", "Échappement sport", 
  "Non dédouanée", "RS", "Pièces manquantes", "Sans papiers"
];

export const accessoryTypes = [
  "Casque", "Blouson / Veste", "Gants", "Bottes / Chaussures", 
  "Pantalon / Combinaison", "Pièce Moteur", "Échappement", 
  "Carénage", "Éclairage / Électronique", "Antivol / Alarme", "Autre"
];

export const conditions = [
  "Neuf", "État neuf", "Excellent", "Très bon", "Bon", "Correct", "À réparer", "Pour pièces"
];

// --- MOCK DATA ---

export const mockTechSpecs: TechSpec[] = [
  {
    id: 1,
    brand: "Yamaha",
    model: "MT-07",
    year: 2024,
    category: "Roadster",
    priceNew: "34 500 DT",
    image: "https://www.yamaha-motor.eu/library/assets/products/2024/motorcycles/hyper-naked/mt-07/900-75/2024-Yamaha-MT-07-EU-Midnight_Cyan-Studio-001-03.jpg",
    gallery: [
        "https://www.yamaha-motor.eu/library/assets/products/2024/motorcycles/hyper-naked/mt-07/900-75/2024-Yamaha-MT-07-EU-Midnight_Cyan-Studio-001-03.jpg",
        "https://www.yamaha-motor.eu/library/assets/products/2024/motorcycles/hyper-naked/mt-07/900-75/2024-Yamaha-MT-07-EU-Midnight_Cyan-Action-002-03.jpg",
        "https://www.yamaha-motor.eu/library/assets/products/2024/motorcycles/hyper-naked/mt-07/900-75/2024-Yamaha-MT-07-EU-Icon_Blue-Studio-001-03.jpg"
    ],
    engine: {
      type: "Bicylindre en ligne, 4 temps, refroidissement liquide, DOHC, 4 soupapes",
      cc: "689 cm³",
      power: "73.4 ch à 8 750 tr/min",
      torque: "67.0 Nm à 6 500 tr/min",
      fuelSystem: "Injection électronique",
      cooling: "Liquide",
      transmission: "6 vitesses, chaîne"
    },
    chassis: {
      frame: "Diamant",
      suspensionFront: "Fourche télescopique",
      suspensionRear: "Bras oscillant, suspension type Monocross",
      brakesFront: "Double disque, Ø 298 mm",
      brakesRear: "Simple disque, Ø 245 mm",
      tireFront: "120/70 ZR 17M/C(58W)",
      tireRear: "180/55 ZR 17M/C(73W)"
    },
    dimensions: {
      weight: "184 kg (tous pleins faits)",
      seatHeight: "805 mm",
      tank: "14 L",
      length: "2 085 mm",
      wheelbase: "1 400 mm"
    },
    consumption: "4.2 L/100km",
    topSpeed: "205 km/h"
  }
];

export const mockListings: Listing[] = [
  {
    id: 1,
    title: "SYM Fiddle 4",
    brand: "SYM",
    model: "Fiddle 4",
    price: "8 200 TND",
    image: "https://www.magma-studio.tn/portfolio2/moto/sym/Sym_Fiddle_4_Ariana.jpg",
    images: [
      "https://www.magma-studio.tn/portfolio2/moto/sym/Sym_Fiddle_4_Ariana.jpg",
      "https://www.magma-studio.tn/portfolio2/moto/sym/Sym_Fiddle_4_Ariana.jpg",
      "https://www.magma-studio.tn/portfolio2/moto/sym/Sym_Fiddle_4_Ariana.jpg",
      "https://www.magma-studio.tn/portfolio2/moto/sym/Sym_Fiddle_4_Ariana.jpg"
    ],
    year: "2024",
    mileage: "1 200 km",
    cc: "125 cm³",
    location: "Ariana",
    date: "Aujourd'hui",
    seller: "Ahmed B.",
    sellerType: "Particulier",
    sellerImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
    phone: "+21621719109",
    condition: "État neuf",
    type: "Scooter",
    description: "Vends mon SYM Fiddle 4 acheté en concession il y a 3 mois. État strictement neuf, aucune rayure. Idéal pour la ville, très économique. Vendu avec top case d'origine.",
    coordinates: { lat: 36.8625, lng: 10.1956 }
  },
  {
    id: 2,
    title: "Yamaha MT-07 2022",
    brand: "Yamaha",
    model: "MT-07",
    price: "29 500 TND",
    image: "https://blog.3as-racing.com/wp-content/uploads/2024/12/mt-07-2025-1024x683.jpg",
    year: "2022",
    mileage: "13 200 km",
    cc: "699 cm³",
    location: "Tunis",
    date: "15/01/2024",
    seller: "Mehdi Jeliti",
    sellerType: "Particulier",
    sellerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    phone: "+21621719109",
    condition: "Excellent",
    type: "Moto",
    description: "Yamaha MT-07 en superbe état. Toujours dormi dans un garage. Révision des 10 000 km faite chez Yamaha. Pneus en bon état. Échappement Akrapovic (chicane amovible) et support de plaque court.",
    coordinates: { lat: 36.8065, lng: 10.1815 }
  },
  {
    id: 3,
    title: "BMW R1250 GS Triple Black",
    brand: "BMW",
    model: "R 1250 GS",
    price: "88 000 TND",
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/ff/b1/00/ffb100a266d0fff7adeb77d1f40b617795271941.jpg?rule=ad-image",
    year: "2022",
    mileage: "12 000 km",
    cc: "1254 cm³",
    location: "Sousse",
    date: "10/01/2024",
    seller: "Moto Expert Sousse",
    sellerType: "Pro",
    sellerImage: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=150&h=150&q=80",
    phone: "+21621719109",
    condition: "Excellent",
    type: "Moto",
    description: "Sublime BMW R1250 GS finition Triple Black. Toutes options : Pack Confort, Pack Touring, Pack Dynamique. Shifter Pro, suspensions pilotées ESA. Garantie constructeur encore en cours.",
    equipment: ["ABS", "TCS", "Éclairage LED", "Prise USB", "Carnet d'entretien", "Modes de conduite", "Régulateur de vitesse", "Quickshifter", "Éclairage LED", "Tableau de bord TFT"],
    coordinates: { lat: 35.8256, lng: 10.6084 }
  },
  {
    id: 13,
    title: "Cfmoto 700 Cl-x heritage",
    brand: " Cfmoto",
    model: "700 cl-x heritage",
    price: "49 000 TND",
    image: "https://cfmotobenelux.com/wp-content/uploads/2021/05/HERITAGE_700CL_X_5.jpeg",
    images: [
      "https://cfmotobenelux.com/wp-content/uploads/2021/05/HERITAGE_700CL_X_5.jpeg",
      "https://media.fastestlaps.com/cfmoto-700-cl-x-heritage.jpg"
    ],
    year: "2025",
    mileage: "12000 km",
    cc: "699 cm³",
    location: "Ariana",
    date: "10/01/2023",
    seller: "Bechir Ben Amara",
    sellerType: "Particulier",
    sellerImage: "https://www.magma-studio.tn/portfolio2/moto/seller%20profil/bechir.jpg",
    phone: "21 719 109",
    condition: "Neuf",
    type: "Moto",
    description: "Vends CFMOTO 700 CL-X Heritage 2025, 699 cm³, 12 000 km, état neuf avec entretien rigoureux effectué selon les échéances constructeur. Véhicule en excellent état général, sans frais à prévoir, avec tous les documents administratifs et papiers en règle pour la vente. Équipée de l'ABS Continental, d'un régulateur de vitesse, de modes de conduite (Eco/Sport) et de suspensions KYB réglables.",
    equipment: ["ABS", "TCS", "Éclairage LED", "Prise USB", "Carnet d'entretien", "Modes de conduite", "Régulateur de vitesse", "Quickshifter", "Éclairage LED", "Tableau de bord TFT"],
    coordinates: { lat: 33.8814, lng: 10.0983 }
  },
  {
    id: 14,
    title: "CASQUE ARAI",
    brand: " ARAI",
    model: "SZ-R Evo / VZ Ram",
    price: "1 200 TND",
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/04/7d/9e/047d9edc33c9e26f7c717cac7b77be769b98218d.jpg?rule=ad-large",
    year: "2025",
    mileage: "0",
    cc: "0",
    location: "La Marsa",
    date: "10/01/2023",
    seller: "Brahim Mzoughi",
    sellerType: "Particulier",
    phone: "+21621719109",
    condition: "État neuf",
    type: "Accessoires",
    description: "CASQUE ARAI SZ-R Evo / VZ Ram.",
    coordinates: { lat: 33.8814, lng: 10.0983 }
  }
    {
    id: 15,
    title: "LM LA VITA 125",
    brand: "LM",
    model: "LA VITA 125",
    price: "5 999 TND",
    image: "https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/534388615_1116098953954229_4576403937443312025_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=r1HW2QgQI04Q7kNvwGKuM6G&_nc_oc=AdldUtD6Qa6PxNISsBOpsstsOBUKN9tdLgaG7iXUSteoy19EAdbM3aMXR9Q7iEDPASk&_nc_zt=23&_nc_ht=scontent.ftun9-1.fna&_nc_gid=R4auwrssvfbPWt6CV53ROA&oh=00_Afo_hznzr8GyCeuBi5EpFgl0oRbrNPhWSGDVuC10r0fQCQ&oe=696510EE",
    year: "2026",
    mileage: "0 km",
    cc: "125 cm³",
    location: "Gabès",
    date: "10/01/2026",
    seller: "Joury Moto",
    sellerType: "Pro",
    phone: "+21621719109",
    condition: "Neuf",
    type: "Scooter",
    description: "Sublime scooter LM LA VITA 125CC Toutes options : Pack Confort, Pack Touring, Pack Dynamique. Shifter Pro, suspensions pilotées ESA. Garantie constructeur encore en cours.",
    coordinates: { lat: 33.8814, lng: 10.0983 }
  },
    {
    id: 16,
    title: "Zontes 368G",
    brand: "Zontes",
    model: "368G",
    price: "28 999 TND",
    image: "https://img.icarcdn.com/autospinn/body/000000051856_bf65d6e1_b4db_41e6_9a53_9d743331cfbb.jpg",
    year: "2026",
    mileage: "0 km",
    cc: "368 cm³",
    location: "Gabès",
    date: "10/01/2026",
    seller: "Joury Moto",
    sellerType: "Pro",
    phone: "+21621719109",
    condition: "Neuf",
    type: "Scooter",
    description: "Sublime Maxi scooter Zontes 368G Toutes options : Pack Confort, Pack Touring, Pack Dynamique. Shifter Pro, suspensions pilotées ESA. Garantie constructeur encore en cours.",
    coordinates: { lat: 33.8814, lng: 10.0983 }
  },
  {
    id: 17,
    title: "SYM Jet X 125",
    brand: "SYM",
    model: "Jet X 125",
    price: "9 999 TND",
    image: "https://listing-images.autoscout24.ch/396/11570396/2107650484.jpg?w=1920&q=90",
    year: "2025",
    mileage: "5000 km",
    cc: "125 cm³",
    location: "Ariana",
    date: "10/01/2024",
    seller: "Mohamed Tounsi",
    sellerType: "Particulier",
    phone: "+21621719109",
    condition: "État neuf",
    type: "Scooter",
    description: "Sublime scooter SYM Jet X 125 Toutes options : Pack Confort, Pack Touring, Pack Dynamique. Shifter Pro, suspensions pilotées ESA. Garantie constructeur encore en cours.",
    coordinates: { lat: 33.8814, lng: 10.0983 }
  },
   {
    id: 18,
    title: "YAMAHA TRACER 7 GT",
    brand: "YAMAHA",
    model: "TRACER 7 GT",
    price: "75 999 TND",
    image: "https://yam-paris-15.fr/wp-content/uploads/2022/12/YAMAHA-SPORT-TOURING-TRACER-7-GT-2023-YAM-PARIS-15-02.jpg",
    year: "2023",
    mileage: "5000 km",
    cc: "699 cm³",
    location: "La Marsa",
    date: "10/01/2023",
    seller: "Medhi Chaari",
    sellerType: "Particulier",
    phone: "+21621719109",
    condition: "État neuf",
    type: "Moto",
    description: "Sublime YAMAHA TRACER 7 GT Toutes options : Pack Confort, Pack Touring, Pack Dynamique. Shifter Pro, suspensions pilotées ESA. Garantie constructeur encore en cours.",
    coordinates: { lat: 33.8814, lng: 10.0983 }
  },
    {
    id: 19,
    title: "CASQUE SCORPION",
    brand: " SCORPION",
    model: "Exo-1400 Evo II Carbon Air",
    price: "1 800 TND",
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/a9/65/ae/a965aebb4d5ed1720b9b77a12e3d0835914bf30b.jpg?rule=ad-large",
    year: "2025",
    mileage: "0",
    cc: "0",
    location: "La Marsa",
    date: "10/01/2023",
    seller: "Brahim Mzoughi",
    sellerType: "Particulier",
    phone: "+21621719109",
    // Fix: Changed "neuf" to "Neuf" to satisfy Listing.condition type constraints
    condition: "Neuf",
    type: "Accessoires",
    description: "CASQUE SCORPION Exo-1400 Evo II Carbon Air.",
    coordinates: { lat: 33.8814, lng: 10.0983 }
  },
    {
    id: 20,
    title: "LM ADV 125",
    brand: "LM",
    model: "ADV 125",
    price: "10 900 TND",
     image: "https://www.magma-studio.tn/portfolio2/moto/LMADV/lmadv2.webp",
    images: [
      "https://www.magma-studio.tn/portfolio2/moto/LMADV/lmadv2.webp",
      "https://www.magma-studio.tn/portfolio2/moto/LMADV/lmadv1.webp"
    ],
    year: "2026",
    mileage: "0 km",
    cc: "125 cm³",
    location: "Gabès",
    date: "10/01/2026",
    seller: "Joury Moto",
    sellerType: "Pro",
    phone: "+21621719109",
    condition: "Neuf",
    type: "Scooter",
    description: "Sublime scooter adv 125CC Toutes options : Pack Confort, Pack Touring, Pack Dynamique. Shifter Pro, suspensions pilotées ESA. Garantie constructeur encore en cours.",
        equipment: ["ABS", "TCS", "Éclairage LED", "Prise USB", "Carnet d'entretien", "Modes de conduite", "Régulateur de vitesse", "CrashBar", "Dashcam",]

    coordinates: { lat: 33.8814, lng: 10.0983 }
  },


];

export const mockGarages: Garage[] = [
  {
    id: 1,
    name: "Garage Blayah",
    image: "https://www.magma-studio.tn/portfolio2/moto/Blayah.jpg",
    description: "Réparation et Maintenance de Scooter, Maxiscooter et Moto. Spécialiste certifié Yamaha et Honda.",
    address: "Station métro Ennour kabaria, Tunis",
    location: "Tunis",
    hours: "Mardi au Dimanche : 09:00 – 19:00",
    rating: 4.8,
    reviewsCount: 124,
    specialties: ["Grosse Cylindrée", "Diagnostic", "Entretien"],
    isVerified: true,
    phone: "+216 71 123 456",
    email: "contact@blayah-moto.tn",
    coordinates: { lat: 36.7585, lng: 10.1915 }
  }
];

export const mockArticles: Article[] = [
  {
    id: 1,
    title: "La nouvelle BMW R 1300 GS Adventure dévoilée",
    category: "Nouveautés",
    image: "https://www.leblogmoto.com/wp-content/uploads/2025/12/bmw-devoile-sa-nouvelle-r-1300-gs-adventure-avec-boite-auto-asa-et-voyages-sans-effort-7-1024x683.jpg",
    date: "15 Oct 2025",
    readTime: "5 min",
    author: "Karim Ben Amor",
    summary: "BMW Motorrad repousse encore les limites with sa nouvelle GS Adventure.",
    isFeatured: true
  }
];

export const mockTips: Tip[] = [
  {
    id: 1,
    title: "Comment bien graisser son kit chaîne ?",
    category: "Entretien",
    image: "https://images.prismic.io/ipone/7bc93054-160f-480e-8d9c-584dd667d9da_27b5ab16-649b-4df6-b513-ae1766a0acdc_IPO_2021_Articles_Web_Photos_2375x1450_02.jpeg?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&h=&w=1200",
    date: "05 Sept 2025",
    author: "Atelier Expert",
    readTime: "15 min",
    difficulty: "Débutant",
    summary: "La chaîne est un élément vital de votre moto.",
    tools: ["Béquille d'atelier", "Graisse chaîne", "Brosse", "Nettoyant chaîne"],
    content: "<p>L'entretien du kit chaîne est crucial pour la longévité de votre transmission. Voici les étapes clés :</p><ul><li>Nettoyez la chaîne à l'aide d'un dégraissant spécifique.</li><li>Brossez délicatement pour enlever les résidus.</li><li>Appliquez la graisse sur l'intérieur de la chaîne.</li><li>Laissez sécher au moins 30 minutes avant de rouler.</li></ul>"
  }
];

export const popularModels: BikeModel[] = [
  {
    id: 4,
    name: "TMAX 560",
    brand: "Yamaha",
    image: "https://www.magma-studio.tn/portfolio2/moto/tmax.jpg",
    price: "À partir de 65 000 DT"
  }
];

export const popularGarages: Garage[] = [
  {
    id: 1,
    name: "Garage Blayah",
    location: "Station métro Ennour kabaria.",
    image: "https://www.magma-studio.tn/portfolio2/moto/Blayah.jpg",
    specialty: "Mécanique Générale",
    rating: 4.8
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    name: "Ahmed Ben Ali",
    role: "Acheteur - Tunis",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "J'ai trouvé ma MT-07 en moins de 24h. Le service est impeccable et les vendeurs sont sérieux.",
    rating: 5,
    date: "Il y a 2 jours"
  }
];

export const governoratesList = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan",
  "Bizerte", "Béja", "Jendouba", "Le Kef", "Siliana", "Kairouan",
  "Kasserine", "Sidi Bouzid", "Sousse", "Monastir", "Mahdia", "Sfax",
  "Gafsa", "Tozeur", "Kebili", "Gabès", "Médenine", "Tataouine"
];

export const tunisianCities = governoratesList;
