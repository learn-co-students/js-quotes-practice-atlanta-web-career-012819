class SageWisdom {
    constructor(quoteForm,quoteList){
        Object.assign(this,{
            quoteList,
            quoteForm
        })
        quoteForm.addEventListener("submit", (e)=>this.handleNewQuote(e))
    }

    render(){
        ThingFetcher.allQuotes((data)=>{
            this.quoteList.innerHTML = ""
            for(let quote of data){
                const newCard = this.newQuoteCard(quote)
                this.quoteList.appendChild(newCard)
            }
        })
    }
    handleNewQuote(event){
        event.preventDefault()
        const {quote, author} = event.target
        console.log(quote.value ,author.value)
        const newQuote = this.newQuote(quote.value,author.value)
        console.log(quote)
        ThingFetcher.postQuote(newQuote,()=>{
            console.log("did the thing")
            this.render()
        })
    }
    handleLike(event){
        const button = event.target
        let {likes, id} = button.dataset
        likes++ 
        ThingFetcher.patchQuote(id,{"likes":likes},(resp)=>{
            button.innerHTML = `Likes ${likes}`
            button.dataset.likes = likes
        }) 
    }

    handleDelete(event){
        const button = event.target

        ThingFetcher.deleteQuote(button.dataset.id, (resp)=>{
            button.parentNode.parentNode.remove()
        })
    }

    newQuote(quote,author){
        return {
            "quote": quote,
            "likes": 0,
            "author": author
            }
    }

    handleEdit(event){
        const {button} = event
        const {id} = button

        

    }
    
    newQuoteCard({author,id,likes,quote}){
        const li = document.createElement("li")
        li.className = "quote-card"
        const blockQuote = document.createElement("blockquote")
        li.appendChild(blockQuote)
        blockQuote.id = `quote-${id}`
        blockQuote.className = "blockquote"
        const liBody = {
            p : document.createElement("p"),
            foot : document.createElement("footer"),
            br : document.createElement("br"),
            likeBtn: document.createElement("button"),
            delBtn: document.createElement("button"),
            editBtn: document.createElement("button")
        }
        liBody.p.innerHTML = quote
        liBody.p.className = "mb-0"

        liBody.foot.innerHTML = author
        liBody.foot.className = "blockquote-footer"

        liBody.likeBtn.innerText = `Likes: ${likes}`
        liBody.likeBtn.className = "btn-success"
        liBody.likeBtn.dataset.id = id
        liBody.likeBtn.dataset.likes = likes

        liBody.delBtn.innerText = "Delete"
        liBody.delBtn.className = "btn-danger"
        liBody.delBtn.dataset.id = id

        liBody.editBtn.innerText = "Edit"

        //Add evertying to the blockquote
        for(let elem in liBody){
            blockQuote.appendChild(liBody[elem])
        }
        liBody.likeBtn.addEventListener("click",(e)=>this.handleLike(e))
        liBody.delBtn.addEventListener("click",(e)=>this.handleDelete(e))
        liBody.editBtn.addEventListener("click",(e)=>this.handleEdit(e))
        return li
    }

    newEditForm(){
        const form = document.createElement("form")
        //Start the form as hidden
        form.hidden = true
        const formBody = {
            quote: document.createElement("input"),
            author: document.createElement("input"),
            submit: document.createElement("button")
        }
        formBody.quote.name = "quote"
        formBody.quote.type = "text"

        formBody.author.name = "author"
        formBody.author.type = "text"

        formBody.submit.type = "submit"
        formBody.submit.innerHTML = "Save"

        for(elem in formBody){
            form.appendChild(formBody[elem])
        }
    }
}

/* 
<li class='quote-card'>
    <blockquote class="blockquote">
      <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
      <footer class="blockquote-footer">Someone famous</footer>
      <br>
      <button class='btn-success'>Likes: <span>0</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  </li> */