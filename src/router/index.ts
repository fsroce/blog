import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { computed } from 'vue'
import LoginPage from '@/pages/Login/login.vue'
import useUserStore from "@/store/user"
import pinia from "@/store"
import post from '@/components/post.vue'
import SignUp from '@/pages/SignUp/SignUp.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/post/:id',
    component: post,
    meta: {
      allowNoLogin: true
    }
  }, {
    path: '/login',
    component: LoginPage,
    meta: {
      allowNoLogin: true,
      redirect: ''
    }
  }, {
    path: '/sign',
    component: SignUp,
    meta: {
      allowNoLogin: true,
      redirect: ''
    }
  }
  , {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
    meta: {
      allowNoLogin: false,
      redirect: ''
    }
  }
];

const userStore = useUserStore(pinia)
const login = computed(() => userStore.islogin)
let redirect = ''
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('to', to);
  console.log('from', from);
  console.log(login.value);
  
  if (!login.value) {
    if (to.meta.allowNoLogin) {
      to.meta.redirect = redirect
      next()
    } else {
      redirect = to.path
      next('/login')
    }
  } else {
    if (to.path === '/login') next('/')
    else next()
  }
})

export default router;
