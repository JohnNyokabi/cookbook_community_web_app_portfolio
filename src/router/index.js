import { createRouter, createWebHistory } from 'vue-router'
import RecipeView from '../views/RecipeView.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipe',
    name: 'RecipeView',
    component: RecipeView
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: () => import('../views/Recipe.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: About
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
    component: () => import('../components/profile/UserProfile.vue'),
    meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isAuthenticated = '/';
    if (isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router
