<template>
    <div class="row justify-content-center gap-3 m-0 py-3" v-if="movies">
        <div
            class="card col-lg-3 col-md-4 col-sm-6 p-0"
            v-for="movie in movies"
            :key="movie.id"
            style="width: 18rem;"
        >
        <RouterLink :to="{name:'Details',params:{id:movie.id}}" class=" fs-4 link">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="alt" class="card-img-top"/>
        </RouterLink>
            <div class="card-body">
                <h3 class="card-title">
                    <RouterLink :to="{name:'Details',params:{id:movie.id}}" class=" fs-4 link">{{movie.title}}</RouterLink>
                </h3>
                <p class="card-subtitle mt-1">{{ movie.release_date }}</p>
                <p class="text-warning mt-1">Rating - {{ movie.rating }}</p>
                <div class="mt-3">
                    <div v-for="genre in movie.genres" :key="genre.id" style="display: inline-flex;">
                        <button class="genre border-0 bg-transparent"  @click="filteredGenre(genre)">{{ genre.name }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMoviesStore } from '../store/moviesStore'
import { storeToRefs } from 'pinia';
const moviesStore = useMoviesStore();
const { movies } = storeToRefs(moviesStore);
const { filteredGenre, fetchGenre, fetchMovies } = moviesStore;

onMounted(async()=>{
    await  fetchGenre();
    await  fetchMovies();
});



</script>

<style scoped>
.card{
    transition: all .4s;
}
.card:hover{
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    transform: scale(1.01);
}

.genre{
    text-decoration: none;
    color: rgb(48, 48, 188);
    transition: all .5s;
}
.genre:hover{
    color: rgb(37, 37, 203);
    text-decoration: underline;
}
.link{
    text-decoration: none;
    transition: all .4;
}
.link:hover{
    color: blue;
    font-weight: 500;
}
</style>