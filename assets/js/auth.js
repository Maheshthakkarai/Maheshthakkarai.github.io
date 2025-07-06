document.addEventListener('DOMContentLoaded', () => {
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const userInfo = document.getElementById('user-info');
    const userEmail = document.getElementById('user-email');
    const logoutButton = document.getElementById('logout-button');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');

    // Check for user's authentication state
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
            userInfo.classList.remove('hidden');
            userEmail.textContent = user.email;
            loginForm.classList.add('hidden');
            signupForm.classList.add('hidden');
        } else {
            // User is signed out.
            userInfo.classList.add('hidden');
            loginForm.classList.remove('hidden');
            signupForm.classList.remove('hidden');
        }
    });

    // Login button event listener
    loginButton.addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                console.error('Login error:', error);
                alert('Error logging in: ' + error.message);
            });
    });

    // Signup button event listener
    signupButton.addEventListener('click', () => {
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        auth.createUserWithEmailAndPassword(email, password)
            .catch(error => {
                console.error('Signup error:', error);
                alert('Error signing up: ' + error.message);
            });
    });

    // Logout button event listener
    logoutButton.addEventListener('click', () => {
        auth.signOut();
    });
});