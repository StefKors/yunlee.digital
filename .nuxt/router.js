import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f6b3edee = () => interopDefault(import('../pages/markdown/index.vue' /* webpackChunkName: "pages/markdown/index" */))
const _4133dbcb = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _6762092f = () => interopDefault(import('./prismic/pages/preview.vue' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/markdown",
    component: _f6b3edee,
    name: "markdown"
  }, {
    path: "/",
    component: _4133dbcb,
    name: "index"
  }, {
    path: "/preview",
    component: _6762092f,
    name: "prismic-preview"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
