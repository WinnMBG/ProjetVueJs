import { defineStore } from 'pinia';
import PostsApi from '../services/posts';

export const usePost = defineStore('usePostStore', {
    state: () => {
        return {
            posts: []
        }
    },
    getters: {

    },
    actions: {
        getAll: function(){
            const api = new PostsApi();
            let r = api.getAll().then((data) => {return data});
            this.posts = r;
            console.log(this.posts);
        },
        add : async function(people){
            const userApi = new PostsApi();
            const poste = await PostsApi.postMessage(people)

            let post = {
                pseudo: poste.pseudo,
                urlImgArticle: poste.urlImgArticle,
                like: poste.like,
                contenu: poste.description,
                date: poste.date,
                commentaires: poste.commentaires,
            } ; 

            this.posts.push(post)
            return {message : "ok" } ;
        },
    }
})