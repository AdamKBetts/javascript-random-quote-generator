// Get references to the HTML elements
const quoteElement = document.querySelector('.quote'); // Selects the paragraph element that will display the quote
const authorElement = document.querySelector('.author'); // Selects the paragraph element that will display the author
const newQuoteButton = document.getElementById('new-quote-button'); // Selects the button to fetch a new quote
const copyQuoteButton = document.getElementById('copy-quote-button'); // Selects the button to copy the quote
const shareTwitterButton = document.getElementById('share-twitter'); // Selects the button to share on Twitter
const shareFacebookButton = document.getElementById('share-facebook'); // Selects the button to share on Facebook
const loadingMessageElement = document.getElementById('loading-message'); // Selects the element to display the loading message

// API endpoint for random quotes
const apiURL = 'https://thequoteshub.com/api/random-quote'; // The URL of the API that provides random quotes

// Keys for storing the last displayed quote and author in local storage
const LOCAL_STORAGE_QUOTE_KEY = 'lastDisplayedQuote';
const LOCAL_STORAGE_AUTHOR_KEY = 'lastDisplayedAuthor';

let lastDisplayedQuote = null; // Variable to store the text of the last displayed quote, used to prevent duplicates

// Function to handle the loading state of the quote display
function setLoading(isLoading) {
    loadingMessageElement.style.display = isLoading ? 'inline' : 'none'; // Show loading message if isLoading is true, otherwise hide it
    quoteElement.style.display = isLoading ? 'none' : 'block'; // Hide quote if isLoading is true, otherwise show it
    authorElement.style.display = isLoading ? 'none' : 'block'; // Hide author if isLoading is true, otherwise show it
}

// Function to fetch a new quote from the API
async function fetchQuoteData() {
    const response = await fetch(apiURL); // Make an asynchronous request to the API
    if (!response.ok) {
        throw new Error (`HTTP error! status: ${response.status}`); // If the response status is not OK (e.g., 404, 500), throw an error
    }
    return await response.json(); // Parse the JSON response and return the data
}

// Function to update the quote and author in the UI
function updateQuoteDisplay(quote, author) {
    quoteElement.textContent = quote; // Set the text content of the quote element
    authorElement.textContent = `- ${author}`; // Set the text content of the author element, adding a hyphen
}

// Function to handle the fade out animation of the quote
function fadeOutQuote() {
    return new Promise(resolve => {
        quoteElement.classList.add('fade-out'); // Add the fade-out class to trigger the CSS animation
        setTimeout(() => {
            resolve(); // Resolve the promise after the animation duration (500ms)
        }, 500);
    });
}

// Function to handle the fade in animation of the quote
function fadeInQuote() {
    quoteElement.classList.remove('fade-out'); // Remove the fade-out class to trigger the CSS animation (which will be a fade-in due to the transition)
}

// Modified getNewQuote function - fetches and displays a new random quote
async function getNewQuote() {
    try {
        setLoading(true); // Show the loading message and hide the quote/author

        await fadeOutQuote(); // Fade out the current quote

        let newQuoteData; // Variable to store the data of the newly fetched quote
        let attempts = 0; // Counter for the number of attempts to fetch a unique quote
        const maxAttempts = 5; // Maximum number of attempts to fetch a non-duplicate quote

        do {
            newQuoteData = await fetchQuoteData(); // Fetch a new quote from the API
            attempts++; // Increment the attempt counter

            // Check if the new quote is the same as the last displayed quote and if we haven't reached the maximum attempts
            if (newQuoteData.text === lastDisplayedQuote && attempts < maxAttempts) {
                console.log("Duplicate quote found, fetching another one...");
                await new Promise (resolve => setTimeout(resolve, 200)); // Wait for a short delay before fetching again
            } else {
                break; // Exit the loop if the quote is different or max attempts reached
            }
        } while (true);

        const quote = newQuoteData.text; // Extract the quote text from the API response
        const author = newQuoteData.author; // Extract the author from the API response

        updateQuoteDisplay(quote, author); // Update the quote and author in the UI

        // Store the new quote and author in local storage
        localStorage.setItem(LOCAL_STORAGE_QUOTE_KEY, quote);
        localStorage.setItem(LOCAL_STORAGE_AUTHOR_KEY, author);

        // Update the last displayed quote
        lastDisplayedQuote = quote;

        fadeInQuote(); // Fade in the new quote

        setLoading(false); // Hide the loading message and show the quote/author

    } catch (error) {
        // Handle any errors that occurred during the API request
        console.error('Failed to fetch quote:', error);
        setLoading(false); // Hide loading message even if there's an error
        quoteElement.classList.remove('fade-out'); // Ensure fade-out class is removed

        // Check for specific error types that might indicate no internet connection
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            quoteElement.textContent = 'No internet connection. Please check your network and try again.';
        } else {
            quoteElement.textContent = 'Failed to load quote.';
        }
        authorElement.textContent = '';
        quoteElement.style.display = 'block';
        authorElement.style.display = 'block';
    }
}

// Function to load the last displayed quote from local storage when the page loads
function loadLastQuote() {
    const lastQuote = localStorage.getItem(LOCAL_STORAGE_QUOTE_KEY); // Get the last quote from local storage
    const lastAuthor = localStorage.getItem(LOCAL_STORAGE_AUTHOR_KEY); // Get the last author from local storage

    if (lastQuote && lastAuthor) {
        quoteElement.textContent = lastQuote; // Display the last quote
        authorElement.textContent = `- ${lastAuthor}`; // Display the last author
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
    const quoteText = quoteElement.textContent; // Get the current quote text

    // Use the Clipboard API to write the text to the clipboard
    navigator.clipboard.writeText(quoteText)
        .then(() => {
            // Provide feedback to the user
            copyQuoteButton.textContent = 'Copied'; // Temporarily change the button text
            setTimeout(() => {
                copyQuoteButton.textContent = 'Copy Quote'; // Revert the button text after 2 seconds
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy quote:', err);
            alert('Failed to copy quote. Please try again.');
        });
}

// Function to share the current quote on Twitter
function shareOnTwitter() {
    const quote = quoteElement.textContent; // Get the current quote text
    const author = authorElement.textContent; // Get the current author text
    const tweetText = `${quote} ${author}`; // Combine the quote and author for the tweet
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`; // Construct the Twitter share URL
    window.open(twitterUrl, '_blank'); // Open the URL in a new tab
}

// Function to share the current quote on Facebook
function shareOnFacebook() {
    const quote = quoteElement.textContent; // Get the current quote text
    const author = authorElement.textContent; // Get the current author text
    const quoteText = `${quote} ${author}`; // Combine the quote and author for sharing
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(quoteText)}`; // Construct the Facebook share URL
    window.open(facebookUrl, '_blank'); // Open the URL in a new tab
}

// Event listeners for button clicks
newQuoteButton.addEventListener('click', getNewQuote); // Call getNewQuote function when the new quote button is clicked
copyQuoteButton.addEventListener('click', copyQuote); // Call copyQuote function when the copy button is clicked
shareTwitterButton.addEventListener('click', shareOnTwitter); // Call shareOnTwitter function when the Twitter button is clicked
shareFacebookButton.addEventListener('click', shareOnFacebook); // Call shareOnFacebook function when the Facebook button is clicked

// Fetch an initial quote when the page loads
loadLastQuote(); // Call loadLastQuote to either load from storage or fetch a new quote