<template>
    <div class="star_container">
        <ul class="stars">
            <li v-for="id in Ids">
                <i class="fa-solid fa-star" :class="{'text-warning':stars.includes(id)}"  @click="giveStars(id)"></i>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import ratemovies from '../composable/ratemovies'

const props = defineProps(['id']);


const Ids = [1,2,3,4,5];
const stars = ref([]);

function getData(id){
    let data = JSON.parse(localStorage.getItem(`stars${id}`));
    stars.value = data;
    if(!data){
        stars.value = []
    }
}
onMounted(()=>{
    getData(props.id)
});

watch(()=>props.id,()=>{
    getData(props.id)
})


const giveStars = (id) => {
    let giveStars = ratemovies(id,props.id);
    stars.value = giveStars;
}

</script>

<style scoped>

.star_container{
    position: relative;
}
.stars{
    padding: 0;
    max-width: 150px;
    height: auto;
    display: flex;
    column-gap: 10px;
    margin-top: 15px;
}
.stars li{
    list-style: none;
}

.stars li i{
    font-size: 1.4rem;
    cursor: pointer;
}

</style>
