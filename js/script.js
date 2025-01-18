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
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        toggleButton.querySelector('i').classList.add('fa-sun');
        toggleButton.querySelector('i').classList.remove('fa-moon');
    } else {
        document.body.classList.add('dark-mode'); // Default to dark mode
        toggleButton.querySelector('i').classList.add('fa-sun');
        toggleButton.querySelector('i').classList.remove('fa-moon');
    }

    // Typing effect
    const typingElement = document.getElementById('typing');
    const text = "Yasiru Chamuditha, Full-stack Developer, Tutor, Content Creator";
    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    type();
});