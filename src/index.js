// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const QUOTES_URL = "http://localhost:3000/quotes"

document.addEventListener("DOMContentLoaded", () => {
  // console.log("load successful")
  renderAllQuotes();

  const form = document.getElementById('new-quote-form');
  form.addEventListener('submit', handleFormSubmit)
})

function getAllQuotes() {
  return fetch(QUOTES_URL).then(response => response.json())
}

function updateQuote(data) {
  const id = data.id
  delete data.id

  return fetch(`${QUOTES_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
}

function postQuote(data) {
  console.log(data)
  return fetch(QUOTES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
}

function deleteQuote(id) {
  return fetch(`${QUOTES_URL}/${id}`, {
    method: "DELETE",
  })
}


function renderAllQuotes() {
  document.getElementById('quote-list').innerHTML = '';

  getAllQuotes()
  .then(quotes => quotes.forEach(renderQuote))
}

function renderQuote(data) {
  // console.log(data)
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

  const editButton = document.createElement('button');
  editButton.dataset.id = data.id;
  editButton.innerText = "Edit";
  editButton.addEventListener('click', handleEdit)
  blockquote.appendChild(editButton);
}

function handleLikes(e) {
  // console.log(e.target)
  // console.log(e.target.querySelector('span').innerText)
  const likesElement = e.target.querySelector('span')
  let likes = parseInt(likesElement.innerText)
  likes++;

  const data = {
    id: e.target.dataset.id,
    likes: likes
  }

  updateQuote(data)
  .then(() => {
    likesElement.innerText = likes
  })
}

function handleDelete(e) {
  // console.log(e.target.dataset.id);
  const id = e.target.dataset.id;

  deleteQuote(id)
  .then(renderAllQuotes)
}

function handleFormSubmit(e) {
  e.preventDefault();

  // console.log(e.target.querySelector('#new-quote').value)
  // console.log(e.target.querySelector('#author').value)

  const data = {
    quote: e.target.querySelector('#new-quote').value,
    author: e.target.querySelector('#author').value,
    likes: 0
  }

  postQuote(data)
  .then(renderQuote)
}

function handleEdit(e) {
  // console.log(e.target.parentNode.parentNode)
  const container = e.target.parentNode.parentNode;
  const editForm = document.createElement('form');
  // console.log(container.querySelector('p').innerText)

  editForm.innerHTML = `
  <div class="form-group">
  <label for="new-quote">New Quote</label>
  <input type="text" class="form-control" id="new-quote" value="${container.querySelector('p').innerText}">
  </div>
  <div class="form-group">
  <label for="Author">Author</label>
  <input type="text" class="form-control" id="author" value="${container.querySelector('footer').innerText}">
  </div>`

  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.innerText = "Update Quote";
  submitButton.classList = "btn btn-primary"
  submitButton.addEventListener('submit', handleEditSubmit)
  editForm.appendChild(submitButton);

  container.appendChild(editForm);
}

function handleEditSubmit(e) {
  e.preventDefault();

  console.log(e.target)
}
