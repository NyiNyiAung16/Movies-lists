<template>
    <div class="dropdown">
        <button class="delete border-0 bg-transparent text-light mx-2 my-3" data-bs-toggle="dropdown">Delete Collections</button>
        <ul class="dropdown-menu">
            <li class=" px-2" v-for="collection in collections" :key="collection.id" @click="deleteCollection(collection)">
                <div class="dropdown-item d-flex align-items-center my-2">
                    <i class="icon fa-solid fa-xmark me-3"></i>
                    <p class="name m-0 p-0">{{ collection.data }}</p>
                </div>
            </li>
        </ul>
    </div>
    
</template>

<script setup>
import { onMounted, ref } from 'vue';

const collections = ref([]);
const collectionsMovies = ref([]);

onMounted(()=>{
    const data = JSON.parse(localStorage.getItem('collectionsName'));
    collections.value = data;
    const dataArray = JSON.parse(localStorage.getItem('collections'));
    collectionsMovies.value = dataArray;
});

const deleteCollection = (collection) => {
    const newCollections = collections.value.filter((item)=>{
        return item !== collection
    });
    const newCollectionsMovies = collectionsMovies.value.filter((item)=>{
        return item.data.collectionName !== collection.data;
    })
    localStorage.setItem('collectionsName',JSON.stringify(newCollections));
    localStorage.setItem('collections',JSON.stringify(newCollectionsMovies));
    collections.value = newCollections;
}

</script>

<style scoped>

.delete:hover{
    text-decoration: underline;
}
.icon{
    transition: color .6s;
}
.dropdown-item{
    cursor: pointer;
}
.dropdown-item:hover .icon{
    color: crimson;
}
.name{
    user-select: none;
}


</style>