// Dark Mode (Karanlık Mod) Sistemi
document.addEventListener('DOMContentLoaded', function() {
    
    // Dark mode butonunu oluştur
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.setAttribute('aria-label', 'Karanlık Mod');
    document.body.appendChild(darkModeToggle);
    
    // Kullanıcının tercihini localStorage'dan kontrol et
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Butona tıklayınca mod değiştir
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // İkon değiştir
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
            
            // Tooltip göster
            showTooltip('Karanlık mod aktif');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
            
            showTooltip('Aydınlık mod aktif');
        }
    });
    
    // Tooltip göster
    function showTooltip(text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'mode-tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            tooltip.classList.remove('show');
            setTimeout(() => {
                tooltip.remove();
            }, 300);
        }, 2000);
    }
    
    // Sistem tercihini dinle (opsiyonel)
    if (window.matchMedia && !localStorage.getItem('theme')) {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (systemPrefersDark.matches) {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
});