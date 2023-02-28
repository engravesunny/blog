import { ElMessage } from "element-plus";
import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: '/',
        name: 'layout',
        redirect: '/home',
        component: ()=>import('@/view/Layout/index.vue'),
        children:[
            {
                path:"/home",
                name:'home',
                component:()=>import('@/view/Home/index.vue'),
                meta:{
                    component:'Search'
                }
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// const routeNeedToken = ["/myLike","/suggestSong","/songList"]

// router.beforeEach((to,from,next)=>{
//     if(routeNeedToken.indexOf(to.fullPath)>-1){
//         // 未登录
//         if(!localStorage.getItem('userInfo')){
//             ElMessage('请您先登录')
//             next('/findSong')
//         } else {
//             next()
//         }
//     }else {
//         next()
//     }
// })


export default router;