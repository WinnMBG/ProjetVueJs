import { defineStore } from 'pinia';
import UsersApi from '../services/users';

export const useUser = defineStore('useUserStore', {
    state: () => {
        return {
            users: []
        }
    },
    getters: {
        nbUsers: function(){
            return this.users.length
        },
        getUserById: function(id) {
            return this.users[id]
        }
    },
    actions: {
        getAll: function(){
            const api = new UsersApi();
            api.getAll().then(data => {this.users = data});
            return this.users
        },
        add : async function(people){
            const userApi = new UsersApi();

            const verif = await userApi.existe(people.mail)
            const verif2 = await userApi.existePseudo(people.pseudo)
            console.log(verif , people.mail);

            if(!verif || !verif2) return {message : "l'email est déjà utilisé"}
            const user = await userApi.create(people)

            let person = {
                pseudo : user.pseudo ,
                email: user.email,
                password: user.password,
                urlImgProfil: user.urlImgProfil, 
                isLogged : false 
            } ; 

            this.users.push(person)
            return {message : "ok" } ;
        },
        connect: async function(obj) {
            const userApi = new UsersApi();
            const verif = await userApi.connection(obj);
            if(verif) {
                return {message : "Erreur de connexion"};
            } else {
                return {message : "ok" } ;
            }
        }
    }
})