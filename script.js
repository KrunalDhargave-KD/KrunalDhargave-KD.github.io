// Optional: Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Adjust as needed ('center', 'end')
            });

            // Optional: Close mobile menu if you implement one
        }
    });
});


// Optional: Highlight active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLi = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Adjust offset if you have a sticky header
        const sectionHeight = section.clientHeight;
        // Make activation point slightly lower than the exact top
        const activationOffset = window.innerHeight * 0.4; 

        if (pageYOffset >= (sectionTop - activationOffset) && pageYOffset < (sectionTop + sectionHeight - activationOffset)) {
            current = section.getAttribute('id');
        }
    });

    // Handle edge case for the top of the page (Hero section)
     if (!current && pageYOffset < window.innerHeight * 0.5) {
        current = 'hero';
    }
    
    // Handle edge case for bottom of the page (last section)
    if (!current && (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50) { // Near bottom
        current = sections[sections.length - 1].getAttribute('id');
    }


    navLi.forEach(a => {
        a.classList.remove('active');
        // Check if the link's href matches the current section ID
        if (a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
        }
    });

     // Special case for Contact if it's part of the footer or last section
    if (current === 'contact') {
        const contactLink = document.querySelector('nav ul li a[href="#contact"]');
        if (contactLink) contactLink.classList.add('active');
    }
});

// Initial check in case the page loads scrolled somewhere
window.dispatchEvent(new Event('scroll'));