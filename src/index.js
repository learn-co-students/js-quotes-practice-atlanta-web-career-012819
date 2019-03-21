document.addEventListener('DOMContentLoaded', function() {
  renderAllQuotes()
  const form = document.getElementById('new-quote-form')
  form.addEventListener('submit', handleForm)
  const sortButton = document.getElementById('sort')
  sortButton.id = false
  sortButton.addEventListener('click', sortQuotes)
})

function renderAllQuotes() {
  fetch('http://localhost:3000/quotes')
  .then(res => res.json())
  .then(data => data.map(quote => renderQuote(quote)))
}

function renderQuote(quoteObject) {
  const list = document.getElementById('quote-list')

  const card = document.createElement('li')
  card.className = 'quote-card'
  list.appendChild(card)

  const blockquote = document.createElement('blockquote')
  blockquote.className = 'blockquote'
  card.appendChild(blockquote)

  const quoteText = document.createElement('p')
  quoteText.className = 'mb-0'
  quoteText.textContent = quoteObject.quote
  blockquote.appendChild(quoteText)

  const quoteFooter = document.createElement('footer')
  quoteFooter.className = 'blockquote-footer'
  quoteFooter.textContent = quoteObject.author
  blockquote.appendChild(quoteFooter)

  const br = document.createElement('br')
  blockquote.appendChild(br)

  const likeButton = document.createElement('button')
  likeButton.className = 'btn-success'
  likeButton.textContent = 'Likes: '
  const span = document.createElement('span')
  span.textContent = quoteObject.likes
  likeButton.appendChild(span)
  likeButton.id = quoteObject.id
  likeButton.addEventListener('click', addLike)
  blockquote.appendChild(likeButton)

  const deleteButton = document.createElement('button')
  deleteButton.className = 'btn-danger'
  deleteButton.textContent = 'Delete'
  deleteButton.id = quoteObject.id
  deleteButton.addEventListener('click', deleteQuoteFromView)
  blockquote.appendChild(deleteButton)
}

function handleForm(e) {
  e.preventDefault()
  const newQuote = e.target.elements["new-quote"].value
  const newAuthor = e.target.elements["author"].value

  const newQuoteObject = {quote: newQuote, author: newAuthor, likes: 0}

  fetch('http://localhost:3000/quotes', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(newQuoteObject)
  }).then(res => res.json())
  .then(data => renderQuote(data))
}

function deleteQuoteFromView(e) {
  e.target.closest('li').remove()
  deleteQuoteFromDatabase(e.target.id)
}

function deleteQuoteFromDatabase(id) {
  fetch(`http://localhost:3000/quotes/${id}`,
  {
    method:'DELETE'
  })
}

function addLike(e) {
  const newLikes = parseInt(e.target.lastChild.textContent) + 1
  const newLikesJSON = {likes: newLikes}
  fetch(`http://localhost:3000/quotes/${e.target.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(newLikesJSON)
  })
  e.target.lastChild.textContent = newLikes
}

function getLastName(quoteObject) {
  const quoteAuthor = quoteObject.author
  const nameArray = quoteAuthor.split(" ")
  return nameArray[nameArray.length - 1]
}

function compareAuthors(a, b) {
  const aLastName = getLastName(a)
  const bLastName = getLastName(b)
  if (aLastName < bLastName) {
    return -1
  } else if (aLastName > bLastName) {
    return 1
  } else {
    return 0
  }
}

function sortQuotes(e) {
  const list = document.getElementById('quote-list')
  list.innerHTML = ''
  if (e.target.id === 'false') {
    e.target.id = 'true'
    fetch('http://localhost:3000/quotes')
    .then(res => res.json())
    .then(data => data.sort(compareAuthors))
    .then(sorted => sorted.map(quote => renderQuote(quote)))
  } else {
    e.target.id = 'false'
    renderAllQuotes()
  }
}
