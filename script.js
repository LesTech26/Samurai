window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
document.querySelector('.video-background').addEventListener('error', function () {
    this.style.display = 'none';
    document.querySelector('.hero-section').style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
});
document.addEventListener('DOMContentLoaded', function () {
    const featureImage = document.getElementById('featureImage');
    const imageWrapper = featureImage.parentElement;

    imageWrapper.addEventListener('mouseenter', function () {
        featureImage.style.transform = 'scale(1.05)';
        imageWrapper.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    });

    imageWrapper.addEventListener('mouseleave', function () {
        featureImage.style.transform = 'scale(1)';
        imageWrapper.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const featureImage = document.getElementById('featureImage');
    const imageWrapper = featureImage.parentElement;

    imageWrapper.addEventListener('mouseenter', function () {
        featureImage.style.transform = 'scale(1.25)';
        imageWrapper.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    });

    imageWrapper.addEventListener('mouseleave', function () {
        featureImage.style.transform = 'scale(1)';
        imageWrapper.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const featureImage = document.getElementById('featureImage');
    const imageWrapper = featureImage.parentElement;
    const fireBorder = document.getElementById('fireBorder');
    const toggleBtn = document.getElementById('toggleFire');
    const intensityBtn = document.getElementById('intensityFire');

    let fireActive = false;
    let highIntensity = false;
    let particles = [];
    let hoverMode = true;

    function createFireParticles() {
        if (!fireActive) return;

        const container = document.querySelector('.fire-frame-container');
        const rect = container.getBoundingClientRect();

        particles.forEach(p => {
            if (p.element && p.element.parentNode) {
                p.element.remove();
            }
        });
        particles = [];
        const particleCount = highIntensity ? 40 : 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'fire-particle';
            let posX, posY;
            const side = Math.floor(Math.random() * 4);
            const pos = Math.random();

            if (side === 0) {
                posX = pos * rect.width;
                posY = 0;
            } else if (side === 1) {
                posX = rect.width;
                posY = pos * rect.height;
            } else if (side === 2) {
                posX = pos * rect.width;
                posY = rect.height;
            } else {
                posX = 0;
                posY = pos * rect.height;
            }

            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;

            const size = 10 + Math.random() * (highIntensity ? 30 : 20);
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            particle.style.animationDuration = `${0.5 + Math.random() * 1.5}s`;
            particle.style.animationDelay = `${Math.random() * 2}s`;

            container.appendChild(particle);
            particles.push({
                element: particle,
                x: posX,
                y: posY
            });
        }
    }

    imageWrapper.addEventListener('mouseenter', function () {
        if (hoverMode) {
            fireActive = true;
            fireBorder.style.display = 'block';
            createFireParticles();
            featureImage.style.transform = 'scale(1.25)';
            imageWrapper.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        }
    });

    imageWrapper.addEventListener('mouseleave', function () {
        if (hoverMode) {
            fireActive = false;
            fireBorder.style.display = 'none';
            particles.forEach(p => {
                if (p.element && p.element.parentNode) {
                    p.element.remove();
                }
            });
            particles = [];
            featureImage.style.transform = 'scale(1)';
            imageWrapper.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        }
    });

    toggleBtn.addEventListener('click', function () {
        hoverMode = !hoverMode;
        if (hoverMode) {
            fireActive = false;
            fireBorder.style.display = 'none';
            particles.forEach(p => {
                if (p.element && p.element.parentNode) {
                    p.element.remove();
                }
            });
            particles = [];
            toggleBtn.textContent = 'Зажги пламень';
        } else {
            fireActive = true;
            fireBorder.style.display = 'block';
            createFireParticles();
            toggleBtn.textContent = 'Вечный пламень';
        }
    });

    intensityBtn.addEventListener('click', function () {
        highIntensity = !highIntensity;
        intensityBtn.textContent = highIntensity ? 'Уменьшить пламя' : 'Усилить пламя';
        if (fireActive) {
            createFireParticles();
        }
        fireBorder.style.animation = 'none';
        setTimeout(() => {
            fireBorder.style.animation = highIntensity ?
                'fire-glow 1s infinite alternate' :
                'fire-glow 2s infinite alternate';
        }, 10);
    });

    toggleBtn.textContent = 'Зажги пламень';
    intensityBtn.textContent = 'Усилить пламя';
});

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card-expandable');

    cards.forEach(card => {
        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-btn';
        card.appendChild(closeBtn);

        card.addEventListener('click', function (e) {
            if (e.target === closeBtn || e.target === closeBtn.firstChild) {
                return;
            }
            if (this.classList.contains('expanded')) {
                closeCard(this);
            } else {
                document.querySelectorAll('.card-expandable.expanded').forEach(closeCard);
                openCard(this);
            }
        });

        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            closeCard(card);
        });
    });

    function openCard(card) {
        card.classList.add('expanded');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }

    function closeCard(card) {
        card.classList.remove('expanded');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.card-expandable.expanded') && document.querySelector('.card-expandable.expanded')) {
            document.querySelectorAll('.card-expandable.expanded').forEach(closeCard);
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.querySelector('.card-expandable.expanded')) {
            document.querySelectorAll('.card-expandable.expanded').forEach(closeCard);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let activeItem = null;

    function activateItem(item) {
        if (activeItem && activeItem !== item) {
            deactivateItem(activeItem);
        }
        item.style.transform = 'scale(1.1)';
        item.style.zIndex = '100';
        item.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
        item.querySelector('.gallery-img').style.filter = 'brightness(1.1)';
        item.querySelector('.gallery-caption').style.bottom = '0';
        item.querySelector('.gallery-caption p').style.opacity = '1';
        item.querySelector('.gallery-caption p').style.transform = 'translateY(0)';

        activeItem = item;
    }

    function deactivateItem(item) {
        item.style.transform = 'scale(1)';
        item.style.zIndex = '1';
        item.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        item.querySelector('.gallery-img').style.filter = 'brightness(1)';
        item.querySelector('.gallery-caption').style.bottom = '-100%';
        item.querySelector('.gallery-caption p').style.opacity = '0';
        item.querySelector('.gallery-caption p').style.transform = 'translateY(20px)';

        if (activeItem === item) {
            activeItem = null;
        }
    }

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            if (window.innerWidth > 767) {
                activateItem(this);
            }
        });

        item.addEventListener('mouseleave', function () {
            if (window.innerWidth > 767) {
                deactivateItem(this);
            }
        });
    });

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 767) {
                if (this === activeItem) {
                    deactivateItem(this);
                } else {
                    activateItem(this);
                }
            }
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 767 && activeItem) {
            deactivateItem(activeItem);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const typingElement = document.getElementById('typing-element');
    const subText = document.getElementById('sub-text');
    const texts = [
        'Самураи - это не просто воины, это воплощение философии, дисциплины и искусства. Их кодекс чести бусидо до сих пор вдохновляет миллионы людей по всему миру.'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function typeWriter() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.innerHTML = currentText.substring(0, charIndex - 1) + '<span class="typing-cursor"></span>';
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeWriter, 500);
            } else {
                setTimeout(typeWriter, 50);
            }
        } else {
            typingElement.innerHTML = currentText.substring(0, charIndex + 1) + '<span class="typing-cursor"></span>';
            charIndex++;

            if (charIndex === currentText.length) {
                if (!isEnd) {
                    isEnd = true;
                }
                isDeleting = true;
                setTimeout(typeWriter, 2000);
            } else {
                setTimeout(typeWriter, 100);
            }
        }
    }

    setTimeout(typeWriter, 500);
});


