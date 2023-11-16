<template>
    <div class="navbar d-flex justify-content-between align-items-center px-3 text-light">
        <h3>Movies</h3>
        <div class="d-flex align-items-center">
            <DeleteCollections/>
            <Modal/>
        </div>
    </div>
</template>

<script setup>
import DeleteCollections from './DeleteCollections.vue';
import Modal from './Modal.vue';


</script>

<style scoped>

.navbar{
    background-image: linear-gradient(
        transparent,
        rgba(0,0,0,.6)
    )  , url(./../assets/bg/2.jpg) ;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

</style>