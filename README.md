# NexCafe Website

Website kafe bergaya **editorial** dengan katalog menu, cerita kafe, keranjang, checkout, profil lokal, dan riwayat pesanan.

README ini sengaja dibuat sebagai dokumentasi yang bisa dibaca dan diedit. Gunakan bagian **Alur aplikasi** untuk memahami bagaimana file saling terhubung, dan **Mengubah konten** untuk mengetahui file yang perlu diedit tanpa harus membongkar logika JavaScript.

## Mulai menjalankan

1. Ekstrak seluruh folder proyek.
2. Buka `index.html` di browser modern.
3. Pastikan perangkat terhubung ke internet agar gambar eksternal dapat dimuat.

Tidak ada proses build yang wajib dilakukan untuk versi statis ini.

## Struktur proyek

```text
nexcafe_polish/
├── index.html                 # Struktur halaman dan komponen antarmuka
├── style.css                  # Warna, tipografi, layout, responsivitas, tema
├── script.js                  # Perilaku UI, autentikasi lokal, dan alur aplikasi
├── README.md                  # Dokumentasi yang dapat dibaca dan diedit
└── assets/
    ├── data/
    │   ├── menu.js            # Data menu, harga, kategori, gambar, dan data pendukung
    │   └── content.js         # Deskripsi/teks editorial yang mudah diubah
    └── images/
        └── menu/              # Tempat aset lokal tambahan bila diperlukan
```

## Alur aplikasi

1. **`index.html`** membangun kerangka halaman, modal, panel navigasi, dan elemen yang dipakai JavaScript.
2. **`assets/data/menu.js`** memuat data katalog. URL gambar produk dan konten editorial yang menjadi bagian dari data menu dikelola di file ini.
3. **`assets/data/content.js`** memuat teks/deskripsi yang sering ingin disunting, misalnya deskripsi hero, pengantar cerita, catatan newsletter, dan keterangan checkout.
4. **`script.js`** membaca data menu dan teks, lalu mengelola pencarian/filter, detail produk, keranjang, profil lokal, checkout, metode pembayaran, struk, dan riwayat pesanan.
5. **`style.css`** mengatur tampilan seluruh komponen di desktop dan mobile.

Alur singkatnya:

`index.html` → memuat `menu.js` dan `content.js` → `script.js` menghubungkan data dengan antarmuka → `style.css` mengatur presentasi.

## Mengubah deskripsi website

Teks yang tampil di halaman web **tidak dibaca langsung dari README.md**. Browser tidak menjalankan Markdown sebagai sumber konten website. Karena itu, README menjelaskan alur dan lokasi pengeditan, sedangkan teks yang tampil di halaman disimpan di `assets/data/content.js`.

Cara mengubahnya:

1. Buka `assets/data/content.js` di editor kode.
2. Cari properti yang ingin diubah, misalnya `heroDescription`.
3. Ganti teks di dalam tanda kutip. Pertahankan nama properti, tanda kutip, koma, dan struktur JavaScript.
4. Simpan file lalu muat ulang `index.html`.

Contoh:

```js
heroDescription: "Kopi pilihan untuk menemani jeda harimu.",
```

Teks yang tersedia di `content.js`:
- `heroDescription` — deskripsi utama pada hero.
- `storyLead` — kalimat pembuka bagian cerita NexCafe.
- `newsletterNote` — keterangan newsletter.
- `drawerFootnote` — keterangan di panel keranjang.
- `authLocalNote` — penjelasan penyimpanan profil lokal.
- `mobileTableHelp` — petunjuk pemilihan meja di checkout.
- `checkoutDisclaimer` — keterangan transaksi pada checkout.
- `paymentDisclaimer` — penjelasan alur pembayaran.
- `emptyOrders` — teks saat riwayat pesanan masih kosong.

Jika ingin mengubah judul atau teks lain yang belum terdaftar di `content.js`, edit teks terkait di `index.html`. Untuk deskripsi produk, edit properti produk di `assets/data/menu.js`.

## Mengubah menu dan gambar

- Buka `assets/data/menu.js`.
- Cari item berdasarkan nama produk atau ID.
- Ubah nama, deskripsi, harga, kategori, label, atau URL gambar sesuai kebutuhan.
- Gunakan URL gambar lengkap (`https://...`) jika gambar di-host secara eksternal.
- Pastikan URL mengarah langsung ke file gambar dan dapat diakses publik. Gambar eksternal memerlukan koneksi internet dan dapat berubah atau tidak tersedia sewaktu-waktu.

Jangan menaruh URL gambar produk di banyak tempat. Simpan di data menu agar lebih mudah dirawat.

## Mengubah desain

