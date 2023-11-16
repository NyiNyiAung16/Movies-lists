<template>
<div class="row gap-4 m-0 mx-4 py-3" v-for="collectionName in collectionsName">
    <h3 class="fw-bold text-light" style="text-decoration: underline;">{{ collectionName.data }}</h3>
        <div
            class="card col-lg-3 col-md-4 col-sm-6 p-0"
            v-for="collection in collections"
            :key="collection.id"
            style="width: 18rem;position: relative;"
            :class="{'d-none':collection.data.collectionName !== collectionName.data}"
        >
        <div >
            <i class="fa-solid fa-xmark icon" @click="deleteCollection(collection)"></i>
            <RouterLink :to="{name:'Details',params:{id:collection.data.data.id}}" class=" fs-4 link">
                <img :src="`https://image.tmdb.org/t/p/w500${collection.data.data.poster_path}`" alt="alt" class="card-img-top"/>
            </RouterLink>
            <div class="card-body">
                <h3 class="card-title">
                    <RouterLink :to="{name:'Details',params:{id:collection.data.data.id}}" class=" fs-4 link">{{collection.data.data.title}}</RouterLink>
                </h3>
                <p class="card-subtitle mt-1">{{ collection.data.data.release_date }}</p>
                <p class="text-warning mt-1">Rating - {{ collection.data.data.vote_average }}</p>
                <div class="mt-3 m-0">
                    <div v-for="genre in collection.data.data.genres" :key="genre.id" style="display: inline-flex;">
                        <button class="genre border-0 bg-transparent p-0 pe-2">{{ genre.name }}</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';


const collections = ref([]);
const collectionsName = ref([]);
onMounted(()=>{
    const data = JSON.parse(localStorage.getItem('collections'));
    const names = JSON.parse(localStorage.getItem('collectionsName'));
    collections.value = data;
    collectionsName.value = names;
});

const deleteCollection = (collection) => {
    const newCollections = collections.value.filter((item)=>{
        return item !== collection;
    });
    collections.value = newCollections;
    localStorage.setItem('collections',JSON.stringify(newCollections));
}

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
}
.link:hover{
    color: blue;
    text-decoration: underline;
}

.icon{
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.6rem;
    padding-top: 5px;
    padding-right: 5px;
    color: #fff;
    cursor: pointer;
    transition: color .6s;
}
.icon:hover{
    color: crimson;
}
</style>