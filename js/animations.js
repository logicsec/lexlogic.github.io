document.addEventListener('DOMContentLoaded', () => {
    // Get the about section and its heading
    const aboutSection = document.querySelector('.about-section');
    const heading = aboutSection.querySelector('h2');
    const originalText = heading.textContent;
    
    // Split text into individual spans
    heading.innerHTML = originalText.split('').map(char => {
        return char === ' ' ? ' ' : `<span class="char">${char}</span>`;
    }).join('');

    const chars = heading.querySelectorAll('.char');
    chars.forEach((char, index) => {
        char.style.transitionDelay = `${index * 0.02}s`;
    });

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chars.forEach(char => char.classList.add('visible'));
                aboutSection.classList.add('animate');
            } else {
                chars.forEach(char => char.classList.remove('visible'));
                aboutSection.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.2
    });

    // Start observing the about section
    observer.observe(aboutSection);
});
