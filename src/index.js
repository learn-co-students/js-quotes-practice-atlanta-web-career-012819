// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const QUOTES_URL = "http://localhost:3000/quotes"

document.addEventListener("DOMContentLoaded", () => {
  // console.log("load successful")
  renderAllQuotes();
})

function getAllQuotes() {
  return fetch(QUOTES_URL).then(response => response.json())
}

function updateQuote(data) {
  const id = data.id
  delete data.id

  console.log("Data: ", data)
  console.log("ID: ", id)

  return fetch(`${QUOTES_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
}

function renderAllQuotes() {
  document.getElementById('quote-list').innerHTML = '';

  getAllQuotes()
  .then(quotes => quotes.forEach(renderQuote))
}

function renderQuote(data) {
  console.log(data)
  const container = document.getElementById('quote-list');

  const item = document.createElement('li');
  item.className = 'quote-card';
  container.appendChild(item);

  const blockquote = document.createElement('blockquote');
  blockquote.className = 'blockquote'
  item.appendChild(blockquote);

  const p = document.createElement('p');
  p.className = 'mb-0';
  p.innerText = data.quote;
  blockquote.appendChild(p);

  const footer = document.createElement('footer');
  footer.className = 'blockquote-footer';
  footer.innerText = data.author;
  blockquote.appendChild(footer);

  blockquote.appendChild(document.createElement('br'))

  const likesButton = document.createElement('button');
  likesButton.className = 'btn-success';
  likesButton.dataset.id = data.id;
  likesButton.innerHTML = `Likes: <span>${data.likes}</span>`;
  likesButton.addEventListener('click', handleLikes)
  blockquote.appendChild(likesButton);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn-danger';
  deleteButton.dataset.id = data.id;
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener('click', handleDelete)
  blockquote.appendChild(deleteButton);
}

function handleLikes(e) {
  // console.log(e.target)
  // console.log(e.target.querySelector('span').innerText)
  let likes = parseInt(e.target.querySelector('span').innerText)
  // console.log("Likes currently: ",likes)
  likes++;
  // console.log("Likes after incrementing: ", likes)

  const data = {
    id: e.target.dataset.id,
    likes: likes
  }

  updateQuote(data)
  .then(renderAllQuotes)
}

function handleDelete(e) {
  console.log(e.target);
}
