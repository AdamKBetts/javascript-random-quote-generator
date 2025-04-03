// Get references to the HTML elements
const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');
const newQuoteButton = document.getElementById('new-quote-button');
const copyQuoteButton = document.getElementById('copy-quote-button');
const shareTwitterButton = document.getElementById('share-twitter');
const shareFacebookButton = document.getElementById('share-facebook');
const loadingMessageElement = document.getElementById('loading-message');

// API endpoint for random quotes
const apiURL = 'https://thequoteshub.com/api/random-quote';

const LOCAL_STORAGE_QUOTE_KEY = 'lastDisplayedQuote';
const LOCAL_STORAGE_AUTHOR_KEY = 'lastDisplayedAuthor';

let lastDisplayedQuote = null; // Variable to store the last displayed quote

// Function to fetch a random quote from the API
async function getNewQuote() {
    try {
        // Show loading message and hide quote/author
        loadingMessageElement.style.display = 'inline';
        quoteElement.style.display = 'none';
        authorElement.style.display = 'none';

        quoteElement.classList.add('fade-out'); // Start Fade Out
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for the transition

        let newQuoteData;
        let attempts = 0;
        const maxAttempts = 5; // To prevent potential infinite loops

        do {
            // Make the API request using fetch
            const response = await fetch(apiURL);

            // Check if the request was successful (status code 200)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the JSON response
            newQuoteData = await response.json();
            attempts++;

            // Check if the new quote is the same as the last one
            if (newQuoteData.quote === lastDisplayedQuote && attempts < maxAttempts) {
                console.log("Duplicate quote found, fetching another one...");
                await new Promise(resolve => setTimeout(resolve, 200));
            } else {
                break;
            }
        } while (true);

        const quote = newQuoteData.text; 
        const author = newQuoteData.author;

        // Update the HTML with the fetched quote and author
        quoteElement.textContent = quote;
        authorElement.textContent = `- ${author}`;

        // Store the new quote and author in local storage
        localStorage.setItem(LOCAL_STORAGE_QUOTE_KEY, quote);
        localStorage.setItem(LOCAL_STORAGE_AUTHOR_KEY, author);

        // Update the last displayed quote
        lastDisplayedQuote = quote;

        quoteElement.classList.remove('fade-out'); // Fade in

        // Hide loading message and show quote/author
        loadingMessageElement.style.display = 'none';
        quoteElement.style.display = 'block';
        authorElement.style.display = 'block';

    } catch (error) {
        // Handle any errors that occurred during the API request
        console.error('Failed to fetch quote:', error);
        quoteElement.textContent = 'Failed to load quote.';
        authorElement.textContent = '';
        quoteElement.classList.remove('fade-out');

        // Hide loading message and show error message
        loadingMessageElement.style.display = 'none';
        quoteElement.style.display = 'block';
        authorElement.style.display = 'block';
    }
}

// Function to load the last displayed qupte from local storage
function loadLastQuote() {
    const lastQuote = localStorage.getItem(LOCAL_STORAGE_QUOTE_KEY);
    const lastAuthor = localStorage.getItem(LOCAL_STORAGE_AUTHOR_KEY);

    if (lastQuote && lastAuthor) {
        quoteElement.textContent = lastQuote;
        authorElement.textContent = `- ${lastAuthor}`;
        quoteElement.style.display = 'block';
        authorElement.style.display = 'block';
        lastDisplayedQuote = lastQuote; // Set the initial last displayed quote
    } else {
        // If no quote in local storage, fetch a new one initially
        getNewQuote();
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

function shareOnTwitter() {
    const quote = quoteElement.textContent;
    const author = authorElement.textContent;
    const tweetText = `${quote} ${author}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank');
}

function shareOnFacebook() {
    const quote = quoteElement.textContent;
    const author = authorElement.textContent;
    const quoteText = `${quote} ${author}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(quoteText)}`;
    window.open(facebookUrl, '_blank');
}

// Event listener for the button click
newQuoteButton.addEventListener('click', getNewQuote);
copyQuoteButton.addEventListener('click', copyQuote);
shareTwitterButton.addEventListener('click', shareOnTwitter);
shareFacebookButton.addEventListener('click', shareOnFacebook);

// Fethc an initial quote when the page loads
loadLastQuote();