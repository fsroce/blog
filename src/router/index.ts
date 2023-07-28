import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { computed } from 'vue'
import LoginPage from '@/pages/Login/login.vue'
import useUserStore from "@/store/user";
import pinia from "@/store";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login/:redirect?',
    component: LoginPage
  }, {
    path: '/test',
    component: LoginPage
  }
];

const userStore = useUserStore(pinia)
const login = computed(() => userStore.islogin)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(from);
  
  // console.log(from, to)
  // if (!login.value && to.meta.needLogin) {
  //   next(`/login/:redirect=${to.path}`)
  // }
  // if (login.value && from.path === '/login') {
  //   console.log(from)
  // }
  next()
})

export default router;
