document.addEventListener('DOMContentLoaded', () => {

    const signupForm = document.getElementById('signup-form');
    const notification = document.getElementById('notification');

    // Function to show a notification message
    function showNotification(message, isError = false) {
        notification.textContent = message;
        notification.style.backgroundColor = isError ? '#e74c3c' : '#2ecc71'; // Red for error, Green for success
        notification.classList.add('show');

        // Hide the notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission

            // Get user input from the form fields
            const fullName = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // --- VALIDATION ---
            // Check if passwords match
            if (password !== confirmPassword) {
                showNotification('Passwords do not match!', true);
                return; // Stop the function if passwords don't match
            }
            
            // Check if a user already exists with this email
            const existingUser = localStorage.getItem('eCartUser');
            if (existingUser && JSON.parse(existingUser).email === email) {
                showNotification('An account with this email already exists.', true);
                return;
            }

            // --- LOCAL STORAGE ---
            // Create a user object to store
            const user = {
                fullName: fullName,
                email: email,
                password: password // In a real app, you should NEVER store plain text passwords. This is for demonstration only.
            };

            // Convert the user object to a JSON string and save it to localStorage
            localStorage.setItem('eCartUser', JSON.stringify(user));

            // Show success message and redirect to the login page
            showNotification('Sign up successful! Please log in.');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    } else {
        console.error('Signup form not found!');
    }
});

