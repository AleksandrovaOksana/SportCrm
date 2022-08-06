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
    path: '/areas/edit',
    name: '/areas/edit',
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
    path: '/group/:id',
    name: 'group',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/GroupView.vue')
  },
  {
    path: '/group/create/:id',
    name: 'groupCreate',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/GroupCreate.vue')
  },
  {
    path: '/areas',
    name: 'areas',
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
