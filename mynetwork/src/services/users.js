export default class UsersApi{
    url='http://localhost:3401/users'

    async getAll(){
        try{
            const rep = await fetch(this.url);
            const data = await rep.json()
            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async create(people){
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

    async existe(email){
        try{
            const reponse = await fetch(`${this.url}?email=${email}`)
            const data = await reponse.json();
            return data.length === 0 ? true : false ;
        }catch(ex){
            console.log(ex)
        }
    }

    async existePseudo(pseudo){
        try{
            const reponse = await fetch(`${this.url}?pseudo=${pseudo}`)
            const data = await reponse.json();
            return data.length === 0 ? true : false ;
        }catch(ex){
            console.log(ex)
        }
    }

    async connection(user){
        try{
            const reponse = await fetch(`${this.url}?email=${user.mail}&password=${user.password}`)
            const data = await reponse.json();
            return data.length === 0 ? true : false ;
        }catch(ex){
            console.log(ex)
        }
    }

}