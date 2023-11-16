import { createWebHistory, createRouter } from "vue-router";
import Home from '../view/Home.vue'
import Details from '../view/Details.vue'
import ShowCollections from '../view/ShowCollections.vue'


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            name:'Home',
            component:Home
        },
        {
            path:'/details/:id',
            name:'Details',
            component:Details,
            props:true
        },
        {
            path:'/showCollections',
            name:'ShowCollections',
            component:ShowCollections
        }
    ]
});

router.beforeEach((to)=>{
   document.title = 'Movies | '+ to.name;
})

export default router;