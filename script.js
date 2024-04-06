document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Make HTTP POST request to server to fetch login results
        const response = await fetch('/login', {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const loginResults = await response.json();
        const loginResultsElement = document.getElementById('loginResults');
        loginResults.forEach(result => {
            const listItem = document.createElement('li');
            listItem.textContent = `${result.username} - ${result.loginSuccess ? 'Success' : 'Failure'} - ${result.loginTime}`;
            loginResultsElement.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching login results:', error.message);
    }
});
