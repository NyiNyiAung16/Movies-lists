<template>
    <Navbar/>
    <div class="banner">
      <h2 class="text-end fs-3 text-light fw-bold">Welcome.<br/>Millions of movies, TV shows and people to discover. Explore now.</h2>
      <SearchMovies/>
      <Sorting/>
    </div>
</template>

<script setup>
import SearchMovies from '../components/SearchMovies.vue';
import Sorting from '../components/Sorting.vue';
import Navbar from '@/components/Navbar.vue';
</script>

<style scoped>
.banner{
  height: 500px;
  margin-bottom: 15px;
  background: url(./../assets/bg/2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
}
</style>