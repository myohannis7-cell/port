const menuBtn = document.getElementById("menuBtn");

const navLinks = document.getElementById("navLinks");


// =========================
// LOADING ANIMATION
// =========================

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after page loads
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
    
    // Remove from DOM after animation completes
    setTimeout(() => {
        loadingScreen.remove();
    }, 1500);
});


// =========================
// MOBILE MENU
// =========================

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


const links = document.querySelectorAll(".nav-links a");


links.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


// =========================
// SCROLL REVEAL ANIMATIONS
// =========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay for grid items
            if (entry.target.classList.contains('skill-card') || 
                entry.target.classList.contains('project-card')) {
                const gridItems = entry.target.parentElement.querySelectorAll('.fade-in');
                gridItems.forEach((item, i) => {
                    item.style.setProperty('--delay', i);
                });
            }
            
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));


// =========================
// CONTACT FORM VALIDATION
// =========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const formStatus = document.getElementById('formStatus');

    // Real-time validation
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    subjectInput.addEventListener('blur', () => validateSubject());
    messageInput.addEventListener('blur', () => validateMessage());

    function validateName() {
        const nameError = document.getElementById('nameError');
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            return false;
        }
        nameError.textContent = '';
        return true;
    }

    function validateEmail() {
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        }
        emailError.textContent = '';
        return true;
    }

    function validateSubject() {
        const subjectError = document.getElementById('subjectError');
        if (subjectInput.value.trim().length < 3) {
            subjectError.textContent = 'Subject must be at least 3 characters';
            return false;
        }
        subjectError.textContent = '';
        return true;
    }

    function validateMessage() {
        const messageError = document.getElementById('messageError');
        if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            return false;
        }
        messageError.textContent = '';
        return true;
    }

    contactForm.addEventListener('submit', (e) => {
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            e.preventDefault();
            formStatus.textContent = 'Please fix the errors above';
            formStatus.className = 'form-status error';
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
        formStatus.style.display = 'none';
    });
}


// =========================
// SKILL BAR ANIMATIONS
// =========================

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) {
                const progress = progressBar.getAttribute('data-progress');
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
            }
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => skillObserver.observe(card));


// =========================
// ACTIVE NAVIGATION HIGHLIGHTING
// =========================

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Handle edge case: if at the very top, highlight Home
    if (scrollY < 100) {
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#home') {
                item.classList.add('active');
            }
        });
    }
}

// Listen to scroll events
window.addEventListener('scroll', highlightNavigation);

// Highlight on page load
highlightNavigation();