- Ubah warna, font, jarak, breakpoint, kartu, dan gaya ikon di `style.css`.
- Ubah struktur elemen atau teks statis di `index.html`.
- Ubah perilaku tombol dan alur interaksi di `script.js`.
- Ikon antarmuka sebaiknya menggunakan SVG agar gaya visual tetap konsisten.

Sebelum menghapus ID atau class HTML, cari pemakaiannya di `script.js` dan `style.css`. Sebagian ID menjadi penghubung untuk interaksi; menghapusnya dapat membuat fitur tidak bekerja.

## Login dan pendaftaran akun

Saat website pertama kali dibuka di browser yang belum memiliki sesi, halaman meminta pengguna masuk atau membuat akun. Jika belum ada akun tersimpan, tab **Buat akun** ditampilkan terlebih dahulu. Setelah akun dibuat, sesi disimpan agar pengguna tidak perlu masuk setiap kali membuka website di browser yang sama. Saat keluar, pengguna dapat masuk kembali memakai email dan password yang telah didaftarkan.

- Data akun lokal disimpan pada `localStorage` dengan kunci `nexcafe_accounts`.
- Sesi pengguna aktif disimpan pada `nexcafe_user`.
- Password tidak disimpan sebagai teks biasa; website menyimpan hasil hash SHA-256 dengan salt acak melalui Web Crypto.
- Data hanya ada pada browser/perangkat tersebut. Membersihkan data situs dapat menghapus akun.
- Ini tetap autentikasi sisi klien untuk proyek statis, **bukan sistem keamanan produksi**. Tidak ada server, pemulihan password, verifikasi email, atau sinkronisasi lintas perangkat. Jangan gunakan password penting yang dipakai pada layanan lain.

## Penyimpanan profil dan pesanan

Profil, keranjang, favorit, tema, poin, dan data pesanan disimpan di penyimpanan lokal browser. Data tersebut tidak otomatis tersinkron ke perangkat lain dan bisa hilang jika data situs dibersihkan. Fitur ini bukan sistem akun online dengan autentikasi server.

## Catatan pembayaran

Checkout, QR, virtual account, dan status transaksi merupakan **simulasi antarmuka**. Website ini tidak terhubung ke bank, QRIS, atau penyedia pembayaran nyata dan tidak memotong saldo. Jangan gunakan nomor atau kode pembayaran yang ditampilkan untuk transaksi sungguhan.

## Checklist setelah mengedit

- Buka ulang halaman dan periksa console browser jika ada masalah.
- Coba cari menu, filter kategori, buka detail produk, tambah/hapus item dari keranjang.
- Lanjutkan checkout dengan jenis pesanan berbeda.
- Coba metode pembayaran yang tersedia dan periksa struk/riwayat.
- Periksa layout pada lebar layar mobile dan desktop.
- Pastikan semua URL gambar masih aktif.

---
Dokumentasi ini boleh diedit untuk mencatat perubahan proyek, keputusan desain, dan petunjuk kerja terbaru.


## Optimasi gambar katalog

- Foto katalog tetap memakai URL gambar yang sudah ada agar tampilan dan jumlah menu tidak berubah.
- URL Unsplash memakai `auto=format` agar browser bisa menerima format modern yang didukung, dengan lebar dan kualitas lebih rendah sesuai peran gambar.
- Foto editorial di bawah area pembuka memakai lazy loading agar tidak semuanya diunduh saat halaman pertama kali dibuka.
- Kartu produk sudah memakai `loading="lazy"`; gambar yang memakai URL sama dapat memanfaatkan cache browser.
- Foto masih berasal dari layanan eksternal, sehingga akses internet tetap dibutuhkan untuk unduhan awal. Untuk sepenuhnya lokal, aset foto perlu diunduh dan dibundel terpisah.

## Performance and visual effects

The latest style pass keeps the editorial layout and all menu entries while reducing costly effects: sticky surfaces are opaque (no backdrop blur), image hover transitions are shorter, and reduced-motion settings are respected. The interface uses solid, softly beveled borders/highlights inspired by liquid glass, without translucent glass panels. Product images still use their configured image URLs; lazy loading helps defer off-screen downloads, but first-time image loads still require a network connection.

## Foto menu

Semua foto katalog diatur di satu file: `assets/images/menu/images.js` (satu baris per menu).
- `url` — tautan foto langsung. Jika diisi, foto ini dipakai dan pencarian dilewati.
- `q` — kata kunci pencarian foto (Wikimedia Commons), dicoba berurutan. Foto hanya dipakai bila nama berkasnya memuat kata kunci itu.

Foto yang ditemukan disimpan di browser (localStorage), jadi pencarian hanya sekali per perangkat. Perlu internet.
