<template lang="">
    <Suspense>   
        <template #default>
            <div class="container">
                <form class="row bg-light rounded shadow-sm" v-if="show" @submit.prevent="addPost">
                    <h1>Envie de poster ?</h1>
                    <textarea class="mt-4 ms-2 w-75" placeholder="Ecrire descritpion..." v-model="description"/>
                    <input class="mt-4 ms-2 w-75" type="text" placeholder="Url de l'image du post" v-model="url"/>
                    <button type="submit" class="btn btn-outline-success mt-4 mb-3 w-25 ms-4">Laisser un post</button>
                </form>
                <div class="row bg-light rounded shadow-sm" style="margin-top: 5em" v-for="post, index in posts" :key="index">
                    <ArticleSlot>
                        <template #header>
                            <div class="d-flex align-items-center">
                                <h1 class="fs-2 fw-bold">{{post.pseudo}}</h1>
                                <div class="ms-auto">
                                    posté le {{`${new Date(post.date).getDate()}/${new Date(post.date).getMonth()+1}/${new Date(post.date).getFullYear()}`}}
                                    à {{`${new Date(post.date).getHours()}h${new Date(post.date).getMinutes()}`}}
                                </div>
                            </div>
                        </template>
                        <template #body>
                            <div class="d-flex bg-light flex-column mt-3">
                                <img :src="post.urlImgArticle" alt="" class="w-100 h-50"/>
                                <p class="mt-3">{{post.contenu}}</p>
                                <div class="d-flex mt-3" style="gap: 30px">
                                    <span>💬{{' '}} <button class="btn btn-success" disabled>{{posts[index].commentaires.length}}</button></span>
                                    <span>👍 {{' '}}<button class="btn btn-success w-5" @click.prevent="add">{{post.like}}</button></span>
                                </div>
                            </div>
                        </template>
                        <template #footer>
                            <div class="d-flex bg-light flex-column mt-2">
                                <h1>Commentaires : </h1>
                                <div class="row" v-for="com, index in posts[index].commentaires">
                                    <hr/>
                                    <div class="d-flex"><h1 class="fs-2 fw-bold">{{com.pseudo}}</h1>
                                    <div class="ms-auto">
                                        le{{' '}}{{`${new Date(com.dt).getDate()}/${new Date(com.dt).getMonth()+1}/${new Date(com.dt).getFullYear()}`}}
                                        à {{`${new Date(post.date).getHours()}h${new Date(post.date).getMinutes()}`}}<br/>
                                    </div></div>
                                    <span style="margin-bottom:2em">{{com.contenu}}</span>
                                </div>
                                <div v-if="show">
                                    <hr/>
                                    <div class="d-flex flex-column" style="gap:20px">
                                        <h1>Ajouter un commentaire : </h1>
                                        <textarea style="height: 150px" placeholder="Laisser un commentaire..." v-model="comment"/>
                                        <button class="btn btn-outline-success w-25 mb-4" @click.prevent="addComment()">Commenter</button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </ArticleSlot>
                </div>
            </div>
        </template>
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>
<script setup>
    import PostsApi from '../../services/posts';
    import ArticleSlot from '../slot/ArticleSlot.vue';
    import { ref, Suspense } from 'vue';
    import { usePost} from '../../stores/usePost'
import { useUser } from '../../stores/useUser';

    let posts = ref([]);
    let nblikes = ref(0)
    let postStore = usePost();
    let comment = ref("")
    let description = ref("")
    let url = ref("")
    let show = ref(false)
    let nbcomments = ref(0)
    let userStore = useUser()

    function add(){
        nblikes.value++;
    }

    function get() {
        const api = new PostsApi();
        api.getAll().then(data => posts.value = data);
        //postStore.getAll();
    }

    async function addPost(){
        let {pseudoe} = useUser.getUserById(useUser.nbUsers())
       let obj = {
            pseudo: pseudoe,
            urlImgArticle: url,
            like: 0,
            contenu: description,
            date: Date.now(),
            commentaires: []
        }
        const api = new PostsApi()
        const {message} = await api.postMessage(obj);
        if(message==='ok') {
            return 'all good !'
        }
    }

    function addComment(){
        alert('Message presque commenté...')
    }
    get();
</script>
<style lang="">
    
</style>