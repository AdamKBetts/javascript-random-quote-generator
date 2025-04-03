// Get references to the HTML elements
const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');
const newQuoteButton = document.getElementById('new-quote-button');
const copyQuoteButton = document.getElementById('copy-quote-button');

// API endpoint for random quotes
const apiURL = 'https://thequoteshub.com/api/random-quote';

// Function to fetch a random quote from the API
async function getNewQuote() {
    try {
        quoteElement.classList.add('fade-out'); // Start Fade Out
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for the transition

        // Make the API request using fetch
        const response = await fetch(apiURL);

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Update the HTML with the fetched quote and author
        quoteElement.textContent = data.text;
        authorElement.textContent = `- ${data.author}`;

        quoteElement.classList.remove('fade-out'); // Fade in

    } catch (error) {
        // Handle any errors that occurred during the API request
        console.error('Failed to fetch quote:', error);
        quoteElement.textContent = 'Failed to load quote.';
        authorElement.textContent = '';
        quoteElement.classList.remove('fade-out');
    }
}

// Function to copy the quote to the clipboard
function copyQuote() {
    const quoteText = quoteElement.textContent;

    // Use the Clipboard API to write the text to the clipboard
    navigator.clipboard.writeText(quoteText)
        .then(() => {
            // Provide feedback to the user
            copyQuoteButton.textContent = 'Copied';
            setTimeout(() => {
                copyQuoteButton.textContent = 'Copy Quote';
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy quote:', err);
            alert('Failed to copy quote. Please try again.');
        });
}

// Event listener for the button click
newQuoteButton.addEventListener('click', getNewQuote);
copyQuoteButton.addEventListener('click', copyQuote);

// Fethc an initial quote when the page loads
getNewQuote();