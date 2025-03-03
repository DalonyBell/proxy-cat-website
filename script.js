// Handle donation amount selection
document.addEventListener('DOMContentLoaded', function() {
    // Donation amount buttons
    const amountButtons = document.querySelectorAll('.amount-option');
    const amountInput = document.getElementById('amount');

    if (amountButtons.length && amountInput) {
        amountButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                amountButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // If custom button, focus on input and clear value
                if (this.classList.contains('custom')) {
                    amountInput.value = '';
                    amountInput.focus();
                } else {
                    // Set input value to button amount
                    const amount = this.getAttribute('data-amount');
                    amountInput.value = amount;
                }
            });
        });

        // Clear active state when input is clicked
        amountInput.addEventListener('focus', function() {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            const customButton = document.querySelector('.amount-option.custom');
            if (customButton) {
                customButton.classList.add('active');
            }
        });
    }

    // PayPal Donation form - Set amount before submission
    const paypalDonationForm = document.querySelector('form[action="https://www.paypal.com/donate"]');
    if (paypalDonationForm) {
        paypalDonationForm.addEventListener('submit', function() {
            // Make sure the amount is added to the form
            const amountInput = document.getElementById('amount');
            if (amountInput && amountInput.value) {
                // Set the amount for PayPal
                const hiddenAmountInput = document.createElement('input');
                hiddenAmountInput.type = 'hidden';
                hiddenAmountInput.name = 'amount';
                hiddenAmountInput.value = amountInput.value;
                this.appendChild(hiddenAmountInput);
            }
        });
    }

    // Updates form submission
    const updatesForm = document.querySelector('.updates-form');
    if (updatesForm) {
        updatesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for signing up for updates! You\'ll be notified about Proxy\'s progress.');
            this.reset();
        });
    }

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('This is a demonstration login form. In a real application, you would be authenticated and logged in.');
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fade effect for images on scroll
    const fadeElements = document.querySelectorAll('.image-placeholder');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (elementPosition.top < windowHeight) {
                element.style.opacity = '1';
            }
        });
    }
    
    // Set initial opacity
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease-in-out';
    });
    
    // Check on load and scroll
    window.addEventListener('load', checkFade);
    window.addEventListener('scroll', checkFade);
});