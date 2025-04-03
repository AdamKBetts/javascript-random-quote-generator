// Array of quotes
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Strive not to be a success, but rather to be of value. - Albert Einstein",
    "The mind is everything. What you think you become. - Buddha",
    "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference. - Robert Frost",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
];

// Get references to the HTML elements
const quoteElement = document.querySelector('.quote');
const newQuoteButton = document.getElementById('new-quote-button');

// Function to generate a random index
function getRandomIndex() {
    return Math.floor(Math.random() * quotes.length);
}

// Function to get a random quote
function getRandomQuote() {
    const randomIndex = getRandomIndex();
    return quotes[randomIndex];
}

// Function to update the quote in the HTML
function displayQuote() {
    const randomQuote = getRandomQuote();
    quoteElement.textContent = randomQuote;
}

// Event listener for the button click
newQuoteButton.addEventListener('click', displayQuote);

// Display an intial quote when the page loads
displayQuote();