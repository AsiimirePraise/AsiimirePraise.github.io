const phrases = [
    { text: "Frontend Developer at MrAssistant", colors: ["#0099ff", "#00d4ff", "#66e0ff", "#ffffff", "#99e6ff"] },
    { text: "Web designer at Hannah's home", colors: ["#00d4ff", "#0099ff", "#ffffff", "#66e0ff", "#99e6ff"] },
    { text: "Web Developer at Manna Harvesters Int Ltd", colors: ["#0099ff", "#ffffff", "#00d4ff", "#66e0ff", "#99e6ff"] },
    { text: "Software engineering student", colors: ["#00d4ff", "#0099ff", "#66e0ff", "#ffffff", "#99e6ff"] },
    { text: "Web Developer at Jojo Enterprise", colors: ["#66e0ff", "#00d4ff", "#0099ff", "#ffffff", "#99e6ff"] },
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function getColorForWord(wordIndex, totalWords) {
    const phrase = phrases[phraseIndex];
    const colorIndex = wordIndex % phrase.colors.length;
    return phrase.colors[colorIndex];
}

function typeWriter() {
    const currentPhrase = phrases[phraseIndex].text;

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    const textToDisplay = currentPhrase.substring(0, charIndex);
    const words = textToDisplay.split(' ');

    let coloredHTML = '';
    let charCount = 0;
    words.forEach((word, index) => {
        if (word) {
            const color = getColorForWord(index, words.length);
            coloredHTML += `<span style="color: ${color}">${word}</span>`;
            charCount += word.length;
            if (index < words.length - 1 && charCount < textToDisplay.length) {
                coloredHTML += ' ';
                charCount++;
            }
        }
    });

    typewriterElement.innerHTML = coloredHTML + '<span class="cursor">|</span>';

    let typeSpeed = 150;

    if (isDeleting) {
        typeSpeed = 75; // Increased from 50
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause before deleting
        typeSpeed = 2500; // Slightly longer pause
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('#about', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 100,
        duration: 1
    });

    // Timeline items animation with stagger (alternating)
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.experience-timeline',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: (index) => index % 2 === 0 ? -100 : 100,
        stagger: 0.25,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Code snippet animation
    gsap.from('.code-snippet-wrapper', {
        scrollTrigger: {
            trigger: '.code-snippet-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 100,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Vanilla JS scroll animations for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        card.classList.add('fade-in-card');
        observer.observe(card);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('fade-in-card');
        observer.observe(card);
    });

    // Observe contact cards
    document.querySelectorAll('.contact-method').forEach(card => {
        card.classList.add('fade-in-card');
        observer.observe(card);
    });

    // Observe social links
    document.querySelectorAll('.social-link').forEach(link => {
        link.classList.add('fade-in-card');
        observer.observe(link);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // Advanced GSAP: Parallax effect for hero image
    gsap.to('.image-wrapper', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        scale: 0.9,
        opacity: 0.8
    });

    // Advanced GSAP: Magnetic hover effect for buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', (e) => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    const titleLines = document.querySelectorAll('.title-line, .title-name');
    titleLines.forEach((line, index) => {
        gsap.from(line, {
            opacity: 0,
            y: 50,
            rotationX: -90,
            transformOrigin: 'top center',
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    gsap.to('.shape-1', {
        y: -30,
        x: 20,
        rotation: 360,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.shape-2', {
        y: 40,
        x: -25,
        rotation: -360,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.shape-3', {
        y: -25,
        x: 30,
        rotation: 180,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    document.querySelectorAll('.skill-badge').forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            gsap.to(badge, {
                scale: 1.1,
                backgroundColor: 'rgba(0, 212, 255, 0.2)',
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });

        badge.addEventListener('mouseleave', () => {
            gsap.to(badge, {
                scale: 1,
                backgroundColor: 'rgba(0, 212, 255, 0.08)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});

// Three.js 3D Background Animation
function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    // Create geometric shapes
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.01,
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.3
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);

        // Rotate the icosahedron
        icosahedron.rotation.x += 0.001;
        icosahedron.rotation.y += 0.002;

        // Follow mouse
        icosahedron.rotation.x += mouseY * 0.0005;
        icosahedron.rotation.y += mouseX * 0.0005;

        // Rotate particles
        particlesMesh.rotation.y += 0.0005;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Particles.js Configuration
function initParticles() {
    if (typeof particlesJS === 'undefined') return;

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00d4ff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.2,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.05,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00d4ff',
                opacity: 0.1,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.3
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// Initialize everything when DOM is ready
window.addEventListener('load', () => {
    initThreeJS();
    initParticles();
});

// Custom Cursor Effect
const cursor = document.querySelector('.custom-cursor');
const cursorTrail = document.querySelector('.cursor-trail');

if (cursor && cursorTrail) {
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth trail follow
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, input, textarea');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: 0 },
            ease: 'power3.inOut'
        });
    });
}

// Konami Code Easter Egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

const secretMessages = [
    "You're a true developer! 🚀 Thanks for exploring my portfolio with such dedication!",
    "Congratulations! You've unlocked the secret developer achievement! 🎮",
    "The Konami Code still works! You're awesome! 💯",
    "Easter Egg Found! You have excellent taste in classic gaming! 🎯"
];

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    const modal = document.getElementById('easterEggModal');
    const secretMessage = document.querySelector('.secret-message');
    const randomMessage = secretMessages[Math.floor(Math.random() * secretMessages.length)];

    secretMessage.textContent = randomMessage;
    modal.classList.add('active');

    // Confetti effect
    createConfetti();

    // Close modal
    const closeBtn = document.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function createConfetti() {
    const colors = ['#00d4ff', '#0099ff', '#00ff88', '#ffffff'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.zIndex = '10001';
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);

        gsap.to(confetti, {
            y: window.innerHeight + 100,
            x: (Math.random() - 0.5) * 200,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: 2 + Math.random() * 2,
            ease: 'power2.out',
            onComplete: () => confetti.remove()
        });
    }
}

// Secret Click Counter Easter Egg on Logo
let logoClicks = 0;
const logo = document.querySelector('.logo');

if (logo) {
    logo.addEventListener('click', () => {
        logoClicks++;

        gsap.to(logo, {
            rotation: 360,
            duration: 0.5,
            ease: 'back.out(1.7)',
            onComplete: () => {
                gsap.set(logo, { rotation: 0 });
            }
        });

        if (logoClicks === 5) {
            const messages = [
                "You clicked me 5 times! Here's a cookie 🍪",
                "5 clicks! You're persistent! 💪",
                "Achievement Unlocked: Logo Clicker! 🎯"
            ];
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];

            const notification = document.createElement('div');
            notification.textContent = randomMsg;
            notification.style.position = 'fixed';
            notification.style.top = '100px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.padding = '20px 40px';
            notification.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.9), rgba(0, 153, 255, 0.9))';
            notification.style.color = '#0a0a0f';
            notification.style.borderRadius = '25px';
            notification.style.fontSize = '1.1rem';
            notification.style.fontWeight = '700';
            notification.style.zIndex = '10000';
            notification.style.boxShadow = '0 10px 40px rgba(0, 212, 255, 0.5)';
            document.body.appendChild(notification);

            gsap.from(notification, {
                y: -100,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });

            gsap.to(notification, {
                y: -100,
                opacity: 0,
                duration: 0.5,
                delay: 3,
                ease: 'power2.in',
                onComplete: () => notification.remove()
            });

            logoClicks = 0;
        }
    });
}

// Live Typing Effect for Code Snippet
function typeCodeSnippet() {
    const codeElement = document.querySelector('.code-content code');
    if (!codeElement) {
        console.log('Code element not found');
        return;
    }

    // Store the original HTML content
    const originalContent = codeElement.innerHTML;

    // Create a wrapper to build content progressively
    const wrapper = document.createElement('span');
    codeElement.innerHTML = '';
    codeElement.appendChild(wrapper);

    // Create cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    codeElement.appendChild(cursor);

    let currentIndex = 0;

    function typeNextChar() {
        if (currentIndex < originalContent.length) {
            const char = originalContent[currentIndex];

            // If we encounter an opening tag
            if (char === '<') {
                const closingBracket = originalContent.indexOf('>', currentIndex);
                if (closingBracket !== -1) {
                    const fullTag = originalContent.substring(currentIndex, closingBracket + 1);

                    // Check if it's a closing tag
                    if (fullTag.startsWith('</')) {
                        // Just append the closing tag to wrapper
                        wrapper.innerHTML += fullTag;
                    } else {
                        // It's an opening tag, append it
                        wrapper.innerHTML += fullTag;
                    }

                    currentIndex = closingBracket + 1;
                } else {
                    currentIndex++;
                }
            } else {
                // Regular character - append to wrapper
                wrapper.innerHTML += char;
                currentIndex++;
            }

            setTimeout(typeNextChar, 10);
        } else {
            // Remove cursor when done
            cursor.remove();
            // Replace wrapper content with final HTML
            codeElement.innerHTML = originalContent;
        }
    }

    // Start typing after a delay
    setTimeout(typeNextChar, 1000);
}

// Initialize typing effect when code snippet is visible
const codeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('Code snippet is visible, starting typing effect');
            typeCodeSnippet();
            codeObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const codeWrapper = document.querySelector('.code-snippet-wrapper');
if (codeWrapper) {
    codeObserver.observe(codeWrapper);
}

// Hidden message on triple click anywhere
let clickCount = 0;
let clickTimer = null;

document.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 3) {
        const hiddenMessages = [
            "Triple click detected! You're thorough! 🔍",
            "Found another secret! Keep exploring! 🎁",
            "You're good at finding hidden features! 🕵️"
        ];

        console.log('%c' + hiddenMessages[Math.floor(Math.random() * hiddenMessages.length)],
            'color: #00d4ff; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');

        clickCount = 0;
    }

    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 500);
});

console.log('%cHey there, curious developer! 👋', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
console.log('%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #00ff88; font-size: 16px;');
console.log('%cOr click the logo 5 times! 😉', 'color: #0099ff; font-size: 16px;');
console.log('%cBuilt with ❤️ by Asiimire Praise', 'color: #ffffff; font-size: 14px;');

function initVanillaTilt() {
    if (typeof VanillaTilt === 'undefined') {
        console.log('VanillaTilt not loaded');
        return;
    }

    const skillCards = document.querySelectorAll('.skill-card');
    VanillaTilt.init(skillCards, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.05,
        transition: true,
        perspective: 1000,
        gyroscope: true
    });

    // Apply tilt to project cards
    const projectCards = document.querySelectorAll('.project-card');
    VanillaTilt.init(projectCards, {
        max: 12,
        speed: 400,
        glare: true,
        'max-glare': 0.4,
        scale: 1.03,
        transition: true,
        perspective: 1000,
        gyroscope: true
    });

    // Apply tilt to timeline cards
    const timelineCards = document.querySelectorAll('.timeline-content');
    VanillaTilt.init(timelineCards, {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.02,
        transition: true,
        perspective: 1000
    });

    // Apply tilt to contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    VanillaTilt.init(contactMethods, {
        max: 20,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
        scale: 1.08,
        transition: true,
        perspective: 800
    });

    // Apply tilt to code snippet
    const codeSnippet = document.querySelector('.code-snippet-wrapper');
    if (codeSnippet) {
        VanillaTilt.init(codeSnippet, {
            max: 8,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
            scale: 1.02,
            transition: true,
            perspective: 1200
        });
    }

    // Apply subtle tilt to hero image
    const heroImage = document.querySelector('.image-wrapper');
    if (heroImage) {
        VanillaTilt.init(heroImage, {
            max: 5,
            speed: 600,
            glare: false,
            scale: 1.02,
            transition: true,
            perspective: 1500
        });
    }

    console.log('Vanilla Tilt initialized on cards');
}

// Initialize Vanilla Tilt after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initVanillaTilt, 500);
});
