document.addEventListener('DOMContentLoaded', () => {
    // --- Elemen Global ---
    const pinInput = document.getElementById('pin-input');
    const keys = document.querySelectorAll('.key');
    const lockScreen = document.getElementById('lock-screen');
    const mainContent = document.getElementById('main-content'); // Birthday Page
    const profileContent = document.getElementById('profile-content'); // Profile Page
    
    // --- Elemen Memories & Navigasi ---
    const profileButton = document.getElementById('profile-btn'); 
    const backButton = document.getElementById('back-to-main');
    const memoriesButton = document.getElementById('memories-btn');
    const photoGridContainer = document.getElementById('photo-grid-container');
    const closeGridButton = document.getElementById('close-grid-btn'); 
    
    // --- Elemen Read Me (BARU) ---
    const readMeButton = document.getElementById('read-me-btn'); // Tombol Read Me
    const readMeSection = document.getElementById('read-me-section'); // Container Amplop
    const openMeButton = document.getElementById('open-me-btn'); // Tombol Open Me
    const letterPopupContainer = document.getElementById('letter-popup-container'); // Pop-up Surat
    const closeLetterButton = document.getElementById('close-letter-btn'); // Tombol Tutup Surat

    const maxLen = 4;
    const correctPin = "1012";

    // Pastikan konten tersembunyi saat start
    profileContent.style.display = 'none';
    photoGridContainer.style.display = 'none'; 
    letterPopupContainer.style.display = 'none'; // Pop-up Surat
    readMeSection.style.display = 'none'; // Section Amplop


    // --- 1. Logika Lock Screen (PIN) ---
    keys.forEach(key => {
        key.addEventListener('click', () => {
            const buttonText = key.textContent.trim();

            if (buttonText === 'C') { pinInput.value = ''; return; }
            if (buttonText === 'DEL') { pinInput.value = pinInput.value.slice(0, -1); return; }

            if (!isNaN(buttonText) && buttonText !== '') { 
                if (pinInput.value.length < maxLen) { pinInput.value += buttonText; }

                if (pinInput.value.length === maxLen) {
                    if (pinInput.value === correctPin) {
                        alert("Berhasil! PIN Benar. Selamat Datang!");
                        lockScreen.style.display = 'none';
                        mainContent.style.display = 'flex'; 
                    } else {
                        alert("Gagal! PIN Salah. Silakan coba lagi.");
                        pinInput.value = '';
                    }
                }
            }
        });
    });

    // --- 2. Logika Navigasi (Tombol Profile dan Back) ---

    profileButton.addEventListener('click', () => {
        mainContent.style.display = 'none';
        
        // Sembunyikan semua pop-up/section saat pindah ke Profile
        photoGridContainer.style.display = 'none'; 
        readMeSection.style.display = 'none'; 
        letterPopupContainer.style.display = 'none'; 
        
        profileContent.style.display = 'flex';
    });

    backButton.addEventListener('click', () => {
        profileContent.style.display = 'none';
        
        // Sembunyikan amplop saat kembali ke main
        readMeSection.style.display = 'none'; 
        
        mainContent.style.display = 'flex';
    });
    
    // --- 3. Logika Memories (Pop-up Grid) ---

    memoriesButton.addEventListener('click', () => {
        // Sembunyikan amplop dan surat saat buka memori
        readMeSection.style.display = 'none'; 
        letterPopupContainer.style.display = 'none'; 
        
        photoGridContainer.style.display = 'flex'; 
    });
    
    // Logika Menutup Photo Grid (pop-up)
    closeGridButton.addEventListener('click', () => {
        photoGridContainer.style.display = 'none'; 
    });
    
    // --- 4. Logika Read Me (Amplop dan Surat Pop-up) ---

    // Aksi saat tombol Read Me diklik
    readMeButton.addEventListener('click', () => {
        // Toggle (membalik) tampilan section amplop
        const isHidden = readMeSection.style.display === 'none' || readMeSection.style.display === '';
        readMeSection.style.display = isHidden ? 'flex' : 'none';
        
        // Pastikan pop-up lain tersembunyi
        photoGridContainer.style.display = 'none'; 
        letterPopupContainer.style.display = 'none'; 
    });

    // Aksi saat tombol Open Me diklik
    openMeButton.addEventListener('click', () => {
        readMeSection.style.display = 'none'; // Sembunyikan amplop
        letterPopupContainer.style.display = 'flex'; // Tampilkan pop-up surat
    });

    // Aksi saat tombol Close (X) di pop-up surat diklik
    closeLetterButton.addEventListener('click', () => {
        letterPopupContainer.style.display = 'none'; // Sembunyikan pop-up surat
    });
});