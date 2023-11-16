<template>
    <span>Add To Collections</span>
    <div class="dropdown">
        <i class="fa-regular fa-square-plus fs-3 icon" data-bs-toggle="dropdown"></i>
        <ul class="dropdown-menu">
            <li class=" px-2" v-if="errors">
                <button class="dropdown-item" style="user-select: none;">
                    {{ errors }}
                </button>
            </li>
            <li class=" px-2" v-for="collection in collections">
                <button class="dropdown-item" style="user-select: none;" @click="addCollection(collection.data)">
                   {{collection.data}}
                </button>
            </li>
        </ul>
    </div>
    <p v-if="errors"></p>
    <div class="alert alert-success" v-if="flashMsg">
        <p class="m-0 p-0 fs-4 text-center text-uppercase text-muted">{{ flashMsg }}</p>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import setToLocalStorage from '@/composable/setToLocalStorage';

const props = defineProps(['movie']);

const collections = ref([]);
const errors = ref('');
const flashMsg = ref('');
onMounted(()=>{
    const data = JSON.parse(localStorage.getItem('collectionsName'));
    collections.value = data;
    if(!data){
        errors.value = 'You need to create a new collection';
    }else{
        errors.value = ''
    }
});

const addCollection = (name) => {
    const data = {
        collectionName:name,
        data:props.movie
    };
    const dataArray = setToLocalStorage(data,'collections');
    if(dataArray){
        flashMsg.value = 'add collection is successful!!';
        setTimeout(()=>{
            flashMsg.value = ''
        },3000)
    }
}


</script>

<style scoped>
.icon{
    cursor: pointer;
}
.icon:hover{
    animation: shake .8s linear forwards;
}

@keyframes shake {
    from{
        transform: translateX(0);
    }
    to{
        transform: translateX(3px);
    }
}

.alert{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}


</style>
