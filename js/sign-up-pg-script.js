async function fetchAPI(fMethod, fUrl, hBodyPart) {
    const messageElement = document.getElementById('sign-up-message');
    try {
        const fetchOption = {
            method: fMethod,
            headers: {
                "Content-Type": "application/json",
            }
        };

        if (fMethod !== "GET") {
            fetchOption.body = hBodyPart;
        }

        const response = await fetch(fUrl, fetchOption);
        if (response.ok) {
            const json = await response.json();
            messageElement.innerText = 'Registered successfully!';
            messageElement.style.color = 'green';
        } else {
            messageElement.innerText = 'Registration failed!';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        messageElement.innerText = 'Something went wrong!';
        messageElement.style.color = 'red';
    }
}

document.getElementById('sign-up-form').addEventListener('submit', handleLogin);
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const hBodyPart = JSON.stringify({
        email: email,
        password: password
    });
    
    fetchAPI("POST", "https://reqres.in/api/register", hBodyPart);
}

