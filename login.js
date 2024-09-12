const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
        

const loginForm = document.querySelector('.sign-in-container form');
const emailInput = loginForm.querySelector('input[type="email"]');
const passwordInput = loginForm.querySelector('input[type="password"]');
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

function isValidEmail(email) {
    return emailPattern.test(email);
}

function showError(input, message) {
    const parent = input.parentElement;
    const error = parent.querySelector('.error-message');
    if (error) {
        error.textContent = message;
    } else {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        parent.appendChild(errorElement);
    }
    input.classList.add('error');
}

function clearError(input) {
    const parent = input.parentElement;
    const error = parent.querySelector('.error-message');
    if (error) {
        error.remove();
    }
    input.classList.remove('error');
}

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    clearError(emailInput);
    clearError(passwordInput);

    if (!email) {
        showError(emailInput, 'Email is required');
        return;
    }

    if (!isValidEmail(email)) {
        showError(emailInput, 'Enter a valid email address');
        return;
    }

    if (!password) {
        showError(passwordInput, 'Password is required');
        return;
    }

    // Redirect to expensetracker.html on successful login
    setTimeout(() => {
        window.location.href = 'expensetracker.html';
    }, 3000);
});