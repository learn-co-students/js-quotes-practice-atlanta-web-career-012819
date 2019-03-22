// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.

document.addEventListener('DOMContentLoaded', () =>{
    document.addEventListener('submit', handleForm)
    renderAllQuotes()
})

function renderAllQuotes() {
    fetch('http://localhost:3000/quotes')
    .then(resp => resp.json())
    .then(data => data.forEach(quote => renderQuote(quote)))
}

function renderQuote(quote){
    const quoteDiv = document.getElementById("quote-list")
    const quoteCard = document.createElement('li')
    quoteCard.setAttribute('class', 'quote-card')
    quoteCard.dataset.id = quote.id
    const blockQuote = document.createElement('bq')
    blockQuote.setAttribute('class', 'blockquote')
    const pTag = document.createElement('p')
    pTag.setAttribute('class', 'mb-0')
    pTag.textContent = quote.quote
    const footer = document.createElement('footer')
    footer.setAttribute('class', 'blockquote-footer')
    footer.textContent = quote.author
    const likeSpan = document.createElement('span')
    likeSpan.textContent = quote.likes
     // should the likes be within a span? or inside the button
    const likeButton = document.createElement('button')
    likeButton.setAttribute('class', 'btn-success')
    likeButton.innerText = `Likes: `
    likeButton.dataset.id = quote.id
    likeButton.addEventListener('click', handleLikeButton)
   
    const dangerButton = document.createElement('button')
    dangerButton.setAttribute('class', 'btn-danger')
    dangerButton.innerText = "Delete"
    dangerButton.dataset.id = quote.id
    dangerButton.addEventListener('click', handleDangerButton)
    quoteDiv.appendChild(quoteCard)
    quoteCard.appendChild(blockQuote)
    quoteCard.appendChild(pTag)
    quoteCard.appendChild(footer)
    quoteCard.appendChild(likeButton)
    likeButton.appendChild(likeSpan)
    quoteCard.appendChild(dangerButton)
}

function handleForm(e) {
    // this won't post 
    console.log(e.target.elements)
    e.preventDefault()
    const newQuote = e.target.elements['new-quote'].value
    const newAuthor = e.target.elements['author'].value
    const newFormSubmission = {quote: newQuote, likes: 0, author: newAuthor}
    renderQuote(newFormSubmission)


    fetch('http://localhost:3000/quotes', {
        headers: {
            "Content-Type": "application/json",
        },
            method: 'POST',
            body: JSON.stringify(newFormSubmission)
    })
    .then(resp => (resp))
    e.target.reset()
}

function handleLikeButton(e) {
    // SOS can't access the LIKE number
   let newLike = e.target.querySelector('span').innerHTML
   let id = e.target.dataset.id

    e.target.querySelector('span').innerHTML = ++newLike

   let fetchBody = {
     headers: {
       "Content-Type": "application/json",
     Accept: "application/json"},
     method: 'PATCH',
     body: `{"likes": ${newLike}}`
   }
 
   fetch(`http://localhost:3000/quotes/${id}`, fetchBody)
          .then(resp => console.log(resp))
          e.target.reset()
 }

 function handleDangerButton(e){
    e.target.parentNode.remove()
    
    deleteQuote(e.target.dataset.id)
}

 function deleteQuote(id){
     // doesn't delete from database??
	fetch(`http://localhost:3000/quotes/${id}`,
	{
		method:'DELETE'
	})
	.then(resp => resp)
}
