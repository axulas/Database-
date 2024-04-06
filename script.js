const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

// Handle login endpoint
app.post('/login', async (req, res) => {
    try {
        // Make HTTP GET request to the URL to fetch login results
        const response = await fetch('https://xbox-authenticator.vercel.app/');
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse response JSON
        const loginResults = await response.json();

        // Send back the login results as a styled HTML response
        const styledResponse = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        text-align: center;
                        color: #333;
                    }
                    ul {
                        list-style-type: none;
                        padding: 0;
                    }
                    li {
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Login Results</h1>
                    <ul>
                        ${loginResults.map(result => `<li>${result.username} - ${result.loginSuccess ? 'Success' : 'Failure'} - ${result.loginTime}</li>`).join('')}
                    </ul>
                </div>
            </body>
            </html>
        `;
        res.status(200).send(styledResponse);
    } catch (error) {
        console.error('Error fetching login results:', error.message);
        res.status(500).send('Error fetching login results');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
