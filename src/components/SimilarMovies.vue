<template>
    <div class="row justify-content-center gap-3 m-0 my-5" v-if="suggestMovies">
        <div
            class="card col-lg-3 col-md-4 col-sm-6 p-0"
            v-for="movie in suggestMovies"
            :key="movie.id"
            style="width: 18rem;"
        >
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="alt" class="card-img-top"/>
            <div class="card-body">
                <h3 class="card-title">
                    <RouterLink :to="{name:'Details',params:{id:movie.id}}" class="fs-5 link">{{movie.title}}</RouterLink>
                </h3>
                <p class="card-subtitle mt-1">{{ movie.release_date }}</p>
                <p class="text-warning mt-1">Rating - {{ movie.vote_average }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useMoviesStore } from '../store/moviesStore'
import { storeToRefs } from 'pinia';
const moviesStore = useMoviesStore();

const props = defineProps(['id']);
const { similarMovies  } = storeToRefs(moviesStore);
const { fetchSimilarMovies } = moviesStore;

const suggestMovies = ref([]);

function random(array,max,min){
    const randomId = Math.floor(Math.random() * max);
    return array.splice(randomId,5);
}
 
async function getData(id){
    await fetchSimilarMovies(id);
    suggestMovies.value = similarMovies.value.filter((movie) => {
        return movie.poster_path !== null;
    });
    suggestMovies.value = random(suggestMovies.value,suggestMovies.value.length);
}

onMounted(async()=>{
    await getData(props.id)
});

watch(()=>props.id,async()=>{
    await getData(props.id);
})


</script>

<style scoped>
.card{
    transition: all .4s;
}
.card:hover{
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    transform: scale(1.01);
}
.link{
    text-decoration: none;
    transition: all .4;
}
.link:hover{
    color: blue;
    font-weight: 500;
    text-decoration: underline;
}
</style>