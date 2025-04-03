// Array of quotes
const quotes = [
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs"},
    { quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein"},
    { quote: "The mind is everything. What you think you become.", author: "Buddha"},
    { quote: "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.", author: "Robert Frost"},
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt"}
];

// Get references to the HTML elements
const quoteElement = document.querySelector('.quote');
const newQuoteButton = document.getElementById('new-quote-button');

// Function to generate a random index
function getRandomIndex() {
    return Math.floor(Math.random() * quotes.length);
}

// Function to update the quote in the HTML
function displayQuote() {
    const randomIndex = getRandomIndex();
    const randomQuoteObject = quotes[randomIndex];
    quoteElement.textContent = randomQuoteObject.quote;
    const authorElement = document.querySelector('.author');
    authorElement.textContent = `- ${randomQuoteObject.author}`;
}

// Event listener for the button click
newQuoteButton.addEventListener('click', displayQuote);

// Display an intial quote when the page loads
displayQuote();