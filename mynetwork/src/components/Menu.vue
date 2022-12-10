<template>
    <div class="bg-gradient bg-light py-3 shadow-sm">
        <nav class="navbar navbar-expand navbar-light container">
            <RouterLink :to="'/'" class="navbar-brand fs-4 fw-bold"> LinkUp 🔗  </RouterLink>
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <RouterLink :to="{name: 'home'}" class="nav-link fs-4"> Fils d'actualité 🏠</RouterLink>
                </li>
            </ul>
            <div class="d-flex ms-auto">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink :to="{name: 'signin'}" class="btn btn-outline-dark"> S'inscrire 🚪</RouterLink>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink :to="{name: 'login'}" class="btn btn-outline-dark ms-3"> Se connecter 🔒</RouterLink>
                    </li>
                </ul>
            </div>
        </nav>
        
    </div>
</template>
<script setup>
    import { RouterLink } from 'vue-router';
</script>
<style lang="">
    
</style>