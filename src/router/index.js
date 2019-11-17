import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

// const Login = () => import('../views/Login.vue')
// const Register = () => import('../views/Register.vue')

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `../views/${view}.vue`)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: loadView('Login')
  },
  {
    path: '/register',
    name: 'register',
    component: loadView('Register')
  },
  {
    path: '/main',
    component: loadView('MainLayout'),
    children: [
      {
        name: 'main',
        path: '',
        meta: { requiresAuth: true },
        component: loadView('Main')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth) && !store.state.isLoggedIn) {
    next({ name: 'login' })
    return
  }
  // if logged in redirect to dashboard
  if ((to.name === 'login' || to.name === 'register') && store.state.isLoggedIn) {
    next({ name: 'main' })
    return
  }
  
  next()
})

export default router
