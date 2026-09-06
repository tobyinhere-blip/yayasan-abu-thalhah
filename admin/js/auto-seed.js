/**
 * Auto-Seed Service
 * Secara otomatis mengimpor data awal bawaan ke Firebase Realtime Database
 * jika database terdeteksi masih kosong, tanpa memerlukan tombol manual.
 */

const initialData = {
  berita: {
    'peletakan-batu': {
      title: "Pembangunan Gedung Baru SDIT Al Mubarak Resmi Dimulai dengan Peletakan Batu Pertama",
      author: "Admin Yayasan",
      date: "8 Jan 2026",
      dateISO: "2026-01-08",
      category: "Pengumuman",
      image: "https://cms.sitalmubarak.com/wp-content/uploads/2026/01/IMG_9776-scaled.jpg",
      body: `<p class="mb-4">Sebagai wujud komitmen dalam meningkatkan kualitas pendidikan Islam, <strong>SDIT Al Mubarak</strong> secara resmi memulai pembangunan dan renovasi fasilitas sekolah. Kegiatan ini diawali dengan <strong>peletakan batu pertama</strong>, yang menjadi simbol dimulainya ikhtiar bersama dalam menghadirkan lingkungan belajar yang lebih nyaman, aman, dan representatif bagi para peserta didik.</p><p class="mb-4">Pembangunan ini bukan sekadar proyek fisik, melainkan bagian dari visi besar SDIT Al Mubarak dalam mencetak generasi Qur’ani yang berilmu, berakhlak mulia, dan siap menghadapi tantangan masa depan.</p><h2 class="text-xl font-bold text-gray-900 mt-6 mb-3">Makna Peletakan Batu Pertama</h2><p class="mb-4">Prosesi peletakan batu pertama dilaksanakan dengan penuh khidmat dan doa, sebagai bentuk harapan agar setiap proses pembangunan diberi kelancaran dan keberkahan oleh Allah ﷻ.</p>`,
      slug: "peletakan-batu",
      createdAt: 1767830400000
    },
    'juara-mtq': {
      title: "Santri Yayasan Abu Thalhah Raih Juara Musabaqah Tilawatil Qur'an (MTQ) Tingkat Provinsi",
      author: "Admin Yayasan",
      date: "29 Jul 2026",
      dateISO: "2026-07-29",
      category: "Prestasi Yayasan",
      image: "siswi-berprestasii.png",
      body: `<p>Prestasi membanggakan kembali diraih oleh santri Yayasan Islamic Center Abu Thalhah Al Anshari dalam kejuaraan MTQ tingkat provinsi. Dengan persiapan matang dan bimbingan para asatidzah, para santri mampu menunjukkan bacaan Al-Qur'an yang tajwid dan merdu.</p>`,
      slug: "juara-mtq",
      createdAt: 1785283200000
    },
    'psb': {
      title: "Penerimaan Santri Baru (PSB) Tahun Ajaran 2026/2027 Telah Resmi Dibuka",
      author: "Admin Yayasan",
      date: "25 Jul 2026",
      dateISO: "2026-07-25",
      category: "Pengumuman",
      image: "cta-image.png",
      body: `<p>Yayasan Islamic Center Abu Thalhah Al Anshari mengundang putra-putri terbaik bangsa untuk bergabung menjadi generasi Rabbani yang hafal Al-Qur'an dan berprestasi secara akademik.</p>`,
      slug: "psb",
      createdAt: 1784937600000
    },
    'parenting': {
      title: "Kajian Parenting Islami: Mendidik Anak dengan Keteladanan Akhlak Mulia",
      author: "Admin Yayasan",
      date: "23 Jul 2026",
      dateISO: "2026-07-23",
      category: "Kajian Dakwah",
      image: "sman3palu.sch.id/uploads/berita/1785161723_WhatsApp Image 2026-07-26 at 14.42.44.jpeg",
      body: `<p>Menghadirkan narasumber ahli di bidang psikologi Islam, Yayasan sukses menyelenggarakan kajian parenting bulanan untuk wali santri dan masyarakat umum.</p>`,
      slug: "parenting",
      createdAt: 1784764800000
    },
    'program-tahfidz': {
      title: "Program Unggulan Tahfidz Al-Qur'an & Olahraga Sunnah Memanah Santri",
      author: "Admin Yayasan",
      date: "20 Jul 2026",
      dateISO: "2026-07-20",
      category: "Kajian Dakwah",
      image: "sman3palu.sch.id/uploads/berita/1784805517_Screenshot 2026-07-23 at 19.17.55.png",
      body: `<p>Kegiatan ekstrakurikuler santri senantiasa diisi dengan hafalan Al-Qur'an dan olahraga yang disunnahkan seperti memanah dan ketangkasan fisik.</p>`,
      slug: "program-tahfidz",
      createdAt: 1784505600000
    },
    'bakti-sosial': {
      title: "Yayasan Abu Thalhah Gelar Bakti Sosial & Penyaluran Sembako Untuk Warga",
      author: "Admin Yayasan",
      date: "15 Jul 2026",
      dateISO: "2026-07-15",
      category: "Kegiatan Santri",
      image: "logo_yayasan.png",
      body: `<p>Sebagai bentuk rasa syukur dan kepedulian sosial, yayasan mengadakan bakti sosial tebar paket sembako untuk masyarakat di sekitar lingkungan yayasan.</p>`,
      slug: "bakti-sosial",
      createdAt: 1784073600000
    },
    'workshop-guru': {
      title: "Workshop Peningkatan Kompetensi & Karakter Pendidik Generasi Rabbani",
      author: "Admin Yayasan",
      date: "10 Jul 2026",
      dateISO: "2026-07-10",
      category: "Pengumuman",
      image: "foto_kepala_yayasan.webp",
      body: `<p>Pelatihan berkala bagi seluruh tenaga pendidik guna meningkatkan mutu pembelajaran dan pembinaan akhlak para santri.</p>`,
      slug: "workshop-guru",
      createdAt: 1783641600000
    },
    'infaq-wakaf': {
      title: "Penyaluran Infaq & Wakaf Produktif Untuk Pembangunan Fasilitas Santri",
      author: "Admin Yayasan",
      date: "05 Jul 2026",
      dateISO: "2026-07-05",
      category: "Prestasi Yayasan",
      image: "cta-image.png",
      body: `<p>Laporan pertanggungjawaban penyaluran dana infaq dan wakaf muhsinin untuk pembebasan lahan dan perluasan ruang kelas santri.</p>`,
      slug: "infaq-wakaf",
      createdAt: 1783209600000
    },
    'latihan-pemimpin': {
      title: "Pelatihan Kepemimpinan & Kemandirian Santri Dalam Rangkaian MABIT",
      author: "Admin Yayasan",
      date: "01 Jul 2026",
      dateISO: "2026-07-01",
      category: "Kegiatan Santri",
      image: "siswi-berprestasii.png",
      body: `<p>Kegiatan Malam Bina Iman dan Taqwa (MABIT) melatih kedisiplinan, kemandirian, dan kepemimpinan para santri sejak dini.</p>`,
      slug: "latihan-pemimpin",
      createdAt: 1782864000000
    }
  },
  galeri: {
    'foto-1': { url: 'siswi-berprestasii.png', caption: 'Kegiatan Wisuda Tahfidz & Prestasi Santri Yayasan Abu Thalhah', category: 'Prestasi', createdAt: 1785283200000 },
    'foto-2': { url: 'cta-image.png', caption: 'Pelaksanaan Program Bina Karakter & Akhlak Santri Rabbani', category: 'Kegiatan', createdAt: 1784937600000 },
    'foto-3': { url: 'foto_kepala_yayasan.webp', caption: 'Pengarahan & Kunjungan Pembina Yayasan Abu Thalhah Al Anshari', category: 'Kegiatan', createdAt: 1784505600000 },
    'foto-4': { url: 'logo_yayasan.png', caption: 'Dokumentasi Bakti Sosial & Program Peduli Masyarakat', category: 'Kegiatan', createdAt: 1784073600000 }
  },
  pengurus: {
    'p-1': { nama: 'Ustadz Pembina Yayasan', jabatan: 'Pembina Yayasan', foto: 'foto_kepala_yayasan.webp', urutan: 1, createdAt: 1780000000000 },
    'p-2': { nama: 'Ketua Yayasan Abu Thalhah', jabatan: 'Ketua Yayasan', foto: 'logo_yayasan.png', urutan: 2, createdAt: 1780000000000 },
    'p-3': { nama: 'Sekretaris Yayasan', jabatan: 'Sekretaris', foto: 'logo_yayasan.png', urutan: 3, createdAt: 1780000000000 },
    'p-4': { nama: 'Bendahara Yayasan', jabatan: 'Bendahara', foto: 'logo_yayasan.png', urutan: 4, createdAt: 1780000000000 }
  },
  unitPendidikan: {
    'u-1': { nama: 'SDIT Al Mubarak', jenjang: 'SD', deskripsi: 'Sekolah Dasar Islam Terpadu berlandaskan nilai-nilai Al-Qur\'an dan As-Sunnah.', gambar: 'https://cms.sitalmubarak.com/wp-content/uploads/2026/01/IMG_9776-scaled.jpg', urutan: 1, createdAt: 1780000000000 },
    'u-2': { nama: 'Pondok Tahfidz Al-Qur\'an Abu Thalhah', jenjang: 'Non-Formal', deskripsi: 'Program karantina dan pembinaan tahfidz Al-Qur\'an 30 juz bagi santri.', gambar: 'siswi-berprestasii.png', urutan: 2, createdAt: 1780000000000 },
    'u-3': { nama: 'KBL & Raudhatul Athfal', jenjang: 'PAUD', deskripsi: 'Pendidikan anak usia dini berbasis pembentukan akhlak dan kecintaan Al-Qur\'an.', gambar: 'cta-image.png', urutan: 3, createdAt: 1780000000000 }
  },
  tentang: {
    sejarah: `<p>Yayasan Islamic Center Abu Thalhah Al Anshari didirikan sebagai wujud komitmen dalam menghadirkan pendidikan Islam berkualitas di Kota Palu dan sekitarnya. Berawal dari semangat dakwah dan kepedulian terhadap pembentukan karakter generasi muda, yayasan terus berkembang mengelola berbagai unit pendidikan dan kegiatan sosial keagamaan.</p>`,
    visiMisi: `<h3>Visi</h3><p>Menjadi pusat pendidikan dan dakwah Islam yang unggul, berakhlak mulia, dan berlandaskan Al-Qur'an serta As-Sunnah.</p><br><h3>Misi</h3><ul><li>Menyelenggarakan pendidikan Islam terpadu yang berkualitas.</li><li>Mencetak huffazh Al-Qur'an yang berpemahaman lurus dan berakhlak karimah.</li><li>Meningkatkan kepedulian sosial dan pemberdayaan ummat.</li></ul>`,
    profil: `<p>Yayasan Islamic Center Abu Thalhah Al Anshari berdedikasi penuh untuk membina generasi Rabbani yang kokoh dalam iman, unggul dalam ilmu, dan bermanfaat bagi masyarakat.</p>`,
    updatedAt: Date.now()
  },
  beranda: {
    heroSubtitle: "Yayasan Islamic Center Abu Thalhah Al Anshari",
    heroTitle: "Melahirkan Generasi Qur'ani dan Sunnah yang Cerdas, Kreatif, Berkarakter dan Berwawasan Pancasila dan Teknologi.",
    heroDesc: "Mewujudkan lembaga pendidikan Islam terpadu yang unggul dalam melahirkan huffazh Al-Qur'an dan pemuda berkarakter mulia.",
    heroVideoUrl: "https://www.youtube.com/watch?v=9U-sTSTCpfs",
    heroCta1Text: "Unit Pendidikan",
    heroCta1Link: "unit-pendidikan.html",
    heroCta2Text: "Tentang Kami",
    heroCta2Link: "tentang-kami.html",
    announcementText: "Penerimaan Santri Baru (PSB) Tahun Ajaran 2026/2027 Telah Resmi Dibuka! Segera daftarkan putra-putri Anda.",
    announcementLink: "berita.html",
    announcementStatus: "active",
    pimpinanNama: "Ustadz Pembina Yayasan",
    pimpinanJabatan: "Ketua Yayasan Islamic Center Abu Thalhah Al Anshari",
    pimpinanFoto: "foto_kepala_yayasan.webp",
    sambutanHtml: `<p>Bismillah, Selamat datang di official website Yayasan Islamic Center Abu Thalhah Al Anshari. Kami berkomitmen untuk menyajikan pendidikan islami yang mengintegrasikan Al-Qur'an, As-Sunnah, dan keunggulan akademik bagi generasi masa depan.</p>`,
    statSantri: "500+",
    statPengajar: "45+",
    statUnit: "4",
    statHafiz: "120+",
    updatedAt: Date.now()
  },
  header_footer: {
    headerBrandSubtitle: "Yayasan Islamic Center",
    headerLogoUrl: "logo_yayasan.png",
    headerCtaText: "Hubungi Kami",
    headerCtaLink: "https://api.whatsapp.com/send/?phone=+62 852-9222-7887&text&type=phone_number&app_absent=0",
    footerAddress: "Jl. Emy Saelan No. 84, Tatura Selatan, Palu Selatan, Kota Palu, Sulawesi Tengah",
    footerPhone: "+62 852-9222-7887",
    footerEmail: "info@abuthalhah.or.id",
    socialFacebook: "https://facebook.com",
    socialInstagram: "https://instagram.com",
    socialYoutube: "https://youtube.com",
    footerCopyright: "© 2026 Yayasan Islamic Center Abu Thalhah Al Anshari. All rights reserved.",
    updatedAt: Date.now()
  }
};

async function ensureDataSeeded() {
  if (typeof db === 'undefined') return false;
  try {
    const snap = await db.ref('berita').once('value');
    if (!snap.exists() || Object.keys(snap.val() || {}).length === 0) {
      console.log('Database Firebase kosong. Menginjeksi data bawaan otomatis...');
      await Promise.all([
        db.ref('berita').set(initialData.berita),
        db.ref('galeri').set(initialData.galeri),
        db.ref('pengurus').set(initialData.pengurus),
        db.ref('unitPendidikan').set(initialData.unitPendidikan),
        db.ref('tentang').set(initialData.tentang),
        db.ref('beranda').set(initialData.beranda),
        db.ref('header_footer').set(initialData.header_footer)
      ]);
      console.log('Auto-seed berhasil diinjeksi ke Firebase.');
      return true;
    }
  } catch (err) {
    console.warn('Cek auto-seed gagal atau database sudah ada:', err);
  }
  return false;
}
