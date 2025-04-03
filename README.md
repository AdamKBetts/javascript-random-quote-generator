# Random Quote Generator

A simple web application that displays random quotes fetched from an external API. This project incorporates several user experience enhancements and minor code improvements.

## Overview

This web application fetches and displays random quotes, providing users with a fresh dose of inspiration or amusement. It includes features to copy quotes to the clipboard and share them on social media.

## Key Features

- **Displays Random Quotes:** Fetches quotes from the "The Quotes Hub" API and displays them on the screen.
- **"New Quote" Button:** Allows users to fetch a new random quote with a simple click.
- **"Copy Quote" Button:** Enables users to easily copy the displayed quote to their clipboard.
- **Social Sharing Buttons:** Provides buttons to share the current quote on Twitter and Facebook.
- **Informative Loading Message:** Displays a "Fetching a fresh quote..." message while a new quote is being loaded.
- **Remembers Last Quote:** Utilizes local storage to remember and display the last viewed quote when the user revisits the page.
- **Prevents Duplicate Quotes:** Implements a basic mechanism to try and avoid displaying the same quote immediately after another.
- **Handles No Internet Connection:** Displays a user-friendly message if the API cannot be reached due to a lack of internet connectivity.

## Technologies Used

- **HTML:** For structuring the content of the web page.
- **CSS:** For styling the appearance of the quote generator.
- **JavaScript:** For handling the logic of fetching quotes, updating the UI, and implementing the various features.

## How to Use

1.  **Save the files:** Make sure you have the following files in the same directory:
    - `index.html` (the main HTML file)
    - `style.css` (the CSS stylesheet)
    - `script.js` (the JavaScript file)
2.  **Open in a browser:** Simply open the `index.html` file in your web browser (Google Chrome, Firefox, Safari, etc.).
3.  **Generate quotes:** The first quote will load automatically. Click the "New Quote" button to fetch and display another random quote.
4.  **Copy quote:** Click the "Copy Quote" button to copy the displayed quote to your clipboard.
5.  **Share on social media:** Click the "Share on Twitter" or "Share on Facebook" buttons to share the quote on your respective social media platforms.

## Further Improvements (Potential)

Here are some ideas for further enhancing this project:

- **Fetch quotes from different categories:** Allow users to select categories of quotes (e.g., inspirational, funny, philosophical).
- **Display author information:** Show more details about the author of the quote (if available from the API).
- **Improve styling:** Enhance the visual design and responsiveness of the application.
- **More social sharing options:** Add buttons for sharing on other social media platforms.
- **More robust duplicate prevention:** Implement a system to remember a history of recently displayed quotes.

## Author

Adam
