// GSAP Animations
gsap.from("h2", { duration: 1, opacity: 0, y: -50, ease: "bounce" });
gsap.from(".navbar", { duration: 1, opacity: 0, y: -50, ease: "power3.out" });
gsap.from("footer", { duration: 1, opacity: 0, y: 50, ease: "power3.out" });

// Scroll-triggered animations
gsap.registerPlugin(ScrollTrigger);

gsap.to("#featured-projects", {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#featured-projects",
        start: "top 80%", 
    }
});

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
