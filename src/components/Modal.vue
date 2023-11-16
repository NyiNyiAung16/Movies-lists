<template>
    <div class="modal px-2 py-3" id="collectionsModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title">
                        <h4 class="text-muted">Create Collections</h4>
                    </div>
                    <button class="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" v-model="collection" class="form-control" placeholder="make collections...">
                    <p v-if="errors" class="text-danger mt-1 m-0 p-0">{{ errors }}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-sm btn-primary" @click="addData">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <button class="create border-0 bg-transparent text-light mx-2 my-3" data-bs-toggle="modal" data-bs-target="#collectionsModal">Create Collections</button>
    <RouterLink to="/showCollections" class="link text-light">Show Collections</RouterLink>
</template>

<script setup>
import { ref } from 'vue';
import collections from '../composable/setToLocalStorage'

const errors = ref('');
const collection = ref('');
const addData = () => {
    if(collection.value){
        const dataArray = collections(collection.value,'collectionsName');
        collection.value = '';
    }else{
        errors.value = 'collection name is required!';
        setTimeout(()=>{
            errors.value = ''
        },2000)
    }
}




</script>

<style scoped>

.create{
    transition: all .6s;
}
.create:hover{
    color: #f4f4f4;
    text-decoration: underline;
}

.link{
    text-decoration: none;
    transition: all .6s;
}
.link:hover{
    color: #f4f4f4;
    text-decoration: underline;
}

</style>