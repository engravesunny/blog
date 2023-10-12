import {
  createRouter,
  createWebHistory,
} from "vue-router";
import { RouteRecordRaw } from "vue-router";
import { getArchiveInfos } from "@/utils/getArchiveInfo";
import { toStoreCategoryInfo } from "@/utils/getCategoryInfo";
import { getPOSTJSON } from "@/api/getPostJson.js";
import { post } from "@/store/post";
import { tag } from "@/store/tag";
import { PostSingle, TagSingle } from "@/types";
import pinia from "@/store";
const postStore = post(pinia);
const tagStore = tag(pinia);

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    component: () => import("@/view/Layout/index.vue"),
    beforeEnter: async () => {
      const res = await getPOSTJSON();
      const postInfo = res.data.postInfo as PostSingle[];
      const tagInfo = res.data.tagInfo as TagSingle[];
      postInfo.forEach((post) => {
        postStore.addPost(post);
      });
      tagStore.setState(tagInfo);
      toStoreCategoryInfo();
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/view/Home/index.vue"),
        meta: {
          component: "home",
        },
      },
      {
        path: "/category",
        name: "category",
        component: () => import("@/view/article/category/index.vue"),
      },
      {
        path: "/archive",
        name: "archive",
        component: () => import("@/view/article/archive/index.vue"),
        beforeEnter: () => {
          getArchiveInfos();
        },
      },
      {
        path: "/tag",
        name: "tag",
        component: () => import("@/view/article/tag/index.vue"),
      },
      {
        path: "/common_web",
        name: "common_web",
        component: () => import("@/view/guide/common-web/index.vue"),
      },
      {
        path: "/person_web",
        name: "person_web",
        component: () => import("@/view/guide/personal-web/index.vue"),
      },
      {
        path: "/photo",
        name: "photo",
        component: () => import("@/view/media/photo/index.vue"),
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/view/media/video/index.vue"),
      },
      {
        path: "/me",
        name: "me",
        component: () => import("@/view/about/me/index.vue"),
      },
      {
        path: "/comment",
        name: "comment",
        component: () => import("@/view/about/comment/index.vue"),
      },
      {
        path: "/friend",
        name: "friend",
        component: () => import("@/view/about/friend/index.vue"),
      },
      {
        path: "/article",
        name: "article",
        component: () => import("@/view/article/article/index.vue"),
      },
      {
        path: "/statistical",
        name: "statistical",
        component: () => import("@/view/statistical/index.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/BackgroundManagement/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router;
