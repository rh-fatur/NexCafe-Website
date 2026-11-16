/* NexCafe — foto katalog menu.
   SATU-SATUNYA tempat untuk mengatur foto menu. Satu baris = satu menu (urut sesuai katalog).

   url : tautan foto langsung (https://...). Jika diisi, foto ini yang dipakai dan pencarian dilewati.
   wiki: judul artikel Wikipedia (foto utama artikelnya dipakai), dicoba paling dulu setelah url.
   q   : kata kunci pencarian foto (Wikimedia Commons), dicoba berurutan dari yang paling spesifik.
         Foto hanya dipakai jika nama berkas-nya memuat kata kunci tersebut, supaya sesuai dengan menunya.

   Foto yang ditemukan disimpan di browser, jadi pencarian hanya terjadi sekali per perangkat.
   Untuk mengunci foto tertentu: salin tautan fotonya lalu tempel di url menu tersebut. */
window.NEXCAFE_MENU_IMAGES = {
  "nasi-goreng": { url: "", wiki: ["Nasi goreng"], q: ["nasi goreng"] }, // Nasi Goreng NexCafe
  "mie-goreng": { url: "", wiki: ["Mie goreng"], q: ["mie goreng", "mi goreng"] }, // Mie Goreng Mamak / Jawa
  "ayam-geprek": { url: "", wiki: ["Ayam geprek", "Ayam penyet"], q: ["ayam geprek", "ayam penyet"] }, // Rice Bowl Ayam Geprek Mozzarella
  "sambal-matah": { url: "", wiki: ["Sambal matah"], q: ["sambal matah", "ayam goreng"] }, // Nasi Ayam Sambal Matah
  "spaghetti-rendang": { url: "", wiki: ["Rendang"], q: ["spaghetti rendang", "spaghetti beef", "rendang"] }, // Spaghetti Rendang Fusion
  "lada-hitam": { url: "", wiki: [], q: ["black pepper beef", "beef black pepper", "lada hitam"] }, // Nasi Daging Sapi Lada Hitam
  "soto-ayam": { url: "", wiki: ["Soto ayam"], q: ["soto ayam"] }, // Soto Ayam Lamongan
  "nasi-gila": { url: "", wiki: ["Nasi gila"], q: ["nasi gila", "nasi goreng"] }, // Nasi Gila NexCafe
  "aglio-olio": { url: "", wiki: ["Spaghetti aglio e olio"], q: ["aglio e olio", "aglio olio", "spaghetti aglio"] }, // Spaghetti Aglio Olio Tuna Pedas
  "ayam-kremes": { url: "", wiki: ["Ayam goreng"], q: ["ayam goreng kremes", "ayam kremes", "ayam goreng"] }, // Ayam Goreng Kremes
  "kopi-susu": { url: "", wiki: ["Kopi susu"], q: ["kopi susu", "iced coffee", "es kopi"] }, // Kopi Susu Gula Aren
  "kopi-pandan": { url: "", wiki: [], q: ["kopi pandan", "pandan latte", "iced latte"] }, // Es Kopi Pandan Latte
  "avocado-espresso": { url: "", wiki: [], q: ["avocado coffee", "alpukat kopi", "jus alpukat", "avocado juice"] }, // Alpukat Espresso
  "teh-tarik": { url: "", wiki: ["Teh tarik"], q: ["teh tarik"] }, // Teh Tarik Busa Dingin
  "dirty-matcha": { url: "", wiki: ["Matcha"], q: ["iced matcha", "matcha latte", "matcha"] }, // Es Matcha Espresso
  "es-kunyit": { url: "", wiki: ["Kunyit asam", "Jamu"], q: ["kunyit asam", "jamu kunyit", "jamu"] }, // Es Kunyit Asam Modern
  "klepon-latte": { url: "", wiki: ["Klepon"], q: ["klepon latte", "es klepon", "klepon"] }, // Ice Klepon Latte
  "lemon-tea": { url: "", wiki: ["Iced tea"], q: ["iced lemon tea", "lemon tea", "es teh"] }, // Es Teh Kampul / Lemon Tea
  "boba-earl-grey": { url: "", wiki: ["Bubble tea"], q: ["bubble tea", "boba milk tea", "boba"] }, // Earl Grey Milk Tea Boba
  "cokelat-lokal": { url: "", wiki: ["Hot chocolate"], q: ["hot chocolate", "es cokelat", "chocolate drink"] }, // Cokelat Tubruk Lokal
  "cireng": { url: "", wiki: ["Cireng"], q: ["cireng"] }, // Cireng Bumbu Rujak
  "roti-bakar": { url: "", wiki: ["Roti bakar", "Kaya toast"], q: ["roti bakar", "roti bakar bandung", "toast"] }, // Roti Bakar Bandung Srikaya / Cokelat Keju
  "pisang-goreng": { url: "", wiki: ["Pisang goreng"], q: ["pisang goreng keju", "pisang goreng", "fried banana"] }, // Pisang Goreng Pasir Keju Cokelat
  "tahu-cabe": { url: "", wiki: ["Tahu goreng"], q: ["tahu cabe garam", "tahu goreng", "fried tofu"] }, // Tahu Cabe Garam
  "pempek": { url: "", wiki: ["Pempek"], q: ["pempek", "empek-empek", "empek empek"] }, // Pempek Palembang Mix
  "singkong-keju": { url: "", wiki: ["Singkong goreng"], q: ["singkong goreng", "fried cassava", "cassava"] }, // Singkong Goreng Merekah Keju
  "durian-pastry": { url: "", wiki: ["Durian"], q: ["durian pancake", "durian croissant", "durian"] }, // Pancake / Croissant Durian
  "toast-kaya": { url: "", wiki: ["Kaya toast"], q: ["kaya toast", "roti kaya"] }, // Toast Kaya Butter
  "platter": { url: "", wiki: ["French fries"], q: ["french fries sausage", "kentang goreng", "french fries"] }, // Kentang & Sosis Goreng Platter
  "kue-cubit": { url: "", wiki: ["Kue cubit"], q: ["kue cubit"] }, // Kue Cubit Half-Baked
  "bakso-urat": { url: "", wiki: ["Bakso"], q: ["bakso urat", "bakso"] }, // Bakso Urat Kuah Spesial
  "bakso-bakar": { url: "", wiki: ["Bakso bakar", "Bakso"], q: ["bakso bakar", "sate bakso", "bakso"] }, // Bakso Bakar Pedas Manis
  "mie-ayam-bakso": { url: "", wiki: ["Mie ayam"], q: ["mie ayam bakso", "mie ayam"] }, // Mie Ayam Bakso Komplit
  "sop-iga": { url: "", wiki: ["Sop buntut", "Sop iga"], q: ["sop iga", "sop buntut", "beef rib soup"] }, // Sop Iga Sapi Bening
  "iga-bakar": { url: "", wiki: ["Iga bakar"], q: ["iga bakar", "grilled ribs", "iga"] }, // Iga Bakar Madu
  "cilung": { url: "", wiki: ["Cilung"], q: ["cilung", "aci digulung"] }, // Cilung Bumbu Pedas
  "batagor": { url: "", wiki: ["Batagor"], q: ["batagor"] }, // Batagor Bandung
  "siomay": { url: "", wiki: ["Siomay"], q: ["siomay", "shumai", "dim sum"] }, // Siomay Bandung
  "seblak": { url: "", wiki: ["Seblak"], q: ["seblak"] }, // Seblak Ceker Pedas
  "cimol": { url: "", wiki: ["Cimol"], q: ["cimol"] }, // Cimol Bojot Pedas
  "tahu-bulat": { url: "", wiki: ["Tahu bulat"], q: ["tahu bulat", "tahu goreng"] }, // Tahu Bulat Digoreng Dadakan
  "sate-taichan": { url: "", wiki: ["Sate taichan", "Satay"], q: ["sate taichan", "sate ayam", "satay"] }, // Sate Taichan Pedas
  "es-cendol": { url: "", wiki: ["Cendol"], q: ["es cendol", "cendol"] }, // Es Cendol Dawet Gula Merah
};
