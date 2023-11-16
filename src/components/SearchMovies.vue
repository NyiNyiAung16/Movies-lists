<template>
    <div class="container my-3">
        <input type="text" class="form-control" placeholder="Search by title & release_date..." @input="filtered" v-model="searchData">
    </div>
</template>

<script setup>
import { useMoviesStore } from '../store/moviesStore'
import { storeToRefs } from 'pinia';
const moviesStore = useMoviesStore();
const { searchData } = storeToRefs(moviesStore);

const filtered = () => {
    moviesStore.filteredData;
}

</script>

<style scoped>


</style>
