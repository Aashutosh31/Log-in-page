// Wait for the entire HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('login-form');
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

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission

            // Get user input from the form
            const email = document.getElementById('username').value; // Assuming username field is for email
            const password = document.getElementById('password').value;

            // --- LOCAL STORAGE VALIDATION ---
            // Retrieve the stored user data from localStorage
            const storedUser = localStorage.getItem('eCartUser');

            if (!storedUser) {
                showNotification('No account found. Please sign up.', true);
                return;
            }

            // Parse the stored JSON string back into an object
            const userData = JSON.parse(storedUser);

            // Check if the entered email and password match the stored credentials
            if (email === userData.email && password === userData.password) {
                showNotification('Login successful! Redirecting...');
                // Redirect to the dashboard after a short delay
                setTimeout(() => {
                    window.location.href = 'https://aashutosh31.github.io/Table-Tennis/';
                }, 1500);
            } else {
                // If credentials do not match, show an error message
                showNotification('Invalid email or password.', true);
            }
        });
    } else {
        console.error('Login form not found!');
    }
});

