import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

// const Login = () => import('../views/Login.vue')
// const Register = () => import('../views/Register.vue')

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `../views/${view}.vue`)
}

function mainView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `../views/MainLayout/${view}.vue`)
}

function formView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `../views/Form/${view}.vue`)
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
        component: mainView('Main')
      }
    ]
  },
  {
    path: '/input',
    component: loadView('FormLayout'),
    children: [
      {
        name: 'ownerForm',
        path: 'owner',
        meta: { requiresAuth: true },
        component: formView('OwnerForm')
      },
      {
        name: 'livestockForm',
        path: 'owner/livestock/:id',
        meta: { requiresAuth: true },
        component: formView('LivestockForm')
      },
      {
        name: 'livestockFormEdit',
        path: 'owner/livestock/:id/:livestock',
        meta: { requiresAuth: true },
        component: formView('LivestockForm')
      },
      {
        name: 'landForm',
        path: 'owner/land/:id',
        meta: { requiresAuth: true },
        component: formView('LandForm')
      },
      {
        name: 'landFormEdit',
        path: 'owner/land/:id/:land',
        meta: { requiresAuth: true },
        component: formView('LandForm')
      },
      {
        name: 'houseForm',
        path: 'owner/house/:id',
        meta: { requiresAuth: true },
        component: formView('HouseForm')
      },
      {
        name: 'houseFormEdit',
        path: 'owner/house/:id/:house',
        meta: { requiresAuth: true },
        component: formView('HouseForm')
      },
    ]
  },
  {
    path: '/owner/:id',
    name: 'ownerDetail',
    component: loadView('OwnerDetail')
  },
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
