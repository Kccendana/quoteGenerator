const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const autorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');
let apiQuotes = [];

const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const complete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true
}

const newQuote = () => {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if(!quote.author) {
        autorText.textContent = 'Unknown';
    } else {
        autorText.textContent = quote.author;
    }
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

const getQuotes = async () => {
    loading();
    const apiURL =' https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();

    } catch (error) {

    }
}

const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet/?text=${quoteText.textContent} - ${autorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

getQuotes();
