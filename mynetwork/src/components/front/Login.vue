<template lang="">
    <div class="container ms-auto bg-light rounded" style="margin-top:3em">
        <form style="margin: 0 auto" class="d-flex flex-column justify-content-between w-50" @submit.prevent="submit">
            <h1 style="margin-bottom:1em; margin-top:1em">Se connecter 🔒</h1>
            <input type="mail" placeholder="Mail" v-model="login"/>
            <input type="password" class="mt-4" placeholder="entrer mot de passe" v-model="password"/>
            <button type="submit" class="btn btn-outline-success mt-4 w-25" style="margin-bottom:1em">Connexion</button>
        </form>
    </div>
    <div class="alert alert-success mt-3" v-if="userConnected===1">
        <p>It's Good !</p>
    </div>
    <div class="alert alert-danger mt-3" v-if="userConnected===0">
        <p>Erreur d'authentification, login et mot de passe invalides </p>
    </div>
</template>
<script>
//import { useUser } from '../../stores/useUser';
import Joi from 'joi';
import { useRouter } from 'vue-router';
import { useUser } from '../../stores/useUser';
// import { add } from './Home.vue';
export default {
   data: () => {
    return {
        login: "",
        password:"",
        userConnected: -1,
        router: useRouter(),
        userStore: useUser(),
    }
   },
   methods: {
        submit: async function(){
            let o = {mail: this.login, password: this.password};
            const validationUser = Joi.object({
                password : Joi.string().min(6).required(),
                mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr'] } }).required(),
            });
            const {error} = validationUser.validate(o, {abortEarly: false});
            if(error) {     
                this.userConnected=0;
                console.log(error);
                return  ;
            } else{
                const {message} = await this.userStore.connect(o)
                if( message==='Erreur de connexion') {
                    this.userConnected=0
                    return;
                } else {
                    this.userConnected=1
                    this.router.push('/')
                }
            }
        }
    }
}
</script>
<style lang="">
    
</style>