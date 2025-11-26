document.addEventListener("DOMContentLoaded", () => {
        gsap.registerPlugin(ScrollTrigger);

    // --- 1. HERO ANIMATION (On Load) ---
    const heroTl = gsap.timeline();

    heroTl.to(".hero-title", {
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2
    })
    .to(".hero-subtitle", {
        opacity: 1,
        y: -10,
        duration: 0.8
    }, "-=0.5")
    .to(".hero-cta", {
        opacity: 1,
        y: -10,
        duration: 0.8
    }, "-=0.6");

    // --- 2. ABOUT TEXT REVEAL (On Scroll) ---
    gsap.from(".reveal-text", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 75%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // --- 3. HORIZONTAL SCROLL SECTION ---
    const races = document.querySelector(".pin-content");
    
    function getScrollAmount() {
        let racesWidth = races.scrollWidth;
        return -(racesWidth - window.innerWidth);
    }

    const tween = gsap.to(races, {
        x: getScrollAmount,
        ease: "none"
    });

    ScrollTrigger.create({
        trigger: ".horizontal-section",
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, // Scroll length matches width
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
    });

    // --- 4. NEW: DROP DOWN ANIMATION FOR MESSAGES & SUPPORT ---
    // Select all elements with the 'drop-anim' class
    const dropItems = document.querySelectorAll('.drop-anim');
    
    dropItems.forEach(item => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%", // Triggers when top of element hits 85% of viewport
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)" // Bouncy drop effect
        });
    });

    // --- 5. STATS COUNTER ANIMATION ---
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 85%",
            once: true,
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: "power1.out"
                });
            }
        });
    });
});