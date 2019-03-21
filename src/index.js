const quoteNewForm = document.getElementById('new-quote-form')
document.addEventListener('DOMContentLoaded', function(event) {
    renderAllQuotes()

})

function renderAllQuotes() {
    fetch('http://localhost:3000/quotes')
    .then(response => response.json())
    .then(data => data.map(quote => renderQuote(quote)))
}

function renderQuote(quote) {
    const quoteList = document.getElementById('quote-list')
    const li = document.createElement('li')
    li.setAttribute('class', 'quote-card')

    const blockquote = document.createElement('blockquote')
    blockquote.setAttribute('class', 'blockquote')
    blockquote.dataset.id = quote.id 

    const p = document.createElement('p')
    p.setAttribute('class', 'mb-0')
    p.textContent = quote.quote

    const footer = document.createElement('footer')
    footer.setAttribute('class', 'blockquote-footer')
    footer.textContent = quote.author

    const pLikes = document.createElement('p')
    pLikes.textContent = quote.likes

    const likesBtn = document.createElement('button')
    likesBtn.setAttribute('class', 'btn-success')
    likesBtn.innerText = "Likes:"
    likesBtn.dataset.id = quote.id 
    likesBtn.addEventListener('click', handleLike)

    const delBtn = document.createElement('button')
    delBtn.setAttribute('class', 'btn-danger')
    delBtn.innerText = "Delete"
    delBtn.dataset.id = quote.id 
    delBtn.addEventListener('click', handleDelete)

    quoteList.appendChild(li)
    li.appendChild(blockquote)
    blockquote.appendChild(p)
    blockquote.appendChild(footer)
    blockquote.appendChild(pLikes)
    blockquote.appendChild(likesBtn)
    blockquote.appendChild(delBtn)

}


quoteNewForm.addEventListener('submit', handleNewQuote)

function handleNewQuote(event) {
    event.preventDefault()
    console.log(event)
    let fetchBody = {
          
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        method: 'POST', 
        body: JSON.stringify({
          quote: event.target.elements[0].value,
          author: event.target.elements.author.value,
          likes: "0"

        })
        }
                   
    
    console.log(fetchBody)
     fetch('http://localhost:3000/quotes', fetchBody)
     .then(res => res.json())
     .then(quote => renderQuote(quote))
     event.target.reset()
}

function handleLike(event) {
    console.log(event)

    let newLike = parseInt(event.target.previousSibling.innerText)
    let id = event.target.dataset.id
    console.log(newLike)

    let fetchBody = {
        headers: {
          "Content-Type": "application/json",
        Accept: "application/json"},
        method: 'PATCH',
        body: `{"likes": ${++newLike}}`
      }
      event.target.previousSibling.innerHTML = newLike
    
      fetch(`http://localhost:3000/quotes/${id}`, fetchBody)
    // //         //  .then(res => console.log(res))
     }

    
     function handleDelete(event) {
         console.log(event)
         event.target.parentNode.remove()


         deleteQuote(event.target.dataset.id)
     }

     function deleteQuote(id) {

     fetch(`http://localhost:3000/quotes/${id}`, {
         method: 'DELETE'
     })

    }

