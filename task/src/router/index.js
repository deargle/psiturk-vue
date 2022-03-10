import Vue from 'vue'
import VueRouter from 'vue-router'

// https://bootstrap-vue.org/docs
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import Home from '../views/Home.vue'
import Demo from '../views/Demo.vue'
import PsiturkEntryway from '../views/PsiturkEntryway.vue'
import StroopExperiment from '../views/StroopExperiment.vue'
import Questionnaire from '../views/Questionnaire.vue'
import Complete from '../views/Complete.vue'
import Instructions from '../views/Instructions.vue'
import Instruct1 from '../views/instructions/Instruct1.vue'
import Instruct2 from '../views/instructions/Instruct2.vue'
import Instruct3 from '../views/instructions/Instruct3.vue'
import InstructReady from '../views/instructions/InstructReady.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/psiturk',
    name: 'PsiturkEntryway',
    component: PsiturkEntryway
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Demo
  },
  {
    path: '/stroop',
    name: 'StroopExperiment',
    component: StroopExperiment
  },
  {
    path: '/questionnaire',
    name: 'Questionnaire',
    component: Questionnaire
  },
  {
    path: '/complete',
    name: 'Complete',
    component: Complete
  },
  {
    path: '/instructions',
    name: 'Instructions',
    component: Instructions,
    children: [
      {
        path: '1',
        name: 'Instruct1',
        component: Instruct1
      },
      {
        path: '2',
        name: 'Instruct2',
        component: Instruct2
      },
      {
        path: '3',
        name: 'Instruct3',
        component: Instruct3
      },
      {
        path: 'ready',
        name: 'InstructReady',
        component: InstructReady
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from , next) => {
  if (!['PsiturkEntryway', 'Demo'].includes(to.name)) {
    if (router.app.$store && !router.app.$store.state.uniqueId) {
      if (process.env.NODE_ENV == 'production') {
        window.location.href = '/'
      } else {
        next({ name: 'Demo'})
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
