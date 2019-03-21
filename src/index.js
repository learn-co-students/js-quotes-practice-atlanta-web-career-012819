// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.
document.addEventListener("DOM Content Loaded", (event) => {

})

function renderAllQuotes() {
    fetch("http://localhost:3000/quotes")
    .then(response => response.json())
    .then(data => data.map(quotes => renderQuote(quotes.quote, quotes.likes, quotes.author)))
}


function renderQuote(quotes) {
    
    const ul = document.getElementById("quote-list")
        const newLi = document.createElement("li")
        newLi.textContent = quotes.quote

    ul.appendChild(newLi)

}


function handleForm(event) {
    event.preventDefault()
    const quote = event.target.quotes["quote"].value
    const likes = event.target.quotes["likes"].value
    const author = event.target.quotes["author"].value

    const quotes = new Object()
    quotes.quote = quote
    quotes.likes = 0
    quotes.author = author

    renderQuote(quotes)

    fetch("http://localhost:3000/quotes", {
        method: "POST",
        body: JSON.stringify(newquote)
    })
    event.target.reset
}
