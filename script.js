// Basic Animations for Header, Navigation & Footer
gsap.from("h2", { duration: 1, opacity: 0, y: -50, ease: "bounce" });
gsap.from("nav", { duration: 1, opacity: 0, y: -50, ease: "power3.out" });
gsap.from("footer", { duration: 1, opacity: 0, y: 50, ease: "power3.out" });

// Register ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

// Scroll-triggered Animation for Team Section
gsap.to("#team-section", {
    duration: 1.5,
    opacity: 1,
    y: 0,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#team-section",
        start: "top 85%",
    }
});

// Mobile Menu Toggle Function
function toggleMenu() {
    document.querySelector('.mobile-menu').classList.toggle('hidden');
}
