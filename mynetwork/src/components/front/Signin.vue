<template lang="">
    <div class="container ms-auto bg-light rounded">
        <form style="margin: 0 auto" class="d-flex flex-column justify-content-between w-50" @submit.prevent="submit">
            <h1 style="margin-bottom:1em; margin-top:1em">Création de compte 🧑</h1>
            <input type="text" placeholder="Pseudo" v-model="pseudo"/>
            <input class="mt-4" type="mail" placeholder="tonmail@newone.com" v-model="mail"/>
            <input class="mt-4" type="password" placeholder="Entrer mot de passe" v-model="password"/>
            <input class="mt-4" type="password" placeholder="Confirmer mot de passe" v-model="passwordConfirm"/>
            <input class="mt-4" type="text" placeholder="Saisir url de la photo de profil" v-model="urlImg"/>
            <button class="btn btn-outline-success mt-4 w-25" style="margin-bottom:1em">Créer compte</button>
        </form>
    </div>
    <div class="alert alert-success mt-3" v-if="userCreated">
        <p>L'utilisateur a bien été crée !</p>
    </div>
    <div class="alert alert-danger mt-3" v-if="userNotCreated">
        <p>Problème lors de la saisie, checker la console !</p>
    </div>
</template>
<script>
import { useUser } from '../../stores/useUser';
import Joi from 'joi';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
export default {
    data: () => {
        return {
            pseudo: "",
            mail: "",
            password:"",
            passwordConfirm:"",
            urlImg:"",
            userStore: useUser(),
            userCreated: null,
            userNotCreated: null,
            router: useRouter()
        }
    },
    methods: {
        submit: async function(){
            let o = {pseudo: this.pseudo, mail: this.mail, password: this.password, passwordConfirm: this.passwordConfirm, urlImg: this.urlImg};
            const validationUser = Joi.object({
                pseudo : Joi.string().min(3).required(),
                password : Joi.string().min(6).required(),
                passwordConfirm : Joi.string().min(6).required(),
                mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr'] } }),
                urlImg: Joi.string().min(15)
            });
            const {error} = validationUser.validate(o, {abortEarly: false});
            if(error || this.password !== this.passwordConfirm) {
                this.userNotCreated=true;
                console.log(error);
                return  ;
            }
            const {message} = await this.userStore.add(o)
            if(message==='ok') {
                this.userCreated=true;
                setTimeout(this.router.push('/login'),10000);
            } else {
                this.userNotCreated=true;
            }
        }
    },
    components: { RouterLink }
}
</script>
<style lang="">
    
</style>