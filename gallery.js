// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. FİLTRELEME SİSTEMİ
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Tüm butonlardan active sınıfını kaldır
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Tıklanan butona active ekle
        this.classList.add('active');
        
        // data-filter attribute'unu al
        const filterValue = this.getAttribute('data-filter');
        
        // Her galeri öğesini kontrol et
        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s';
            } else {
                // Öğenin class'ında aranan kategori var mı?
                if (item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s';
                } else {
                    item.style.display = 'none';
                }
            }
        });
            
            // Kaç tane fotoğraf gösteriliyor?
            updatePhotoCount();
        });
    });
    
    
    // 2. ARAMA SİSTEMİ
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            galleryItems.forEach(item => {
                // Fotoğraf başlığını al
                const title = item.querySelector('.photo-info h3').textContent.toLowerCase();
                // Konum bilgisini al
                const location = item.querySelector('.photo-info p').textContent.toLowerCase();
                
                // Başlık veya konumda arama terimi var mı?
                if (title.includes(searchTerm) || location.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            updatePhotoCount();
        });
    }
    
    
    // 3. SIRALAMA SİSTEMİ
    const sortSelect = document.querySelector('.sort-options select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const gallery = document.querySelector('.gallery-grid');
            const itemsArray = Array.from(galleryItems);
            
            // Sıralama türüne göre işlem yap
            if (sortValue === 'newest') {
                // En yeni - orijinal sıralama
                itemsArray.sort((a, b) => {
                    return 0; // Orijinal sıralama
                });
            } else if (sortValue === 'oldest') {
                // En eski - ters çevir
                itemsArray.reverse();
            } else if (sortValue === 'name') {
                // Ada göre - alfabetik
                itemsArray.sort((a, b) => {
                    const nameA = a.querySelector('.photo-info h3').textContent;
                    const nameB = b.querySelector('.photo-info h3').textContent;
                    return nameA.localeCompare(nameB, 'tr');
                });
            } else if (sortValue === 'location') {
                // Konuma göre - alfabetik
                itemsArray.sort((a, b) => {
                    const locA = a.querySelector('.photo-info p').textContent;
                    const locB = b.querySelector('.photo-info p').textContent;
                    return locA.localeCompare(locB, 'tr');
                });
            }
            
            // Sıralanmış öğeleri tekrar galeri grid'ine ekle
            gallery.innerHTML = '';
            itemsArray.forEach(item => {
                gallery.appendChild(item);
            });
        });
    }
    
    
    // 4. FOTOĞRAF SAYISI GÜNCELLEME
    function updatePhotoCount() {
        const visibleItems = Array.from(galleryItems).filter(item => {
            return item.style.display !== 'none';
        });
        
        const totalCount = galleryItems.length;
        const visibleCount = visibleItems.length;
        
        // Sayfa başlığındaki istatistikleri güncelle
        const statNumber = document.querySelector('.gallery-stats .stat:first-child .stat-number');
        if (statNumber) {
            statNumber.textContent = visibleCount;
        }
    }
    
    
    // 5. MODAL/LIGHTBOX (Fotoğrafa tıklayınca büyük gösterim)
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Modal oluştur
            const modal = document.createElement('div');
            modal.className = 'lightbox-modal';
            
            // Fotoğraf bilgilerini al
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('.photo-info h3').textContent;
            const location = this.querySelector('.photo-info p:first-of-type').textContent;
            const date = this.querySelector('.photo-info p:nth-of-type(2)').textContent;
            
            // Modal içeriği
            modal.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${imgSrc}" alt="${title}">
                    <div class="lightbox-info">
                        <h3>${title}</h3>
                        <p>${location}</p>
                        <p>${date}</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Modal'ı göster
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Kapatma butonuna tıklayınca
            const closeBtn = modal.querySelector('.lightbox-close');
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
            
            // Modal dışına tıklayınca kapat
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                }
            });
        });
    });
    
    
    // 6. BAŞLANGIÇTA FOTOĞRAF SAYISINI GÖSTER
    updatePhotoCount();
});


// FADE IN ANİMASYONU için CSS keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);