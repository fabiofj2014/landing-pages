// Mobile menu
let isMenuOpen = false;
const RESPONSIVE_WIDTH = 1024;

function toggleHeader() {
    const header = document.getElementById("collapsed-header-items");
    const btn = document.getElementById("collapse-btn");
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        header.style.width = "80vw";
        header.style.opacity = "1";
        btn.classList.remove("bi-list");
        btn.classList.add("bi-x-lg");
        
        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', closeMenuOnClickOutside);
        }, 100);
    } else {
        closeMenu(header, btn);
    }
}

function closeMenu(header, btn) {
    header.style.width = "0";
    header.style.opacity = "0";
    btn.classList.remove("bi-x-lg");
    btn.classList.add("bi-list");
    document.removeEventListener('click', closeMenuOnClickOutside);
}

function closeMenuOnClickOutside(e) {
    const header = document.getElementById("collapsed-header-items");
    const btn = document.getElementById("collapse-btn");
    
    if (!header.contains(e.target) && !btn.contains(e.target)) {
        isMenuOpen = false;
        closeMenu(header, btn);
    }
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Initial reveal animation
gsap.set(".reveal-up", {
    opacity: 0,
    y: "50px"
});

// Reveal sections on scroll
const sections = gsap.utils.toArray("section");
sections.forEach((section) => {
    const elements = section.querySelectorAll(".reveal-up");
    
    gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse"
        }
    });
});

// Dashboard animation
gsap.to("#dashboard", {
    boxShadow: "0px 15px 25px -5px rgba(126, 34, 206, 0.4)",
    scale: 1,
    translateY: 0,
    rotateX: "0deg",
    duration: 1,
    scrollTrigger: {
        trigger: "#hero-section",
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1
    }
});

// Responsive adjustments
function handleResize() {
    if (window.innerWidth >= RESPONSIVE_WIDTH) {
        const header = document.getElementById("collapsed-header-items");
        header.style.width = "";
        header.style.opacity = "";
    }
}

window.addEventListener("resize", handleResize);
