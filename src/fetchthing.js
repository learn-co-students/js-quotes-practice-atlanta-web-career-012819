const quotesURL = "http://localhost:3000/quotes"

class ThingFetcher {
    static allQuotes(callback){
        console.log(quotesURL)
        fetch(quotesURL)
        .then((resp)=>{
            if(resp.ok){
                return resp.json()
            }
            throw new Error("The sage is out to lunch, please try agian later")
        })
        .then(data => callback(data))
        .catch(error => console.log(error))
    }

    static postQuote(quote,callback){
        fetch(quotesURL,{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(quote)
        }).then(resp =>{
            if(resp.ok){
                callback(resp)
            }
        }).catch(error => console.log(error))
    }

    static patchQuote(id, quote, callback){
        fetch(`${quotesURL}/${id}`,{
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(quote)
        }).then(resp=>callback(resp))
    }

    static deleteQuote(id,callback){
        fetch(`${quotesURL}/${id}`,{
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        }).then((resp)=>callback(resp))
    }
}