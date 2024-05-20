import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginPage from '@/pages/Login/login.vue'
import PostDetail from '@/pages/Posts/PostDetail.vue'
import Home from '@/pages/Home/home.vue'
import SignUp from '@/pages/SignUp/SignUp.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home
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
  }, {
    path: '/posts/:postId',
    component: PostDetail
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
// let redirect = ''
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore()
//   const login = computed(() => userStore.islogin)
//   // redirect = (getUrlParams(to.path).redirect || '') as string
//   console.log('to', to);
//   console.log('from', from);
//   // TODO: 增加重定向能力
//   if (to.meta.allowNoLogin) {
//     next()
//   } else {
//     if (login.value) {
//       next()
//     } else {
//       // next(`/login${ redirect ? `?redirect=${ redirect }` : '' }`)
//       next('/login')
//     }
//   }
// })

export default router;
