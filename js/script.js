document.addEventListener('DOMContentLoaded', (event) => {
    const toggleButton = document.getElementById('mode-toggle');
    
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Toggle the icon
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Load the user's preference from localStorage
    // Default to light mode if no preference or preference is 'light'
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (toggleButton) { // Ensure toggleButton exists
            const icon = toggleButton.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    } else {
        document.body.classList.remove('dark-mode'); // Ensure light mode is set
        if (toggleButton) { // Ensure toggleButton exists
            const icon = toggleButton.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }

    // Typing effect
    const typingElement = document.getElementById('typing');
    const roles = ["Yasiru Chamuditha", "Full-stack Developer", "Tutor", "Content Creator"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenRoles = 1000;

    function typeRole() {
        if (!typingElement) return; // Exit if element not found

        const currentRole = roles[roleIndex];
        if (isDeleting) {
            // Erase characters
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, delayBetweenRoles / 2); // Pause before typing next role
            } else {
                setTimeout(typeRole, erasingSpeed);
            }
        } else {
            // Type characters
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeRole, delayBetweenRoles); // Pause after typing full role
            } else {
                setTimeout(typeRole, typingSpeed);
            }
        }
    }

    if (typingElement) { // Start typing only if element exists
        setTimeout(typeRole, delayBetweenRoles / 2); // Initial delay
    }
});