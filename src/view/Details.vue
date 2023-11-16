<template>
<div class="py-3">
    <div class="detailContainer row justify-content-center gap-3 m-0 py-3 mx-auto" v-if="movie" >
        <div class="col-lg-6 col-md-4 col-sm-6 p-0" >
            <h3 class="fs-1 fw-bold ">{{movie.title}}</h3>
            <p class=" mt-1">{{ movie.release_date }}</p>
            <p class="text-warning mt-1">Rating - {{ movie.vote_average }}</p>
            <div class="mt-3 d-flex align-items-center">
                <div v-for="genre in movie.genres" :key="genre.id" style="display: inline-flex;">
                    <p class="genre border-0 bg-transparent p-0 m-0 pe-2 text-muted">{{ genre.name }}</p>
                </div>
            </div>
            <RateMovies :id="props.id"/>
            <AddCollectionsDropdown :movie="movie"/>
        </div>
        <div class="col-lg-6 col-md-4 col-sm-6 p-0" style="width: 18rem;">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="alt" class="card-img-top"/>
        </div>
    </div>
    <Reviews :id="props.id"/>
    <SimilarMovies :id="props.id"/>
</div>
   
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useMoviesStore } from '@/store/moviesStore';
import RateMovies from '@/components/RateMovies.vue';
import Reviews from '@/components/Reviews.vue';
import AddCollectionsDropdown from '@/components/AddCollectionsDropdown.vue';
import SimilarMovies from '@/components/SimilarMovies.vue';

const moviesStore = useMoviesStore();
const props = defineProps(['id']);
const { movie } = storeToRefs(moviesStore);
const { fetchDetails } = moviesStore;

onMounted(async()=>{
   await fetchDetails(props.id);
});

watch(()=>props.id,async()=>{
    await fetchDetails(props.id);
})



</script>

<style scoped>

.detailContainer{
    max-width:900px;
    border-radius:5px;
    background-color:#f1f1f1;
}


</style>
