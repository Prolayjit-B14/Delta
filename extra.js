document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");
    const emailInput = document.getElementById("email-input");
    const testimonialSlider = document.querySelector(".testimonial-slider");
    const testimonials = document.querySelectorAll(".testimonial");

    let index = 0;
    const totalTestimonials = testimonials.length;

    function slideTestimonials() {
        index = (index + 1) % totalTestimonials;
        testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
    }
    setInterval(slideTestimonials, 3000);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (emailInput.value.trim() === "") {
            alert("Please enter a valid email address.");
            return;
        }
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
            form.reset();
        }, 3000);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".testimonial-slider");
    const testimonials = document.querySelectorAll(".testimonial");


    let currentIndex = 0;
    const totalTestimonials = testimonials.length;
    let autoSlideInterval;



    // Ensure each slide takes the full width of the container
    function setSlideWidth() {
        const containerWidth = document.querySelector(".testimonial-container").clientWidth;
        testimonials.forEach(testimonial => {
            testimonial.style.width = `${containerWidth}px`;
        });
        slider.style.width = `${containerWidth * totalTestimonials}px`;
        updateSlider(); // Apply width adjustments
    }


    // Event listeners for navigation buttons
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Auto-slide every 5 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Start auto-slide
    startAutoSlide();

    // Pause auto-slide on hover
    document.querySelector(".testimonial-container").addEventListener("mouseenter", stopAutoSlide);
    document.querySelector(".testimonial-container").addEventListener("mouseleave", startAutoSlide);

    // Adjust widths on window resize
    window.addEventListener("resize", setSlideWidth);
    setSlideWidth(); // Initial call to set proper widths
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent actual form submission

        // Simple Form Validation
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields before submitting!");
            return;
        }

        // Show success message with fade-in effect
        successMessage.style.opacity = "1";
        successMessage.style.transform = "scale(1)";

        // Hide message after 3 seconds with fade-out effect
        setTimeout(() => {
            successMessage.style.opacity = "0";
            successMessage.style.transform = "scale(0.9)";
            setTimeout(() => {
                successMessage.style.display = "none";
                form.reset(); // Clear form fields
            }, 500); // Give time for transition before hiding
        }, 3000);
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");
    const emailInput = document.getElementById("email-input");
    const testimonialSlider = document.querySelector(".testimonial-slider");
    const testimonials = document.querySelectorAll(".testimonial");

    let index = 0;
    const totalTestimonials = testimonials.length;

    function slideTestimonials() {
        index = (index + 1) % totalTestimonials;
        testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
    }
    setInterval(slideTestimonials, 3000);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (emailInput.value.trim() === "") {
            alert("Please enter a valid email address.");
            return;
        }
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
            form.reset();
        }, 3000);
    });
});
