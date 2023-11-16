<template>
    <Banner/>
    <h2 class="text-light ms-2 my-3" style="text-decoration: underline;">Popular Movies</h2>
    <Suspense>
      <MoviesList />
      <template #fallback>
        <button class="btn btn-primary text-white">loading...</button>
      </template>
    </Suspense>
</template>
  
<script setup>
import MoviesList from '../components/MoviesList.vue';
import Banner from '../components/Banner.vue';


</script>
