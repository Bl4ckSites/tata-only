document.addEventListener('DOMContentLoaded', function() {
    // 1. Detecção de origem (back-end + fallback local)
    const detectSocialOrigin = () => {
        fetch('https://tataonly-backend.onrender.com/source')
            .then(response => response.json())
            .then(data => {
                if (data.hide) {
                    hideSocialIcon(data.hide);
                } else {
                    detectOriginLocally();
                }
            })
            .catch(error => {
                console.error('Falha no back-end:', error);
                detectOriginLocally();
            });

        function detectOriginLocally() {
            const urlParams = new URLSearchParams(window.location.search);
            let origin = urlParams.get('origin');
            
            if (!origin) {
                const ua = navigator.userAgent.toLowerCase();
                if (ua.includes('instagram')) origin = 'instagram';
                else if (ua.includes('twitter')) origin = 'twitter';
                else if (ua.includes('facebook')) origin = 'facebook';
                else if (ua.includes('tiktok')) origin = 'tiktok';
            }
            
            if (origin) hideSocialIcon(origin);
        }
    };

    function hideSocialIcon(origin) {
        const socialMap = {
            instagram: '.fa-instagram',
            twitter: '.fa-twitter',
            facebook: '.fa-facebook',
            tiktok: '.fa-tiktok'
        };

        const selector = socialMap[origin];
        if (selector) {
            document.querySelectorAll(selector).forEach(icon => {
                const socialButton = icon.closest('a, button');
                if (socialButton && socialButton.classList.contains('social-btn')) {
                    socialButton.style.display = 'none';
                }
            });
        }
    }

    detectSocialOrigin();

    // --------------------------------------------------------------------------
    // CÓDIGO ORIGINAL (SEM ALTERAÇÕES)
    // --------------------------------------------------------------------------
    
    // 1. Detecção local de origem
    let origin = new URLSearchParams(window.location.search).get('origin');
    if (!origin) {  
        const ua = navigator.userAgent.toLowerCase();  
        if (ua.includes('instagram')) origin = 'instagram';  
        else if (ua.includes('twitter')) origin = 'twitter';  
        else if (ua.includes('facebook')) origin = 'facebook';  
        else if (ua.includes('tiktok')) origin = 'tiktok';  
    }  
    if (origin) {  
        const socialIcons = {  
            instagram: '.fa-instagram',  
            twitter: '.fa-twitter',  
            facebook: '.fa-facebook',  
            tiktok: '.fa-tiktok'  
        };  
        const selector = socialIcons[origin];  
        if (selector) {  
            document.querySelectorAll(selector).forEach(el => {  
                el.closest('a').style.display = 'none';  
            });  
        }  
    }  

    // 2. Tooltip nos botões sociais  
    const socialButtons = document.querySelectorAll('.social-btn');  
    const tooltip = document.createElement('div');  
    tooltip.className = 'social-tooltip';  
    document.body.appendChild(tooltip);  

    socialButtons.forEach(button => {  
        const iconClass = button.querySelector('i').className;  
        let socialName = '';  

        if (iconClass.includes('instagram')) socialName = 'Instagram';  
        else if (iconClass.includes('twitter')) socialName = 'Twitter';  
        else if (iconClass.includes('telegram')) socialName = 'Telegram';  
        else if (iconClass.includes('snapchat')) socialName = 'Snapchat';  

        button.addEventListener('mouseenter', function(e) {  
            tooltip.textContent = socialName;  
            tooltip.style.display = 'block';  

            const rect = button.getBoundingClientRect();  
            tooltip.style.left = `${rect.left + window.scrollX}px`;  
            tooltip.style.top = `${rect.top + window.scrollY - 30}px`;  
        });  

        button.addEventListener('mouseleave', function() {  
            tooltip.style.display = 'none';  
        });  
    });  

    // 3. Funções de som e vibração  
    const clickSound = document.getElementById('clickSound');  

    function playSound() {  
        if (clickSound) {  
            clickSound.currentTime = 0;  
            clickSound.play().catch(e => console.log("Som não pode ser reproduzido:", e));  
        }  
    }  

    function vibrate(element) {  
        element.classList.add('vibrate');  
        setTimeout(() => element.classList.remove('vibrate'), 300);  
    }  

    // 4. Botões de detalhes dos pacotes  
    const detailButtons = document.querySelectorAll('.btn-details');  
    const modals = document.querySelectorAll('.modal');  
    const modalOverlay = document.getElementById('modal-overlay');  

    function openModal(modalId) {  
        playSound();  
        const modal = document.getElementById(modalId);  
        if (modal) {  
            modal.style.display = 'block';  
            modalOverlay.style.display = 'block';  
        }  
    }  

    function closeAllModals() {  
        playSound();  
        modals.forEach(modal => modal.style.display = 'none');  
        modalOverlay.style.display = 'none';  
    }  

    detailButtons.forEach(button => {  
        button.addEventListener('click', () => {  
            vibrate(button);  
            const modalId = button.getAttribute('data-modal');  
            openModal(modalId);  
        });  
    });  

    document.querySelectorAll('.close-modal').forEach(btn => {  
        btn.addEventListener('click', () => {  
            vibrate(btn);  
            closeAllModals();  
        });  
    });  

    modalOverlay.addEventListener('click', closeAllModals);  

    // 5. Efeito de rolagem suave para âncoras  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {  
        anchor.addEventListener('click', function(e) {  
            e.preventDefault();  
            playSound();  
            vibrate(this);  
            const target = document.querySelector(this.getAttribute('href'));  
            if (target) {  
                target.scrollIntoView({ behavior: 'smooth' });  
            }  
        });  
    });  

    // 6. Animação de entrada com IntersectionObserver  
    const observer = new IntersectionObserver((entries) => {  
        entries.forEach(entry => {  
            if (entry.isIntersecting) {  
                entry.target.style.opacity = 1;  
                entry.target.style.transform = 'translateY(0)';  
                entry.target.classList.add('animate-in');  
                if (!entry.target.classList.contains('animated')) {  
                    entry.target.classList.add('pulse', 'animated');  
                    setTimeout(() => entry.target.classList.remove('pulse'), 500);  
                }  
            }  
        });  
    }, { threshold: 0.1 });  

    document.querySelectorAll('.gallery-item, .package-card').forEach(el => {  
        observer.observe(el);  
    });  

    // 7. Efeitos em botões  
    const buttons = document.querySelectorAll('.btn-details, .btn-cta, .btn-buy, .chat-btn');  
    buttons.forEach(button => {  
        button.addEventListener('click', () => {  
            playSound();  
            vibrate(button);  
        });  
    });  

    // 8. ESC fecha modais  
    document.addEventListener('keydown', (e) => {  
        if (e.key === 'Escape') {  
            closeAllModals();  
        }  
    });
});