import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/recipe/:slug',
    name: 'Recipe',
    component: () => import('../views/Recipe.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/auth/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../components/auth/Signup.vue')
  },
  {
    path: '/userProfile',
    name: 'Profile',
    component: () => import('../components/profile/UserProfile.vue')
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: () => import('../components/auth/ForgotPassword.vue')
  },
  {
    path: '/resetPassword/:token',
    name: 'Reset',
    component: () => import('../components/auth/Reset.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
