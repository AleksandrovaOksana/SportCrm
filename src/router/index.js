import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/areas',
    name: 'areas',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/AreasView.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/CategoriesView.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/DetailView.vue')
  },
  {
    path: '/map',
    name: 'map',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/MapView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/ProfileView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !store.getters.token) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
