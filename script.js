// Get references to the HTML elements
const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');
const newQuoteButton = document.getElementById('new-quote-button');

// API endpoint for random quotes
const apiURL = 'https://thequoteshub.com/api/random-quote';

// Function to fetch a random quote from the API
async function getNewQuote() {
    try {
        // Show a loading message while fetching
        quoteElement.textContent = 'Loading...';
        authorElement.textContent = '';

        // Make the API request using fetch
        const response = await fetch(apiURL);

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Extract the quote and author from the data
        const quote = data.text;
        const author = data.author;

        // Update the HTML with the fetched quote and author
        quoteElement.textContent = quote;
        authorElement.textContent = `- ${author}`;

    } catch (error) {
        // Handle any errors that occurred during the API request
        console.error('Failed to fetch quote:', error);
        quoteElement.textContent = 'Failed to load quote.';
        authorElement.textContent = '';
    }
}

// Event listener for the button click
newQuoteButton.addEventListener('click', getNewQuote);

// Fethc an initial quote when the page loads
getNewQuote();