export default class PostsApi{
    url='http://localhost:3401/articles'

    async getAll(){
        try{
            const rep = await fetch(this.url);
            const data = await rep.json()
            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async postMessage(people){
        try{
            const options = {
                method : "POST",
                body : JSON.stringify(people),
                headers : {
                    "content-type" : "application/json"
                }
            }
           const reponse = await fetch(this.url, options)
           const data = await reponse.json();
           return data ;
        }catch(ex){
            console.log(ex)
        }
    }
}