<template>
    <div class="dropdown d-flex justify-content-center my-2">
        <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">Sort By</button>
        <ul class="dropdown-menu">
            <li>
                <button class="dropdown-item" @click="sorting('title')">Title</button>
            </li>
            <li>
                <button class="dropdown-item" @click="sorting('release_date')">Release_Date</button>
            </li>
            <li>
                <button class="dropdown-item" @click="sorting('rating')">Rating</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useMoviesStore } from '../store/moviesStore'
const moviesStore = useMoviesStore();
const { sorting } = moviesStore;

</script>

<style scoped>
.btn,.btn:hover{
    border: none;
    background: linear-gradient(
        transparent,
        rgba(0,0,0,0.3)
    );
    transition: background .5s;
}


</style>
