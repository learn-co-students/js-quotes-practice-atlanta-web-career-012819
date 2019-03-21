// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.

document.addEventListener("DOMContentLoaded",()=>{
    //Hello world, lets start hacking
    console.log("Loaded...")
    const quoteForm = document.getElementById("new-quote-form")
    const quoteList = document.getElementById("quote-list")

    const sage = new SageWisdom(quoteForm, quoteList)
    sage.render()
})