/* NexCafe — data aset.
   Ubah menu, kategori, gambar, deskripsi, ulasan, voucher, meja, dan metode bayar di file ini.
   Gambar menu dan editorial memakai URL eksternal yang dikelola dari objek media dan properti image di file ini. */
window.NEXCAFE_DATA = {
  media: {
    'secangkir-kopi-di-meja-kafe': 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=72',
    'suasana-hangat-interior-kafe': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=480&q=68',
    'iced-latte-dengan-es-batu': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=70',
    'roti-bakar-bandung-dengan-isian-co': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=520&q=66',
    'interior-kafe-dengan-meja-kayu': 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=700&q=70',
    'proses-menyeduh-kopi': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=520&q=66',
    'secangkir-kopi-di-pagi-hari': 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=72',
    'menuFallback': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=520&q=66'
  },

  categories: [
    {id:"Makanan",label:"Makanan Utama"},
    {id:"Jajanan",label:"Jajanan Kaki Lima"},
    {id:"Minuman",label:"Minuman Khas"},
    {id:"Cemilan",label:"Cemilan"}
  ],
  quickFilters: [
    {id:"featured",label:"Best seller / Signature"},
    {id:"pedas",label:"Pedas"},
    {id:"noncoffee",label:"Non-coffee"},
    {id:"favorit",label:"Favorit"}
  ],
  products: [
  {id:"nasi-goreng",name:"Nasi Goreng NexCafe",category:"Makanan",price:38000,discount:20,description:"Nasi goreng bumbu rempah, telur ceplok, sate ayam, kerupuk, dan acar.",tag:"SIGNATURE",featured:true,spicy:true,nonCoffee:false,pair:"kopi-susu"},
  {id:"mie-goreng",name:"Mie Goreng Mamak / Jawa",category:"Makanan",price:30000,description:"Mie kenyal dengan kecap manis gurih, ayam, dan sayuran segar.",tag:"FAVORIT LOKAL",featured:false,spicy:true,nonCoffee:false,pair:"es-teh-kampul"},
  {id:"ayam-geprek",name:"Rice Bowl Ayam Geprek Mozzarella",category:"Makanan",price:36000,description:"Ayam crispy, sambal bawang, dan mozzarella meleleh.",tag:"PEDAS GURIH",featured:false,spicy:true,nonCoffee:false,pair:"kopi-susu"},
  {id:"sambal-matah",name:"Nasi Ayam Sambal Matah",category:"Makanan",price:35000,description:"Ayam renyah dengan sambal matah Bali yang segar dan harum.",tag:"BALI INSPIRED",featured:false,spicy:true,nonCoffee:false,pair:"es-teh-kampul"},
  {id:"spaghetti-rendang",name:"Spaghetti Rendang Fusion",category:"Makanan",price:42000,description:"Pasta al dente dengan saus rendang sapi kaya rempah Nusantara.",tag:"FUSION PICK",featured:false,spicy:false,nonCoffee:false,pair:"es-kunyit"},
  {id:"lada-hitam",name:"Nasi Daging Sapi Lada Hitam",category:"Makanan",price:44000,description:"Daging sapi empuk dengan saus lada hitam pedas-manis.",tag:"RICH & SAVORY",featured:false,spicy:true,nonCoffee:false,pair:"es-teh-kampul"},
  {id:"soto-ayam",name:"Soto Ayam Lamongan",category:"Makanan",price:30000,discount:20,description:"Soto ayam kuah kuning gurih, koya renyah, dan telur rebus.",tag:"COMFORT FOOD",featured:false,spicy:false,nonCoffee:false,pair:"es-teh-kampul"},
  {id:"nasi-gila",name:"Nasi Gila NexCafe",category:"Makanan",price:32000,description:"Nasi putih dengan tumis sosis, bakso, telur, dan bumbu gurih pedas.",tag:"LATE NIGHT",featured:false,spicy:true,nonCoffee:false,pair:"kopi-susu"},
  {id:"aglio-olio",name:"Spaghetti Aglio Olio Tuna Pedas",category:"Makanan",price:39000,description:"Pasta, minyak zaitun, tuna, bawang putih, dan cabai rawit.",tag:"GARLIC & CHILI",featured:false,spicy:true,nonCoffee:false,pair:"lemon-tea"},
  {id:"ayam-kremes",name:"Ayam Goreng Kremes",category:"Makanan",price:35000,description:"Ayam goreng empuk dengan kremesan gurih dan sambal terasi.",tag:"CRUNCHY CLASSIC",featured:false,spicy:true,nonCoffee:false,pair:"es-teh-kampul"},
  {id:"kopi-susu",name:"Kopi Susu Gula Aren",category:"Minuman",price:24000,discount:20,description:"Double espresso, susu segar, dan gula aren murni khas Indonesia.",tag:"BEST SELLER",featured:true,spicy:false,nonCoffee:false,pair:"roti-bakar"},
  {id:"kopi-pandan",name:"Es Kopi Pandan Latte",category:"Minuman",price:26000,description:"Pandan harum, susu segar, dan espresso house blend.",tag:"NUSANTARA TWIST",featured:false,spicy:false,nonCoffee:false,pair:"pisang-goreng"},
  {id:"avocado-espresso",name:"Alpukat Espresso",category:"Minuman",price:30000,description:"Jus alpukat creamy dengan gelato cokelat dan espresso.",tag:"CREAMY PICK",featured:false,spicy:false,nonCoffee:false,pair:"cireng"},
  {id:"teh-tarik",name:"Teh Tarik Busa Dingin",category:"Minuman",price:22000,description:"Teh hitam dan susu dikocok hingga berbusa lembut.",tag:"TEA FAVORITE",featured:false,spicy:false,nonCoffee:true,pair:"roti-bakar"},
  {id:"dirty-matcha",name:"Es Matcha Espresso",category:"Minuman",price:28000,discount:20,description:"Matcha, susu segar, dan espresso dalam lapisan cantik.",tag:"LAYERED DRINK",featured:false,spicy:false,nonCoffee:false,pair:"pisang-goreng"},
  {id:"es-kunyit",name:"Es Kunyit Asam Modern",category:"Minuman",price:18000,description:"Minuman herbal kunyit asam dengan sentuhan soda yang segar.",tag:"HERBAL FRESH",featured:false,spicy:false,nonCoffee:true,pair:"pempek"},
  {id:"klepon-latte",name:"Ice Klepon Latte",category:"Minuman",price:27000,description:"Kopi dengan rasa klepon, kelapa sangrai, dan gula merah.",tag:"SIGNATURE DRINK",featured:true,spicy:false,nonCoffee:false,pair:"roti-bakar"},
  {id:"lemon-tea",name:"Es Teh Kampul / Lemon Tea",category:"Minuman",price:16000,description:"Teh segar dengan irisan jeruk nipis atau lemon.",tag:"FRESH & LIGHT",featured:false,spicy:false,nonCoffee:true,pair:"cireng"},
  {id:"boba-earl-grey",name:"Earl Grey Milk Tea Boba",category:"Minuman",price:25000,description:"Teh Earl Grey beraroma citrus, susu manis, dan boba kenyal.",tag:"BOBA FAVORITE",featured:false,spicy:false,nonCoffee:true,pair:"pisang-goreng"},
  {id:"cokelat-lokal",name:"Cokelat Tubruk Lokal",category:"Minuman",price:23000,description:"Cokelat Nusantara pekat dan creamy, tersedia hangat atau dingin.",tag:"NON-COFFEE",featured:false,spicy:false,nonCoffee:true,pair:"roti-bakar"},
  {id:"cireng",name:"Cireng Bumbu Rujak",category:"Jajanan",price:18000,discount:20,description:"Cireng renyah di luar, kenyal di dalam, dengan saus rujak.",tag:"PEDAS MANIS",featured:false,spicy:true,nonCoffee:false,pair:"kopi-susu"},
  {id:"roti-bakar",name:"Roti Bakar Bandung Srikaya / Cokelat Keju",category:"Cemilan",price:22000,description:"Roti tebal panggang dengan isian srikaya atau cokelat-keju.",tag:"CLASSIC TREAT",featured:false,spicy:false,nonCoffee:false,pair:"kopi-susu"},
  {id:"pisang-goreng",name:"Pisang Goreng Pasir Keju Cokelat",category:"Cemilan",price:20000,discount:20,description:"Pisang manis berbalut tepung panir dengan susu dan keju.",tag:"SWEET CRUNCH",featured:false,spicy:false,nonCoffee:false,pair:"kopi-pandan"},
  {id:"tahu-cabe",name:"Tahu Cabe Garam",category:"Cemilan",price:19000,description:"Tahu crispy ditumis dengan cabai, bawang putih, dan daun bawang.",tag:"PEDAS GURIH",featured:false,spicy:true,nonCoffee:false,pair:"lemon-tea"},
  {id:"pempek",name:"Pempek Palembang Mix",category:"Cemilan",price:26000,description:"Pempek kapal selam dan lenjer dengan kuah cuko asam pedas.",tag:"PALEMBANG CLASSIC",featured:false,spicy:true,nonCoffee:false,pair:"es-kunyit"},
  {id:"singkong-keju",name:"Singkong Goreng Merekah Keju",category:"Cemilan",price:18000,description:"Singkong goreng renyah gurih dengan taburan keju.",tag:"CRISPY BITES",featured:false,spicy:false,nonCoffee:false,pair:"teh-tarik"},
  {id:"durian-pastry",name:"Pancake / Croissant Durian",category:"Cemilan",price:28000,description:"Pastry lembut dengan isian daging durian yang lumer.",tag:"SEASONAL TREAT",featured:false,spicy:false,nonCoffee:false,pair:"kopi-pandan"},
  {id:"toast-kaya",name:"Toast Kaya Butter",category:"Cemilan",price:18000,description:"Roti panggang garing dengan selai srikaya dan mentega.",tag:"SIMPLE JOY",featured:false,spicy:false,nonCoffee:false,pair:"teh-tarik"},
  {id:"platter",name:"Kentang & Sosis Goreng Platter",category:"Cemilan",price:28000,description:"Kentang dan sosis goreng untuk dinikmati bareng teman.",tag:"SHAREABLE",featured:false,spicy:false,nonCoffee:false,pair:"lemon-tea"},
  {id:"kue-cubit",name:"Kue Cubit Half-Baked",category:"Cemilan",price:17000,description:"Kue cubit setengah matang dengan pilihan green tea atau cokelat.",tag:"MELT-IN-MIDDLE",featured:false,spicy:false,nonCoffee:false,pair:"cokelat-lokal"},
  {id:"bakso-urat",name:"Bakso Urat Kuah Spesial",category:"Jajanan",price:24000,description:"Bakso urat kenyal dengan kuah kaldu sapi, mie, bihun, dan bawang goreng.",tag:"KUAH HANGAT",featured:false,spicy:false,nonCoffee:false,pair:"lemon-tea",options:"spice"},
  {id:"bakso-bakar",name:"Bakso Bakar Pedas Manis",category:"Jajanan",price:20000,description:"Bakso bakar berbumbu kecap dan sambal, dibakar hingga wangi.",tag:"BAKAR ARANG",featured:false,spicy:true,nonCoffee:false,pair:"es-kunyit",options:"spice"},
  {id:"mie-ayam-bakso",name:"Mie Ayam Bakso Komplit",category:"Jajanan",price:27000,description:"Mie ayam, bakso halus, pangsit goreng, dan sawi dengan kuah gurih.",tag:"KOMPLIT",featured:false,spicy:false,nonCoffee:false,pair:"lemon-tea",options:"spice"},
  {id:"sop-iga",name:"Sop Iga Sapi Bening",category:"Jajanan",price:48000,description:"Iga sapi empuk dalam kuah bening segar dengan kentang, wortel, dan seledri.",tag:"COMFORT FOOD",featured:false,spicy:false,nonCoffee:false,pair:"lemon-tea",options:"spice"},
  {id:"iga-bakar",name:"Iga Bakar Madu",category:"Jajanan",price:55000,description:"Iga sapi bakar olesan madu dan kecap, dengan sambal dan lalapan.",tag:"BAKAR MADU",featured:false,spicy:false,nonCoffee:false,pair:"es-kunyit",options:"spice"},
  {id:"cilung",name:"Cilung Bumbu Pedas",category:"Jajanan",price:12000,description:"Aci digulung kenyal dengan telur, disiram bumbu kacang pedas.",tag:"NOSTALGIA",featured:false,spicy:true,nonCoffee:false,pair:"es-kunyit"},
  {id:"batagor",name:"Batagor Bandung",category:"Jajanan",price:22000,discount:20,description:"Batagor goreng renyah dengan saus kacang, kecap, dan jeruk limau.",tag:"BANDUNG CLASSIC",featured:false,spicy:false,nonCoffee:false,pair:"es-kunyit",options:"spice"},
  {id:"siomay",name:"Siomay Bandung",category:"Jajanan",price:22000,description:"Siomay ikan kukus dengan kentang, tahu, kol, dan saus kacang.",tag:"KUKUS",featured:false,spicy:false,nonCoffee:false,pair:"lemon-tea"},
  {id:"seblak",name:"Seblak Ceker Pedas",category:"Jajanan",price:21000,description:"Kerupuk basah berkuah pedas dengan ceker, sosis, dan telur.",tag:"PEDAS NENDANG",featured:false,spicy:true,nonCoffee:false,pair:"es-kunyit",options:"spice"},
  {id:"cimol",name:"Cimol Bojot Pedas",category:"Jajanan",price:13000,description:"Cimol goreng kenyal-renyah dengan bumbu tabur pedas.",tag:"KRIUK",featured:false,spicy:true,nonCoffee:false,pair:"lemon-tea"},
  {id:"tahu-bulat",name:"Tahu Bulat Digoreng Dadakan",category:"Jajanan",price:12000,description:"Tahu bulat garing di luar dan lembut di dalam, dengan bumbu tabur.",tag:"DIGORENG DADAKAN",featured:false,spicy:false,nonCoffee:false,pair:"lemon-tea"},
  {id:"sate-taichan",name:"Sate Taichan Pedas",category:"Jajanan",price:28000,description:"Sate ayam bakar tanpa bumbu kacang dengan sambal rawit dan jeruk limau.",tag:"SAMBAL RAWIT",featured:false,spicy:true,nonCoffee:false,pair:"es-kunyit",options:"spice"},
  {id:"es-cendol",name:"Es Cendol Dawet Gula Merah",category:"Jajanan",price:15000,discount:20,description:"Cendol hijau, santan, dan gula merah cair dengan es serut.",tag:"SEGAR MANIS",featured:false,spicy:false,nonCoffee:true,pair:"kopi-susu",options:"drink"}
],
  articles: [
  { id:"ritual-pagi", tag:"RITUAL", read:"5 MIN",
    title:"Ritual Pagi: Mengapa Kopi Pertama Selalu Terasa Berbeda",
    image:"https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=72",
    body:[
      "Ada alasan kenapa cangkir pertama di pagi hari selalu terasa istimewa. Bukan hanya soal kafein yang mulai bekerja, tapi tentang jeda—momen kecil ketika dunia belum menuntut terlalu banyak.",
      "Di pagi yang tenang, indra kita bekerja lebih pelan. Aroma kopi yang baru diseduh terasa lebih tajam, uap hangat di atas cangkir terasa lebih nyata, dan suara sendok yang menyentuh keramik terdengar seperti ritual kecil yang sengaja kita rawat.",
      "Kami di NexCafe percaya bahwa ritual pagi layak diperlakukan dengan hormat. Itulah kenapa kami menyeduh dalam batch kecil, mengukur suhu air, dan membiarkan setiap cangkir punya waktunya sendiri sebelum sampai ke tanganmu.",
      "Jadi lain kali kamu duduk dengan cangkirmu, coba tarik napas sebentar. Nikmati tiga detik pertama sebelum dunia kembali berjalan cepat."
    ]},
  { id:"gula-aren", tag:"BAHAN", read:"4 MIN",
    title:"Mengenal Gula Aren: Manis yang Punya Cerita",
    image:"https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=72",
    body:[
      "Gula aren bukan sekadar pemanis. Ia adalah hasil kerja sabar—dari pohon enau yang dipanjat pagi-pagi, nira yang ditampung, lalu dimasak perlahan di atas tungku sampai mengental dan mengeras.",
      "Rasa manisnya berbeda dari gula pasir. Ada lapisan karamel, sedikit smoky, dan kedalaman yang membuat kopi susu terasa lebih bulat. Itulah kenapa kami memilihnya sebagai signature di banyak minuman.",
      "Kami bekerja sama dengan petani lokal untuk memastikan gula aren yang kami pakai diproduksi dengan cara yang adil dan berkelanjutan.",
      "Jadi setiap kali kamu menyeruput kopi susu gula aren, ada cerita panjang yang sampai ke cangkirmu. Manis yang tidak terburu-buru."
    ]},
  { id:"panduan-kopi-susu", tag:"GUIDE", read:"3 MIN",
    title:"Panduan Menikmati Kopi Susu Tanpa Terburu-buru",
    image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=72",
    body:[
      "Minum kopi dan menikmati kopi adalah dua hal berbeda. Yang pertama soal kebiasaan, yang kedua soal kesadaran.",
      "Pertama, cium dulu sebelum menyeruput. Aroma kopi susu yang hangat menyiapkan indra dan memberi tahu tubuh bahwa ini adalah momen untuk melambat.",
      "Kedua, seruput kecil di awal. Biarkan suhu, tekstur, dan rasa menyatu di lidah sebelum kamu memutuskan ingin menambah apa.",
      "Ketiga, letakkan cangkirmu di antara seruputan. Beri jeda. Kadang nikmat terbaik justru muncul di antara dua tegukan, bukan di dalamnya."
    ]},
  { id:"roti-bakar", tag:"DAPUR", read:"6 MIN",
    title:"Di Balik Dapur: Roti Bakar yang Kami Banggakan",
    image:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=72",
    body:[
      "Roti bakar terdengar sederhana. Tapi di dapur kami, ia punya standar sendiri. Roti dipilih yang tebal dan lembut, dipanggang dengan api sedang agar bagian luar garing sementara dalamnya tetap hangat.",
      "Olesan srikaya kami buat sendiri, dari daun pandan segar dan gula aren. Butuh waktu, tapi hasilnya sepadan—wangi pandan yang jujur, manis yang tidak berlebihan.",
      "Keju dan cokelat dipilih dari merek yang kami percaya. Kami tidak ingin roti ini jadi sekadar teman kopi, tapi jadi alasan tersendiri untuk datang.",
      "Sederhana di luar, teliti di dalam."
    ]}
],
  reviewSummary: {score:4.8,count:1248},
  reviews: [
    {name:"Dinda R.",rating:5,item:"Kopi Susu Gula Aren",text:"Kopi susu gula arennya wangi dan nggak pelit susu. Tempatnya pas untuk kerja ditemani hujan."},
    {name:"Bayu P.",rating:5,item:"Roti Bakar Bandung",text:"Roti bakarnya tebal dan hangat, cokelat kejunya melimpah. Dibawa pulang pun masih renyah."},
    {name:"Fitri N.",rating:5,item:"Bakso Urat Kuah Spesial",text:"Bakso uratnya kenyal, kuahnya bening dan gurih. Porsinya pas untuk makan siang."},
    {name:"Salsa M.",rating:4,item:"Nasi Goreng NexCafe",text:"Bumbu nasi gorengnya mantap dan porsinya pas. Antrean kasir kadang panjang saat jam makan siang."},
    {name:"Andre K.",rating:4,item:"Batagor Bandung",text:"Batagor dan cilungnya mengingatkan jajanan masa kecil. Sambal kacangnya pas."},
    {name:"Raka A.",rating:5,item:"Pesan online",text:"Pesan lewat website, pilih meja, sampai langsung disiapkan. Praktis dan nggak perlu antre."}
  ],
  vouchers: [
  {code:"NEXCAFE10",pct:.10,cap:15000,min:40000,short:"10%",desc:"Diskon 10% (maks Rp 15.000), min. belanja Rp 40.000"},
  {code:"HEMAT5K",flat:5000,min:30000,short:"Rp 5rb",desc:"Potongan Rp 5.000, min. belanja Rp 30.000"},
  {code:"MEMBER15",pct:.15,cap:25000,min:60000,member:true,short:"15% member",desc:"Diskon 15% khusus member (maks Rp 25.000), min. belanja Rp 60.000"}
],
  tables: [
  {id:"T1",area:"Indoor",x:22,y:30,seats:2},{id:"T2",area:"Indoor",x:22,y:51,seats:2},{id:"T3",area:"Indoor",x:22,y:72,seats:2},
  {id:"T4",area:"Indoor",x:68,y:30,seats:4},{id:"T5",area:"Indoor",x:68,y:51,seats:4},{id:"T6",area:"Indoor",x:68,y:72,seats:4},
  {id:"T7",area:"Indoor",x:56,y:90,seats:6},
  {id:"T8",area:"Outdoor",x:22,y:24,seats:2},{id:"T9",area:"Outdoor",x:22,y:46,seats:2},{id:"T10",area:"Outdoor",x:22,y:68,seats:2},
  {id:"T11",area:"Outdoor",x:68,y:24,seats:4},{id:"T12",area:"Outdoor",x:68,y:50,seats:4},{id:"T13",area:"Outdoor",x:56,y:82,seats:6}
],
  payMethods: [["QRIS","qris","QRIS","Pindai kode pada aplikasi pembayaran"],["Tunai","cash","Tunai di kasir","Bayar saat memesan atau mengambil pesanan"],["E-wallet","wallet","E-wallet","GoPay, OVO, atau DANA"],["Transfer Bank","bank","Transfer bank","Virtual account"],["Kartu","card","Kartu debit/kredit","Pembayaran melalui terminal kasir"]]
};
