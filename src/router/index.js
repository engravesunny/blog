import { ElMessage } from "element-plus";
import { createRouter, createWebHashHistory } from "vue-router";

import PubSub from "pubsub-js";

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
                    component:'home'
                }
            },
            {
                path: '/category',
                name: 'category',
                component: () => import('@/view/article/category/index.vue')
            },
            {
                path: '/archive',
                name: 'archive',
                component: () => import('@/view/article/archive/index.vue')
            },
            {
                path: '/tag',
                name: 'tag',
                component: () => import('@/view/article/tag/index.vue')
            },
            {
                path: '/common_web',
                name: 'common_web',
                component: () => import('@/view/guide/common-web/index.vue')
            },
            {
                path: '/person_web',
                name: 'person_web',
                component: () => import('@/view/guide/personal-web/index.vue')
            },
            {
                path: '/photo',
                name: 'photo',
                component: () => import('@/view/media/photo/index.vue')
            },
            {
                path: '/video',
                name: 'video',
                component: () => import('@/view/media/video/index.vue')
            },
            {
                path: '/music',
                name: 'music',
                component: () => import('@/view/media/music/index.vue')
            },
            {
                path: '/me',
                name: 'me',
                component: () => import('@/view/about/me/index.vue')
            },
            {
                path: '/comment',
                name: 'comment',
                component: () => import('@/view/about/comment/index.vue')
            },
            {
                path: '/friend',
                name: 'friend',
                component: () => import('@/view/about/friend/index.vue')
            },
            {
                path: '/article',
                name: 'article',
                component: () => import('@/view/article/article/index.vue')
            }
        ]
    },
    {
        path:'/BackgroundManagement',
        name:"BackgroundManagement",
        component:()=>import('../BackgroundManagement/index.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// const routeNeedToken = ["/myLike","/suggestSong","/songList"]

router.beforeEach((to,from,next)=>{
    PubSub.publish('scrollToFast',0)
    next()
})


export default router;