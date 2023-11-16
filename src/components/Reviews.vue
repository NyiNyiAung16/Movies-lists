<template>
    <div class="mt-5">
        <form class="p-2" @submit.prevent="handleSubmit">
            <label for="review" class="fs-4 text-light my-2 ms-1">Review</label>
            <textarea class="form-control" id="review" placeholder="write reviews..." v-model="review"></textarea>
            <p v-if="errors" class="text-danger my-1">{{ errors }}</p>
            <button type="submit" class="btn btn-warning my-2">submit</button>
        </form>
    </div>
    <div class="reviewContainer" >
        <div v-for="(review,index) in reviewsData" :key="review" class="review">
            <div>
                <p>{{ review.data }}</p>
            </div>
            <div>
                <i class="fa-solid fa-trash icon" @click="deleteReview(review.id)"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import reviews from '../composable/setToLocalStorage'

const props = defineProps(['id']);

let reviewsData = ref([]);

function getData(id){
    let jsonData = localStorage.getItem(`reviews${id}`);
    let data = JSON.parse(jsonData);
    reviewsData.value = data;
}

onMounted(()=>{
    getData(props.id)
});

watch(()=>props.id,()=>{
    getData(props.id)
});


const review = ref('');
const errors = ref('');
const handleSubmit = () => {
    if(!review.value){
        errors.value = 'review is required.';
        setTimeout(()=>{
            errors.value = ''
        },3000)
    }else{
        let dataArray = reviews(review.value,`reviews${props.id}`);
        reviewsData.value = dataArray;
        review.value = '';
    }
}


const deleteReview = (id) => {
    const newData = reviewsData.value.filter((item)=>{
        return item.id !== id;
    })
    localStorage.setItem(`reviews${props.id}`,JSON.stringify(newData));
    reviewsData.value = newData;
}

</script>

<style scoped>
form{
    max-width:700px;
    margin:auto;
}

textarea{
    width:100%;
    height:150px;
    resize:none;
    border:1px solid rgb(65, 65, 74);
}

.reviewContainer{
    max-width: 700px;
    margin: auto;
}

.review{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #e1e0e0;
    padding: 20px;
    margin: 10px 0;
    border-radius: 3px;
}

.review p{
    font-size: 1.1rem;
    padding: 0;
    margin: 0;
}

.icon{
    cursor: pointer;
    transition: color .7s;
}
.icon:hover{
    color: red;
}

</style>