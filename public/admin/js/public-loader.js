// admin/js/public-loader.js - Dynamic Public Data Loader
// Realtime syncs Firebase data to Public HTML pages (Header, Footer, & Beranda)

function extractYoutubeId(urlOrId) {
  if (!urlOrId || typeof urlOrId !== 'string') return '';
  urlOrId = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) return urlOrId;
  const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : '';
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof firebase === 'undefined') return;

  try {
    const db = firebase.database();

    // 1. Sync Header & Footer across all pages
    function applyHeaderFooter(d) {
      if (!d) return;
      
      const brandSubtitle = d.headerBrandSubtitle || d.siteName;
      if (brandSubtitle) {
        document.querySelectorAll('.footer-brand-subtitle, .site-title-text').forEach(el => {
          el.textContent = brandSubtitle;
        });
      }

      const logoUrl = d.headerLogoUrl || d.logoHeader;
      if (logoUrl) {
        document.querySelectorAll('header img[alt*="Logo"], footer img[alt*="Logo"], .header-logo-img, .footer-logo-img').forEach(img => {
          img.src = logoUrl;
        });
      }

      const ctaText = d.headerCtaText;
      const ctaLink = d.headerCtaLink || d.whatsapp;
      if (ctaText || ctaLink) {
        document.querySelectorAll('header a[href*="whatsapp"], header a[href*="wa.me"]').forEach(btn => {
          if (ctaLink) {
            btn.href = ctaLink.startsWith('http') ? ctaLink : `https://wa.me/${ctaLink.replace(/[^0-9]/g, '')}`;
          }
          const span = btn.querySelector('span') || btn.querySelector('.header-phone');
          if (span && ctaText) span.textContent = ctaText;
        });
      }

      const address = d.footerAddress || d.address;
      if (address) {
        document.querySelectorAll('.footer-address-text, .header-address').forEach(el => { el.textContent = address; });
        document.querySelectorAll('footer li').forEach(li => {
          if (li.querySelector('path[d*="M17.657"]')) {
            const span = li.querySelector('span');
            if (span) span.textContent = address;
          }
        });
      }

      const phone = d.footerPhone || d.phone;
      if (phone) {
        document.querySelectorAll('.footer-phone-text, .header-phone').forEach(el => { el.textContent = phone; });
        document.querySelectorAll('footer li').forEach(li => {
          if (li.querySelector('path[d*="M3 5a2"]')) {
            const span = li.querySelector('span');
            if (span) span.textContent = phone;
          }
        });
      }

      const email = d.footerEmail || d.email;
      if (email) {
        document.querySelectorAll('.footer-email-text, .header-email').forEach(el => { el.textContent = email; });
        document.querySelectorAll('footer li').forEach(li => {
          if (li.querySelector('path[d*="M3 8l7.89"]')) {
            const span = li.querySelector('span');
            if (span) span.textContent = email;
          }
        });
      }

      const fb = d.socialFacebook || d.facebook;
      if (fb) {
        document.querySelectorAll('.footer-social-fb, a[aria-label="Facebook"]').forEach(el => { el.href = fb; });
      }

      const ig = d.socialInstagram || d.instagram;
      if (ig) {
        document.querySelectorAll('.footer-social-ig, a[aria-label="Instagram"]').forEach(el => { el.href = ig; });
      }

      const yt = d.socialYoutube || d.youtube;
      if (yt) {
        document.querySelectorAll('.footer-social-yt, a[aria-label="YouTube"]').forEach(el => { el.href = yt; });
      }

      const copyright = d.footerCopyright;
      if (copyright) {
        document.querySelectorAll('.footer-copyright-text').forEach(el => { el.textContent = copyright; });
        document.querySelectorAll('footer p').forEach(p => {
          if (p.textContent.includes('All rights reserved')) p.textContent = copyright;
        });
      }
    }

    db.ref('header_footer').on('value', snap => {
      if (snap.exists()) applyHeaderFooter(snap.val());
    });
    db.ref('headerFooter').on('value', snap => {
      if (snap.exists()) applyHeaderFooter(snap.val());
    });

    // 2. Sync Beranda (Home Page)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '') {
      db.ref('beranda').on('value', snap => {
        if (!snap.exists()) return;
        const d = snap.val();

        // Hero Video Background
        if (d.heroVideoUrl) {
          const ytId = extractYoutubeId(d.heroVideoUrl);
          const iframe = document.getElementById('heroYoutubeIframe');
          if (iframe && ytId) {
            const embedUrl = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&rel=0&modestbranding=1&playsinline=1&vq=hd1080&hd=1`;
            if (iframe.src !== embedUrl) {
              iframe.src = embedUrl;
            }
          }
        }

        // Hero Text & Buttons
        const heroSubEl = document.querySelector('.home-hero-subtitle');
        if (heroSubEl && d.heroSubtitle) heroSubEl.textContent = d.heroSubtitle;

        const heroTitleEl = document.querySelector('.home-hero-title');
        if (heroTitleEl && d.heroTitle) {
          let titleFormatted = d.heroTitle;
          if (!titleFormatted.includes('<br') && !titleFormatted.includes('<BR')) {
            titleFormatted = titleFormatted.replace(/ (Abu Thalhah)/i, '<br /> $1');
          }
          heroTitleEl.innerHTML = titleFormatted;
        }

        const heroDescEl = document.querySelector('.home-hero-desc');
        if (heroDescEl && d.heroDesc) heroDescEl.textContent = d.heroDesc;

        const cta1Btn = document.getElementById('heroCta1Btn');
        if (cta1Btn) {
          if (d.heroCta1Text) cta1Btn.textContent = d.heroCta1Text;
          if (d.heroCta1Link) cta1Btn.href = d.heroCta1Link;
        }

        const cta2Btn = document.getElementById('heroCta2Btn');
        if (cta2Btn) {
          if (d.heroCta2Text) cta2Btn.textContent = d.heroCta2Text;
          if (d.heroCta2Link) cta2Btn.href = d.heroCta2Link;
        }

        // Sambutan Pimpinan
        const pimpinanNama = document.getElementById('pimpinanNamaText');
        if (pimpinanNama && d.pimpinanNama) pimpinanNama.textContent = d.pimpinanNama;

        const pimpinanJabatan = document.getElementById('pimpinanJabatanText');
        if (pimpinanJabatan && d.pimpinanJabatan) pimpinanJabatan.textContent = d.pimpinanJabatan;

        const pimpinanFoto = document.getElementById('pimpinanFotoImg');
        if (pimpinanFoto && d.pimpinanFoto) pimpinanFoto.src = d.pimpinanFoto;

        const pimpinanSambutan = document.getElementById('pimpinanSambutanText');
        if (pimpinanSambutan && d.sambutanHtml) pimpinanSambutan.innerHTML = d.sambutanHtml;

        // Stat Counters
        const statSantriEl = document.querySelector('.stat-santri');
        if (statSantriEl && d.statSantri) statSantriEl.textContent = d.statSantri;

        const statPengajarEl = document.querySelector('.stat-pengajar');
        if (statPengajarEl && d.statPengajar) statPengajarEl.textContent = d.statPengajar;

        const statUnitEl = document.querySelector('.stat-unit');
        if (statUnitEl && d.statUnit) statUnitEl.textContent = d.statUnit;

        const statHafizEl = document.querySelector('.stat-hafiz');
        if (statHafizEl && d.statHafiz) statHafizEl.textContent = d.statHafiz;

        // Beranda Unit Cards (from Pengaturan Beranda)
        const unitGrid = document.getElementById('homeUnitGrid');
        if (unitGrid) {
          const cards = unitGrid.querySelectorAll('.relative.bg-white');
          if (cards[0]) {
            if (d.unit1Nama) {
              const h3 = cards[0].querySelector('h3');
              if (h3) h3.textContent = d.unit1Nama;
            }
            if (d.unit1Desc) {
              const p = cards[0].querySelector('p');
              if (p) p.textContent = d.unit1Desc;
            }
            if (d.unit1Logo) {
              const logoBox = cards[0].querySelector('.absolute.top-0');
              if (logoBox) {
                logoBox.innerHTML = `<img src="${d.unit1Logo}" alt="${d.unit1Nama || ''}" class="w-12 h-12 object-contain rounded-full" onerror="this.onerror=null;this.src='/logo_yayasan.png'">`;
              }
            }
          }
          if (cards[1]) {
            if (d.unit2Nama) {
              const h3 = cards[1].querySelector('h3');
              if (h3) h3.textContent = d.unit2Nama;
            }
            if (d.unit2Desc) {
              const p = cards[1].querySelector('p');
              if (p) p.textContent = d.unit2Desc;
            }
            if (d.unit2Logo) {
              const logoBox = cards[1].querySelector('.absolute.top-0');
              if (logoBox) {
                logoBox.innerHTML = `<img src="${d.unit2Logo}" alt="${d.unit2Nama || ''}" class="w-12 h-12 object-contain rounded-full" onerror="this.onerror=null;this.src='/logo_yayasan.png'">`;
              }
            }
          }
        }
      });

      // 3. Realtime Sync Beranda Berita
      db.ref('berita').on('value', snap => {
        if (!snap.exists()) return;
        const items = [];
        snap.forEach(child => {
          items.push({ id: child.key, ...child.val() });
        });
        if (items.length === 0) return;

        // Sort items by createdAt descending (newest first)
        items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

        const isAstro = !window.location.pathname.endsWith('.html');
        const detailPrefix = isAstro ? '/detail-berita?id=' : 'detail-berita.html?id=';

        // 3a. Featured News (#1 Item)
        const feat = items[0];
        const featCard = document.getElementById('homeFeaturedNews');
        if (featCard && feat) {
          featCard.href = `${detailPrefix}${feat.id}`;
          const img = featCard.querySelector('img');
          const featImg = feat.image || feat.imageUrl || '/siswi-berprestasii.png';
          if (img) {
            img.src = featImg;
            img.alt = feat.title || '';
          }
          const badge = featCard.querySelector('.absolute');
          if (badge && feat.category) badge.textContent = feat.category;
          const dateEl = featCard.querySelector('.font-poppins span:first-child');
          if (dateEl && feat.date) {
            dateEl.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> ${feat.date}`;
          }
          const authorEl = featCard.querySelector('.font-poppins span:last-child');
          if (authorEl && feat.author) {
            authorEl.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> ${feat.author}`;
          }
          const titleEl = featCard.querySelector('h3');
          if (titleEl && feat.title) titleEl.textContent = feat.title;
          const descEl = featCard.querySelector('p');
          const excerptText = feat.excerpt || (feat.body ? feat.body.replace(/<[^>]+>/g, '').substring(0, 150) + '...' : '');
          if (descEl && excerptText) descEl.textContent = excerptText;
        }

        // 3b. List News (#2, #3, #4 Items)
        const listContainer = document.getElementById('homeNewsList');
        if (listContainer && items.length > 1) {
          const listItems = items.slice(1, 4);
          let html = '';
          listItems.forEach(item => {
            const itemImg = item.image || item.imageUrl || '/cta-image.png';
            html += `
              <a href="${detailPrefix}${item.id}" class="flex gap-6 group cursor-pointer border-b border-gray-100 pb-6 block">
                  <div class="w-1/3 aspect-video rounded-sm overflow-hidden shrink-0 border border-gray-200 relative bg-gray-100">
                      <img src="${itemImg}"
                          alt="${item.title || ''}"
                          class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                          onerror="this.src='/logo_yayasan.png';this.style.objectFit='contain';this.style.padding='8px'">
                  </div>
                  <div class="flex flex-col justify-start">
                      <div class="text-xs font-bold uppercase tracking-wider mb-2" style="color: #107163 !important;">
                          ${item.category || 'Berita'}
                      </div>
                      <h4 class="font-sora font-bold text-gray-900 text-lg group-hover:text-smanti-red transition-colors line-clamp-2 mb-2">
                          ${item.title || ''}
                      </h4>
                      <p class="text-gray-500 text-xs flex items-center gap-1 font-poppins">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          ${item.date || ''}
                      </p>
                  </div>
              </a>
            `;
          });
          listContainer.innerHTML = html;
        }
      });

      // 4. Realtime Sync Beranda Galeri
      db.ref('galeri').on('value', snap => {
        if (!snap.exists()) return;
        const galeriItems = [];
        snap.forEach(child => {
          galeriItems.push({ id: child.key, ...child.val() });
        });
        if (galeriItems.length === 0) return;

        // Sort items by createdAt descending (newest first)
        galeriItems.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

        const galeriGrid = document.getElementById('homeGalleryGrid');
        if (galeriGrid) {
          const top3 = galeriItems.slice(0, 3);
          let html = '';
          top3.forEach(item => {
            const itemUrl = item.url || item.imageUrl || '/siswi-berprestasii.png';
            const itemCaption = item.caption || item.title || 'Foto Galeri';
            html += `
              <div class="group relative bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <div class="relative aspect-[4/3] overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img src="${itemUrl}" alt="${itemCaption}"
                          class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          onerror="this.src='/logo_yayasan.png';this.style.objectFit='contain';this.style.padding='16px'">
                      <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <span class="inline-block px-2 py-1 text-white text-xs font-bold uppercase tracking-wider mb-2 rounded-sm" style="background-color: #107163 !important;">${item.category || 'Galeri'}</span>
                      <h3 class="font-sora font-bold text-lg text-white mb-1 line-clamp-2">
                          ${itemCaption}</h3>
                      <p class="text-gray-300 text-xs font-poppins">${item.date || ''}</p>
                  </div>
              </div>
            `;
          });
          galeriGrid.innerHTML = html;
        }
      });
    }

    // 5. Realtime Sync Halaman Unit Pendidikan (/unit-pendidikan)
    const unitPageContainer = document.getElementById('unitPendidikanContainer');
    if (unitPageContainer) {
      db.ref('unitPendidikan').on('value', snap => {
        if (!snap.exists()) return;
        const unitItems = [];
        snap.forEach(child => {
          unitItems.push({ id: child.key, ...child.val() });
        });
        if (unitItems.length === 0) return;
        unitItems.sort((a, b) => (a.urutan || 99) - (b.urutan || 99));

        let html = '';
        unitItems.forEach((u, idx) => {
          const isReverse = idx % 2 === 1;
          const flexDirClass = isReverse ? 'md:flex-row-reverse' : 'md:flex-row';
          const delayClass = isReverse ? 'delay-400' : 'delay-200';
          const imgUrl = u.gambar ? u.gambar : '/logo_yayasan.png';
          const badgeText = u.jenjang || 'UNIT PENDIDIKAN';
          
          html += `
            <div class="group flex flex-col ${flexDirClass} items-center gap-10 lg:gap-16 bg-surface-container-lowest rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm border border-surface-container-highest/50 hover:shadow-md hover:border-primary/20 transition-all duration-300 animate-on-scroll ${delayClass} is-visible">
                <div class="w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-2xl">
                    <img alt="${u.nama || ''}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" src="${imgUrl}" onerror="this.src='/logo_yayasan.png';this.style.objectFit='contain';this.style.padding='24px'">
                </div>
                <div class="w-full md:w-1/2 flex flex-col items-start text-left">
                    <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-md uppercase tracking-wider mb-6">
                        ${badgeText}
                    </span>
                    <h2 class="font-headline-lg text-primary-container mb-6 leading-tight md:text-4xl font-bold">
                        ${u.nama || ''}
                    </h2>
                    <p class="font-body-lg text-on-surface-variant text-body-lg">
                        ${u.deskripsi || ''}
                    </p>
                </div>
            </div>
          `;
        });
        unitPageContainer.innerHTML = html;
      });
    }

  } catch (err) {
    console.warn('Firebase Public Loader:', err);
  }
});
